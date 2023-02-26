import {ArmorMaterialID} from '../../types/enums/ArmorMaterialID.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {HeroRoleID} from '../../types/enums/HeroRoleID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';

type TSDB_HeroClass = {
    ID: HeroClassID;
    heroRoleID: HeroRoleID;
    armorMaterialIDs: ArmorMaterialID[];
    mainCharacterAttributeIDs: CharacterAttributeID[];
    //todo: Временно, до переноса логики в слоты.
    rightHandItemCategoryIDs: ItemCategoryID[];
    leftHandItemCategoryIDs: ItemCategoryID[];
};

type TSDB_HeroClassDB = {[ID in HeroClassID]?: TSDB_HeroClass};

let a: TSDB_HeroClass = {
    ID  : undefined,
    armorMaterialIDs         : [],
    heroRoleID               : undefined,
    leftHandItemCategoryIDs  : [],
    mainCharacterAttributeIDs: [],
    rightHandItemCategoryIDs : []
};

let hero_classes_data: TSDB_HeroClassDB = {
    [HeroClassID.Tank1]: {
        ID                       : HeroClassID.Tank1,
        armorMaterialIDs         : [ArmorMaterialID.Plate],
        heroRoleID               : HeroRoleID.Tank,
        mainCharacterAttributeIDs: [CharacterAttributeID.Strength],
        rightHandItemCategoryIDs : [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs  : [ItemCategoryID.Shields]
    },
    [HeroClassID.Warrior]: {
        ID                       : HeroClassID.Warrior,
        armorMaterialIDs         : [ArmorMaterialID.Plate],
        heroRoleID               : HeroRoleID.Tank,
        mainCharacterAttributeIDs: [CharacterAttributeID.Strength],
        rightHandItemCategoryIDs : [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs  : [ItemCategoryID.Shields]
    },
    [HeroClassID.Paladin]: {
        ID                       : HeroClassID.Paladin,
        armorMaterialIDs         : [ArmorMaterialID.Plate],
        heroRoleID               : HeroRoleID.Tank,
        mainCharacterAttributeIDs: [CharacterAttributeID.Strength, CharacterAttributeID.Intelligence],
        rightHandItemCategoryIDs : [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs  : [ItemCategoryID.Shields]
    },
    [HeroClassID.Tank2]: {
        ID                       : HeroClassID.Tank2,
        armorMaterialIDs         : [ArmorMaterialID.Plate],
        heroRoleID               : HeroRoleID.Tank,
        mainCharacterAttributeIDs: [CharacterAttributeID.Strength],
        rightHandItemCategoryIDs : [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs  : [ItemCategoryID.Shields]
    },
    [HeroClassID.Tank3]: {
        ID                       : HeroClassID.Tank3,
        armorMaterialIDs         : [ArmorMaterialID.Plate],
        heroRoleID               : HeroRoleID.Tank,
        mainCharacterAttributeIDs: [CharacterAttributeID.Strength],
        rightHandItemCategoryIDs : [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs  : [ItemCategoryID.Shields]
    },
    [HeroClassID.Gladiator]: {
        ID                       : HeroClassID.Gladiator,
        armorMaterialIDs         : [ArmorMaterialID.Plate],
        heroRoleID               : HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [CharacterAttributeID.Strength],
        rightHandItemCategoryIDs : [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs  : [ItemCategoryID.OneHandedSwords]
    },
    [HeroClassID.Barbarian]: {
        ID                       : HeroClassID.Barbarian,
        armorMaterialIDs         : [ArmorMaterialID.Plate],
        heroRoleID               : HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [CharacterAttributeID.Strength],
        rightHandItemCategoryIDs : [ItemCategoryID.TwoHandedSwords],
        leftHandItemCategoryIDs  : []
    },
    [HeroClassID.PlateDamageDealer1]: {
        ID                       : HeroClassID.PlateDamageDealer1,
        armorMaterialIDs         : [ArmorMaterialID.Plate],
        heroRoleID               : HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [CharacterAttributeID.Strength],
        rightHandItemCategoryIDs : [ItemCategoryID.TwoHandedSwords],
        leftHandItemCategoryIDs  : [ItemCategoryID.TwoHandedSwords]
    },
    [HeroClassID.PlateDamageDealer2]: {
        ID                       : HeroClassID.PlateDamageDealer2,
        armorMaterialIDs         : [ArmorMaterialID.Plate],
        heroRoleID               : HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [CharacterAttributeID.Strength, CharacterAttributeID.Intelligence],
        rightHandItemCategoryIDs : [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs  : [ItemCategoryID.OneHandedSwords]
    },
    [HeroClassID.PlateDamageDealer3]: {
        ID                       : HeroClassID.PlateDamageDealer3,
        armorMaterialIDs         : [ArmorMaterialID.Plate],
        heroRoleID               : HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [CharacterAttributeID.Strength, CharacterAttributeID.Intelligence],
        rightHandItemCategoryIDs : [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs  : [ItemCategoryID.Shields]
    },
    [HeroClassID.LeatherDamageDealer1]: {
        ID                       : HeroClassID.LeatherDamageDealer1,
        armorMaterialIDs         : [ArmorMaterialID.Leather],
        heroRoleID               : HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [CharacterAttributeID.Agility],
        rightHandItemCategoryIDs : [ItemCategoryID.OneHandedSwords],
        leftHandItemCategoryIDs  : []
    },
    [HeroClassID.Rogue]: {
        ID                       : HeroClassID.Rogue,
        armorMaterialIDs         : [ArmorMaterialID.Leather],
        heroRoleID               : HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [CharacterAttributeID.Agility],
        rightHandItemCategoryIDs : [ItemCategoryID.Daggers],
        leftHandItemCategoryIDs  : [ItemCategoryID.Daggers]
    },
    [HeroClassID.Archer]: {
        ID                       : HeroClassID.Archer,
        armorMaterialIDs         : [ArmorMaterialID.Leather],
        heroRoleID               : HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [CharacterAttributeID.Agility],
        rightHandItemCategoryIDs : [ItemCategoryID.Boots],
        leftHandItemCategoryIDs  : []
    },
    [HeroClassID.LeatherDamageDealer2]: {
        ID                       : HeroClassID.LeatherDamageDealer2,
        armorMaterialIDs         : [ArmorMaterialID.Leather],
        heroRoleID               : HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [CharacterAttributeID.Agility, CharacterAttributeID.Intelligence],
        rightHandItemCategoryIDs : [ItemCategoryID.Daggers],
        leftHandItemCategoryIDs  : []
    },
    [HeroClassID.Gunslinger]: {
        ID                       : HeroClassID.Gunslinger,
        armorMaterialIDs         : [ArmorMaterialID.Leather],
        heroRoleID               : HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [CharacterAttributeID.Agility, CharacterAttributeID.Intelligence],
        rightHandItemCategoryIDs : [ItemCategoryID.Revolvers],
        leftHandItemCategoryIDs  : [ItemCategoryID.Revolvers]
    },
    [HeroClassID.Necromancer]: {
        ID                       : HeroClassID.Necromancer,
        armorMaterialIDs         : [ArmorMaterialID.Cloth],
        heroRoleID               : HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [CharacterAttributeID.Intelligence],
        rightHandItemCategoryIDs : [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs  : []
    },
    [HeroClassID.Mage1]: {
        ID                       : HeroClassID.Mage1,
        armorMaterialIDs         : [ArmorMaterialID.Cloth],
        heroRoleID               : HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [CharacterAttributeID.Intelligence],
        rightHandItemCategoryIDs : [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs  : []
    },
    [HeroClassID.Mage2]: {
        ID                       : HeroClassID.Mage2,
        armorMaterialIDs         : [ArmorMaterialID.Cloth],
        heroRoleID               : HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [CharacterAttributeID.Intelligence],
        rightHandItemCategoryIDs : [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs  : []
    },
    [HeroClassID.Warlock]: {
        ID                       : HeroClassID.Warlock,
        armorMaterialIDs         : [ArmorMaterialID.Cloth],
        heroRoleID               : HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [CharacterAttributeID.Intelligence],
        rightHandItemCategoryIDs : [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs  : []
    },
    [HeroClassID.FireMage]: {
        ID                       : HeroClassID.FireMage,
        armorMaterialIDs         : [ArmorMaterialID.Cloth],
        heroRoleID               : HeroRoleID.DamageDealer,
        mainCharacterAttributeIDs: [CharacterAttributeID.Intelligence],
        rightHandItemCategoryIDs : [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs  : []
    },
    [HeroClassID.Support1]: {
        ID                       : HeroClassID.Support1,
        armorMaterialIDs         : [ArmorMaterialID.Plate],
        heroRoleID               : HeroRoleID.Support,
        mainCharacterAttributeIDs: [CharacterAttributeID.Intelligence],
        rightHandItemCategoryIDs : [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs  : []
    },
    [HeroClassID.Support2]: {
        ID                       : HeroClassID.Support2,
        armorMaterialIDs         : [ArmorMaterialID.Plate],
        heroRoleID               : HeroRoleID.Support,
        mainCharacterAttributeIDs: [CharacterAttributeID.Intelligence],
        rightHandItemCategoryIDs : [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs  : []
    },
    [HeroClassID.Support3]: {
        ID                       : HeroClassID.Support3,
        armorMaterialIDs         : [ArmorMaterialID.Plate],
        heroRoleID               : HeroRoleID.Support,
        mainCharacterAttributeIDs: [CharacterAttributeID.Intelligence],
        rightHandItemCategoryIDs : [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs  : []
    },
    [HeroClassID.Support4]: {
        ID                       : HeroClassID.Support4,
        armorMaterialIDs         : [ArmorMaterialID.Plate],
        heroRoleID               : HeroRoleID.Support,
        mainCharacterAttributeIDs: [CharacterAttributeID.Intelligence],
        rightHandItemCategoryIDs : [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs  : []
    },
    [HeroClassID.Support5]: {
        ID                       : HeroClassID.Support5,
        armorMaterialIDs         : [ArmorMaterialID.Plate],
        heroRoleID               : HeroRoleID.Support,
        mainCharacterAttributeIDs: [CharacterAttributeID.Intelligence],
        rightHandItemCategoryIDs : [ItemCategoryID.Staffs],
        leftHandItemCategoryIDs  : []
    },
};

export const hero_classes = {
    armorMaterials: function<T> (ID: HeroClassID, callback: (ID: ArmorMaterialID) => T): T[] {
        return _.map(hero_classes_data[ID]?.armorMaterialIDs ?? [], callback);
    },
    heroRole: function (ID: HeroClassID): HeroRoleID {
        return hero_classes_data[ID]?.heroRoleID;
    },
    mainCharacterAttributes: function<T> (ID: HeroClassID, callback: (ID: CharacterAttributeID) => T): T[] {
        return _.map(hero_classes_data[ID]?.mainCharacterAttributeIDs ?? [], callback);
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
        return _.map(hero_classes_data[ID]?.rightHandItemCategoryIDs ?? [], callback);
    },
    /**
     * @deprecated Для совместимости.
     * @param ID
     * @param callback
     */
    leftHandItemCategories: function<T> (ID: HeroClassID, callback: (ID: ItemCategoryID) => T): T[] {
        return _.map(hero_classes_data[ID]?.leftHandItemCategoryIDs ?? [], callback);
    },
};