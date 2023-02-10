import HeroClass from '../../app/Entities/HeroClass.js';
import {ArmorMaterialID} from '../../types/enums/ArmorMaterialID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import _ from 'lodash';
import {database} from './database.js';

let armorEquipSet = {
    [ItemCategoryID.Helmets]: {count: 1},
    [ItemCategoryID.ShoulderPads]: {count: 1},
    [ItemCategoryID.Breastplates]: {count: 1},
    [ItemCategoryID.Bracers]: {count: 1},
    [ItemCategoryID.Gloves]: {count: 1},
    [ItemCategoryID.Belts]: {count: 1},
    [ItemCategoryID.Pants]: {count: 1},
    [ItemCategoryID.Boots]: {count: 1},
    [ItemCategoryID.Amulets]: {count: 1},
    [ItemCategoryID.Rings]: {count: 2},
};

let equipSetsData = {
    [HeroClassID.Warrior]: {
        [ItemCategoryID.Helmets]: {count: 1},
        [ItemCategoryID.ShoulderPads]: {count: 1},
        [ItemCategoryID.Breastplates]: {count: 1},
        [ItemCategoryID.Bracers]: {count: 1},
        [ItemCategoryID.Gloves]: {count: 1},
        [ItemCategoryID.Belts]: {count: 1},
        [ItemCategoryID.Pants]: {count: 1},
        [ItemCategoryID.Boots]: {count: 1},
        [ItemCategoryID.Amulets]: {count: 1},
        [ItemCategoryID.Rings]: {count: 2},
        [ItemCategoryID.OneHandedSwords]: {count: 1},
        [ItemCategoryID.Shields]: {count: 1},
    },
};

let weaponSets = {
    [HeroClassID.Warrior]: {
        [ItemCategoryID.OneHandedSwords]: {count: 1},
        [ItemCategoryID.Shields]: {count: 1},
    },
    [HeroClassID.Rogue]: {
        [ItemCategoryID.Daggers]: {count: 1},
    },
    [HeroClassID.Gunslinger]: {
        [ItemCategoryID.Revolvers]: {count: 2},
    },
    [HeroClassID.FireMage]: {
        [ItemCategoryID.Staffs]: {count: 1},
    },
    [HeroClassID.Support1]: {
        [ItemCategoryID.Staffs]: {count: 1},
    },
};

export const hero_equip_sets = {
    itemCategories: (heroClassID: HeroClassID, callback: (itemCategoryID: ItemCategoryID, count: number) => void): void => {
        _.map(equipSetsData[heroClassID] ?? {}, (data, itemCategoryID) => {
            callback(itemCategoryID as ItemCategoryID, data.count);
        });
    },
    armorSet: (callback: (itemCategoryID: ItemCategoryID, count: number) => void): void => {
        _.map(armorEquipSet, (data, itemCategoryID) => {
            callback(itemCategoryID as ItemCategoryID, data.count);
        });
    },
    weaponSet: (heroClassID: HeroClassID, callback: (itemCategoryID: ItemCategoryID, count: number) => void): void => {
        _.map(weaponSets[heroClassID] ?? {}, (data, itemCategoryID) => {
            callback(itemCategoryID as ItemCategoryID, data.count);
        });
    },
    fullEquipSet: (heroClassID: HeroClassID, callback: (itemCategoryID: ItemCategoryID, count: number) => void) => {
        database.heroes.equip_sets.armorSet(callback);
        database.heroes.equip_sets.weaponSet(heroClassID, callback);
    },
};