import ItemCategory from '../../app/Entities/ItemCategory.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';

type TSDB_ItemsInItemCategory = {
    [ID in ItemCategoryID]?: {
        singleItemName: string;
        equipable: boolean;
        requireArmorMaterial: boolean;
        twoHandWeapon: boolean;
    };
};

let items_by_item_categories_data: TSDB_ItemsInItemCategory = {
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
    items_by_item_category: {
        //todo: Много данных будет сложно так обрабатывать, когда их не будет в бд.
        singleItemName: function (itemCategoryID: ItemCategoryID): string {
            return items_by_item_categories_data[itemCategoryID]?.singleItemName ?? '%SINGLE_NAME%';
        },
        equipable: function (itemCategoryID: ItemCategoryID): boolean {
            return items_by_item_categories_data[itemCategoryID]?.equipable ?? false;
        },
        requireArmorMaterial: function (itemCategoryID: ItemCategoryID): boolean {
            return items_by_item_categories_data[itemCategoryID]?.requireArmorMaterial ?? false;
        },
        twoHandWeapon: function (itemCategoryID: ItemCategoryID): boolean {
            return items_by_item_categories_data[itemCategoryID]?.twoHandWeapon ?? false;
        },
    },
};