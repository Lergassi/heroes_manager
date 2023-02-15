import {sprintf} from 'sprintf-js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import _ from 'lodash';
import debug from 'debug';

type TSDB_CharacterAttributeType = {
    [ID in CharacterAttributeID]?: number;
};

// let defaultValues = {
//     [CharacterAttributeID.Strength]: [6, 9],
//     [CharacterAttributeID.Protection]: [100, 100],
//     [CharacterAttributeID.MaxHealthPoints]: [80, 120],
//     [CharacterAttributeID.AttackPower]: [16, 20],
// };

let hero_character_attributes_data: {[ID in HeroClassID]?: TSDB_CharacterAttributeType} = {
    [HeroClassID.Tank1]: {
        //Слабее атака, но сильнее защите, поэтому дешевле.
        [CharacterAttributeID.Strength]: 9,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 220,
        [CharacterAttributeID.MaxHealthPoints]: 140,
        [CharacterAttributeID.AttackPower]: 12,
    },
    [HeroClassID.Warrior]: {
        [CharacterAttributeID.Strength]: 9,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 200,
        [CharacterAttributeID.MaxHealthPoints]: 220,
        [CharacterAttributeID.AttackPower]: 14,
    },
    //Всё тоже что и за 500, только с увеличенными хп и ап. Атакующие параметры будут стоить дороже защитных.
    [HeroClassID.Tank2]: {
        [CharacterAttributeID.Strength]: 9,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 200,
        [CharacterAttributeID.MaxHealthPoints]: 140,
        [CharacterAttributeID.AttackPower]: 16,
    },
    [HeroClassID.Paladin]: {
        [CharacterAttributeID.Strength]: 8,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 8,
        [CharacterAttributeID.Protection]: 150,
        [CharacterAttributeID.MaxHealthPoints]: 100,
        [CharacterAttributeID.AttackPower]: 10,
    },
    [HeroClassID.Tank3]: {
        [CharacterAttributeID.Strength]: 7,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 10,
        [CharacterAttributeID.Protection]: 130,
        [CharacterAttributeID.MaxHealthPoints]: 90,
        [CharacterAttributeID.AttackPower]: 9,
    },

    //Пока только ап увеличено/уменьшено.
    [HeroClassID.Gladiator]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 100,
        [CharacterAttributeID.MaxHealthPoints]: 80,
        [CharacterAttributeID.AttackPower]: 14,
    },
    [HeroClassID.Barbarian]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 100,
        [CharacterAttributeID.MaxHealthPoints]: 80,
        [CharacterAttributeID.AttackPower]: 16,
    },
    [HeroClassID.PlateDamageDealerWithTwoTwoHandedWeapon]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 100,
        [CharacterAttributeID.MaxHealthPoints]: 80,
        [CharacterAttributeID.AttackPower]: 18,
    },
    [HeroClassID.PlateDamageDealer1]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 100,
        [CharacterAttributeID.MaxHealthPoints]: 80,
        [CharacterAttributeID.AttackPower]: 14,
    },
    [HeroClassID.PlateDamageDealer2]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 100,
        [CharacterAttributeID.MaxHealthPoints]: 80,
        [CharacterAttributeID.AttackPower]: 16,
    },

    [HeroClassID.LeatherDamageDealer1]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 100,
        [CharacterAttributeID.MaxHealthPoints]: 80,
        [CharacterAttributeID.AttackPower]: 14,
    },
    [HeroClassID.Rogue]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 80,
        [CharacterAttributeID.MaxHealthPoints]: 80,
        [CharacterAttributeID.AttackPower]: 16,
    },
    [HeroClassID.Archer]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 50,
        [CharacterAttributeID.MaxHealthPoints]: 60,
        [CharacterAttributeID.AttackPower]: 18,
    },
    [HeroClassID.LeatherDamageDealer2]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 100,
        [CharacterAttributeID.MaxHealthPoints]: 80,
        [CharacterAttributeID.AttackPower]: 16,
    },
    [HeroClassID.Gunslinger]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 7,
        [CharacterAttributeID.Intelligence]: 7,
        [CharacterAttributeID.Protection]: 50,
        [CharacterAttributeID.MaxHealthPoints]: 60,
        [CharacterAttributeID.AttackPower]: 10,
    },

    [HeroClassID.Necromancer]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 50,
        [CharacterAttributeID.MaxHealthPoints]: 50,
        [CharacterAttributeID.AttackPower]: 14,
    },
    [HeroClassID.Mage1]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 50,
        [CharacterAttributeID.MaxHealthPoints]: 60,
        [CharacterAttributeID.AttackPower]: 16,
    },
    [HeroClassID.Mage2]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 7,
        [CharacterAttributeID.Protection]: 50,
        [CharacterAttributeID.MaxHealthPoints]: 60,
        [CharacterAttributeID.AttackPower]: 18,
    },
    [HeroClassID.Warlock]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 7,
        [CharacterAttributeID.Protection]: 50,
        [CharacterAttributeID.MaxHealthPoints]: 80,
        [CharacterAttributeID.AttackPower]: 18,
    },
    [HeroClassID.FireMage]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 50,
        [CharacterAttributeID.MaxHealthPoints]: 80,
        [CharacterAttributeID.AttackPower]: 20,
    },

    [HeroClassID.Support1]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 100,
        [CharacterAttributeID.MaxHealthPoints]: 80,
        [CharacterAttributeID.AttackPower]: 16,
    },
    [HeroClassID.Support2]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 100,
        [CharacterAttributeID.MaxHealthPoints]: 80,
        [CharacterAttributeID.AttackPower]: 16,
    },
    [HeroClassID.Support3]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 100,
        [CharacterAttributeID.MaxHealthPoints]: 80,
        [CharacterAttributeID.AttackPower]: 16,
    },
    [HeroClassID.Druid]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 100,
        [CharacterAttributeID.MaxHealthPoints]: 80,
        [CharacterAttributeID.AttackPower]: 16,
    },
    [HeroClassID.Priest]: {
        [CharacterAttributeID.Strength]: 6,
        [CharacterAttributeID.Agility]: 6,
        [CharacterAttributeID.Intelligence]: 6,
        [CharacterAttributeID.Protection]: 100,
        [CharacterAttributeID.MaxHealthPoints]: 80,
        [CharacterAttributeID.AttackPower]: 16,
    },
};

function check(heroClassID: HeroClassID, characterAttributeID: CharacterAttributeID): void {
    if (_.isNil(hero_character_attributes_data[heroClassID]?.[characterAttributeID])) {
        debug(DebugNamespaceID.Replace)(sprintf('Данные для %s: %s не найдены и будут заменены нулевыми значениями.', heroClassID, characterAttributeID));
    }
}

export const hero_character_attributes = {
    startValue: function (heroClassID: HeroClassID, characterAttributeID: CharacterAttributeID): number {
        check(heroClassID, characterAttributeID);

        return hero_character_attributes_data[heroClassID]?.[characterAttributeID] ?? 0;
    },
    /**
     * Значение которое прибавляется за 1 уровень к базовому значению героя. Увеличение с ростом уровня высчитывается отдельно.
     * @param heroClassID
     * @param characterAttributeID
     */
    stepForLevel: function (heroClassID: HeroClassID, characterAttributeID: CharacterAttributeID): number {
        check(heroClassID, characterAttributeID);

        return 0;
    },
};