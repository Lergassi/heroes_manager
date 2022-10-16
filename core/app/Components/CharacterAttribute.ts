import Component from '../../source/Component.js';
import {unsigned} from '../types.js';
import ItemCharacterAttributeCollector from './ItemCharacterAttributeCollector.js';
import CharacterAttributeCollector from './CharacterAttributeCollector.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeComponentInterface from '../Interfaces/CharacterAttributeComponentInterface.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';

/**
 * Все значения в игре представлены в виде одного значения. Далее уже они используюся для вычисления других значений, например сила атаки это число, которое по своей логике преобразуется в диапазон.
 */
export default class CharacterAttribute implements CharacterAttributeInterface {
    private readonly _characterAttributeID: CharacterAttributeID;    //todo: Убрать. Сделать с доступом по индексу. Во всех подобных местах.
    private _baseValue: number;
    private readonly _itemCharacterAttributeCollector: ItemCharacterAttributeCollector;
    private readonly _characterAttributeCollector: CharacterAttributeCollector;

    constructor(options: {
        characterAttributeID: CharacterAttributeID, //todo: Или string? Или сущность? Или убрать? Но тогда collector не будет работать. В декоратор.
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,
        // characterAttributeCollector: CharacterAttributeCollector,
    }) {
        // super();
        this._characterAttributeID = options.characterAttributeID;
        this._baseValue = 0;
        this._itemCharacterAttributeCollector = options.itemCharacterAttributeCollector;
        // this._characterAttributeCollector = options.characterAttributeCollector;

        // this._characterAttributeCollector.add({
        //     ID: this._characterAttributeID,
        //     value: this.value(),
        // });
    }

    // finalValue(): number {
    //     // return this._baseValue + this._itemAttributeCollectorComponent.increaseCharacterAttribute(this._characterAttributeID);
    //     return this._baseValue;
    // }

    increaseBaseValue(value: unsigned): void {
        this._baseValue += value;
        // this._characterAttributeCollector.add({
        //     ID: this._characterAttributeID,
        //     value: value,
        // });
        // this['_collector'].add(this._characterAttributeID, value);
    }

    // increase(target/*: CharacterAttributeCollector */) {
    //     target['increase'](this._characterAttributeID, this._baseValue);
    // }
    //
    // decrease(target/*: CharacterAttributeCollector */) {
    //     target['decrease'](this._characterAttributeID, this._baseValue);
    // }

    //todo: Пока так. Если будет не удобно - убрать.
    value(): number {
        return this._baseValue +
            this._itemCharacterAttributeCollector.value(this._characterAttributeID)
            ;
    }

    increase(collector /* interface: .add(value); */) {
        collector.add(this._characterAttributeID, this._baseValue);
    }

    decrease(collector /* interface: .remove(value); */) {
        collector.remove(this._characterAttributeID, this._baseValue);
    }
}