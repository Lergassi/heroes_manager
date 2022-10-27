import {unsigned} from '../../types/main.js';
import ItemCharacterAttributeCollector from './ItemCharacterAttributeCollector.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export default class CharacterAttributeCollector {
    private readonly _characterAttributeValues: Partial<{[characterAttributeID in CharacterAttributeID]: number}>;

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

    remove(options: {
        ID: CharacterAttributeID,
        value: unsigned,
    }): void {
        if (!this._characterAttributeValues.hasOwnProperty(options.ID)) {
            return;
        }

        this._characterAttributeValues[options.ID] -= options.value;
    }

    value(ID: CharacterAttributeID): number {
        return this._characterAttributeValues[ID] ?? 0;
    }
}