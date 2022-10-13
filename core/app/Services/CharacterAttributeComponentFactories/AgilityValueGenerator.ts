import CharacterAttributeComponent from '../../Components/CharacterAttributeComponent.js';
import {unsigned} from '../../types.js';
import ItemAttributeCollectorComponent from '../../Components/ItemAttributeCollectorComponent.js';
import DefaultCharacterAttributeComponentFactory from './DefaultCharacterAttributeComponentFactory.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';

export default class AgilityValueGenerator {
    generate(options: {
        level: unsigned;
    }): number {
        return _.random(6, 9) * options.level;
    }
}