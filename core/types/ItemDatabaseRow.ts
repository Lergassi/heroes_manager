export type ItemDatabaseRow = {
    ID: string;
    ItemCategoryID: string;
    ArmorMaterialID?: string;
    QualityID: string;
    StackSize: number;
    ItemLevel: number;
    Strength: number;
    Agility: number;
    Intelligence: number;
    DefaultBuyPrice?: number;
    DefaultSellPrice?: number;
    Equipable: boolean;
    TwoHandWeapon: boolean;
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
}