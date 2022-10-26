import {unsigned} from '../../types/types.js';

export default interface CharacterAttributeStartValueGeneratorInterface {
    generate(modifier?: (value: number) => number): number;
    // increaseValue(level: unsigned, modifier?: (value: number) => number);
}