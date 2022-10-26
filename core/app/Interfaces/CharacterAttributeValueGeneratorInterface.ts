import {unsigned} from '../../types/types.js';

export default interface CharacterAttributeValueGeneratorInterface {
    increase(level: unsigned, modifier?: (value: number) => number);
}