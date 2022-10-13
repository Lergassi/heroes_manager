import Item from './Entities/Item.js';
import EnemyType from './Entities/EnemyType.js';
import EquipSlotComponent from './Components/EquipSlotComponent.js';

export type Milliseconds = number;
export type Minutes = number;
export type Seconds = number;
export type Hours = number;
export type Days = number;

export type unsigned = number;

//todo: item

export enum ItemCategoryID {
    Weapons = 'Weapons',
    OneHandedSwords = 'OneHandedSwords',
    TwoHandedSwords = 'TwoHandedSwords',
    OneHandedAxes = 'OneHandedAxes',
    TwoHandedAxes = 'TwoHandedAxes',
    Daggers = 'Daggers',
    Bows = 'Bows',
    Crossbows = 'Crossbows',
    Revolvers = 'Revolvers',
    Staffs = 'Staffs',
    Wands = 'Wands',

    Armor = 'Armor',
    Helmets = 'Helmets',
    ShoulderPads = 'ShoulderPads',
    Breastplates = 'Breastplates',
    Gloves = 'Gloves',
    Bracers = 'Bracers',
    Belts = 'Belts',
    Pants = 'Pants',
    Boots = 'Boots',

    Shields = 'Shields',

    Amulets = 'Amulets',
    Rings = 'Rings',
    Trinkets = 'Trinkets',

    Resources = 'Resources',
    Materials = 'Materials',
}

export enum CharacterAttributeID {
    Strength = 'Strength',
    Agility = 'Agility',
    Intelligence = 'Intelligence',

    MaxHealthPoints = 'MaxHealthPoints',
    MaxMagicPoints = 'MaxMagicPoints',
    Protection = 'Protection',
    AttackPower = 'AttackPower',
    AttackSpeed = 'AttackSpeed',
    CriticalStrike = 'CriticalStrike',
    Stamina = 'Stamina',
    Luck = 'Luck',
}

export enum HeroRoleID {
    Tank = 'Tank',
    DamageDealer = 'DamageDealer',
    Support = 'Support',
}

export enum HeroClassID {
    Warrior = 'Warrior',
    Paladin = 'Paladin',
    Rogue = 'Rogue',
    Gladiator = 'Gladiator',
    Archer = 'Archer',
    Gunslinger = 'Gunslinger',
    Mage = 'Mage',
    Warlock = 'Warlock',
    Priest = 'Priest',
    Druid = 'Druid',
}

export enum EquipSlotID {
    Head = 'Head',
    Shoulders = 'Shoulders',
    Chest = 'Chest',
    Wrist = 'Wrist',    //запястье
    Hands = 'Hands',
    Waist = 'Waist',    //талия
    Legs = 'Legs',
    Foots = 'Foots',

    RightHand = 'RightHand',
    LeftHand = 'LeftHand',

    Neck = 'Neck',
    Finger_1 = 'Finger_1',
    Finger_2 = 'Finger_2',

    Trinket = 'Trinket',
}

//todo: В будущем должно быть equipSlots или просто slots.
export type EquipSlotComponentsType = Partial<{[ID in EquipSlotID]: EquipSlotComponent}>;

export type ItemCount = {
    item: Item;
    count: unsigned;
}

export type ItemCountRange = {
    item: Item;
    count: unsigned[];
    // count: Range;
}

export type Loot = {
    enemyLevel: unsigned[];
    item: Item;
    count: unsigned[];
    /**
     * Целое число в диапазоне 0-100. Но может быть и больше.
     */
    chance: unsigned;
}

export enum EnemyCategoryAlias {
    Beast = 'Beast',
}

export enum EnemyTypeID {
    Boar = 'Boar',
    Skeleton = 'Skeleton',
    Bear = 'Bear',
    Fox = 'Fox',
    Rabbit = 'Rabbit',
    Deer = 'Deer',
    Wolf = 'Wolf',
}

export type EnemyTypes = {
    [alias: string]: EnemyType;
}

export type EnemyTypeRecord = Record<string, EnemyType>;

export type EnemyConfig = {
    enemy: EnemyType,
    loot: Loot[],
    exp: unsigned,
    gold: unsigned[],
    // attackPowerForFirstLevel: unsigned[],
    // maxHealthPointsForFirstLevel: unsigned,
    // maxMagicPointsForFirstLevel: unsigned,
    // protectionForFirstLevel: unsigned,
    //...
};

export type EnemyConfigs = {
    [alias: string]: EnemyConfig;
};

export type EnemyConfigRecord = Record<string, EnemyConfig>;

export enum ItemAlias {
    Wood = 'Wood',
    IronOre = 'IronOre',
}

export enum EntityManagerKey {
    EnemyType = 'EnemyType',
    EnemyConfig = 'EnemyConfig',
}

/**
 * Также для использования как ID для кошельков.
 */
export enum CurrencyAlias {
    Gold = 'Gold',
    ResearchPoints = 'ResearchPoints',
}

//ID = ID CurrencyAlias todo: Теги тоже в переменные?
export enum CurrencyWalletAlias {
    Gold = 'Wallet.Gold',
    ResearchPoints = 'Wallet.ResearchPoints',
}