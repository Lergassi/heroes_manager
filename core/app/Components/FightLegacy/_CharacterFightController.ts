import {assertNotNil} from '../../../source/assert.js';
import DamageControllerInterface from '../../Interfaces/DamageControllerInterface.js';
import AttackControllerInterface from '../../Interfaces/AttackControllerInterface.js';
import {RewardOptions} from '../../Interfaces/FightControllerInterface.js';

export default class _CharacterFightController {
    private readonly _attackController: AttackControllerInterface;
    private readonly _damageController: DamageControllerInterface;

    constructor(
        attackController: AttackControllerInterface,
        damageController: DamageControllerInterface,
    ) {
        assertNotNil(attackController);
        assertNotNil(damageController);

        this._attackController = attackController;
        this._damageController = damageController;
    }

    attackTo(target: _CharacterFightController, rewardOptions?: RewardOptions): void {
        this._attackController.attackTo(target._damageController, rewardOptions);
    }

    canAttack(): boolean {
        return this._attackController.canAttack();
    }

    canTakeDamage(): boolean {
        return this._damageController.canDamage();
    }
}