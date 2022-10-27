import {unsigned} from '../../../types/main.js';
import _ from 'lodash';
import {assertIsGreaterThanOrEqual} from '../../../source/assert.js';
import CharacterAttributeValueGeneratorInterface from '../../Interfaces/CharacterAttributeValueGeneratorInterface.js';

export default class DefaultCharacterAttributeValueGenerator implements CharacterAttributeValueGeneratorInterface{
    /**
     * @param level Со 2ого уровня.
     * @param modifier
     */
    increase(level: unsigned, modifier?: (value: number) => number) {
        assertIsGreaterThanOrEqual(level, 1);

        let startLevelExp = 2;
        if (level <= startLevelExp) {
            return 0;
        }

        let increaseValueForOneLevel = 2;   //100 * 2 = +200

        let value = increaseValueForOneLevel * level;

        return modifier ? modifier(increaseValueForOneLevel) : value;
    }
}