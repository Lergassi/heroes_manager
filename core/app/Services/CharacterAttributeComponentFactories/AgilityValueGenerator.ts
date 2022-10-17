import CharacterAttribute from '../../Components/CharacterAttribute.js';
import {unsigned} from '../../types.js';
import ItemCharacterAttributeCollector from '../../Components/ItemCharacterAttributeCollector.js';
import DefaultCharacterAttributeValueGenerator from './DefaultCharacterAttributeValueGenerator.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';
import CharacterAttributeValueGeneratorInterface from '../../Interfaces/CharacterAttributeValueGeneratorInterface.js';
import {assertIsGreaterThanOrEqual} from '../../../source/assert.js';

export default class AgilityValueGenerator implements CharacterAttributeValueGeneratorInterface {
    generate(level: unsigned): number {
        assertIsGreaterThanOrEqual(level, 1);

        return _.random(6, 9) * level;
    }
}