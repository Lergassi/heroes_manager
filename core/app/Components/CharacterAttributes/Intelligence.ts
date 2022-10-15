import {unsigned} from '../../types.js';

export default class Intelligence {
    private _value: number;

    constructor() {
        this._value = 0;
    }

    value(): number {
        return this._value;
    }

    add(value: unsigned) {
        this._value += value;
    }
}