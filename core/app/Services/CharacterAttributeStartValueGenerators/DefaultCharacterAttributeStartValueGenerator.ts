import {unsigned} from '../../../types/types.js';
import ItemCharacterAttributeCollector from '../../Components/ItemCharacterAttributeCollector.js';
import CharacterAttribute from '../../Components/CharacterAttribute.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';
import CharacterAttributeStartValueGeneratorInterface from '../../Interfaces/CharacterAttributeStartValueGeneratorInterface.js';

export default class DefaultCharacterAttributeStartValueGenerator implements CharacterAttributeStartValueGeneratorInterface {
    generate(modifier?:(value: number) => number): number {
        return 0;
    }
}