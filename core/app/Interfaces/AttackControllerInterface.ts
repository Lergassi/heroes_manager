import DamageControllerInterface from './DamageControllerInterface.js';
import {RewardOptions} from './FightControllerInterface.js';

export default interface AttackControllerInterface {
    // /**
    //  * @deprecated Урон не будет суммироваться в методе атаки. Урон может быть разный (физ, маг), разная очередность и тд даже в этой игре. Герои атакую по очереди в рамках одного хода. Сам урон определяется внутри класса как он сам решит.
    //  */
    // generateAttack?(): number;
    attackTo(target: DamageControllerInterface, rewardOptions?: RewardOptions): number;
    canAttack(): boolean;
}