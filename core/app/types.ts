import Item from './Entities/Item.js';
import Range from './Range.js';
import EnemyType from './Entities/EnemyType.js';

export type Milliseconds = number;
export type Minutes = number;
export type Seconds = number;
export type Hours = number;
export type Days = number;

export type unsigned = number;

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

export enum ItemCategoryAlias {
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

    Amulets = 'Amulets',
    Rings = 'Rings',
    Trinkets = 'Trinkets',

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

    Resources = 'Resources',
    Materials = 'Materials',
}

export enum EnemyCategoryAlias {
    Beast = 'Beast',
}

export enum EnemyTypeAlias {
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