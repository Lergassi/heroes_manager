import Strength from '../Components/CharacterAttributes/Strength.js';
import StrengthInterface from '../Interfaces/StrengthInterface.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import {unsigned} from '../types.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export default class StrengthItemCollectorDecorator implements StrengthInterface {
    private readonly _strength: StrengthInterface;
    private readonly _itemCollector: ItemCharacterAttributeCollector;

    constructor(options: {
        strength: StrengthInterface,
        itemCollector: ItemCharacterAttributeCollector,
    }) {
        this._strength = options.strength;
        this._itemCollector = options.itemCollector;
    }

    add(value: unsigned): void {
        this._strength.add(value);
    }

    value(): number {
        return this._strength.value() +
            this._itemCollector.value(CharacterAttributeID.Strength)
            ;
    }
}