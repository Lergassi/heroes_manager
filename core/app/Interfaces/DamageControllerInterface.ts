import {unsigned} from '../../types/main.js';
import {RewardOptions} from './FightControllerInterface.js';

export default interface DamageControllerInterface {
    /**
     *
     * @param value
     * @param afterDiedThisOptions
     * @return Полученное кол-во урона.
     */
    damage(value: number, afterDiedThisOptions?: RewardOptions): number;
    canDamage(): boolean;
}