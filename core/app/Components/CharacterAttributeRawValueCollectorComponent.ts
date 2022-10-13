import {unsigned} from '../types.js';
import ItemAttributeCollectorComponent from './ItemAttributeCollectorComponent.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export default class CharacterAttributeRawValueCollectorComponent {
    private readonly _characterAttributeValues: Partial<{[ID in CharacterAttributeID]: number}>;

    constructor() {
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
        return this._characterAttributeValues[ID] ?? 0;
    }
}