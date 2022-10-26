import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeStartValueGeneratorInterface
    from '../Interfaces/CharacterAttributeStartValueGeneratorInterface.js';
import StrengthStartValueGenerator from './CharacterAttributeStartValueGenerators/StrengthStartValueGenerator.js';
import AgilityStartValueGenerator from './CharacterAttributeStartValueGenerators/AgilityStartValueGenerator.js';
import IntelligenceStartValueGenerator from './CharacterAttributeStartValueGenerators/IntelligenceStartValueGenerator.js';
import MaxHealthPointsStartValueGenerator
    from './CharacterAttributeStartValueGenerators/MaxHealthPointsStartValueGenerator.js';
import ProtectionStartValueGenerator from './CharacterAttributeStartValueGenerators/ProtectionStartValueGenerator.js';
import DefaultCharacterAttributeStartValueGenerator
    from './CharacterAttributeStartValueGenerators/DefaultCharacterAttributeStartValueGenerator.js';
import MaxMagicPointsStartValueGenerator
    from './CharacterAttributeStartValueGenerators/MaxMagicPointsStartValueGenerator.js';
import AttackPowerStartValueGenerator from './CharacterAttributeStartValueGenerators/AttackPowerStartValueGenerator.js';
import DefaultCharacterAttributeValueGenerator
    from './CharacterAttributeValueGenerators/DefaultCharacterAttributeValueGenerator.js';
import {unsigned} from '../../types/types.js';
import {CharacterAttributeValueModifier} from './CharacterAttributeStartValueGenerator.js';
import CharacterAttributeValueGeneratorInterface from '../Interfaces/CharacterAttributeValueGeneratorInterface.js';

//todo: Временно. Переделать когда будет прокачка героев. Далее станет более понятно какой нужен интерфейс у классов отвечающих за генерацию прибавки к атрибутам.
export default class CharacterAttributeValueGenerator {
    private _characterAttributeValueGenerators: Record<CharacterAttributeID, CharacterAttributeValueGeneratorInterface> = {
        [CharacterAttributeID.Strength]: new DefaultCharacterAttributeValueGenerator(),
        [CharacterAttributeID.Agility]: new DefaultCharacterAttributeValueGenerator(),
        [CharacterAttributeID.Intelligence]: new DefaultCharacterAttributeValueGenerator(),
        [CharacterAttributeID.MaxHealthPoints]: new DefaultCharacterAttributeValueGenerator(),
        [CharacterAttributeID.Protection]: new DefaultCharacterAttributeValueGenerator(),
        [CharacterAttributeID.Stamina]: new DefaultCharacterAttributeValueGenerator(),
        [CharacterAttributeID.MaxMagicPoints]: new DefaultCharacterAttributeValueGenerator(),
        [CharacterAttributeID.AttackPower]: new DefaultCharacterAttributeValueGenerator(),
        [CharacterAttributeID.AttackSpeed]: new DefaultCharacterAttributeValueGenerator(),
        [CharacterAttributeID.CriticalStrike]: new DefaultCharacterAttributeValueGenerator(),
        [CharacterAttributeID.Luck]: new DefaultCharacterAttributeValueGenerator(),
    };

    increase(
        characterAttributeID: CharacterAttributeID,
        level: unsigned,
        modifier?: CharacterAttributeValueModifier,
    ): number {
        return this._characterAttributeValueGenerators[characterAttributeID]?.increase(level, modifier) ?? 0;
    }
}