import ItemCategory from '../../app/Entities/ItemCategory.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';

const itemsInItemCategories = {
    [ItemCategoryID.Helmets]: {
        singleItemName: 'Helmet',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
    },
    [ItemCategoryID.Helmets]: {
        singleItemName: 'Helmet',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
    },
    [ItemCategoryID.ShoulderPads]: {
        singleItemName: 'ShoulderPads',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
    },
    [ItemCategoryID.Breastplates]: {
        singleItemName: 'Breastplate',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
    },
    [ItemCategoryID.Gloves]: {
        singleItemName: 'Gloves',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
    },
    [ItemCategoryID.Bracers]: {
        singleItemName: 'Bracer',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
    },
    [ItemCategoryID.Belts]: {
        singleItemName: 'Belt',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
    },
    [ItemCategoryID.Pants]: {
        singleItemName: 'Pants',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
    },
    [ItemCategoryID.Boots]: {
        singleItemName: 'Boots',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
    },
    [ItemCategoryID.Shields]: {
        singleItemName: 'Shield',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
    },
    [ItemCategoryID.Amulets]: {
        singleItemName: 'Amulet',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
    },
    [ItemCategoryID.Rings]: {
        singleItemName: 'Ring',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
    },
    [ItemCategoryID.OneHandedSwords]: {
        singleItemName: 'OneHandedSword',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
    },
    [ItemCategoryID.TwoHandedSwords]: {
        singleItemName: 'TwoHandedSword',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: true,
    },
    [ItemCategoryID.OneHandedAxes]: {
        singleItemName: 'OneHandedAxe',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
    },
    [ItemCategoryID.TwoHandedAxes]: {
        singleItemName: 'TwoHandedAxe',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: true,
    },
    [ItemCategoryID.Daggers]: {
        singleItemName: 'Dagger',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
    },
    [ItemCategoryID.Bows]: {
        singleItemName: 'Bow',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: true,
    },
    [ItemCategoryID.Crossbows]: {
        singleItemName: 'Crossbow',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: true,
    },
    [ItemCategoryID.Revolvers]: {
        singleItemName: 'Revolver',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
    },
    [ItemCategoryID.Staffs]: {
        singleItemName: 'Staff',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: true,
    },
    [ItemCategoryID.Wands]: {
        singleItemName: 'Wand',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
    },
};

export const metadata = {
    itemsByItemCategory: {
        singleItemName: (itemCategoryID: ItemCategoryID): string => {
            return itemsInItemCategories[itemCategoryID]?.singleItemName ?? '';
        },
        equipable: (itemCategoryID: ItemCategoryID): boolean => {
            return itemsInItemCategories[itemCategoryID]?.equipable ?? false;
        },
        requireArmorMaterial: (itemCategoryID: ItemCategoryID): boolean => {
            return itemsInItemCategories[itemCategoryID]?.requireArmorMaterial ?? false;
        },
        twoHandWeapon: (itemCategoryID: ItemCategoryID): boolean => {
            return itemsInItemCategories[itemCategoryID]?.twoHandWeapon ?? false;
        },
    },
};