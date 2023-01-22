import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import _ from 'lodash';
import StateError from '../../source/Errors/StateError.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import AppError from '../../source/Errors/AppError.js';

export default class AttackGroupController implements AttackControllerInterface {
    private readonly _attackControllers: AttackControllerInterface[];

    constructor(attackControllers: AttackControllerInterface[] = []) {
        this._attackControllers = attackControllers;
    }

    add(attackController: AttackControllerInterface) {
        if (!_.isNil(attackController) && !_.includes(this._attackControllers, attackController)) {
            this._attackControllers.push(attackController);
        }
    }

    //todo: Проблема. Можно передать вообще любой интерфейс. И не понятно что должно происходить. В программе реализаций может быть много.
    remove(attackController: AttackControllerInterface) {
        _.pullAt(this._attackControllers, _.indexOf(this._attackControllers, attackController));
    }

    generateAttack(): number {
        let sum = 0;
        let length = 0;
        for (let i = 0; i < this._attackControllers.length; i++) {
            if (!this._attackControllers[i].canAttack()) continue;
            sum += this._attackControllers[i].generateAttack();
            ++length;
        }
        debug(DebugNamespaceID.Log)(sprintf('Суммарный урон: %d (персонажей: %d).', sum, length));

        return sum;
    }

    canAttack(): boolean {
        return !_.every(_.map(this._attackControllers, (attackController) => {
            return !attackController.canAttack();
        }));
    }

    attackTo(target: DamageControllerInterface, afterDiedTargetCallback?): boolean {
        if (!this.canAttack()) {
            debug(DebugNamespaceID.Throw)('Все участники группы мертвы и не могут атаковать.');
            return false;
        }

        for (let i = 0; i < this._attackControllers.length; i++) {
            //todo: А зачем вообще суммировать урон если можно сделать так? А получательУрона сам разберется как его распределить: на одну цель или группу. И логика объединения исходящего урона не логичная. Если очень надо его можно объединить при получении или гдето между.
            // if (!this._attackControllers[i].canAttack() || !target.canTakeDamage()) continue;
            if (!this._attackControllers[i].canAttack()) continue;

            this._attackControllers[i].attackTo(target, afterDiedTargetCallback);
        }

        return true;
    }
}