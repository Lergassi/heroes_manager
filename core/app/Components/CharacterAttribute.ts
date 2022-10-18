import Component from '../../source/Component.js';
import {unsigned} from '../types.js';
import ItemCharacterAttributeCollector from './ItemCharacterAttributeCollector.js';
import CharacterAttributeCollector from './CharacterAttributeCollector.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeComponentInterface from '../Interfaces/CharacterAttributeComponentInterface.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import {assert, assertIsNumber, assertNotNil, assertPositive} from '../../source/assert.js';

/**
 * Все значения в игре представлены в виде одного значения. Далее уже они используюся для вычисления других значений, например сила атаки это число, которое по своей логике преобразуется в диапазон.
 */
export default class CharacterAttribute implements CharacterAttributeInterface {
    private readonly _characterAttributeID: CharacterAttributeID;    //todo: Убрать. Сделать с доступом по индексу. Во всех подобных местах.
    private _baseValue: number;
    private readonly _itemCharacterAttributeCollector: ItemCharacterAttributeCollector;

    constructor(
        characterAttributeID: CharacterAttributeID, //todo: Или string? Или сущность? Или убрать? Но тогда collector не будет работать. В декоратор.
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,   //todo: Убрать в декоратор.
        baseValue: number,   //todo: Убрать в декоратор.
    ) {
        assertNotNil(characterAttributeID);
        assertNotNil(itemCharacterAttributeCollector);
        assertIsNumber(baseValue);

        this._characterAttributeID = characterAttributeID;
        this._itemCharacterAttributeCollector = itemCharacterAttributeCollector;
        this._baseValue = baseValue;
    }

    //todo: Не удобно. Не понятно в какой случае настройки нужно делать после создания объекта.
    //todo: Не удобно указывать значения в числах. Приходиться вспоминать какой сейчас множитель и считать сколько надо указать значений.
    increaseBaseValue(value: unsigned): void {
        assertPositive(value);

        this._baseValue += value;
    }

    //todo: Пока так. Если будет не удобно - убрать.
    value(): number {
        return this._baseValue +
            this._itemCharacterAttributeCollector.value(this._characterAttributeID)
            ;
    }
}