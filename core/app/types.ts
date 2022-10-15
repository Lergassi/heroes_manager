import Item from './Entities/Item.js';
import EnemyType from './Entities/EnemyType.js';
import EquipSlotComponent from './Components/EquipSlotComponent.js';
import {EquipSlotID} from '../types/enums/EquipSlotID.js';

export type unsigned = number;

export type Milliseconds = number;
export type Minutes = number;
export type Seconds = number;
export type Hours = number;
export type Days = number;

//todo: В будущем должно быть equipSlots или просто slots.
export type EquipSlots = Partial<{[ID in EquipSlotID]: EquipSlotComponent}>;

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

//ID = ID CurrencyAlias todo: Теги тоже в переменные?
export enum CurrencyWalletAlias {
    Gold = 'Wallet.Gold',
    ResearchPoints = 'Wallet.ResearchPoints',
}