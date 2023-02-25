import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {ItemAttributeID} from '../../types/enums/ItemAttributeID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';

type TSDB_ItemCategoryRatio = {
    [ID in ItemCategoryID]?: {[ID in ItemAttributeID]?: number};
};

let item_category_ratios_data: TSDB_ItemCategoryRatio = {
    [ItemCategoryID.Helmets]:           {[ItemAttributeID.HealthPoints]: 0.5,   [ItemAttributeID.AttackPower]: 0.5,     [ItemAttributeID.CraftRatio]:   0.5},
    [ItemCategoryID.ShoulderPads]:      {[ItemAttributeID.HealthPoints]: 0.3,   [ItemAttributeID.AttackPower]: 0.3,     [ItemAttributeID.CraftRatio]:   0.3},
    [ItemCategoryID.Breastplates]:      {[ItemAttributeID.HealthPoints]: 1,     [ItemAttributeID.AttackPower]: 1,       [ItemAttributeID.CraftRatio]:   1},
    [ItemCategoryID.Bracers]:           {[ItemAttributeID.HealthPoints]: 0.2,   [ItemAttributeID.AttackPower]: 0.2,     [ItemAttributeID.CraftRatio]:   0.2},
    [ItemCategoryID.Gloves]:            {[ItemAttributeID.HealthPoints]: 0.3,   [ItemAttributeID.AttackPower]: 0.3,     [ItemAttributeID.CraftRatio]:   0.3},
    [ItemCategoryID.Belts]:             {[ItemAttributeID.HealthPoints]: 0.2,   [ItemAttributeID.AttackPower]: 0.2,     [ItemAttributeID.CraftRatio]:   0.2},
    [ItemCategoryID.Pants]:             {[ItemAttributeID.HealthPoints]: 0.6,   [ItemAttributeID.AttackPower]: 0.6,     [ItemAttributeID.CraftRatio]:   0.6},
    [ItemCategoryID.Boots]:             {[ItemAttributeID.HealthPoints]: 0.4,   [ItemAttributeID.AttackPower]: 0.4,     [ItemAttributeID.CraftRatio]:   0.4},

    [ItemCategoryID.Amulets]:           {[ItemAttributeID.HealthPoints]: 0.6,   [ItemAttributeID.AttackPower]: 0.6,     [ItemAttributeID.CraftRatio]:   0.6},
    [ItemCategoryID.Rings]:             {[ItemAttributeID.HealthPoints]: 0.3,   [ItemAttributeID.AttackPower]: 0.3,     [ItemAttributeID.CraftRatio]:   0.3},

    [ItemCategoryID.OneHandedSwords]:   {[ItemAttributeID.HealthPoints]: 0,     [ItemAttributeID.AttackPower]: 2,       [ItemAttributeID.CraftRatio]:   2},
    [ItemCategoryID.TwoHandedSwords]:   {[ItemAttributeID.HealthPoints]: 0,     [ItemAttributeID.AttackPower]: 3,       [ItemAttributeID.CraftRatio]:   3},
    [ItemCategoryID.Daggers]:           {[ItemAttributeID.HealthPoints]: 0,     [ItemAttributeID.AttackPower]: 2.5,     [ItemAttributeID.CraftRatio]:   2.5},
    [ItemCategoryID.Staffs]:            {[ItemAttributeID.HealthPoints]: 0,     [ItemAttributeID.AttackPower]: 8,       [ItemAttributeID.CraftRatio]:   8},
    [ItemCategoryID.Revolvers]:         {[ItemAttributeID.HealthPoints]: 0,     [ItemAttributeID.AttackPower]: 3,       [ItemAttributeID.CraftRatio]:   3},

    [ItemCategoryID.Shields]:           {[ItemAttributeID.HealthPoints]: 2,     [ItemAttributeID.AttackPower]: 0.2,     [ItemAttributeID.CraftRatio]:   0.2},
};

/**
 * Данные используемые для генерации контента вне игры. После запуска не использовать.
 */
export const item_category_ratios = {
    ratioByItemAttribute: function (itemCategoryID: ItemCategoryID, itemAttributeID: ItemAttributeID) {
        return item_category_ratios_data[itemCategoryID]?.[itemAttributeID] ?? 0;
    },
};