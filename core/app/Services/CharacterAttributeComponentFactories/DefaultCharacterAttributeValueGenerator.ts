import {unsigned} from '../../types.js';
import ItemCharacterAttributeCollector from '../../Components/ItemCharacterAttributeCollector.js';
import CharacterAttribute from '../../Components/CharacterAttribute.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';
import CharacterAttributeValueGeneratorInterface from '../../Interfaces/CharacterAttributeValueGeneratorInterface.js';

export default class DefaultCharacterAttributeValueGenerator implements CharacterAttributeValueGeneratorInterface {
    generate(level: unsigned): number {
        return 0;
    }
}