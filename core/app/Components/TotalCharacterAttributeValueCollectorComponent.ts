import _ from 'lodash';
import ItemAttributeCollectorComponent from './ItemAttributeCollectorComponent.js';
import CharacterAttributeRawValueCollectorComponent from './CharacterAttributeRawValueCollectorComponent.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export default class TotalCharacterAttributeValueCollectorComponent {
    private readonly _itemAttributeCollectorComponent: ItemAttributeCollectorComponent;
    private readonly _characterAttributeValueCollectorComponent: CharacterAttributeRawValueCollectorComponent;

    constructor(options: {
        itemAttributeCollectorComponent: ItemAttributeCollectorComponent,
        characterAttributeValueCollectorComponent: CharacterAttributeRawValueCollectorComponent,
    }) {
        this._itemAttributeCollectorComponent = options.itemAttributeCollectorComponent;
        this._characterAttributeValueCollectorComponent = options.characterAttributeValueCollectorComponent;
    }

    totalValue(ID: CharacterAttributeID): number {
        return _.sum([
            this._characterAttributeValueCollectorComponent.totalValue(ID),
            this._itemAttributeCollectorComponent.totalValue(ID),
        ]);
    }
}