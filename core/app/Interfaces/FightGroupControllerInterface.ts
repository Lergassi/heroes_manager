import _ from 'lodash';
import debug from 'debug';
import AttackControllerInterface from './AttackControllerInterface.js';
import {RewardOptions} from './FightControllerInterface.js';

/**
 * Атака: целевая группа (интерфейс с позициями) + позиция.
 * Получение урона: персонаж (интерфейс) ноносящий урон + позиция.
 */
export interface FightGroupControllerInterface {
    /**
     * Атака персонажа внутри группы другим персонажем.
     * @param from
     * @param position
     * @param rewardOptions
     */
    damageByPosition(from: AttackControllerInterface, position: number, rewardOptions?: RewardOptions): number;
    damageFirstLife(from: AttackControllerInterface, rewardOptions?: RewardOptions): number;

    /**
     * Атакуется персонаж в группе. Выбор по позиции.
     * @param target
     * @param rewardOptions
     */
    attackTo(target: FightGroupControllerInterface, rewardOptions?: RewardOptions): number;
}