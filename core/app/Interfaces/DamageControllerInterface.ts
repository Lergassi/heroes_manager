import {unsigned} from '../../types/main.js';
import {RewardOptions} from './FightControllerInterface.js';

export default interface DamageControllerInterface {
    takeDamage(value: number, afterDiedThisOptions?: RewardOptions): void;
    canTakeDamage(): boolean;
}