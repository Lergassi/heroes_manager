import {ItemID} from './enums/ItemID.js';
import {ItemTypeID} from './enums/ItemTypeID.js';

export type TSDB_Item = {
    ID: string;
    ItemCategoryID: string;
    ArmorMaterialID: string;
    QualityID: string;
    StackSize: number;
    ItemLevel: number;
    Strength: number;
    Agility: number;
    Intelligence: number;
    AttackPower: number;
    HealthPoints: number;
    DefaultBuyPrice?: number;
    DefaultSellPrice?: number;
    Equipable: boolean;
    TwoHandWeapon: boolean;
    // TypeID: ItemTypeID;
    // RequireItemID01?: string;
    // RequireItemID01Count?: number;
    // RequireItemID02?: string;
    // RequireItemID02Count?: number;
    // RequireItemID03?: string;
    // RequireItemID03Count?: number;
    // RequireItemID04?: string;
    // RequireItemID04Count?: number;
    // ResultCount?: number;
    // CraftTime?: number;
};

export type TSDB_ItemDB = {
    [ID in ItemID | string]?: TSDB_Item;
};