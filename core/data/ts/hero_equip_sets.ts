import HeroClass from '../../app/Entities/HeroClass.js';
import {ArmorMaterialID} from '../../types/enums/ArmorMaterialID.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import _ from 'lodash';
import {database} from './database.js';

type TSDB_EquipSet = {
    [ID in ItemCategoryID]?: {count: number};
};

// type TSDB_ArmorSet = TSDB_EquipSet;
type TSDB_WeaponSet = {
    [ID in HeroClassID]?: TSDB_EquipSet;
};

let common_armor_equip_set_data: TSDB_EquipSet = {
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

let weapon_sets_data: TSDB_WeaponSet = {
    [HeroClassID.Warrior]: {
        [ItemCategoryID.OneHandedSwords]: {count: 1},
        [ItemCategoryID.Shields]: {count: 1},
    },
    [HeroClassID.Barbarian]: {
        [ItemCategoryID.TwoHandedSwords]: {count: 1},
    },
    [HeroClassID.Rogue]: {
        [ItemCategoryID.Daggers]: {count: 2},
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
    armorSet: function (heroClassID: HeroClassID, callback: (itemCategoryID: ItemCategoryID, count: number) => void): void {
        _.map(common_armor_equip_set_data, (data, itemCategoryID) => {
            callback(itemCategoryID as ItemCategoryID, data.count);
        });
    },
    weaponSet: function (heroClassID: HeroClassID, callback: (itemCategoryID: ItemCategoryID, count: number) => void): void {
        _.map(weapon_sets_data[heroClassID] ?? {}, (data, itemCategoryID) => {
            callback(itemCategoryID as ItemCategoryID, data.count);
        });
    },
    equipSet: function (heroClassID: HeroClassID, callback: (itemCategoryID: ItemCategoryID, count: number) => void) {
        // console.log('this', this);
        // console.log('this.armorSet', this.armorSet);
        // console.log('this.armorSet', this.armorSet);
        // this.hero_equip_sets.armorSet(heroClassID, callback);
        // this.hero_equip_sets.weaponSet(heroClassID, callback);
        //todo: Разобраться с this в таком решении (database.ts). То есть то нету...
        this.armorSet(heroClassID, callback);
        this.weaponSet(heroClassID, callback);
    },
};