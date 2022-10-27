import {unsigned} from '../../../types/main.js';
import _ from 'lodash';
import {assertIsGreaterThan, assertIsGreaterThanOrEqual, assertIsPositive} from '../../../source/assert.js';
import CharacterAttributeStartValueGeneratorInterface from '../../Interfaces/CharacterAttributeStartValueGeneratorInterface.js';

export default class ProtectionStartValueGenerator implements CharacterAttributeStartValueGeneratorInterface {
    generate(modifier?:(value: number) => number): number {
        let value = _.random(30, 50);

        return modifier ? modifier(value) : value;
    }
}