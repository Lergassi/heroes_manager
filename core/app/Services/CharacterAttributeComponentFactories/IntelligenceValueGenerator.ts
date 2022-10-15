import CharacterAttribute from '../../Components/CharacterAttribute.js';
import {unsigned} from '../../types.js';
import ItemCharacterAttributeCollector from '../../Components/ItemCharacterAttributeCollector.js';
import _ from 'lodash';
import DefaultCharacterAttributeComponentFactory from './DefaultCharacterAttributeComponentFactory.js';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';

export default class IntelligenceValueGenerator {
    generate(options: {
        level: unsigned;
    }): number {
        return _.random(6, 9) * options.level;
    }
}