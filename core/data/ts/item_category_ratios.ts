import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';

let itemCategoryRatiosData = {
    [ItemCategoryID.Helmets]: {[CharacterAttributeID.HealthPoints]: 0.5, [CharacterAttributeID.AttackPower]: 0.5},
    [ItemCategoryID.ShoulderPads]: {[CharacterAttributeID.HealthPoints]: 0.3, [CharacterAttributeID.AttackPower]: 0.3},
    [ItemCategoryID.Breastplates]: {[CharacterAttributeID.HealthPoints]: 1, [CharacterAttributeID.AttackPower]: 1},
    [ItemCategoryID.Bracers]: {[CharacterAttributeID.HealthPoints]: 0.2, [CharacterAttributeID.AttackPower]: 0.2},
    [ItemCategoryID.Gloves]: {[CharacterAttributeID.HealthPoints]: 0.3, [CharacterAttributeID.AttackPower]: 0.3},
    [ItemCategoryID.Belts]: {[CharacterAttributeID.HealthPoints]: 0.2, [CharacterAttributeID.AttackPower]: 0.2},
    [ItemCategoryID.Pants]: {[CharacterAttributeID.HealthPoints]: 0.6, [CharacterAttributeID.AttackPower]: 0.6},
    [ItemCategoryID.Boots]: {[CharacterAttributeID.HealthPoints]: 0.4, [CharacterAttributeID.AttackPower]: 0.4},
    [ItemCategoryID.Amulets]: {[CharacterAttributeID.HealthPoints]: 0.6, [CharacterAttributeID.AttackPower]: 0.6},
    [ItemCategoryID.Rings]: {[CharacterAttributeID.HealthPoints]: 0.3, [CharacterAttributeID.AttackPower]: 0.3},
    [ItemCategoryID.OneHandedSwords]: {[CharacterAttributeID.HealthPoints]: 0, [CharacterAttributeID.AttackPower]: 2},
    [ItemCategoryID.TwoHandedSwords]: {[CharacterAttributeID.HealthPoints]: 0, [CharacterAttributeID.AttackPower]: 4},
    [ItemCategoryID.Daggers]: {[CharacterAttributeID.HealthPoints]: 0, [CharacterAttributeID.AttackPower]: 4},
    [ItemCategoryID.Shields]: {[CharacterAttributeID.HealthPoints]: 0, [CharacterAttributeID.AttackPower]: 0.2},
};

/**
 * Данные используемые для генерации контента вне игры.
 */
export const item_category_ratios = {
    getRatio: (itemCategoryID: ItemCategoryID, characterAttributeID: CharacterAttributeID): number => {
        return itemCategoryRatiosData[itemCategoryID]?.[characterAttributeID] ?? 0;
    }
};