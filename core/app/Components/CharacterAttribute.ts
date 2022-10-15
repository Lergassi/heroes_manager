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
// export default class CharacterAttributeComponent extends Component implements CharacterAttributeInterface {
export default class CharacterAttribute {
    private readonly _characterAttributeID: CharacterAttributeID;    //todo: Убрать. Сделать с доступом по индексу. Во всех подобных местах.
    /**
     * Показатель, который всегда будет у героя без какой либо экипировки. С ростом уровня увеличивается именно этот показатель. Уменьшить нельзя.
     * @private
     */
    private _value: number;
    private readonly _itemCharacterAttributeCollector: ItemCharacterAttributeCollector;
    private readonly _characterAttributeCollector: CharacterAttributeCollector;

    constructor(options: {
        characterAttributeID: CharacterAttributeID, //todo: Или string? Или сущность? Или убрать? Но тогда collector не будет работать. В декоратор.
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,
        // characterAttributeCollector: CharacterAttributeCollector,
    }) {
        // super();
        this._characterAttributeID = options.characterAttributeID;
        this._value = 0;
        this._itemCharacterAttributeCollector = options.itemCharacterAttributeCollector;
        // this._characterAttributeCollector = options.characterAttributeCollector;

        // this._characterAttributeCollector.add({
        //     ID: this._characterAttributeID,
        //     value: this.value(),
        // });
    }

    // finalValue(): number {
    //     // return this._value + this._itemAttributeCollectorComponent.increaseCharacterAttribute(this._characterAttributeID);
    //     return this._value;
    // }

    add(value: unsigned): void {
        this._value += value;
        // this._characterAttributeCollector.add({
        //     ID: this._characterAttributeID,
        //     value: value,
        // });
    }

    // increase(target/*: CharacterAttributeCollector */) {
    //     target['increase'](this._characterAttributeID, this._value);
    // }
    //
    // decrease(target/*: CharacterAttributeCollector */) {
    //     target['decrease'](this._characterAttributeID, this._value);
    // }

    value(): number {
        return this._value +
            this._itemCharacterAttributeCollector.value(this._characterAttributeID)
            ;
    }
}