import debug from 'debug';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import GameObject from '../../source/GameObject.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import {FightGroupControllerInterface} from '../Interfaces/FightGroupControllerInterface.js';
import Experience from './Experience.js';
import ExperienceGroupDistributor from './ExperienceGroupDistributor.js';
import HealthPoints from './HealthPoints.js';

export interface FightGroupControllerOptions {
    deleteDeadCharacter?: boolean;
}

export default class FightGroupController implements FightGroupControllerInterface {
    private readonly _options: FightGroupControllerOptions;

    private readonly _characters: GameObject[];
    private readonly _experienceGroupDistributor: ExperienceGroupDistributor;

    constructor(options?: FightGroupControllerOptions) {
        this._options = {};
        this._options.deleteDeadCharacter = options?.deleteDeadCharacter || false;

        this._characters = [];
        this._experienceGroupDistributor = new ExperienceGroupDistributor();
    }

    addCharacter(character: GameObject): boolean/*todo: Или тут лишнее?*/ {
        if (_.includes(this._characters, character)) return false;

        this._characters.push(character);
        this._experienceGroupDistributor.add(character.get<Experience>(ComponentID.Experience));

        return true;
    }

    removeCharacter(character: GameObject): boolean {
        if (!_.includes(this._characters, character)) return false;

        _.pull(this._characters, character);
        this._experienceGroupDistributor.remove(character.get<Experience>(ComponentID.Experience));

        return true;
    }

    /**
     * Атака персонажа в группе. Кто атакует выбирается в другом месте.
     * @param from
     * @param position
     * @param rewardOptions
     */
    damageByPosition(from: AttackControllerInterface, position: number, rewardOptions?: RewardOptions): number {
        if (!this._characters[position]) {
            debug(DebugNamespaceID.Debug)(sprintf('Персонаж на позиции %s не найден.', position));
            return 0;
        }

        let resultDamage = from.attackTo(this._characters[position].get<DamageControllerInterface>(ComponentID.DamageController), rewardOptions);

        //Мертвые отряды удалять нельзя. Чтобы была полная информация о локации.
        // if (this._options.deleteDeadCharacter && this._characters[0].get<HealthPoints>(ComponentID.HealthPoints).isDead) {
        //     _.pullAt(this._characters, 0);
        //     debug(DebugNamespaceID.Debug)('Мертвый персонаж удален из группы.');
        // }

        return resultDamage;
    }

    damageFirstLife(from: AttackControllerInterface, rewardOptions?: RewardOptions): number {
        let position = this._getFirstLife();
        if (position === -1) return 0;

        return this.damageByPosition(from, position, rewardOptions);
    }

    /**
     * Алгоритм атаки: каждый персонаж атакует ближайшего персонажа в целевой группе.
     * Что внутри целевой группы значение не имеет: герой/враг/отряд врагов. Принимающий класс сам разберется.
     * todo: Отдельный класс или стратегия. Алгоритм атаки будет разный.
     * @param target
     * @param rewardOptions
     */
    attackTo(target: FightGroupControllerInterface, rewardOptions?: RewardOptions): number {
        if (rewardOptions) rewardOptions.experienceDistributor = this._experienceGroupDistributor;

        let resultDamage = 0;
        // let attackPosition = 0;
        for (let i = 0; i < this._characters.length; i++) {
            // resultDamage += target.damageByPosition(this._characters[i].get<AttackControllerInterface>(ComponentID.AttackController), attackPosition, rewardOptions);
            resultDamage += target.damageFirstLife(this._characters[i].get<AttackControllerInterface>(ComponentID.AttackController), rewardOptions);
        }

        debug(DebugNamespaceID.Debug)(sprintf('Общий исходящий урон группы: %s.', resultDamage));

        if (rewardOptions) rewardOptions.experienceDistributor = undefined;

        return resultDamage;
    }

    private _getFirstLife(): number {
        for (let i = 0; i < this._characters.length; i++) {
            if (!this._characters[i].get<HealthPoints>(ComponentID.HealthPoints).isDead) return i;
        }

        return -1;
    }
}