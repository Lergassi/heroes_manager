import CharacterAttributeComponent from '../../Components/CharacterAttributeComponent.js';
import {CharacterAttributeID, unsigned} from '../../types.js';
import ItemAttributeCollectorComponent from '../../Components/ItemAttributeCollectorComponent.js';
import _ from 'lodash';
import DefaultCharacterAttributeComponentFactory from './DefaultCharacterAttributeComponentFactory.js';

export default class IntelligenceValueGenerator {
    generate(options: {
        level: unsigned;
    }): number {
        return _.random(6, 9) * options.level;
    }
}