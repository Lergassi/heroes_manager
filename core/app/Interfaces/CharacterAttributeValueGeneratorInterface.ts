import {unsigned} from '../types.js';

export default interface CharacterAttributeValueGeneratorInterface {
    generate(level: unsigned): number;
}