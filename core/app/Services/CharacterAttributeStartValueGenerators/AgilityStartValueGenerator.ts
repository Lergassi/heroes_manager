import CharacterAttribute from '../../Components/CharacterAttribute.js';
import {unsigned} from '../../types.js';
import ItemCharacterAttributeCollector from '../../Components/ItemCharacterAttributeCollector.js';
import DefaultCharacterAttributeStartValueGenerator from './DefaultCharacterAttributeStartValueGenerator.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';
import CharacterAttributeStartValueGeneratorInterface from '../../Interfaces/CharacterAttributeStartValueGeneratorInterface.js';
import {assertIsGreaterThanOrEqual} from '../../../source/assert.js';

export default class AgilityStartValueGenerator implements CharacterAttributeStartValueGeneratorInterface {
    generate(modifier?: (value: number) => number): number {
        let value = _.random(6, 9);

        return modifier ? modifier(value) : value;
    }

    // increaseValue(level: unsigned, modifier?: (value: number) => number) {
    //     let value = _.random(2, 4) * level;
    //
    //     return modifier ? modifier(value) : value;
    // }
}