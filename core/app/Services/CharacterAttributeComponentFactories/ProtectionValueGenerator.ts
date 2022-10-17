import {unsigned} from '../../types.js';
import _ from 'lodash';
import {assertIsGreaterThan, assertIsGreaterThanOrEqual, assertPositive} from '../../../source/assert.js';
import CharacterAttributeValueGeneratorInterface from '../../Interfaces/CharacterAttributeValueGeneratorInterface.js';

export default class ProtectionValueGenerator implements CharacterAttributeValueGeneratorInterface {
    generate(level: unsigned): number {
        assertIsGreaterThanOrEqual(level, 1);

        return _.random(10, 20) * level;
    }
}