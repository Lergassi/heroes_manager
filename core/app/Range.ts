import AppError from '../source/Errors/AppError.js';

export default class Range {
    private readonly _left: number;
    private readonly _right: number;

    constructor(left: number, right: number) {
        this._left = left;
        this._right = right;

        if (this._left > this._right) {
            throw new AppError('Значение left не может быть больше значения right.');
        }
    }

    //
    // inRange(n: number): boolean {
    //     return _.inRange(n, this._left, this._right + 1);
    // }

    multiply(value: number): number[] {
        return [
            this._left * value,
            this._right * value,
        ];
    }
}