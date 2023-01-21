import Item from '../app/Entities/Item.js';
import EnemyEntity from '../app/Entities/EnemyEntity.js';
import {EquipSlotID} from './enums/EquipSlotID.js';
import {CharacterAttributeID} from './enums/CharacterAttributeID.js';
import CharacterAttribute from '../app/Components/CharacterAttribute.js';
import CharacterAttributeInterface from '../app/Decorators/CharacterAttributeInterface.js';
import {EnemyID} from './enums/EnemyID.js';

export type integer = number;
export type unsigned = number;
export type float = number;

export type Milliseconds = number;
export type Minutes = number;
export type Seconds = number;
export type Hours = number;
export type Days = number;

export type CharacterAttributes = Partial<{[ID in CharacterAttributeID]: CharacterAttributeInterface}>;

export type Loot = {
    enemyLevel: unsigned[];
    item: Item;
    count: unsigned[];
    /**
     * Целое число в диапазоне 0-100. Но может быть и больше.
     */
    chance: unsigned;
}

export type ItemCount = {
    item: Item;
    count: number;
}

export type UI_ItemCount = {
    itemName: string;
    count: number;
}

export type UI_VeinItemCount = {
    itemName: string;
    startCount: number;
    count: number;
}

//ID = ID CurrencyAlias todo: Теги тоже в переменные?
// export enum CurrencyWalletAlias {
//     Gold = 'Wallet.Gold',
//     ResearchPoints = 'Wallet.ResearchPoints',
// }