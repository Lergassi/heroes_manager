import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {ItemAttributeID} from '../../types/enums/ItemAttributeID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';

type TSDB_ItemCategoryRatio = {
    [ID in ItemCategoryID]?: {[ID in CharacterAttributeID]?: number};
};

type TSDB_ItemCategoryRatio_ByItemAttribute = {
    [ID in ItemCategoryID]?: {[ID in ItemAttributeID]?: number};
};

//todo: Атрибуты будут называться по другому. У атрибуты нет MaxHealthPoints и тд.
let item_category_ratios_data: TSDB_ItemCategoryRatio = {
    [ItemCategoryID.Helmets]: {[CharacterAttributeID.MaxHealthPoints]: 0.5, [CharacterAttributeID.AttackPower]: 0.5},
    [ItemCategoryID.ShoulderPads]: {[CharacterAttributeID.MaxHealthPoints]: 0.3, [CharacterAttributeID.AttackPower]: 0.3},
    [ItemCategoryID.Breastplates]: {[CharacterAttributeID.MaxHealthPoints]: 1, [CharacterAttributeID.AttackPower]: 1},
    [ItemCategoryID.Bracers]: {[CharacterAttributeID.MaxHealthPoints]: 0.2, [CharacterAttributeID.AttackPower]: 0.2},
    [ItemCategoryID.Gloves]: {[CharacterAttributeID.MaxHealthPoints]: 0.3, [CharacterAttributeID.AttackPower]: 0.3},
    [ItemCategoryID.Belts]: {[CharacterAttributeID.MaxHealthPoints]: 0.2, [CharacterAttributeID.AttackPower]: 0.2},
    [ItemCategoryID.Pants]: {[CharacterAttributeID.MaxHealthPoints]: 0.6, [CharacterAttributeID.AttackPower]: 0.6},
    [ItemCategoryID.Boots]: {[CharacterAttributeID.MaxHealthPoints]: 0.4, [CharacterAttributeID.AttackPower]: 0.4},

    [ItemCategoryID.Amulets]: {[CharacterAttributeID.MaxHealthPoints]: 0.6, [CharacterAttributeID.AttackPower]: 0.6},
    [ItemCategoryID.Rings]: {[CharacterAttributeID.MaxHealthPoints]: 0.3, [CharacterAttributeID.AttackPower]: 0.3},

    [ItemCategoryID.OneHandedSwords]: {[CharacterAttributeID.MaxHealthPoints]: 0, [CharacterAttributeID.AttackPower]: 2},
    [ItemCategoryID.TwoHandedSwords]: {[CharacterAttributeID.MaxHealthPoints]: 0, [CharacterAttributeID.AttackPower]: 3},
    [ItemCategoryID.Daggers]: {[CharacterAttributeID.MaxHealthPoints]: 0, [CharacterAttributeID.AttackPower]: 2.5},
    [ItemCategoryID.Staffs]: {[CharacterAttributeID.MaxHealthPoints]: 0, [CharacterAttributeID.AttackPower]: 8},
    [ItemCategoryID.Revolvers]: {[CharacterAttributeID.MaxHealthPoints]: 0, [CharacterAttributeID.AttackPower]: 3},

    [ItemCategoryID.Shields]: {[CharacterAttributeID.MaxHealthPoints]: 2, [CharacterAttributeID.AttackPower]: 0.2},
};

