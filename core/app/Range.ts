import _ from 'lodash';
import AppError from '../source/Errors/AppError.js';

export default class Range {
    private readonly _min: number;
    private readonly _max: number;

    constructor(min: number, max: number) {
        this._min = min;
        this._max = max;

        if (this._min > this._max) {
            throw new AppError('Значение min не может быть больше значения max.');
        }
    }
    //
    // inRange(n: number): boolean {
    //     return _.inRange(n, this._min, this._max + 1);
    // }
}