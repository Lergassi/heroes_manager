import debug from 'debug';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import GameObject from '../../source/GameObject.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import Experience from './Experience.js';
import ExperienceGroupDistributor from './ExperienceGroupDistributor.js';
import HealthPoints from './HealthPoints.js';

export interface FightGroupControllerOptions {
    deleteDeadCharacter?: boolean;
}

/*
* Из вне передается только атакующий герой.
* */
export default class FightGroupController {
    private readonly _default: FightGroupControllerOptions = {
        deleteDeadCharacter: false,
    };
    private readonly _options: FightGroupControllerOptions;

    private readonly _characters: GameObject[];
    private readonly _experienceGroupDistributor: ExperienceGroupDistributor;

    constructor(options?: FightGroupControllerOptions) {
        this._options = {};
        this._options.deleteDeadCharacter = options?.deleteDeadCharacter || this._default.deleteDeadCharacter;

        this._characters = [];
        this._experienceGroupDistributor = new ExperienceGroupDistributor();
    }

    addCharacter(character: GameObject): number/*todo: Или тут лишнее?*/ {
        if (_.includes(this._characters, character)) return this._characters.length;

        this._characters.push(character);
        this._experienceGroupDistributor.add(character.get<Experience>(ComponentID.Experience));

        return this._characters.length;
    }

    removeCharacter(character: GameObject): number {
        _.pull(this._characters, character);
        this._experienceGroupDistributor.remove(character.get<Experience>(ComponentID.Experience));

        return this._characters.length;
    }

    /**
     * Атака персонажа в группе. Кто атакует выбирается в другом месте.
     * @param from
     * @param position
     * @param rewardOptions
     */
    damageCharacterByPosition(from: AttackControllerInterface, position: number, rewardOptions?: RewardOptions): number {
        if (!this._characters[position]) {
            // debug(DebugNamespaceID.Throw)(sprintf('Персонаж на позиции %s не найден.', position));   //debug
            return 0;
        }

        let resultDamage = from.attackTo(this._characters[position].get<DamageControllerInterface>(ComponentID.DamageController), rewardOptions);

        if (this._options.deleteDeadCharacter && this._characters[0].get<HealthPoints>(ComponentID.HealthPoints).isDead) {
            _.pullAt(this._characters, 0);
            // debug(DebugNamespaceID.Log)('Мертвый персонаж удален из группы.');   //debug
        }

        return resultDamage;
    }

    damageFirstCharacter(from: AttackControllerInterface, rewardOptions?: RewardOptions): number {
        let position = this._getFirstLifeCharacter();
        if (position === -1) return 0;

        return this.damageCharacterByPosition(from, position, rewardOptions);
    }

    /**
     * Каждый персонаж атакует ближайшего персонажа в группе. Что внутри целевой группы значение не имеет: герой/враг/отряд врагов. Принимающий класс сам разберется.
     * todo: Отдельный класс или стратегия.
     * @param from
     * @param rewardOptions
     */
    attack(from: FightGroupController, rewardOptions?: RewardOptions): number {
        if (rewardOptions) rewardOptions.experienceDistributor = this._experienceGroupDistributor;

        let resultDamage = 0;
        for (let i = 0; i < this._characters.length; i++) {
            // if (rewardOptions) rewardOptions.experienceDistributor = this._characters[i].get<Experience>(ComponentID.Experience);
            resultDamage += from.damageFirstCharacter(this._characters[i].get<AttackControllerInterface>(ComponentID.AttackController), rewardOptions);
            // if (rewardOptions) rewardOptions.experienceDistributor = undefined;
        }

        debug(DebugNamespaceID.Debug)(sprintf('Общий исходящий урон группы: %s.', resultDamage));

        if (rewardOptions) rewardOptions.experienceDistributor = undefined;

        return resultDamage;
    }

    private _getFirstLifeCharacter(): number {
        for (let i = 0; i < this._characters.length; i++) {
            if (!this._characters[i].get<HealthPoints>(ComponentID.HealthPoints).isDead) return i;
        }

        return -1;
    }
}