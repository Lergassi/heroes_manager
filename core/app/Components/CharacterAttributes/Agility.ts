import {unsigned} from '../../types.js';
import CharacterAttributeInterface from '../../Decorators/CharacterAttributeInterface.js';

export default class Agility {
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