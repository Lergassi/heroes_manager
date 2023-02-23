export enum ItemAttributeID {
    ID = 'ID',
    // name = 'name',
    // description = 'description',
    Icon = 'Icon',
    ItemLevel = 'ItemLevel',
    // Sort = 'Sort',
    GetTypes = 'GetTypes',
    ItemCategory = 'ItemCategory',
    Quality = 'Quality',
    StackSize = 'StackSize',
    Properties = 'Properties',
    CharacterAttributes = 'CharacterAttributes',
    Strength = 'Strength',
    Agility = 'Agility',
    Intelligence = 'Intelligence',

    //Наверное логичнее использовать отдельные переменные для рейтов, а не сами атрибуты.
    CraftRatio = 'CraftRatio',                  //default -> itemCategory
    HealthPointsRatio = 'HealthPointsRatio',    //default -> itemCategory
    AttackPowerRatio = 'AttackPowerRatio',    //default -> itemCategory
    StrengthRatio = 'StrengthRatio',            //default -> itemCategory
    AgilityRatio = 'AgilityRatio',              //default -> itemCategory
    IntelligenceRatio = 'IntelligenceRatio',    //default -> itemCategory
}