import _ from 'lodash';
import CharacterAttributeStartValueGeneratorInterface
    from '../../Interfaces/CharacterAttributeStartValueGeneratorInterface.js';

export default class AttackPowerStartValueGenerator implements CharacterAttributeStartValueGeneratorInterface {
    generate(modifier?: (value: number) => number): number {
        let value = _.random(16, 24);

        return modifier ? modifier(value) : value;
    }
}