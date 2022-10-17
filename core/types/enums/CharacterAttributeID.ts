export enum CharacterAttributeID {
    //главные
    Strength = 'Strength',
    Agility = 'Agility',
    Intelligence = 'Intelligence',

    //здоровье
    MaxHealthPoints = 'MaxHealthPoints',
    Protection = 'Protection',              //Числовой показатель.
    // ProtectionBlock = 'ProtectionBlock',    //Процентный показатель блокировки урона. Высчитываемый атрибут.
    Stamina = 'Stamina',

    //магия
    MaxMagicPoints = 'MaxMagicPoints',

    //атаки
    AttackPower = 'AttackPower',
    AttackSpeed = 'AttackSpeed',
    CriticalStrike = 'CriticalStrike',

    //прочее
    Luck = 'Luck',
}