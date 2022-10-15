import {unsigned} from '../types.js';

export default interface CharacterAttributeInterface {
    value(): number;
    add(value: unsigned): void;
}