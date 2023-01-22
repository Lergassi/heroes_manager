import _ from 'lodash';
import debug from 'debug';
import {assertNotEmpty} from '../../source/assert.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export enum CharacterLifeStateCode {
    Life = 'Life',
    Dead = 'Dead',
}

/**
 * Нужно ли состояние отдельно от очков жизни?
 * todo: Пока на возможность какого либо действия будет отвечать только смерть. Дальше доработать.
 */
export default class LifeStateController {
    private _code: CharacterLifeStateCode;

    constructor() {
        this._code = CharacterLifeStateCode.Life;
    }

    setState(code: CharacterLifeStateCode): void {
        assertNotEmpty(code);

        this._code = code;
    }

    canAction(): boolean {
        if (this._code !== CharacterLifeStateCode.Life) {
            debug(DebugNamespaceID.Throw)('Персонаж мертвый.');

            return false;
        }

        return true;
    }
}