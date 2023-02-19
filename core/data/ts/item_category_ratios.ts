import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';

type TSDB_ItemCategoryRatio = {
    [ID in ItemCategoryID]?: {[ID in CharacterAttributeID]?: number};
};

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

/**
 * Данные используемые для генерации контента вне игры. После запуска не использовать.
 */
export const item_category_ratios = {
    ratio: function (itemCategoryID: ItemCategoryID, characterAttributeID: CharacterAttributeID): number {
        return item_category_ratios_data[itemCategoryID]?.[characterAttributeID] ?? 0;
    }
};