import _ from 'lodash';

export default class Range {
    private readonly _min: number;
    private readonly _max: number;

    get min(): number {
        return this._min;
    }

    get max(): number {
        return this._max;
    }

    get range(): number[] {
        return [
            this._min,
            this._max,
        ];
    }

    constructor(n: number);
    constructor(range: number[]);
    constructor(min: number, max: number);
    constructor(rangeOrMin: number | number[], max?: number) {
        if (typeof rangeOrMin === 'number') {
            if (typeof max === 'undefined') {
                this._min = rangeOrMin;
                this._max = rangeOrMin;
            } else {
                this._min = rangeOrMin;
                this._max = max;
            }
        } else if (typeof rangeOrMin === 'object') {
            //todo: validate
            this._min = rangeOrMin[0];
            this._max = rangeOrMin[1];
        }
    }

    inRange(n: number): boolean {
        return _.inRange(n, this._min, this._max + 1);
    }
}