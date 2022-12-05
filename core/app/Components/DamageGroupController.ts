import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {unsigned} from '../../types/main.js';
import _ from 'lodash';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';

export default class DamageGroupController implements DamageControllerInterface {
    private readonly _damageControllers: DamageControllerInterface[];

    constructor(damageControllers: DamageControllerInterface[] = []) {
        this._damageControllers = damageControllers;
    }

    add(damageController: DamageControllerInterface) {
        if (!_.includes(this._damageControllers, damageController)) {
            this._damageControllers.push(damageController);
        }
    }

    remove(damageController: DamageControllerInterface) {
        _.pullAt(this._damageControllers, _.indexOf(this._damageControllers, damageController));
    }

    takeDamage(value: unsigned, afterDiedCallback?): void {
        value = _.floor(value);

        if (!this.canTakeDamage()) {
            debug(DebugNamespaceID.Throw)('Все участники группы мертвы и не могут получить урон.');
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