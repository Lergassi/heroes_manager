import {CharacterAttributeID} from '../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../types/enums/HeroClassID.js';
import {CurrencyID} from '../types/enums/CurrencyID.js';

export default {
    max_player_level: 100,
    start_hero_values: {
        [HeroClassID.Warrior]: {
            max_level: 100,
            [CharacterAttributeID.MaxHealthPoints]: 120,
            [CharacterAttributeID.MaxMagicPoints]: 100,
            min_attack_power: 30,
            max_attack_power: 40,
            character_attributes: {
                [CharacterAttributeID.Strength]: 10,
                [CharacterAttributeID.Agility]: 5,
                [CharacterAttributeID.Intelligence]: 5,
            }
        },
        [HeroClassID.Paladin]: {
            max_level: 100,
            [CharacterAttributeID.MaxHealthPoints]: 100,
            [CharacterAttributeID.MaxMagicPoints]: 200,
            min_attack_power: 30,
            max_attack_power: 40,
            character_attributes: {
                [CharacterAttributeID.Strength]: 10,
                [CharacterAttributeID.Agility]: 5,
                [CharacterAttributeID.Intelligence]: 10,
            }
        },
        [HeroClassID.Rogue]: {
            max_level: 100,
            [CharacterAttributeID.MaxHealthPoints]: 100,
            [CharacterAttributeID.MaxMagicPoints]: 100,
            min_attack_power: 40,
            max_attack_power: 50,
            character_attributes: {
                [CharacterAttributeID.Strength]: 5,
                [CharacterAttributeID.Agility]: 10,
                [CharacterAttributeID.Intelligence]: 5,
            }
        },
        [HeroClassID.Mage]: {
            max_level: 100,
            [CharacterAttributeID.MaxHealthPoints]: 70,
            [CharacterAttributeID.MaxMagicPoints]: 200,
            magic_points: 100,
            min_attack_power: 60,
            max_attack_power: 70,
            character_attributes: {
                [CharacterAttributeID.Strength]: 5,
                [CharacterAttributeID.Agility]: 5,
                [CharacterAttributeID.Intelligence]: 12,
            }
        },
        [HeroClassID.Gunslinger]: {
            max_level: 100,
            [CharacterAttributeID.MaxHealthPoints]: 80,
            [CharacterAttributeID.MaxMagicPoints]: 130,
            min_attack_power: 50,
            max_attack_power: 60,
            character_attributes: {
                [CharacterAttributeID.Strength]: 4,
                [CharacterAttributeID.Agility]: 10,
                [CharacterAttributeID.Intelligence]: 7,
            }
        },
    },
    start_wallet_values: {
        [CurrencyID.Gold]: {
            value: 1000
        },
        [CurrencyID.ResearchPoints]: {
            value: 10
        }
    }
};