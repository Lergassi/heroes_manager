export enum CharacterAttributeID {
    //главные
    Strength = 'Strength',
    Agility = 'Agility',
    Intelligence = 'Intelligence',

    //...
    HealthPoints = 'HealthPoints',
    MaxHealthPoints = 'MaxHealthPoints',
    Protection = 'Protection',              //Числовой показатель.
    // Armor = 'Armor',                        //Процентный показатель блокировки урона. Высчитываемый атрибут.
    Stamina = 'Stamina',
    // HealthPoints = 'HealthPoints',

    MaxMagicPoints = 'MaxMagicPoints',

    //дополнительные
    AttackPower = 'AttackPower',
    AttackSpeed = 'AttackSpeed',
    CriticalStrike = 'CriticalStrike',
    // CriticalStrikeChance = 'CriticalStrikeChance',

    //прочее
    Luck = 'Luck',

    //todo: Пока тут.
    // ItemLevel = 'ItemLevel',
}