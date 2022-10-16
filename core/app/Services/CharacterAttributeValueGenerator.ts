import {unsigned} from '../types.js';
import _ from 'lodash';
import StrengthValueGenerator from './CharacterAttributeComponentFactories/StrengthValueGenerator.js';
import AgilityValueGenerator from './CharacterAttributeComponentFactories/AgilityValueGenerator.js';
import IntelligenceValueGenerator from './CharacterAttributeComponentFactories/IntelligenceValueGenerator.js';
import AttackPowerValueGenerator from './CharacterAttributeComponentFactories/AttackPowerValueGenerator.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export default class CharacterAttributeValueGenerator {
    private _characterAttributeValueGenerators = {
        [CharacterAttributeID.Strength]: new StrengthValueGenerator(),
        [CharacterAttributeID.Agility]: new AgilityValueGenerator(),
        [CharacterAttributeID.Intelligence]: new IntelligenceValueGenerator(),
        [CharacterAttributeID.AttackPower]: new AttackPowerValueGenerator(),
    };

    generate(options: {
        characterAttributeID: CharacterAttributeID;
        level: unsigned;
        modifier?;
    }): number {
        let value = this._characterAttributeValueGenerators[options.characterAttributeID]?.generate({
            level: options.level,
        }) ?? 0;

        return options.modifier?.modify(value) ?? value;
    }
}