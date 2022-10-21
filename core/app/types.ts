import Item from './Entities/Item.js';
import EnemyEntity from './Entities/EnemyEntity.js';
import EquipSlotComponent from './Components/EquipSlotComponent.js';
import {EquipSlotID} from '../types/enums/EquipSlotID.js';
import {CharacterAttributeID} from '../types/enums/CharacterAttributeID.js';
import CharacterAttribute from './Components/CharacterAttribute.js';
import CharacterAttributeInterface from './Decorators/CharacterAttributeInterface.js';
import {EnemyID} from '../types/enums/EnemyID.js';

export type integer = number;
export type unsigned = number;
export type float = number;

export type Milliseconds = number;
export type Minutes = number;
export type Seconds = number;
export type Hours = number;
export type Days = number;

//todo: В будущем должно быть equipSlots или просто slots. Или не будет...
export type EquipSlots = Partial<{[ID in EquipSlotID]: EquipSlotComponent}>;
// export type CharacterAttributes = Partial<{[id in CharacterAttributeID]: CharacterAttribute}>;
export type CharacterAttributes = Partial<{[ID in CharacterAttributeID]: CharacterAttributeInterface}>;

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
    [alias: string]: EnemyEntity;
}

export type EnemyTypeRecord = Record<string, EnemyEntity>;

export type EnemyConfig = {
    enemyID: EnemyID,
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

// export type EnemyConfigRecord = Record<string, EnemyConfig>;
export type EnemyConfigRecord = Record<EnemyID, EnemyConfig>;

export enum ItemAlias {
    Wood = 'Wood',
    IronOre = 'IronOre',
}

export enum EntityManagerKey {
    // EnemyType = 'EnemyType',
    EnemyConfig = 'EnemyConfig',
}

//ID = ID CurrencyAlias todo: Теги тоже в переменные?
export enum CurrencyWalletAlias {
    Gold = 'Wallet.Gold',
    ResearchPoints = 'Wallet.ResearchPoints',
}