import Component from '../../source/Component.js';
import {unsigned} from '../../types/types.js';
import debug from 'debug';
import MaxLevelReachedError from '../../source/Errors/MaxLevelReachedError.js';
import MaxIterationsReachedError from '../../source/Errors/MaxIterationsReachedError.js';
import EventSystem from '../../source/EventSystem.js';
import {sprintf} from 'sprintf-js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export enum ExperienceComponentEventCode {
    AddExp = 'ExperienceComponent.AddExp',
    AddLevel = 'ExperienceComponent.AddLevel',
}

export default class ExperienceComponent {
    private _level: unsigned;
    private readonly _maxLevel: unsigned;
    private _exp: unsigned;
    private readonly _expForFirstLevel: unsigned;
    private readonly _increaseExpForNextLevel: unsigned;
    private readonly _firstNextLevel: unsigned;

    /**
     * @deprecated
     */
    get level(): unsigned {
        return this._level;
    }

    /**
     * @deprecated
     */
    get maxLevel(): unsigned {
        return this._maxLevel;
    }

    /**
     * @deprecated
     */
    get exp(): unsigned {
        return this._exp;
    }

    constructor(
        level: number,
        maxLevel: number,
    ) {
        this._level = level;
        this._maxLevel = maxLevel;
        this._exp = 0;
        this._firstNextLevel = 2;
        //todo: validate

        //todo: Временно. Далее через настройки или в виде отдельного класса.
        this._expForFirstLevel = 1000;
        this._increaseExpForNextLevel = 100;  //2: 1000 - 3:1100 - 4:1200 - ...
    }

    addExp(value: unsigned): void {
        if (this._nextLevel() > this._maxLevel) {
            throw new MaxLevelReachedError();
        }

        this._exp += value;
        debug(DebugNamespaceID.Log)(sprintf('Добавлено опыта: %s.', this._exp));   //todo: Не надо выводить у героев. Только у игрока. Сделать отдельный компоненты.
        EventSystem.event(ExperienceComponentEventCode.AddExp, this);    //todo: Это на каждую переменную придется делать, которая отображается в ui. Надо по другому.
        //todo: Повышение нескольких уровней объединить в одно действие. И через события передавать в дополнительной переменной.
        if (this._exp >= this._totalExpForNextLevel()) {
            let maxIterations = 1_000_000_000;
            let currentIterationIndex = 1;
            while (this._exp > 0 && this._exp >= this._totalExpForNextLevel()) {
                ++currentIterationIndex;
                if (currentIterationIndex >= maxIterations) {
                    throw new MaxIterationsReachedError();
                }

                this._exp = this._exp - this._totalExpForNextLevel();
                //todo: И так каждый раз try/catch? Ошибка должна не просто прерывать программу дл ближайшего блока, а делать определенные действия.
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

    private _addLevel(): void {
        if (this._nextLevel() > this._maxLevel) {
            throw new MaxLevelReachedError();
        }

        ++this._level;
        // this._resetExp();
        debug(DebugNamespaceID.Log)(sprintf('Уровень повышен: %s.', this._level));
        EventSystem.event(ExperienceComponentEventCode.AddLevel, this);
    }

    private _totalExpForNextLevel(): unsigned {
        if (this._nextLevel() === this._firstNextLevel) {
            return this._expForFirstLevel;
        } else {
            return this._expForFirstLevel + (this._nextLevel() - this._firstNextLevel) * this._increaseExpForNextLevel;
        }
    }

    private _resetExp(): void {
        this._exp = 0;
    }

    private _nextLevel(): unsigned {
        return this._level + 1;
    }
}