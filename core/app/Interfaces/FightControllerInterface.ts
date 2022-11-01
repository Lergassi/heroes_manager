import AttackControllerInterface from './AttackControllerInterface.js';
import DamageControllerInterface from './DamageControllerInterface.js';
import ExperienceDistributorInterface from './ExperienceDistributorInterface.js';
import WalletInterface from './WalletInterface.js';
import ItemStorageInterface from './ItemStorageInterface.js';

export type EnemyRewardOptions = Partial<{
    experienceDistributor?: ExperienceDistributorInterface,
    wallet?: WalletInterface,
    itemStorage?: ItemStorageInterface,
}>;

export default interface FightControllerInterface {
    //todo: afterDiedCallback = undefined времено до поиска решения.
    hit(damageController: DamageControllerInterface, afterTargetDiedOptions?: EnemyRewardOptions): void;
    takeHit(attackController: AttackControllerInterface, afterThisDiedOptions?: EnemyRewardOptions): void;

    attackTo(target: FightControllerInterface, afterTargetDiedOptions?: EnemyRewardOptions): void;
    attackFrom(target: FightControllerInterface, afterThisDiedOptions?: EnemyRewardOptions): void;

    canAttack(): boolean;
    canTakeDamage(): boolean;
}