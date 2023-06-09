import CharacterAttributeStartValueGeneratorInterface
    from '../../Interfaces/CharacterAttributeStartValueGeneratorInterface.js';
import _ from 'lodash';
import Random from '../Random.js';

export default class MaxHealthPointsStartValueGenerator implements CharacterAttributeStartValueGeneratorInterface {
    generate(modifier?: (value: number) => number): number {
        let value = Random.one(_.range(80, 121, 10));

        return modifier ? modifier(value) : value;
    }
}