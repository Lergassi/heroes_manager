import debug from 'debug';
import {sprintf} from 'sprintf-js';
import {database} from '../../data/ts/database.js';
import MaxIterationsReachedError from '../../source/Errors/MaxIterationsReachedError.js';
import MaxLevelReachedError from '../../source/Errors/MaxLevelReachedError.js';
import EventSystem from '../../source/EventSystem.js';
import GameObject from '../../source/GameObject.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import ExperienceDistributorInterface from '../Interfaces/ExperienceDistributorInterface.js';
import HeroCharacterAttributeGenerator from '../Services/BalanceTools/HeroCharacterAttributeGenerator.js';
import CharacterAttributeManager from './CharacterAttributeManager.js';
import HealthPoints from './HealthPoints.js';

export enum ExperienceComponentEventCode {
    AddExp = 'ExperienceComponent.AddExp',
    AddLevel = 'ExperienceComponent.AddLevel',
}

export interface ExperienceRender {
    updateLevel?(value: number): void;
    updateExp?(value: number): void,
    updateTotalExpToLevelUp?(value: number): void,
}

//todo: ExperienceDistributorInterface - зачем это тут?
export default class Experience implements ExperienceDistributorInterface {
    private _level: number;
    private readonly _maxLevel: number;
    private _exp: number;
    private readonly _expForFirstLevel: number;
    private readonly _increaseExpForNextLevel: number;
    private readonly _firstNextLevel: number;
    private readonly _hero: GameObject;
    private readonly _heroCharacterAttributeValueGenerator: HeroCharacterAttributeGenerator;

    get level(): number {
        return this._level;
    }

    get maxLevel(): number {
        return this._maxLevel;
    }

    get exp(): number {
        return this._exp;
    }

    get totalExpForNextLevel(): number {
        if (this._nextLevel() === this._firstNextLevel) {
            return this._expForFirstLevel;
        } else {
            return this._expForFirstLevel + (this._nextLevel() - this._firstNextLevel) * this._increaseExpForNextLevel;
        }
    }

    constructor(
        level: number,
        maxLevel: number,
        hero: GameObject,
        heroCharacterAttributeValueGenerator: HeroCharacterAttributeGenerator,
    ) {
        this._exp = 0;
        this._level = level;
        this._maxLevel = maxLevel;

        //todo: Временно. Далее через настройки или в виде отдельного класса.
        this._expForFirstLevel = 600;
        this._increaseExpForNextLevel = 100;

        this._firstNextLevel = 2;

        this._hero = hero;
        this._heroCharacterAttributeValueGenerator = heroCharacterAttributeValueGenerator;
    }

    addExp(value: number): void {
        if (this._nextLevel() > this._maxLevel) {
            throw new MaxLevelReachedError();
        }

        this._exp += value;
        debug(DebugNamespaceID.Log)(sprintf('Получено опыта: %d.', this._exp));   //todo: Не надо выводить у героев. Только у игрока. Сделать отдельный компоненты.
        EventSystem.event(ExperienceComponentEventCode.AddExp, this);    //todo: Это на каждую переменную придется делать, которая отображается в ui. Надо по другому.
        //todo: Повышение нескольких уровней объединить в одно действие. И через события передавать в дополнительной переменной.
        if (this._exp >= this.totalExpForNextLevel) {
            let maxIterations = 1_000_000_000;
            let currentIterationIndex = 1;
            while (this._exp > 0 && this._exp >= this.totalExpForNextLevel) {
                ++currentIterationIndex;
                if (currentIterationIndex >= maxIterations) {
                    throw new MaxIterationsReachedError();
                }

                this._exp = this._exp - this.totalExpForNextLevel;
                //todo: И так каждый раз try/catch? Ошибка должна не просто прерывать программу до ближайшего блока, а делать определенные действия.
                try {
                    this._addLevel();
                } catch (e) {
                    if (e instanceof MaxLevelReachedError) {
                        this._exp = 0;
                        throw e;
                    }
                }
            }
        }
    }

    renderByRequest(ui: ExperienceRender) {
        ui.updateLevel?.(this._level);
        ui.updateExp?.(this._exp);
        ui.updateTotalExpToLevelUp?.(this.totalExpForNextLevel);
    }

    debug(): void {
        debug(DebugNamespaceID.Debug)(DebugFormatterID.Json, {
            exp: this._exp,
            level: this._level,
            maxLevel: this._maxLevel,
        });
    }

    private _addLevel(): void {
        if (this._nextLevel() > this._maxLevel) {
            throw new MaxLevelReachedError();
        }

        ++this._level;
        debug(DebugNamespaceID.Log)(sprintf('Уровень повышен: %s.', this._level));

        let heroClassID = this._hero.get<HeroClassID>(ComponentID.HeroClassID);

        this._hero.get<CharacterAttributeManager>(ComponentID.CharacterAttributeManager).increase(CharacterAttributeID.MaxHealthPoints, this._heroCharacterAttributeValueGenerator.increaseBaseHealthPointsForLevel(this._level, heroClassID));

        let value = this._heroCharacterAttributeValueGenerator.increaseBaseAttackPowerForLevel(this._level, heroClassID);
        database.hero_classes.data.mainCharacterAttributes(heroClassID, (ID, ratio) => {
            this._hero.get<CharacterAttributeManager>(ComponentID.CharacterAttributeManager).increase(ID, _.round(value * ratio));
        });


        this._hero.get<HealthPoints>(ComponentID.HealthPoints).resetHealthPoints();
        //todo: Ресет других атрибутов.
    }

    private _resetExp(): void {
        this._exp = 0;
    }

    private _nextLevel(): number {
        return this._level + 1;
    }
}