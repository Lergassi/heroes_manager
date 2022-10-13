import {CharacterAttributeID, unsigned} from '../../types.js';
import ItemAttributeCollectorComponent from '../../Components/ItemAttributeCollectorComponent.js';
import CharacterAttributeComponent from '../../Components/CharacterAttributeComponent.js';
import _ from 'lodash';
import DefaultCharacterAttributeComponentFactory from './DefaultCharacterAttributeComponentFactory.js';

export default class AttackPowerValueGenerator {
    generate(options: {
        level: unsigned;
    }): number {
        return _.random(16, 24) * options.level;
    }
}