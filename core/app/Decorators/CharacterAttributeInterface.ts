import {unsigned} from '../types.js';

export default interface CharacterAttributeInterface {
    increaseBaseValue(value: unsigned): void;   //todo: Возможно стоит оставить только value(), а increaseBaseValue только там где хранится атрибут.
    value(): number;
}