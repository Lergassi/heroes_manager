import {assertNotNil} from '../../source/assert.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import _ from 'lodash';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import DebugApp from '../Services/DebugApp.js';

export default class AttackGroupController implements AttackControllerInterface {
    private readonly _attackControllers: AttackControllerInterface[];

    constructor(attackControllers: AttackControllerInterface[] = []) {
        this._attackControllers = attackControllers;
    }

    add(attackController: AttackControllerInterface): void {
        assertNotNil(attackController);

        if (!_.includes(this._attackControllers, attackController)) {
            this._attackControllers.push(attackController);
        }
    }

    //todo: Проблема. Можно передать вообще любой интерфейс. И не понятно что должно происходить. В программе реализаций может быть много.
    remove(attackController: AttackControllerInterface) {
        assertNotNil(attackController);

        _.pullAt(this._attackControllers, _.indexOf(this._attackControllers, attackController));
    }

    // generateAttack(): number {
    //     let sum = 0;
    //     let length = 0;
    //     for (let i = 0; i < this._attackControllers.length; i++) {
    //         if (!this._attackControllers[i].canAttack()) continue;
    //         sum += this._attackControllers[i].generateAttack();
    //         ++length;
    //     }
    //     debug(DebugNamespaceID.Log)(sprintf('Суммарный урон: %d (персонажей: %d).', sum, length));
    //
    //     return sum;
    // }

    attackTo(target: DamageControllerInterface, afterDiedTargetCallback?): number {
        if (!this.canAttack()) {
            DebugApp.debug(DebugNamespaceID.Throw)('Группа не может атаковать.');
            return 0;
        }

        let resultDamage = 0;
        for (let i = 0; i < this._attackControllers.length; i++) {
            if (!this._attackControllers[i].canAttack()) continue;

            resultDamage += this._attackControllers[i].attackTo(target, afterDiedTargetCallback);
        }

        return resultDamage;
    }

    canAttack(): boolean {
        if (!_.every(_.map(this._attackControllers, (attackController) => {
            return !attackController.canAttack();
        }))) {
            DebugApp.debug(DebugNamespaceID.Throw)('Все участники группы мертвы.');
            return false;
        }

        return true;
    }
}