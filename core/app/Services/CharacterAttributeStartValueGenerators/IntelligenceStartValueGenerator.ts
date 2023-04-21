import _ from 'lodash';
import CharacterAttributeStartValueGeneratorInterface
    from '../../Interfaces/CharacterAttributeStartValueGeneratorInterface.js';

export default class IntelligenceStartValueGenerator implements CharacterAttributeStartValueGeneratorInterface {
    generate(modifier?: (value: number) => number): number {
        let value = _.random(6, 9);

        return modifier ? modifier(value) : value;
    }
}