import {unsigned} from '../types.js';
import StrengthStartValueGenerator from './CharacterAttributeStartValueGenerators/StrengthStartValueGenerator.js';
import AgilityStartValueGenerator from './CharacterAttributeStartValueGenerators/AgilityStartValueGenerator.js';
import IntelligenceStartValueGenerator from './CharacterAttributeStartValueGenerators/IntelligenceStartValueGenerator.js';
import AttackPowerStartValueGenerator from './CharacterAttributeStartValueGenerators/AttackPowerStartValueGenerator.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import ProtectionStartValueGenerator from './CharacterAttributeStartValueGenerators/ProtectionStartValueGenerator.js';
import CharacterAttributeStartValueGeneratorInterface from '../Interfaces/CharacterAttributeStartValueGeneratorInterface.js';
import MaxHealthPointsStartValueGenerator from './CharacterAttributeStartValueGenerators/MaxHealthPointsStartValueGenerator.js';
import DefaultCharacterAttributeStartValueGenerator
    from './CharacterAttributeStartValueGenerators/DefaultCharacterAttributeStartValueGenerator.js';
import MaxMagicPointsStartValueGenerator from './CharacterAttributeStartValueGenerators/MaxMagicPointsStartValueGenerator.js';
import CharacterAttributeValueGenerator from './CharacterAttributeValueGenerator.js';
import {assertNotNil} from '../../source/assert.js';

export type CharacterAttributeValueModifier = (value: number) => number;

//todo: !Многие атрибуты должны зависить от класса. У магов, например, минимальное условное значение, разное здоровье и тд. Только не от класса, а скорее от роли. Так как используется и для врагов.
export default class CharacterAttributeStartValueGenerator {
    private _characterAttributeStartValueGenerators: Record<CharacterAttributeID, CharacterAttributeStartValueGeneratorInterface> = {
        [CharacterAttributeID.Strength]: new StrengthStartValueGenerator(),
        [CharacterAttributeID.Agility]: new AgilityStartValueGenerator(),
        [CharacterAttributeID.Intelligence]: new IntelligenceStartValueGenerator(),
        [CharacterAttributeID.MaxHealthPoints]: new MaxHealthPointsStartValueGenerator(),
        [CharacterAttributeID.Protection]: new ProtectionStartValueGenerator(),
        [CharacterAttributeID.Stamina]: new DefaultCharacterAttributeStartValueGenerator(),
        [CharacterAttributeID.MaxMagicPoints]: new MaxMagicPointsStartValueGenerator(),
        [CharacterAttributeID.AttackPower]: new AttackPowerStartValueGenerator(),
        [CharacterAttributeID.AttackSpeed]: new DefaultCharacterAttributeStartValueGenerator(),
        [CharacterAttributeID.CriticalStrike]: new DefaultCharacterAttributeStartValueGenerator(),
        [CharacterAttributeID.Luck]: new DefaultCharacterAttributeStartValueGenerator(),
    };
    private _characterAttributeValueGenerator: CharacterAttributeValueGenerator;

    constructor(
        characterAttributeValueGenerator: CharacterAttributeValueGenerator,
    ) {
        assertNotNil(characterAttributeValueGenerator);

        this._characterAttributeValueGenerator = characterAttributeValueGenerator;
    }

    generate(
        characterAttributeID: CharacterAttributeID,
        level: unsigned,
        baseValueModifier?: CharacterAttributeValueModifier,
    ): number {
        // let value = this._characterAttributeStartValueGenerators.get(characterAttributeID)?.startValue(baseValueModifier) ?? 0;
        //
        // return baseValueModifier ? baseValueModifier(value) : value;
        return (this._characterAttributeStartValueGenerators[characterAttributeID]?.generate(baseValueModifier) ?? 0) +
            this._characterAttributeValueGenerator.increase(characterAttributeID, level)
            ;
    }
}