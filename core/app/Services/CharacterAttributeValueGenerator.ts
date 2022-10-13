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
    }): number {
        // let value = 0;
        // switch (options.characterAttributeID) {
        //     case CharacterAttributeID.Strength:
        //     case CharacterAttributeID.Agility:
        //     case CharacterAttributeID.Intelligence:
        //         value = _.random(6, 9) * options.level;
        //         break;
        //     case CharacterAttributeID.AttackPower:
        //         value = _.random(16, 24) * options.level;
        //         break;
        //     case CharacterAttributeID.Protection:
        //         value = 10 /* * options.level */;
        //         break;
        //     case CharacterAttributeID.Luck:
        //         value = -10 /*  * options.level */;
        //         break;
        //     //...
        //     default:
        //         break
        // }
        //
        // return value;
        return this._characterAttributeValueGenerators[options.characterAttributeID]?.generate({
            level: options.level,
        }) ?? 0;
    }
}