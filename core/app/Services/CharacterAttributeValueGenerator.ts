import {unsigned} from '../types.js';
import StrengthValueGenerator from './CharacterAttributeComponentFactories/StrengthValueGenerator.js';
import AgilityValueGenerator from './CharacterAttributeComponentFactories/AgilityValueGenerator.js';
import IntelligenceValueGenerator from './CharacterAttributeComponentFactories/IntelligenceValueGenerator.js';
import AttackPowerValueGenerator from './CharacterAttributeComponentFactories/AttackPowerValueGenerator.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import ProtectionValueGenerator from './CharacterAttributeComponentFactories/ProtectionValueGenerator.js';
import CharacterAttributeValueGeneratorInterface from '../Interfaces/CharacterAttributeValueGeneratorInterface.js';
import MaxHealthPointsValueGenerator from './CharacterAttributeComponentFactories/MaxHealthPointsValueGenerator.js';
import DefaultCharacterAttributeValueGenerator
    from './CharacterAttributeComponentFactories/DefaultCharacterAttributeValueGenerator.js';

export type BaseValueModifierCallback = (value: number) => number;

//todo: Многие атрибуты должны зависить от класса. У магов, например, минимальное условное значение, разное здоровье и тд.
export default class CharacterAttributeValueGenerator {
    // private _characterAttributeValueGenerators: Partial<{[ID in CharacterAttributeID]: CharacterAttributeValueGeneratorInterface}> = {
    // private _characterAttributeValueGenerators: {[ID in CharacterAttributeID]: CharacterAttributeValueGeneratorInterface} = {
    // private _characterAttributeValueGenerators: Record<CharacterAttributeID, CharacterAttributeValueGeneratorInterface> = {
    private _characterAttributeValueGenerators: Map<CharacterAttributeID, CharacterAttributeValueGeneratorInterface> = new Map([
        [CharacterAttributeID.Strength, new StrengthValueGenerator()],
        [CharacterAttributeID.Agility, new AgilityValueGenerator()],
        [CharacterAttributeID.Intelligence, new IntelligenceValueGenerator()],

        [CharacterAttributeID.MaxHealthPoints, new MaxHealthPointsValueGenerator()],
        [CharacterAttributeID.Protection, new ProtectionValueGenerator()],

        [CharacterAttributeID.Stamina, new DefaultCharacterAttributeValueGenerator()],

        [CharacterAttributeID.MaxMagicPoints, new DefaultCharacterAttributeValueGenerator()],

        [CharacterAttributeID.AttackPower, new AttackPowerValueGenerator()],
        [CharacterAttributeID.AttackSpeed, new DefaultCharacterAttributeValueGenerator()],
        [CharacterAttributeID.CriticalStrike, new DefaultCharacterAttributeValueGenerator()],

        [CharacterAttributeID.Luck, new DefaultCharacterAttributeValueGenerator()],
        //todo: Нет ошибки с дублированием ключа если тип {[ID in CharacterAttributeID]: CharacterAttributeValueGeneratorInterface}.
        // [CharacterAttributeID.Luck, new DefaultCharacterAttributeValueGenerator()],
    ]);

    generate(
        characterAttributeID: CharacterAttributeID,
        level: unsigned,
        baseValueModifierCallback?: BaseValueModifierCallback,
    ): number {
        let value = this._characterAttributeValueGenerators.get(characterAttributeID)?.generate(level) ?? 0;

        return baseValueModifierCallback ? baseValueModifierCallback(value) : value;
    }
}