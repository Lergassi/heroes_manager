import _ from 'lodash';
import ItemCharacterAttributeCollector from './ItemCharacterAttributeCollector.js';
import CharacterAttributeCollector from './CharacterAttributeCollector.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export default class TotalCharacterAttributeValueCollectorComponent {
    private readonly _itemAttributeCollectorComponent: ItemCharacterAttributeCollector;
    private readonly _characterAttributeValueCollectorComponent: CharacterAttributeCollector;

    constructor(options: {
        itemAttributeCollectorComponent: ItemCharacterAttributeCollector,
        characterAttributeValueCollectorComponent: CharacterAttributeCollector,
    }) {
        this._itemAttributeCollectorComponent = options.itemAttributeCollectorComponent;
        this._characterAttributeValueCollectorComponent = options.characterAttributeValueCollectorComponent;
    }

    totalValue(ID: CharacterAttributeID): number {
        return _.sum([
            this._characterAttributeValueCollectorComponent.value(ID),
            this._itemAttributeCollectorComponent.value(ID),
        ]);
    }
}