export enum CharacterAttributeID {
    //главные
    Strength = 'Strength',
    Agility = 'Agility',
    Intelligence = 'Intelligence',

    //здоровье
    MaxHealthPoints = 'MaxHealthPoints',
    Protection = 'Protection',              //Числовой показатель.
    // Armor = 'Armor',                        //Процентный показатель блокировки урона. Высчитываемый атрибут.
    Stamina = 'Stamina',

    //магия
    MaxMagicPoints = 'MaxMagicPoints',

    //атака
    AttackPower = 'AttackPower',
    AttackSpeed = 'AttackSpeed',
    CriticalStrike = 'CriticalStrike',
    // CriticalStrikeChance = 'CriticalStrikeChance',

    //прочее
    Luck = 'Luck',
}