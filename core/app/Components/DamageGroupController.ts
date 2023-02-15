import {assertNotNil} from '../../source/assert.js';
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
        assertNotNil(damageController);

        if (!_.includes(this._damageControllers, damageController)) {
            this._damageControllers.push(damageController);
        }
    }

    remove(damageController: DamageControllerInterface) {
        assertNotNil(damageController);

        _.pullAt(this._damageControllers, _.indexOf(this._damageControllers, damageController));
    }

    damage(value: unsigned, afterDiedCallback?): number {
        value = _.floor(value);

        if (!this.canDamage()) {
            debug(DebugNamespaceID.Throw)('Все участники группы мертвы и не могут получить урон.');
            return;
        }

        let resultDamage = 0;
        let length = _.sum(_.map(this._damageControllers, (damageController) => {
            return Number(damageController.canDamage());
        }));
        let damageForElement = _.round(value / length);
        debug(DebugNamespaceID.Log)(sprintf('Распределение входящего урона %s по %s на персонажей %s.', value, damageForElement, length));
        let _damageControllers = [...this._damageControllers];
        for (let i = 0; i < _damageControllers.length; i++) {
            if (!_damageControllers[i].canDamage()) continue;

            resultDamage += _damageControllers[i].damage(damageForElement, afterDiedCallback);
        }

        return resultDamage;
    }

    canDamage(): boolean {
        console.log('this._damageControllers', this._damageControllers);
        return !_.every(_.map(this._damageControllers, (damageController) => {
            console.log('damageController', damageController);
            return !damageController.canDamage();
        }));
    }
}