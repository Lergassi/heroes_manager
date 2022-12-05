import {unsigned} from '../../types/main.js';
import {RewardOptions} from './FightControllerInterface.js';

export default interface DamageControllerInterface {
    takeDamage(value: unsigned, afterDiedThisOptions?: RewardOptions): void;
    canTakeDamage(): boolean;
}