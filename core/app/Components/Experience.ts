import {unsigned} from '../../types/main.js';
import debug from 'debug';
import MaxLevelReachedError from '../../source/Errors/MaxLevelReachedError.js';
import MaxIterationsReachedError from '../../source/Errors/MaxIterationsReachedError.js';
import EventSystem from '../../source/EventSystem.js';
import {sprintf} from 'sprintf-js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ExperienceDistributorInterface from '../Interfaces/ExperienceDistributorInterface.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';
import _ from 'lodash';

export enum ExperienceComponentEventCode {
    AddExp = 'ExperienceComponent.AddExp',
    AddLevel = 'ExperienceComponent.AddLevel',
}

export interface ExperienceRender {
    updateLevel?(value: number): void;
    updateExp?(value: number): void,
    updateTotalExpToLevelUp?(value: number): void,
}

export default class Experience implements ExperienceDistributorInterface {
    private _level: unsigned;
    private readonly _maxLevel: unsigned;
    private _exp: unsigned;
    private readonly _expForFirstLevel: unsigned;
    private readonly _increaseExpForNextLevel: unsigned;
    private readonly _firstNextLevel: unsigned;

    private _callbacks;

    get level(): unsigned {
        return this._level;
    }

    get maxLevel(): unsigned {
        return this._maxLevel;
    }

    get exp(): unsigned {
        return this._exp;
    }

    get totalExpForNextLevel(): unsigned {
        if (this._nextLevel() === this._firstNextLevel) {
            return this._expForFirstLevel;
        } else {
            return this._expForFirstLevel + (this._nextLevel() - this._firstNextLevel) * this._increaseExpForNextLevel;
        }
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

        this._callbacks = [];
    }

    addExp(value: unsigned): void {
        if (this._nextLevel() > this._maxLevel) {
            this.updateUI();    //todo: Переделать вместе с удалением исключений. Учитывать использование исключение выше по коду в одном месте.
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
                        this.updateUI();
                        throw e;
                    }
                }
            }
        }

        this.updateUI();
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

    private _resetExp(): void {
        this._exp = 0;
    }

    private _nextLevel(): unsigned {
        return this._level + 1;
    }

    view(logger) {
        logger(DebugNamespaceID.Info)(DebugFormatterID.Json, {
            level: this._level,
            maxLevel: this._maxLevel,
            exp: this._exp,
            totalExpToLevelUp: this.totalExpForNextLevel,
        });
    }

    render(callback: (level: number, exp: number, totalExpToLevelUp: number) => void) {
        if (!_.includes(this._callbacks, callback)) {
            this._callbacks.push(callback);
        }
        this.updateUI();
    }

    removeRender(callback: (level: number, exp: number, totalExpToLevelUp: number) => void) {
        _.pull(this._callbacks, callback);
    }

    // read(callback: (level: number, exp: number, totalExpToLevelUp: number) => void) {
    //     callback(this._level, this._exp, this.totalExpForNextLevel);
    // }

    updateUI() {
        for (let i = 0; i < this._callbacks.length; i++) {
            this._callbacks[i](this._level, this._exp, this.totalExpForNextLevel);
        }
    }

    private _ui = [];

    renderByObject(ui: {
        updateLevel: (value: number) => void,
        updateExp: (value: number) => void,
        updateTotalExpToLevelUp: (value: number) => void,
    }) {
        this._ui.push(ui);
    }

    removeRenderByObject(ui) {
        _.pull(this._ui, ui);
    }

    updateUIByObject() {
        for (let i = 0; i < this._ui.length; i++) {
            this._ui[i].updateLevel(this._level);
            this._ui[i].updateExp(this._exp);
            this._ui[i].updateTotalExpToLevelUp(this.totalExpForNextLevel);
        }
    }

    renderByRequest(ui: ExperienceRender) {
        ui.updateLevel?.(this._level);
        ui.updateExp?.(this._exp);
        ui.updateTotalExpToLevelUp?.(this.totalExpForNextLevel);
    }
}