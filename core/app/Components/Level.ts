import _ from 'lodash';
import debug from 'debug';
import {assertIsGreaterThanOrEqual} from '../../source/assert.js';
import LevelInterface, {LevelInterfaceRender} from '../Interfaces/LevelInterface.js';

export default class Level implements LevelInterface {
    private readonly _level: number;

    get level(): number {
        return this._level;
    }

    constructor(level: number) {
        assertIsGreaterThanOrEqual(level, 1);

        this._level = level;
    }

    renderByRequest(ui: LevelInterfaceRender): void {
        ui.updateLevel(this._level);
    }
}