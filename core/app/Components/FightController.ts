import {assertNotNil} from '../../source/assert.js';
import debug from 'debug';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import CharacterIsDeadError from '../../source/Errors/CharacterIsDeadError.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import FightControllerInterface, {EnemyRewardOptions} from '../Interfaces/FightControllerInterface.js';

export default class FightController implements FightControllerInterface {
    private _attackController: AttackControllerInterface;
    private _damageController: DamageControllerInterface;

    constructor(
        attackController: AttackControllerInterface,
        damageController: DamageControllerInterface,
    ) {
        assertNotNil(attackController);
        assertNotNil(damageController);

        this._attackController = attackController;
        this._damageController = damageController;
    }

    takeHit(attackController: AttackControllerInterface, afterDiedOptions?): void {    //todo: Или просто число?
        attackController.attackTo(this._damageController, afterDiedOptions);
    }

    hit(damageController: DamageControllerInterface, afterDiedOptions?) {
        this._attackController.attackTo(damageController, afterDiedOptions);
    }

    attackTo(target: FightControllerInterface, afterTargetDiedOptions?: EnemyRewardOptions): void {
        target.takeHit(this._attackController, afterTargetDiedOptions);
    }

    attackFrom(target: FightControllerInterface, afterThisDiedOptions?: EnemyRewardOptions): void {
        target.hit(this._damageController, afterThisDiedOptions);
    }

    // exchangeHits(target: FightControllerInterface) {
    //     this.attackTo(target);
    //     this.attackFrom(target);
    // }

    // fightToDead(target: FightControllerInterface) {
    //     // assertNotNil(target);
    //
    //     let maxHits = 1_000;
    //     let currentHit = 0;
    //     while (currentHit < maxHits) {
    //         this.exchangeHits(this);
    //         // try {
    //         //     this.hit(target);
    //         // } catch (e) {
    //         //     if (e instanceof CharacterIsDeadError) {
    //         //         break;
    //         //     }
    //         // }
    //         ++currentHit;
    //     }
    //     if (currentHit >= maxHits) {
    //         //todo: Чтото делать.
    //         // debug(DebugNamespaceID.Error)('Ошибка при симуляции боя. Достигнуто максимальное количество ударов.');
    //         debug(DebugNamespaceID.Warning)('Ошибка при симуляции боя. Достигнуто максимальное количество ударов.');
    //     }
    // }

    canAttack(): boolean {
        return this._attackController.canAttack();
    }

    canTakeDamage(): boolean {
        return this._damageController.canTakeDamage();
    }
}