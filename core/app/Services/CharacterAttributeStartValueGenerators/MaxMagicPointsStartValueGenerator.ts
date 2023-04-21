import CharacterAttributeStartValueGeneratorInterface
    from '../../Interfaces/CharacterAttributeStartValueGeneratorInterface.js';

export default class MaxMagicPointsStartValueGenerator implements CharacterAttributeStartValueGeneratorInterface {
    generate(modifier?: (value: number) => number): number {
        let value = 100;

        return modifier ? modifier(value) : value;
    }
}