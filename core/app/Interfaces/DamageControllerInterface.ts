import {unsigned} from '../../types/main.js';
import {EnemyRewardOptions} from './FightControllerInterface.js';

export default interface DamageControllerInterface {
    takeDamage(value: unsigned, afterDiedThisOptions?: EnemyRewardOptions): void;
    canTakeDamage(): boolean;
}