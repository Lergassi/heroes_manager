import Component from '../../source/Component.js';
import {unsigned} from '../types.js';
import ItemAttributeCollectorComponent from './ItemAttributeCollectorComponent.js';
import CharacterAttributeRawValueCollectorComponent from './CharacterAttributeRawValueCollectorComponent.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export default class CharacterAttributeComponent extends Component {
    private _characterAttributeID: CharacterAttributeID;    //todo: Убрать. Сделать с доступом по индексу. Во всех подобных местах.
    /**
     * Показатель, который всегда будет у героя без какой либо экипировки. С ростом уровня увеличивается именно этот показатель. Уменьшить нельзя.
     * @private
     */
    private _baseValue: number;
    private _characterAttributeCollectorComponent: CharacterAttributeRawValueCollectorComponent;

    constructor(options: {
        characterAttributeID: CharacterAttributeID, //todo: Или string? Или сущность? Или убрать? Но тогда collector не будет работать. В декоратор.
        characterAttributeCollectorComponent: CharacterAttributeRawValueCollectorComponent,
    }) {
        super();
        this._characterAttributeID = options.characterAttributeID;
        this._baseValue = 0;
        this._characterAttributeCollectorComponent = options.characterAttributeCollectorComponent;

        this._characterAttributeCollectorComponent.add({
            ID: this._characterAttributeID,
            value: this._baseValue,
        });
    }

    // /**
    //  * @deprecated
    //  */
    // finalValue(): number {
    //     // return this._baseValue + this._itemAttributeCollectorComponent.increaseCharacterAttribute(this._characterAttributeID);
    //     return this._baseValue;
    // }

    addBaseValue(value: unsigned): void {
        this._baseValue += value;
        this._characterAttributeCollectorComponent.add({
            ID: this._characterAttributeID,
            value: value,
        });
    }

    // increase(target/*: CharacterAttributeCollector */) {
    //     target['increase'](this._characterAttributeID, this._baseValue);
    // }
    //
    // decrease(target/*: CharacterAttributeCollector */) {
    //     target['decrease'](this._characterAttributeID, this._baseValue);
    // }
}