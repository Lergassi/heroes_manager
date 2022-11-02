import DamageControllerInterface from './DamageControllerInterface.js';
import {RewardOptions} from './FightControllerInterface.js';

export default interface AttackControllerInterface {
    /**
     * @deprecated Урон не будет суммироваться в методе атаки. Урон может быть разный (физ, маг), разная очередность и тд даже в этой игре. Герои атакую по очереди в рамках одного хода. Сам урон определяется внутри класса как он сам решит.
     */
    generateAttack(): number;   //todo: Надо как-то придумать названия для генерации УРОНА и получение урона. А то сейчас оба метода damage() и damage(damage)
    attackTo(target: DamageControllerInterface, afterDiedTargetOptions?: RewardOptions): boolean;   //todo: Надо как-то придумать названия для генерации УРОНА и получение урона. А то сейчас оба метода damage() и damage(damage)
    /**
     * @deprecated
     */
    canAttack(): boolean;
}