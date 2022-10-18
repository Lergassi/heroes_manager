import {unsigned} from '../../types.js';
import ItemCharacterAttributeCollector from '../../Components/ItemCharacterAttributeCollector.js';
import CharacterAttribute from '../../Components/CharacterAttribute.js';
import _ from 'lodash';
import DefaultCharacterAttributeStartValueGenerator from './DefaultCharacterAttributeStartValueGenerator.js';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';
import CharacterAttributeStartValueGeneratorInterface from '../../Interfaces/CharacterAttributeStartValueGeneratorInterface.js';
import {assertIsGreaterThanOrEqual} from '../../../source/assert.js';

export default class AttackPowerStartValueGenerator implements CharacterAttributeStartValueGeneratorInterface {
    generate(modifier?:(value: number) => number): number {
        let value = _.random(16, 24);

        return modifier ? modifier(value) : value;
    }
}