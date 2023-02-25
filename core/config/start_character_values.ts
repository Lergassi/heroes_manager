import {HeroClassID} from '../types/enums/HeroClassID.js';
import {CharacterAttributeID} from '../types/enums/CharacterAttributeID.js';

export type CharacterAttributeConfig = {[id in CharacterAttributeID]?: number[]};
export type StartCharacterAttributeConfig = {[id in HeroClassID]?: CharacterAttributeConfig};

let defaultValues = {
    [CharacterAttributeID.Strength]: [6, 9],
    [CharacterAttributeID.Protection]: [100, 100],
    [CharacterAttributeID.MaxHealthPoints]: [80, 120],
    [CharacterAttributeID.AttackPower]: [16, 20],
};

export let startCharacterAttributeConfig: StartCharacterAttributeConfig = {
    [HeroClassID.Tank1]: {
        //Слабее атака, но сильнее защите, поэтому дешевле.
        [CharacterAttributeID.Strength]: [9, 12],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [220, 320],
        [CharacterAttributeID.MaxHealthPoints]: [140, 180],
        [CharacterAttributeID.AttackPower]: [12, 16],
    },
    [HeroClassID.Warrior]: {
        [CharacterAttributeID.Strength]: [9, 12],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [200, 300],
        [CharacterAttributeID.MaxHealthPoints]: [220, 280],
        [CharacterAttributeID.AttackPower]: [14, 18],
    },
    //Всё тоже что и за 500, только с увеличенными хп и ап. Атакующие параметры будут стоить дороже защитных.
    [HeroClassID.Tank2]: {
        [CharacterAttributeID.Strength]: [9, 12],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [200, 300],
        [CharacterAttributeID.MaxHealthPoints]: [140, 180],
        [CharacterAttributeID.AttackPower]: [16, 20],
    },
    [HeroClassID.Paladin]: {
        [CharacterAttributeID.Strength]: [8, 10],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [8, 10],
        [CharacterAttributeID.Protection]: [150, 250],
        [CharacterAttributeID.MaxHealthPoints]: [100, 140],
        [CharacterAttributeID.AttackPower]: [10, 14],
    },
    [HeroClassID.Tank3]: {
        [CharacterAttributeID.Strength]: [7, 10],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [10, 13],
        [CharacterAttributeID.Protection]: [130, 230],
        [CharacterAttributeID.MaxHealthPoints]: [90, 130],
        [CharacterAttributeID.AttackPower]: [9, 13],
    },

    //Пока только ап увеличено/уменьшено.
    [HeroClassID.Gladiator]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [100, 100],
        [CharacterAttributeID.MaxHealthPoints]: [80, 120],
        [CharacterAttributeID.AttackPower]: [14, 18],
    },
    [HeroClassID.Barbarian]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [100, 100],
        [CharacterAttributeID.MaxHealthPoints]: [80, 120],
        [CharacterAttributeID.AttackPower]: [16, 20],
    },
    [HeroClassID.PlateDamageDealer1]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [100, 100],
        [CharacterAttributeID.MaxHealthPoints]: [80, 120],
        [CharacterAttributeID.AttackPower]: [18, 22],
    },
    [HeroClassID.PlateDamageDealer2]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [100, 100],
        [CharacterAttributeID.MaxHealthPoints]: [80, 120],
        [CharacterAttributeID.AttackPower]: [14, 18],
    },
    [HeroClassID.PlateDamageDealer3]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [100, 100],
        [CharacterAttributeID.MaxHealthPoints]: [80, 120],
        [CharacterAttributeID.AttackPower]: [16, 20],
    },

    [HeroClassID.LeatherDamageDealer1]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [100, 100],
        [CharacterAttributeID.MaxHealthPoints]: [80, 120],
        [CharacterAttributeID.AttackPower]: [14, 18],
    },
    [HeroClassID.Rogue]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [80, 80],
        [CharacterAttributeID.MaxHealthPoints]: [80, 120],
        [CharacterAttributeID.AttackPower]: [16, 20],
    },
    [HeroClassID.Archer]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [50, 50],
        [CharacterAttributeID.MaxHealthPoints]: [60, 100],
        [CharacterAttributeID.AttackPower]: [18, 22],
    },
    [HeroClassID.LeatherDamageDealer2]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [100, 100],
        [CharacterAttributeID.MaxHealthPoints]: [80, 120],
        [CharacterAttributeID.AttackPower]: [16, 20],
    },
    [HeroClassID.Gunslinger]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [7, 10],
        [CharacterAttributeID.Intelligence]: [7, 10],
        [CharacterAttributeID.Protection]: [50, 50],
        [CharacterAttributeID.MaxHealthPoints]: [60, 100],
        [CharacterAttributeID.AttackPower]: [10, 14],
    },

    [HeroClassID.Necromancer]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [50, 50],
        [CharacterAttributeID.MaxHealthPoints]: [50, 90],
        [CharacterAttributeID.AttackPower]: [14, 18],
    },
    [HeroClassID.Mage1]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [50, 50],
        [CharacterAttributeID.MaxHealthPoints]: [60, 100],
        [CharacterAttributeID.AttackPower]: [16, 20],
    },
    [HeroClassID.Mage2]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [7, 10],
        [CharacterAttributeID.Protection]: [50, 50],
        [CharacterAttributeID.MaxHealthPoints]: [60, 100],
        [CharacterAttributeID.AttackPower]: [18, 22],
    },
    [HeroClassID.Warlock]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [7, 10],
        [CharacterAttributeID.Protection]: [50, 50],
        [CharacterAttributeID.MaxHealthPoints]: [80, 120],
        [CharacterAttributeID.AttackPower]: [18, 22],
    },
    [HeroClassID.FireMage]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [50, 50],
        [CharacterAttributeID.MaxHealthPoints]: [80, 120],
        [CharacterAttributeID.AttackPower]: [20, 24],
    },

    [HeroClassID.Support1]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [100, 100],
        [CharacterAttributeID.MaxHealthPoints]: [80, 120],
        [CharacterAttributeID.AttackPower]: [16, 20],
    },
    [HeroClassID.Support2]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [100, 100],
        [CharacterAttributeID.MaxHealthPoints]: [80, 120],
        [CharacterAttributeID.AttackPower]: [16, 20],
    },
    [HeroClassID.Support3]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [100, 100],
        [CharacterAttributeID.MaxHealthPoints]: [80, 120],
        [CharacterAttributeID.AttackPower]: [16, 20],
    },
    [HeroClassID.Support5]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [100, 100],
        [CharacterAttributeID.MaxHealthPoints]: [80, 120],
        [CharacterAttributeID.AttackPower]: [16, 20],
    },
    [HeroClassID.Support4]: {
        [CharacterAttributeID.Strength]: [6, 9],
        [CharacterAttributeID.Agility]: [6, 9],
        [CharacterAttributeID.Intelligence]: [6, 9],
        [CharacterAttributeID.Protection]: [100, 100],
        [CharacterAttributeID.MaxHealthPoints]: [80, 120],
        [CharacterAttributeID.AttackPower]: [16, 20],
    },
};//end config

// startCharacterAttributeConfig.Druid;