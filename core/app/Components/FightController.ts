import {assertNotNil} from '../../source/assert.js';
import debug from 'debug';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import CharacterIsDeadError from '../../source/Errors/CharacterIsDeadError.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import FightControllerInterface, {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import {unsigned} from '../../types/main.js';

export default class FightController {
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

    attackTo(target: FightController, rewardOptions?: RewardOptions): void {
        this._attackController.attackTo(target._damageController, rewardOptions);
    }

    canAttack(): boolean {
        return this._attackController.canAttack();
    }

    canTakeDamage(): boolean {
        return this._damageController.canTakeDamage();
    }
}