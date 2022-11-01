import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {unsigned} from '../../types/main.js';
import _, {after} from 'lodash';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import StateError from '../../source/Errors/StateError.js';
import {sprintf} from 'sprintf-js';

export default class DamageGroupController implements DamageControllerInterface {
    private readonly _damageControllers: DamageControllerInterface[];

    constructor(damageControllers: DamageControllerInterface[] = []) {
        this._damageControllers = damageControllers;
    }

    add(attackController: DamageControllerInterface) {
        if (!_.includes(this._damageControllers, attackController)) {
            this._damageControllers.push(attackController);
        }
    }

    remove(attackController: DamageControllerInterface) {
        _.pullAt(this._damageControllers, _.indexOf(this._damageControllers, attackController));
    }

    // damage(value: unsigned, afterDiedCallback?): void {
    //     let length = this._damageControllers.length;
    //     let damageForElement = value / length;
    //     debug(DebugNamespaceID.Log)('Распределение урона по : ' + damageForElement + ' между ' + length + ' персонажей.');
    //     let _damageControllers = [...this._damageControllers];
    //     // console.log('-'.repeat(32));
    //     for (let i = 0; i < _damageControllers.length; i++) {
    //         // _damageControllers[i].damage(damageForElement, () => {
    //         //     this.remove(_damageControllers[i]); //todo: @q Как это должно работать в обычной игре с add/remove? При воскрешении объект DamageGroupController вновь добавляется сюда? Хотя там другая логика: враг просто ищет игроков в радиусе и атакует их в независимости от группы.
    //         //С такое логикой при смене состояния нужно манипулировать очень большим кол-вом объетов.
    //         //     if (afterDiedCallback) afterDiedCallback();
    //         // });
    //         _damageControllers[i].damage(damageForElement, afterDiedCallback);
    //         // console.log('-'.repeat(32));
    //     }
    // }

    // damage(value: unsigned, afterDiedCallback?): void {
    //     //todo: Проблема. Компоненты могут зависеть от нескольких других компонентов. Пока это только состояние.
    //     let length = this._damageControllers.length;
    //     let damageForElement = value / length;
    //     debug(DebugNamespaceID.Log)('Распределение урона по : ' + damageForElement + ' между ' + length + ' персонажей.');
    //     let _damageControllers = [...this._damageControllers];
    //     // console.log('-'.repeat(32));
    //     for (let i = 0; i < _damageControllers.length; i++) {
    //         //@test_throw
    //         try {
    //             //todo: При сметри герой по прежнему находиться в обычной группе.
    //             _damageControllers[i].damage(damageForElement, afterDiedCallback);
    //         } catch (e) {
    //             if (!(e instanceof StateError)) throw e;
    //             debug(DebugNamespaceID.DebugAssertThrow)(e);
    //         }
    //     }
    // }

    takeDamage(value: unsigned, afterDiedCallback?): void {
        value = _.floor(value);

        if (!this.canTakeDamage()) {
            debug(DebugNamespaceID.Throw)('Группа мертва и не может получить урон.');
            return;
        }

        let length = _.sum(_.map(this._damageControllers, (damageController) => {
            return Number(damageController.canTakeDamage());
        }));
        let damageForElement = value / length;
        debug(DebugNamespaceID.Log)(sprintf('Распределение входящего урона %s по %s на персонажей %s.', value, damageForElement, length));
        let _damageControllers = [...this._damageControllers];
        for (let i = 0; i < _damageControllers.length; i++) {
            if (!_damageControllers[i].canTakeDamage()) continue;
            _damageControllers[i].takeDamage(damageForElement, afterDiedCallback);
        }
    }

    canTakeDamage(): boolean {
        return !_.every(_.map(this._damageControllers, (damageController) => {
            return !damageController.canTakeDamage();
        }));
    }
}