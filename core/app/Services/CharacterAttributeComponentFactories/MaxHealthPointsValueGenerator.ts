import CharacterAttributeValueGeneratorInterface from '../../Interfaces/CharacterAttributeValueGeneratorInterface.js';
import _ from 'lodash';
import {unsigned} from '../../types.js';
import {assertIsGreaterThanOrEqual} from '../../../source/assert.js';
import Random from '../Random.js';

export default class MaxHealthPointsValueGenerator implements CharacterAttributeValueGeneratorInterface {
    generate(level: unsigned): number {
        assertIsGreaterThanOrEqual(level, 1)

        return Random.one(_.range(80, 121, 10)) * level;
    }
}