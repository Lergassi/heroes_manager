import CharacterAttributeComponent from '../../Components/CharacterAttributeComponent.js';
import {CharacterAttributeID, unsigned} from '../../types.js';
import ItemAttributeCollectorComponent from '../../Components/ItemAttributeCollectorComponent.js';
import DefaultCharacterAttributeComponentFactory from './DefaultCharacterAttributeComponentFactory.js';
import _ from 'lodash';

export default class AgilityValueGenerator {
    generate(options: {
        level: unsigned;
    }): number {
        return _.random(6, 9) * options.level;
    }
}