let item_category_ratios_data_by_itemAttributeID: TSDB_ItemCategoryRatio_ByItemAttribute = {
    [ItemCategoryID.Helmets]: {[ItemAttributeID.HealthPointsRatio]: 0.5, [ItemAttributeID.AttackPowerRatio]: 0.5, [ItemAttributeID.CraftRatio]: 0.5},
    [ItemCategoryID.ShoulderPads]: {[ItemAttributeID.HealthPointsRatio]: 0.3, [ItemAttributeID.AttackPowerRatio]: 0.3, [ItemAttributeID.CraftRatio]: 0.3},
    [ItemCategoryID.Breastplates]: {[ItemAttributeID.HealthPointsRatio]: 1, [ItemAttributeID.AttackPowerRatio]: 1, [ItemAttributeID.CraftRatio]: 1},
    [ItemCategoryID.Bracers]: {[ItemAttributeID.HealthPointsRatio]: 0.2, [ItemAttributeID.AttackPowerRatio]: 0.2, [ItemAttributeID.CraftRatio]: 0.2},
    [ItemCategoryID.Gloves]: {[ItemAttributeID.HealthPointsRatio]: 0.3, [ItemAttributeID.AttackPowerRatio]: 0.3, [ItemAttributeID.CraftRatio]: 0.3},
    [ItemCategoryID.Belts]: {[ItemAttributeID.HealthPointsRatio]: 0.2, [ItemAttributeID.AttackPowerRatio]: 0.2, [ItemAttributeID.CraftRatio]: 0.2},
    [ItemCategoryID.Pants]: {[ItemAttributeID.HealthPointsRatio]: 0.6, [ItemAttributeID.AttackPowerRatio]: 0.6, [ItemAttributeID.CraftRatio]: 0.6},
    [ItemCategoryID.Boots]: {[ItemAttributeID.HealthPointsRatio]: 0.4, [ItemAttributeID.AttackPowerRatio]: 0.4, [ItemAttributeID.CraftRatio]: 0.4},

    [ItemCategoryID.Amulets]: {[ItemAttributeID.HealthPointsRatio]: 0.6, [ItemAttributeID.AttackPowerRatio]: 0.6, [ItemAttributeID.CraftRatio]: 0.6},
    [ItemCategoryID.Rings]: {[ItemAttributeID.HealthPointsRatio]: 0.3, [ItemAttributeID.AttackPowerRatio]: 0.3, [ItemAttributeID.CraftRatio]: 0.3},

    [ItemCategoryID.OneHandedSwords]: {[ItemAttributeID.HealthPointsRatio]: 0, [ItemAttributeID.AttackPowerRatio]: 2, [ItemAttributeID.CraftRatio]: 2},
    [ItemCategoryID.TwoHandedSwords]: {[ItemAttributeID.HealthPointsRatio]: 0, [ItemAttributeID.AttackPowerRatio]: 3, [ItemAttributeID.CraftRatio]: 3},
    [ItemCategoryID.Daggers]: {[ItemAttributeID.HealthPointsRatio]: 0, [ItemAttributeID.AttackPowerRatio]: 2.5, [ItemAttributeID.CraftRatio]: 2.5},
    [ItemCategoryID.Staffs]: {[ItemAttributeID.HealthPointsRatio]: 0, [ItemAttributeID.AttackPowerRatio]: 8, [ItemAttributeID.CraftRatio]: 8},
    [ItemCategoryID.Revolvers]: {[ItemAttributeID.HealthPointsRatio]: 0, [ItemAttributeID.AttackPowerRatio]: 3, [ItemAttributeID.CraftRatio]: 3},

    [ItemCategoryID.Shields]: {[ItemAttributeID.HealthPointsRatio]: 2, [ItemAttributeID.AttackPowerRatio]: 0.2, [ItemAttributeID.CraftRatio]: 0.2},
};

/**
 * Данные используемые для генерации контента вне игры. После запуска не использовать.
 */
export const item_category_ratios = {
    ratio: function (itemCategoryID: ItemCategoryID, characterAttributeID: CharacterAttributeID): number {
        return item_category_ratios_data[itemCategoryID]?.[characterAttributeID] ?? 0;
    },
    ratioByItemAttribute: function (itemCategoryID: ItemCategoryID, itemAttributeID: ItemAttributeID) {
        return item_category_ratios_data_by_itemAttributeID[itemCategoryID]?.[itemAttributeID] ?? 0;
    },
};