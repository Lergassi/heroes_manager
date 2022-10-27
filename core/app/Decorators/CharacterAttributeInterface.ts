import {unsigned} from '../../types/main.js';

export default interface CharacterAttributeInterface {
    /**
     * Значение, которое есть у игрока всегда без экипировки и усилений.
     * @param value
     */
    increaseBaseValue(value: unsigned): void;   //todo: Возможно стоит оставить только value(), а increaseBaseValue только там где хранится атрибут.
    value(): number;
}