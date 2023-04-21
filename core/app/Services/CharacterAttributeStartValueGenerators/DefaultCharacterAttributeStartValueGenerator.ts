import CharacterAttributeStartValueGeneratorInterface
    from '../../Interfaces/CharacterAttributeStartValueGeneratorInterface.js';

export default class DefaultCharacterAttributeStartValueGenerator implements CharacterAttributeStartValueGeneratorInterface {
    generate(modifier?: (value: number) => number): number {
        return 0;
    }
}