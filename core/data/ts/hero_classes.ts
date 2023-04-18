import {ArmorMaterialID} from '../../types/enums/ArmorMaterialID.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {HeroRoleID} from '../../types/enums/HeroRoleID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import Icon from '../../app/Entities/Icon.js';
import {IconID} from '../../types/enums/IconID.js';

type TSDB_HeroClass = {
    ID: HeroClassID;
    iconId: string;
    heroRoleID: HeroRoleID;
    armorMaterialIDs: ArmorMaterialID[];
    /**
     * ratio в сумме должно быть 1.
     * todo: Перенести в атрибуты.
     */
    mainCharacterAttributeIDs: {ID: CharacterAttributeID, ratio: number}[];
    //todo: Временно, до переноса логики в слоты.
    rightHandItemCategoryIDs: ItemCategoryID[];
    leftHandItemCategoryIDs: ItemCategoryID[];
}

type TSDB_HeroClassDB = {[ID in HeroClassID]?: TSDB_HeroClass}

let hero_classes_data: TSDB_HeroClassDB = {
    [HeroClassID.Tank1]: {
        ID: HeroClassID.Tank1,
        iconId: IconID.Shield01,
        armorMaterialIDs: [ArmorMaterialID.Plate],
        heroRoleID: HeroRoleID.Tank,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Strength, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs: [ItemCategoryID.Shields]
    },
    [HeroClassID.Warrior]: {
        ID: HeroClassID.Warrior,
        iconId: IconID.Sword01,
        armorMaterialIDs: [ArmorMaterialID.Plate],
        heroRoleID: HeroRoleID.Tank,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Strength, ratio: 1}
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs: [ItemCategoryID.Shields]
    },
    [HeroClassID.Paladin]: {
        ID: HeroClassID.Paladin,
        iconId: IconID.Shield01,
        armorMaterialIDs: [ArmorMaterialID.Plate],
        heroRoleID: HeroRoleID.Tank,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Strength, ratio: 0.5},
            {ID: CharacterAttributeID.Intelligence, ratio: 0.5},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs: [ItemCategoryID.Shields]
    },
    [HeroClassID.Tank2]: {
        ID: HeroClassID.Tank2,
        iconId: IconID.Shield01,
        armorMaterialIDs: [ArmorMaterialID.Plate],
        heroRoleID: HeroRoleID.Tank,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Strength, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs: [ItemCategoryID.Shields]
    },
    [HeroClassID.Tank3]: {
        ID: HeroClassID.Tank3,
        iconId: IconID.Shield01,
        armorMaterialIDs: [ArmorMaterialID.Plate],
        heroRoleID: HeroRoleID.Tank,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Strength, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs: [ItemCategoryID.Shields]
    },
    [HeroClassID.Gladiator]: {
        ID: HeroClassID.Gladiator,
        iconId: IconID.Sword01,
        armorMaterialIDs: [ArmorMaterialID.Plate],
        heroRoleID: HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Strength, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs: [ItemCategoryID.OneHandedSwords]
    },
    [HeroClassID.Barbarian]: {
        ID: HeroClassID.Barbarian,
        iconId: IconID.Sword01,
        armorMaterialIDs: [ArmorMaterialID.Plate],
        heroRoleID: HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Strength, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.TwoHandedSwords],
        leftHandItemCategoryIDs: [],
    },
    [HeroClassID.PlateDamageDealer1]: {
        ID: HeroClassID.PlateDamageDealer1,
        iconId: IconID.Sword01,
        armorMaterialIDs: [ArmorMaterialID.Plate],
        heroRoleID: HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Strength, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.TwoHandedSwords],
        leftHandItemCategoryIDs: [ItemCategoryID.TwoHandedSwords]
    },
    [HeroClassID.PlateDamageDealer2]: {
        ID: HeroClassID.PlateDamageDealer2,
        iconId: IconID.Sword01,
        armorMaterialIDs: [ArmorMaterialID.Plate],
        heroRoleID: HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Strength, ratio: 0.5},
            {ID: CharacterAttributeID.Intelligence, ratio: 0.5},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs: [ItemCategoryID.OneHandedSwords]
    },
    [HeroClassID.PlateDamageDealer3]: {
        ID: HeroClassID.PlateDamageDealer3,
        iconId: IconID.Sword01,
        armorMaterialIDs: [ArmorMaterialID.Plate],
        heroRoleID: HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Strength, ratio: 0.5},
            {ID: CharacterAttributeID.Intelligence, ratio: 0.5},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs: [ItemCategoryID.Shields]
    },
    [HeroClassID.LeatherDamageDealer1]: {
        ID: HeroClassID.LeatherDamageDealer1,
        iconId: IconID.Sword01,
        armorMaterialIDs: [ArmorMaterialID.Leather],
        heroRoleID: HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Agility, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs: [],
    },
    [HeroClassID.Rogue]: {
        ID: HeroClassID.Rogue,
        iconId: IconID.Sword01,
        armorMaterialIDs: [ArmorMaterialID.Leather],
        heroRoleID: HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Agility, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.Daggers],
        leftHandItemCategoryIDs: [ItemCategoryID.Daggers]
    },
    [HeroClassID.Archer]: {
        ID: HeroClassID.Archer,
        iconId: IconID.Bow01,
        armorMaterialIDs: [ArmorMaterialID.Leather],
        heroRoleID: HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Agility, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.Boots],
        leftHandItemCategoryIDs: [],
    },
    [HeroClassID.LeatherDamageDealer2]: {
        ID: HeroClassID.LeatherDamageDealer2,
        iconId: IconID.Sword01,
        armorMaterialIDs: [ArmorMaterialID.Leather],
        heroRoleID: HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Agility, ratio: 0.5},
            {ID: CharacterAttributeID.Intelligence, ratio: 0.5},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.Daggers],
        leftHandItemCategoryIDs: [],
    },
    [HeroClassID.Gunslinger]: {
        ID: HeroClassID.Gunslinger,
        iconId: IconID.Question02,
        armorMaterialIDs: [ArmorMaterialID.Leather],
        heroRoleID: HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Agility, ratio: 0.5},
            {ID: CharacterAttributeID.Intelligence, ratio: 0.5},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.Revolvers],
        leftHandItemCategoryIDs: [ItemCategoryID.Revolvers]
    },
    [HeroClassID.Necromancer]: {
        ID: HeroClassID.Necromancer,
        iconId: IconID.Question02,
        armorMaterialIDs: [ArmorMaterialID.Cloth],
        heroRoleID: HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Intelligence, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs: [],
    },
    [HeroClassID.Mage1]: {
        ID: HeroClassID.Mage1,
        iconId: IconID.Question02,
        armorMaterialIDs: [ArmorMaterialID.Cloth],
        heroRoleID: HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Intelligence, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs: [],
    },
    [HeroClassID.Mage2]: {
        ID: HeroClassID.Mage2,
        iconId: IconID.Question02,
        armorMaterialIDs: [ArmorMaterialID.Cloth],
        heroRoleID: HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Intelligence, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs: [],
    },
    [HeroClassID.Warlock]: {
        ID: HeroClassID.Warlock,
        iconId: IconID.Question02,
        armorMaterialIDs: [ArmorMaterialID.Cloth],
        heroRoleID: HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Intelligence, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs: [],
    },
    [HeroClassID.FireMage]: {
        ID: HeroClassID.FireMage,
        iconId: IconID.Question02,
        armorMaterialIDs: [ArmorMaterialID.Cloth],
        heroRoleID: HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Intelligence, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs: [],
    },
    [HeroClassID.Support1]: {
        ID: HeroClassID.Support1,
        iconId: IconID.Question02,
        armorMaterialIDs: [ArmorMaterialID.Plate],
        heroRoleID: HeroRoleID.Support,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Intelligence, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs: [],
    },
    [HeroClassID.Support2]: {
        ID: HeroClassID.Support2,
        iconId: IconID.Question02,
        armorMaterialIDs: [ArmorMaterialID.Plate],
        heroRoleID: HeroRoleID.Support,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Intelligence, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs: [],
    },
    [HeroClassID.Support3]: {
        ID: HeroClassID.Support3,
        iconId: IconID.Question02,
        armorMaterialIDs: [ArmorMaterialID.Plate],
        heroRoleID: HeroRoleID.Support,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Intelligence, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs: [],
    },
    [HeroClassID.Support4]: {
        ID: HeroClassID.Support4,
        iconId: IconID.Question02,
        armorMaterialIDs: [ArmorMaterialID.Plate],
        heroRoleID: HeroRoleID.Support,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Intelligence, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs: [],
    },
    [HeroClassID.Support5]: {
        ID: HeroClassID.Support5,
        iconId: IconID.Question02,
        armorMaterialIDs: [ArmorMaterialID.Plate],
        heroRoleID: HeroRoleID.Support,
        mainCharacterAttributeIDs: [
            {ID: CharacterAttributeID.Intelligence, ratio: 1},
        ],
        rightHandItemCategoryIDs: [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs: [],
    },
};

