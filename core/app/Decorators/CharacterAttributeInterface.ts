import {unsigned} from '../types.js';

export default interface CharacterAttributeInterface {
    increaseBaseValue(value: unsigned): void;
    value(): number;
}