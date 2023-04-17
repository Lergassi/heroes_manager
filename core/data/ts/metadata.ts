import ItemCategory from '../../app/Entities/ItemCategory.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import {IconID} from '../../types/enums/IconID.js';

type TSDB_ItemsMetadata = {
    // [ID in ItemCategoryID]?: {
    [id: string]: {
        singleItemName: string;
        equipable: boolean;
        requireArmorMaterial: boolean;
        twoHandWeapon: boolean;
        iconId: string;
    };
};

let items_metadata: TSDB_ItemsMetadata = {
    [ItemCategoryID.Helmets]: {
        singleItemName: 'Helmet',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
        iconId: IconID.Helmet01,
    },
    [ItemCategoryID.ShoulderPads]: {
        singleItemName: 'ShoulderPads',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
        iconId: IconID.ShoulderPads01,
    },
    [ItemCategoryID.Breastplates]: {
        singleItemName: 'Breastplate',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
        iconId: IconID.Breastplate01,
    },
    [ItemCategoryID.Gloves]: {
        singleItemName: 'Gloves',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
        iconId: IconID.Gloves01,
    },
    [ItemCategoryID.Bracers]: {
        singleItemName: 'Bracer',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
        iconId: IconID.Bracer01,
    },
    [ItemCategoryID.Belts]: {
        singleItemName: 'Belt',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
        iconId: IconID.Belt01,
    },
    [ItemCategoryID.Pants]: {
        singleItemName: 'Pants',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
        iconId: IconID.Pants01,
    },
    [ItemCategoryID.Boots]: {
        singleItemName: 'Boots',
        equipable: true,
        requireArmorMaterial: true,
        twoHandWeapon: false,
        iconId: IconID.Boot01,
    },
    [ItemCategoryID.Shields]: {
        singleItemName: 'Shield',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
        iconId: IconID.Shield01,
    },
    [ItemCategoryID.Amulets]: {
        singleItemName: 'Amulet',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
        iconId: IconID.Amulet01,
    },
    [ItemCategoryID.Rings]: {
        singleItemName: 'Ring',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
        iconId: IconID.Ring01,
    },
    [ItemCategoryID.OneHandedSwords]: {
        singleItemName: 'OneHandedSword',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
        iconId: IconID.Sword01,
    },
    [ItemCategoryID.TwoHandedSwords]: {
        singleItemName: 'TwoHandedSword',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: true,
        iconId: IconID.Sword01,
    },
    [ItemCategoryID.OneHandedAxes]: {
        singleItemName: 'OneHandedAxe',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
        iconId: IconID.Sword01,
    },
    [ItemCategoryID.TwoHandedAxes]: {
        singleItemName: 'TwoHandedAxe',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: true,
        iconId: IconID.Sword01,
    },
    [ItemCategoryID.Daggers]: {
        singleItemName: 'Dagger',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
        iconId: IconID.Sword01,
    },
    [ItemCategoryID.Bows]: {
        singleItemName: 'Bow',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: true,
        iconId: IconID.Bow01,
    },
    [ItemCategoryID.Crossbows]: {
        singleItemName: 'Crossbow',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: true,
        iconId: IconID.Question02,
    },
    [ItemCategoryID.Revolvers]: {
        singleItemName: 'Revolver',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
        iconId: IconID.Question02,
    },
    [ItemCategoryID.Staffs]: {
        singleItemName: 'Staff',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: true,
        iconId: IconID.Question02,
    },
    [ItemCategoryID.Wands]: {
        singleItemName: 'Wand',
        equipable: true,
        requireArmorMaterial: false,
        twoHandWeapon: false,
        iconId: IconID.Question02,
    },
};

export const metadata = {
    items: {
        //todo: Много данных будет сложно так обрабатывать, когда их не будет в бд.
        singleItemName: function (itemCategoryID: ItemCategoryID): string {
            return items_metadata[itemCategoryID]?.singleItemName ?? '%SINGLE_NAME%';
        },
        equipable: function (itemCategoryID: ItemCategoryID): boolean {
            return items_metadata[itemCategoryID]?.equipable ?? false;
        },
        requireArmorMaterial: function (itemCategoryID: ItemCategoryID): boolean {
            return items_metadata[itemCategoryID]?.requireArmorMaterial ?? false;
        },
        twoHandWeapon: function (itemCategoryID: ItemCategoryID): boolean {
            return items_metadata[itemCategoryID]?.twoHandWeapon ?? false;
        },
        iconId: function (itemCategoryID: ItemCategoryID): string {
            // return items_metadata[itemCategoryID]?.iconId ?? IconID.Question02;
            return items_metadata[itemCategoryID]?.iconId;
        },
    },
};