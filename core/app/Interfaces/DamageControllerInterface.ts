import {RewardOptions} from './FightControllerInterface.js';

export default interface DamageControllerInterface {
    /**
     *
     * @param damage
     * @param rewardOptions
     * @return Полученное кол-во урона.
     */
    damage(damage: number, rewardOptions?: RewardOptions): number;

    canDamage(): boolean;
}