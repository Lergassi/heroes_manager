import Item from '../app/Entities/Item.js';
import EnemyEntity from '../app/Entities/EnemyEntity.js';
import {EquipSlotID} from './enums/EquipSlotID.js';
import {CharacterAttributeID} from './enums/CharacterAttributeID.js';
import CharacterAttribute from '../app/Components/CharacterAttribute.js';
import CharacterAttributeInterface from '../app/Decorators/CharacterAttributeInterface.js';
import {EnemyTypeID} from './enums/EnemyTypeID.js';
import {HeroClassID} from './enums/HeroClassID.js';
import {ItemCategoryID} from './enums/ItemCategoryID.js';
import {ItemID} from './enums/ItemID.js';

export type integer = number;
/**
 * @deprecated
 */
export type unsigned = number;
export type float = number;

export type Milliseconds = number;
export type Minutes = number;
export type Seconds = number;
export type Hours = number;
export type Days = number;

export type CharacterAttributes = Partial<{[ID in CharacterAttributeID]: CharacterAttributeInterface}>;

export type RangeType = {
    min: number,
    max: number,
}

export type ItemLoot = {
    ID: ItemID;
    count: RangeType;
    /**
     * Целое число в диапазоне 0-100. Но может быть и больше.
     */
    chance: number;
}

export type ItemCountDBType = {
    ID: ItemID;
    count: number;
}

export type ItemCount = {
    item: Item;
    count: number;
}

export type UI_ItemCount = {
    itemID: ItemID;
    count: number;
}

export type UI_ItemStorage = {
    ID: number;
    slots: UI_ItemStorageSlot[];
}

export type UI_ItemStorageSlot = {
    index: number;
    item: UI_ItemCount;
}

export type UI_VeinItemCount = {
    itemID: ItemID;
    startCount: number;
    count: number;
}

export type UI_ShortHero = {
    ID: string;
    heroClassID: string;
    level: number;
}

//ID = ID CurrencyAlias todo: Теги тоже в переменные?
// export enum CurrencyWalletAlias {
//     Gold = 'Wallet.Gold',
//     ResearchPoints = 'Wallet.ResearchPoints',
// }

export type ItemCategoryPowerRatio = {[ID in ItemCategoryID]?: {ratio: number}};
// export type EquipSet = {[ID in HeroClassID]?: {[ID in ItemCategoryID]?: {count: number}}}[];

export type LevelRange = {min: number, max: number};