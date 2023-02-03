export type ItemDatabaseRow = {
    ID: string;
    Name?: string;
    ItemCategoryID: string;
    ArmorMaterialID?: string;
    QualityID: string;
    StackSize: number;
    Equipable: boolean;
    TwoHandWeapon: boolean;
    ItemLevel: number;
    Strength: number;
    Agility: number;
    Intelligence: number;
    DefaultBuyPrice?: number;
    DefaultSellPrice?: number;
    RequireItemID01?: string;
    RequireItemID01Count?: number;
    RequireItemID02?: string;
    RequireItemID02Count?: number;
    RequireItemID03?: string;
    RequireItemID03Count?: number;
    RequireItemID04?: string;
    RequireItemID04Count?: number;
    ResultCount?: number;
    CraftTime?: number;
}