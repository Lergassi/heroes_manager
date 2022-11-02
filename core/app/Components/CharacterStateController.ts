import AppError from '../../source/Errors/AppError.js';
import StateError from '../../source/Errors/StateError.js';
import _ from 'lodash';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export enum CharacterStateCode {
    // Free = 'Free',
    Dead = 'Dead',
    InActivity = 'InActivity',
}

/**
 * @tmp
 * todo: Логика может быть как у TakeComponent с аналогом владельца.
 */
export default class CharacterStateController {
    private readonly _codes: string[];

    constructor() {
        this._codes = [];
    }

    addState(code: string) {
        if (!code) {
            return false;
        }

        if (!_.includes(this._codes, code)) {
            this._codes.push(code);
            debug(DebugNamespaceID.Log)('Добавлено состояние: ' + code);
        }
    }

    removeState(code: string) {
        let prevLength = this._codes.length;
        let codes = _.pull(this._codes, code);
        if (prevLength !== this._codes.length) {
            debug(DebugNamespaceID.Log)('Удалено состояние: ' + code);
        }
    }

    hasState(code: string | string[]): boolean {
        if (!code) {
            return false;
        }

        if (typeof code === 'string') {
            code = [code];
        }

        for (let i = 0; i < this._codes.length; i++) {
            if (_.indexOf(code, this._codes[i]) !== -1) {
                return true;
            }
        }

        return false;
    }
}