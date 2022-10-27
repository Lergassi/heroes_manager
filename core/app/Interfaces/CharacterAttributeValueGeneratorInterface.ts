import {unsigned} from '../../types/main.js';

export default interface CharacterAttributeValueGeneratorInterface {
    increase(level: unsigned, modifier?: (value: number) => number);
}