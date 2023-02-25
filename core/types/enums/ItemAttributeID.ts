export enum ItemAttributeID {
    ID = 'ID',
    Icon = 'Icon',
    ItemLevel = 'ItemLevel',
    GetTypes = 'GetTypes',
    ItemCategory = 'ItemCategory',
    Quality = 'Quality',
    StackSize = 'StackSize',
    // Properties = 'Properties',
    // CharacterAttributes = 'CharacterAttributes',

    Strength = 'Strength',
    Agility = 'Agility',
    Intelligence = 'Intelligence',

    //Возможно логичнее использовать отдельные переменные для рейтов, а не сами атрибуты. HealthPoints - HealthPointsRatio
    HealthPoints = 'HealthPoints',              //default -> itemCategory
    AttackPower = 'AttackPower',                //default -> itemCategory

    CraftRatio = 'CraftRatio',                  //default -> itemCategory
    // StrengthRatio = 'StrengthRatio',            //default -> itemCategory
    // AgilityRatio = 'AgilityRatio',              //default -> itemCategory
    // IntelligenceRatio = 'IntelligenceRatio',    //default -> itemCategory
}