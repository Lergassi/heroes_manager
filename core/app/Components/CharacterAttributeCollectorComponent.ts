import {CharacterAttributeID, unsigned} from '../types.js';
import ItemAttributeCollectorComponent from './ItemAttributeCollectorComponent.js';
import _ from 'lodash';

export default class CharacterAttributeCollectorComponent {
    private _characterAttributeValues: Partial<{[ID in CharacterAttributeID]: number}>;
    private _itemAttributeCollectorComponent: ItemAttributeCollectorComponent;

    constructor(options: {
        itemAttributeCollectorComponent: ItemAttributeCollectorComponent,
    }) {
        this._itemAttributeCollectorComponent = options.itemAttributeCollectorComponent;
        this._characterAttributeValues = {};
    }

    add(options: {
        ID: CharacterAttributeID,
        value: unsigned,
    }) {
        if (!this._characterAttributeValues.hasOwnProperty(options.ID)) {
            this._characterAttributeValues[options.ID] = 0;
        }

        this._characterAttributeValues[options.ID] += options.value;
    }

    totalValue(ID: CharacterAttributeID): number {
        return _.sum([
            this._characterAttributeValues[ID] ?? 0,
            this._itemAttributeCollectorComponent.totalValue(ID),
        ]);
    }
}