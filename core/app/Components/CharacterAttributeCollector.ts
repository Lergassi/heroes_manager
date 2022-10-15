import {unsigned} from '../types.js';
import ItemCharacterAttributeCollector from './ItemCharacterAttributeCollector.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export default class CharacterAttributeCollector {
    private readonly _characterAttributeValues: Partial<{[characterAttributeID in CharacterAttributeID]: number}>;
    // private readonly _characterAttributeValues: {[characterAttributeID in CharacterAttributeID]: number};

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

    // addCollector(collector: CharacterAttributeValueCollector): void {
    //     for (const characterAttributeID in collector._characterAttributeValues) {
    //         this.add({
    //             ID: characterAttributeID as CharacterAttributeID,
    //             value: collector.totalValue(characterAttributeID as CharacterAttributeID),
    //         });
    //     }
    // }
    //
    // removeCollector(collector: CharacterAttributeValueCollector): void {
    //     for (const characterAttributeID in collector._characterAttributeValues) {
    //         this.remove({
    //             ID: characterAttributeID as CharacterAttributeID,
    //             value: collector.totalValue(characterAttributeID as CharacterAttributeID),
    //         });
    //     }
    // }

    value(ID: CharacterAttributeID): number {
        return this._characterAttributeValues[ID] ?? 0;
    }
}