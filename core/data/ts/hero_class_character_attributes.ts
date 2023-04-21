import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';

type TSDB_CharacterAttributeRatio = {
    [ID in HeroClassID]?: { [ID in CharacterAttributeID]?: number };
};

let character_attribute_ratios_data: TSDB_CharacterAttributeRatio = {
    [HeroClassID.Tank1]: {[CharacterAttributeID.MaxHealthPoints]: 1.5, [CharacterAttributeID.AttackPower]: 0.8},
    [HeroClassID.Warrior]: {[CharacterAttributeID.MaxHealthPoints]: 1.5, [CharacterAttributeID.AttackPower]: 0.8},
    [HeroClassID.Paladin]: {[CharacterAttributeID.MaxHealthPoints]: 1.5, [CharacterAttributeID.AttackPower]: 0.8},
    [HeroClassID.Tank2]: {[CharacterAttributeID.MaxHealthPoints]: 1.5, [CharacterAttributeID.AttackPower]: 0.8},
    [HeroClassID.Tank3]: {[CharacterAttributeID.MaxHealthPoints]: 1.5, [CharacterAttributeID.AttackPower]: 0.8},

    [HeroClassID.Gladiator]: {[CharacterAttributeID.MaxHealthPoints]: 1, [CharacterAttributeID.AttackPower]: 1},
    [HeroClassID.Barbarian]: {[CharacterAttributeID.MaxHealthPoints]: 1, [CharacterAttributeID.AttackPower]: 1},
    [HeroClassID.PlateDamageDealer1]: {
        [CharacterAttributeID.MaxHealthPoints]: 1,
        [CharacterAttributeID.AttackPower]: 1
    },
    [HeroClassID.PlateDamageDealer2]: {
        [CharacterAttributeID.MaxHealthPoints]: 1,
        [CharacterAttributeID.AttackPower]: 1
    },
    [HeroClassID.PlateDamageDealer3]: {
        [CharacterAttributeID.MaxHealthPoints]: 1,
        [CharacterAttributeID.AttackPower]: 1
    },

    [HeroClassID.LeatherDamageDealer1]: {
        [CharacterAttributeID.MaxHealthPoints]: 0.7,
        [CharacterAttributeID.AttackPower]: 1.4
    },
    [HeroClassID.Rogue]: {[CharacterAttributeID.MaxHealthPoints]: 0.7, [CharacterAttributeID.AttackPower]: 1.4},
    [HeroClassID.Archer]: {[CharacterAttributeID.MaxHealthPoints]: 0.7, [CharacterAttributeID.AttackPower]: 1.4},
    [HeroClassID.LeatherDamageDealer2]: {
        [CharacterAttributeID.MaxHealthPoints]: 0.7,
        [CharacterAttributeID.AttackPower]: 1.4
    },
    [HeroClassID.Gunslinger]: {[CharacterAttributeID.MaxHealthPoints]: 0.7, [CharacterAttributeID.AttackPower]: 1.4},

    [HeroClassID.Necromancer]: {[CharacterAttributeID.MaxHealthPoints]: 0.6, [CharacterAttributeID.AttackPower]: 1.4},
    [HeroClassID.Mage1]: {[CharacterAttributeID.MaxHealthPoints]: 0.6, [CharacterAttributeID.AttackPower]: 1.4},
    [HeroClassID.Mage2]: {[CharacterAttributeID.MaxHealthPoints]: 0.6, [CharacterAttributeID.AttackPower]: 1.4},
    [HeroClassID.Warlock]: {[CharacterAttributeID.MaxHealthPoints]: 0.6, [CharacterAttributeID.AttackPower]: 1.4},
    [HeroClassID.FireMage]: {[CharacterAttributeID.MaxHealthPoints]: 0.6, [CharacterAttributeID.AttackPower]: 1.4},

    [HeroClassID.Support1]: {[CharacterAttributeID.MaxHealthPoints]: 0.8, [CharacterAttributeID.AttackPower]: 0.2},
    [HeroClassID.Support2]: {[CharacterAttributeID.MaxHealthPoints]: 0.8, [CharacterAttributeID.AttackPower]: 0.2},
    [HeroClassID.Support3]: {[CharacterAttributeID.MaxHealthPoints]: 0.8, [CharacterAttributeID.AttackPower]: 0.2},
    [HeroClassID.Support4]: {[CharacterAttributeID.MaxHealthPoints]: 0.8, [CharacterAttributeID.AttackPower]: 0.2},
    [HeroClassID.Support5]: {[CharacterAttributeID.MaxHealthPoints]: 0.8, [CharacterAttributeID.AttackPower]: 0.2},
};

export const hero_class_character_attributes = {
    ratio: function (heroClassID: HeroClassID, characterAttributeID: CharacterAttributeID) {
        return character_attribute_ratios_data[heroClassID]?.[characterAttributeID] ?? 0;
    },
};