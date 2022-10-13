import Component from '../../source/Component.js';
import {CharacterAttributeID, unsigned} from '../types.js';
import ItemAttributeCollectorComponent from './ItemAttributeCollectorComponent.js';
import CharacterAttributeCollectorComponent from './CharacterAttributeCollectorComponent.js';

export default class CharacterAttributeComponent extends Component {
    private _characterAttributeID: CharacterAttributeID;
    /**
     * Показатель, который всегда будет у героя без какой либо экипировки. С ростом уровня увеличивается именно этот показатель. Уменьшить нельзя.
     * @private
     */
    private _baseValue: number;
    private _characterAttributeCollectorComponent: CharacterAttributeCollectorComponent;

    constructor(options: {
        characterAttributeID: CharacterAttributeID, //todo: Или string? Или сущность?
        baseValue: number,
        characterAttributeCollectorComponent: CharacterAttributeCollectorComponent,
    }) {
        super();
        this._characterAttributeID = options.characterAttributeID;
        this._baseValue = options.baseValue;
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

    addBaseValue(value: unsigned) {
        this._baseValue += value;
        this._characterAttributeCollectorComponent.add({
            ID: this._characterAttributeID,
            value: value,
        });
    }
}