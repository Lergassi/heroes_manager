import {unsigned} from '../types/main.js';

export default class _LevelRange {
    private readonly _min: unsigned;
    private readonly _max: unsigned;

    constructor(min: unsigned, max: unsigned) {
        this._min = min;
        this._max = max;
        //todo: validate
    }

    lessMin(level: unsigned, options: Readonly<{
        strong?: boolean;
    }> = {}) {
        if (options.strong) {
            return level < this._min;
        } else {
            return level <= this._min;
        }
    }

    moreMin(level: unsigned, options: Readonly<{
        strong?: boolean;
    }> = {}) {
        if (options.strong) {
            return level > this._min;
        } else {
            return level >= this._min;
        }
    }

    lessMax(level: unsigned, options: Readonly<{
        strong?: boolean;
    }> = {}) {
        if (options.strong) {
            return level < this._max;
        } else {
            return level <= this._max;
        }
    }

    moreMax(level: unsigned, options: Readonly<{
        strong?: boolean;
    }> = {}) {
        if (options.strong) {
            return level > this._max;
        } else {
            return level >= this._max;
        }
    }

    // inRange(level: unsigned, options: Readonly<{
    //     strongLeft?: boolean;
    //     strongRight?: boolean;
    // }> = {}) {
    //
    // }

    render(callback: (values: Readonly<{
        min: unsigned,
        max: unsigned,
    }>) => void) {
        callback({
            min: this._min,
            max: this._max,
        });
    }
}