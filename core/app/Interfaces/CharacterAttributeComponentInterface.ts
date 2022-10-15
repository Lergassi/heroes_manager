import {unsigned} from '../types.js';

export default interface CharacterAttributeComponentInterface {
    addBaseValue(value: unsigned): void;
    value(): number;
}