import CharacterAttributeStartValueGeneratorInterface from '../../Interfaces/CharacterAttributeStartValueGeneratorInterface.js';
import {unsigned} from '../../../types/main.js';
import {assertIsGreaterThanOrEqual} from '../../../source/assert.js';
import Random from '../Random.js';
import _ from 'lodash';

export default class MaxMagicPointsStartValueGenerator implements CharacterAttributeStartValueGeneratorInterface {
    generate(modifier?:(value: number) => number): number {
        let value = 100;

        return modifier ? modifier(value) : value;
    }
}