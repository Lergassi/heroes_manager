import _ from 'lodash';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import DebugApp from '../Services/DebugApp.js';

export enum CharacterActionStateCode {
    // Life = 'Life',
    Dead = 'Dead',
    Tired = 'Tired',
}

/**
 * Нужно ли состояние отдельно от очков жизни?
 * todo: Пока на возможность какого либо действия будет отвечать только смерть. Дальше доработать.
 */
export default class ActionStateController {
    private _codes: CharacterActionStateCode[];

    constructor() {
        this._codes = [];
    }

    addState(code: CharacterActionStateCode): void {
        if (_.includes(this._codes, code)) {
            return;
        }

        this._codes.push(code);
    }

    removeState(code: CharacterActionStateCode): void {
        _.pull(this._codes, code);
    }

    hasState(code: CharacterActionStateCode): boolean {
        return _.includes(this._codes, code);
    }

    canAction(): boolean {
        if (this._codes.length) {
            DebugApp.debug(DebugNamespaceID.Throw)('Персонаж не может совершить действие.');
            return false;
        }

        return true;
    }

    debug(): void {
        DebugApp.debug(DebugNamespaceID.Debug)(DebugFormatterID.Json, {
            code: this._codes,
        });
    }
}