export const hero_classes = {
    // armorMaterials: function<T> (ID: HeroClassID, callback: (ID: ArmorMaterialID) => T): T[] {
    //
    find: function (id: string): TSDB_HeroClass {
        return hero_classes_data[id] ?? null;
    },
    armorMaterials: function<T> (ID: HeroClassID, callback: (ID: ArmorMaterialID) => T): T[] {
        return _.map(hero_classes_data[ID]?.armorMaterialIDs ?? [], (value, index, collection) => {
            return callback(value);
        });
    },
    heroRole: function (ID: HeroClassID): HeroRoleID {
        return hero_classes_data[ID]?.heroRoleID;
    },
    mainCharacterAttributes: function<T> (ID: HeroClassID, callback: (ID: CharacterAttributeID, ratio: number) => T): T[] {
        return _.map(hero_classes_data[ID]?.mainCharacterAttributeIDs ?? [], (data) => {
            return callback(data.ID, data.ratio);
        });
    },
    availableWeapons: function<T> (ID: HeroClassID, callback: (ID: ItemCategoryID) => T): T[] {
        return this.rightHandItemCategories(ID, callback);
    },
    /**
     * @deprecated Для совместимости.
     * @param ID
     * @param callback
     */
    rightHandItemCategories: function<T> (ID: HeroClassID, callback: (ID: ItemCategoryID) => T): T[] {
        return _.map(hero_classes_data[ID]?.rightHandItemCategoryIDs ?? [], (value, index, collection) => {
            return callback(value);
        });
    },
    /**
     * @deprecated Для совместимости.
     * @param ID
     * @param callback
     */
    leftHandItemCategories: function<T> (ID: HeroClassID, callback: (ID: ItemCategoryID) => T): T[] {
        return _.map(hero_classes_data[ID]?.leftHandItemCategoryIDs ?? [], (value, index, collection) => {
            return callback(value);
        });
    },
};