import AttackControllerInterface from './AttackControllerInterface.js';
import DamageControllerInterface from './DamageControllerInterface.js';
import ExperienceDistributorInterface from './ExperienceDistributorInterface.js';
import WalletInterface from './WalletInterface.js';
import ItemStorageInterface from './ItemStorageInterface.js';

export type RewardOptions = Partial<{
    experienceDistributor?: ExperienceDistributorInterface,
    wallet?: WalletInterface,
    itemStorage?: ItemStorageInterface,
}>;

// export default interface FightControllerInterface {
//     //todo: afterDiedCallback = undefined времено до поиска решения.
//     hit(damageController: DamageControllerInterface, rewardOptions?: RewardOptions): void;
//     takeHit(attackController: AttackControllerInterface, rewardOptions?: RewardOptions): void;
//
//     attackTo(target: FightControllerInterface, rewardOptions?: RewardOptions): void;
//     attackFrom(target: FightControllerInterface, rewardOptions?: RewardOptions): void;
//
//     canAttack(): boolean;
//     canTakeDamage(): boolean;
// }