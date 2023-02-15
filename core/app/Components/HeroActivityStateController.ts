import {assertNotEmpty, assertNotNil} from '../../source/assert.js';
import AppError from '../../source/Errors/AppError.js';
import StateError from '../../source/Errors/StateError.js';
import _ from 'lodash';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';
import CharacterStateInterface from '../Interfaces/CharacterStateInterface.js';

export enum HeroActivityStateCode {
    Free = 'Free',
    InLocation = 'InLocation',
    InDungeon = 'InDungeon',
    InRaid = 'InRaid',
}

export interface HeroActivityStateControllerRender {
    updateState?(state: string): void;
}

/**
 * @indev
 * Смерть в другом состоянии.
 */
export default class HeroActivityStateController {
    private _code: HeroActivityStateCode;

    constructor() {
        this._code = HeroActivityStateCode.Free;
    }

    setState(code: HeroActivityStateCode): void {
        assertNotNil(code);

        this._code = code;
    }

    isFree(): boolean {
        return this._code === HeroActivityStateCode.Free;
    }

    free(): void {
        this._code = HeroActivityStateCode.Free;
    }

    renderByRequest(ui: HeroActivityStateControllerRender): void {
        ui.updateState?.(this._code);
    }
}