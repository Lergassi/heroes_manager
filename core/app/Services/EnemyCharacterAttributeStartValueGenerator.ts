import {unsigned} from '../../types/main.js';
import CharacterAttributeValueGeneratorInterface from '../Interfaces/CharacterAttributeValueGeneratorInterface.js';
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

/**
 * @deprecated Не актуально.
 */
export default class EnemyCharacterAttributeStartValueGenerator {
    // private readonly _characterAttributeStartValueGenerators: Record<CharacterAttributeID, CharacterAttributeStartValueGeneratorInterface> = {
    private readonly _characterAttributeStartValueGenerators: {[ID in CharacterAttributeID]?: CharacterAttributeStartValueGeneratorInterface} = {
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
    private readonly _characterAttributeValueGenerator: CharacterAttributeValueGenerator;

    constructor(
        characterAttributeValueGenerator: CharacterAttributeValueGenerator,
    ) {
        assertNotNil(characterAttributeValueGenerator);
        this._characterAttributeValueGenerator = characterAttributeValueGenerator;
    }

    generate(
        characterAttributeID: CharacterAttributeID,
        level: unsigned,
    ): number {
        return (this._characterAttributeStartValueGenerators[characterAttributeID]?.generate() ?? 0) +
            this._characterAttributeValueGenerator.increase(characterAttributeID, level)
            ;
    }
}