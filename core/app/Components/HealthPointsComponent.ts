import debug from 'debug';
import EventSystem from '../../source/EventSystem.js';
import {unsigned} from '../../types/main.js';
import AppError from '../../source/Errors/AppError.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {assertNotNil, assertIsPositive, assert, assertAction} from '../../source/assert.js';
import ArmorDecorator from './CharacterAttributes/ArmorDecorator.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import CharacterIsDeadError from '../../source/Errors/CharacterIsDeadError.js';
import CharacterStateController, {CharacterStateCode} from './CharacterStateController.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';

export enum HealthPointsComponentEventCode {
    TakeDamage = 'HealthPointsComponent.TakeDamage',
    Died = 'HealthPointsComponent.Died',
    Resurrect = 'HealthPointsComponent.Resurrect',
}

export default class HealthPointsComponent implements DamageControllerInterface {
    private _currentHealthPoints: unsigned;
    // private _maxHealthPoints: unsigned;
    private readonly _maxHealthPoints: CharacterAttributeInterface;
    private _isDead: boolean;    //todo: Может ли герой или враг быть живым или мертвым без компонента здоровья?
    private readonly _stateController: CharacterStateController;
    private readonly _afterDiedCallback: Function;

    constructor(
        maxHealthPoints: CharacterAttributeInterface,
        stateController: CharacterStateController,
        afterDiedCallback?: Function,
    ) {
        assertNotNil(maxHealthPoints);
        assertNotNil(stateController);

        // this._maxHealthPoints = maxHealthPoints;
        // this._currentHealthPoints = maxHealthPoints;
        this._maxHealthPoints = maxHealthPoints;
        this._currentHealthPoints = maxHealthPoints.value();
        this._isDead = false;
        this._stateController = stateController;
        this._afterDiedCallback = afterDiedCallback;
        console.log('this._afterDiedCallback', this._afterDiedCallback);
    }

    takeDamage(damage: unsigned, afterThisDiedCallback?): void {
        assertIsPositive(damage);
        damage = _.floor(damage, 0);
        //todo: Округление. Выбрать место.

        if (this._stateController.hasState(CharacterStateCode.Dead)) {
            debug(DebugNamespaceID.Throw)('asdadasd');
            return;
        }

        let healthPoints = this._currentHealthPoints - damage;
        this._currentHealthPoints = healthPoints <= 0 ? 0 : healthPoints;
        debug(DebugNamespaceID.Log)(sprintf('Получено урона: %s (%s/%s)', damage, this._currentHealthPoints, this._maxHealthPoints.value()));
        EventSystem.event(HealthPointsComponentEventCode.TakeDamage, this);
        if (this._currentHealthPoints <= 0) {
            this.kill(afterThisDiedCallback);
        }
    }

    // add(value: unsigned): void {
    //     this._canModify();
    //
    //     let healthPoints = this._currentHealthPoints + value;
    //     this._currentHealthPoints = healthPoints >= this._maxHealthPoints ? this._maxHealthPoints : healthPoints;
    // }

    kill(afterDiedCallback?): void {
        if (!this.canKill()) {
            debug(DebugNamespaceID.Throw)('Персонаж не может получить урон.');
            return;
        }

        this._currentHealthPoints = 0;
        this._isDead = true;
        debug(DebugNamespaceID.Log)('Персонаж умер.'); //todo: Не персонаж, а тот кому принадлежит объект.
        // this._stateController.state('Dead', 'State message: Персонаж мертвый.');
        this._stateController.addState(CharacterStateCode.Dead);
        EventSystem.event(HealthPointsComponentEventCode.Died, this);
        console.log('kill this._afterDiedCallback', this._afterDiedCallback);
        console.log('kill afterDiedCallback', afterDiedCallback);
        console.log('this._afterDiedCallback && afterDiedCallback', this._afterDiedCallback && afterDiedCallback);
        if (this._afterDiedCallback && afterDiedCallback) {
            this._afterDiedCallback(afterDiedCallback);
        }
        // if (afterDiedCallback) {
        //     afterDiedCallback();
        // }
        /*
            В вов:
                Опыт добавляется игрокам.
                    Если не группа: первый кто атаковал врага; если группа: всей группе. Как распределяется опыт и куда должен определять другой класс target.expController.addExp(value) Где target персонаж или группа.
                    Или по другому: опыт добавляется игроку. Если игрок в группе опыт распределяется.
                Создается труп с лутом и золотом.
                    Труп имеет владельца: первый атаковавший если не в группе, по #локага_распределения_лута# если в группе.
                Прочие события: баффы на персонажа, вызов другого врага...
         */
    }

    canKill(): boolean {
        return !this._stateController.hasState(CharacterStateCode.Dead);
    }

    resurrect(): void {
        // if (!this._isDead) {
        //     throw AppError.isNotDead();
        // }
        assertAction(this._stateController.hasState(CharacterStateCode.Dead));
        // if (this._stateController.hasState(CharacterStateCode.Dead)) {
        //     debug(DebugNamespaceID.Throw)('Персонаж мертвый.');
        //     return;
        // }

        this._currentHealthPoints = this._maxHealthPoints.value();
        this._isDead = false;
        // this._stateController.removeState();
        this._stateController.removeState(CharacterStateCode.Dead);
        debug(DebugNamespaceID.Log)('Персонаж воскрес.');
        EventSystem.event(HealthPointsComponentEventCode.Resurrect, this);
    }

    private _canModify(): void {
        // if (this._isDead) {
        //     // throw AppError.isDead();
        //     throw new CharacterIsDeadError();
        // }
        assertAction(!this._stateController.hasState(CharacterStateCode.Dead));
    }

    canTakeDamage(): boolean {
        return !this._stateController.hasState(CharacterStateCode.Dead);
    }

    isDead(): boolean {
        return this._isDead;
    }
}