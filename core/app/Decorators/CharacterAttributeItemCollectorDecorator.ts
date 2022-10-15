import CharacterAttributeInterface from './CharacterAttributeInterface.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import {unsigned} from '../types.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export default class CharacterAttributeItemCollectorDecorator implements CharacterAttributeInterface {
    private _characterAttributeID: CharacterAttributeID;
    private _characterAttribute: CharacterAttributeInterface;
    private _itemCollector: ItemCharacterAttributeCollector;

    constructor(options: {
        characterAttributeID: CharacterAttributeID,
        characterAttribute: CharacterAttributeInterface,
        itemCollector: ItemCharacterAttributeCollector,
    }) {
        //todo: assert
        this._characterAttributeID = options.characterAttributeID;
        this._characterAttribute = options.characterAttribute;
        this._itemCollector = options.itemCollector;
    }

    add(value: unsigned): void {
        this._characterAttribute.add(value);
    }

    value(): number {
        return this._characterAttribute.value()
            + this._itemCollector.value(this._characterAttributeID)
            // + 1111
            ;
    }

}