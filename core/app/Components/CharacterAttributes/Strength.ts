import {unsigned} from '../../types.js';
import StrengthInterface from '../../Interfaces/StrengthInterface.js';

export default class Strength implements StrengthInterface {
    private _value: number;

    constructor() {
        this._value = 0;
    }

    value(): number {
        return this._value;
    }

    add(value: unsigned): void {
        this._value += value;
    }
}