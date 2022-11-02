import {assertNotNil} from '../../source/assert.js';
import debug from 'debug';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import CharacterIsDeadError from '../../source/Errors/CharacterIsDeadError.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import FightControllerInterface, {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import {unsigned} from '../../types/main.js';

// export default class FightController implements FightControllerInterface {
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

    // takeHit(attackController: AttackControllerInterface, rewardOptions?: RewardOptions): void {    //todo: Или просто число?
    //     attackController.attackTo(this._damageController, rewardOptions);
    // }
    //
    // hit(damageController: DamageControllerInterface, rewardOptions?: RewardOptions) {
    //     this._attackController.attackTo(damageController, rewardOptions);
    // }
    //
    // attackTo(target: FightControllerInterface, rewardOptions?: RewardOptions): void {
    //     target.takeHit(this._attackController, rewardOptions);
    //     // target.attackTo(this._damageController, rewardOptions);
    // }
    //
    // attackFrom(target: FightControllerInterface, rewardOptions?: RewardOptions): void {
    //     target.hit(this._damageController, rewardOptions);
    // }

    // attackTo(target: DamageControllerInterface, rewardOptions?: RewardOptions): void {
    // attackTo2(target: FightController, rewardOptions?: RewardOptions): void {
    attackTo(target: FightController, rewardOptions?: RewardOptions): void {
        this._attackController.attackTo(target._damageController, rewardOptions);
        // target.takeDamage(this._damageController);
        // target.attackTo(this._damageController, rewardOptions);
    }

    // takeDamage2(value: unsigned, afterDiedThisOptions?: RewardOptions): void {
    // takeDamage2(target, FightController, afterDiedThisOptions?: RewardOptions): void {
    //     // this._damageController.takeDamage(value, afterDiedThisOptions);
    //     this._damageController.takeDamage(target._, afterDiedThisOptions);
    // }

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