export enum CharacterAttributeID {
    //главные
    /**
     * STR
     */
    Strength = 'Strength',
    /**
     * AGI
     */
    Agility = 'Agility',
    /**
     * INT
     */
    Intelligence = 'Intelligence',

    //...
    /**
     * @deprecated Понятия HealthPoints не нужно пока. Максимальное значение и текущее. Текущее значение - пока не атрибут.
     */
    HealthPoints = 'HealthPoints',
    MaxHealthPoints = 'MaxHealthPoints',
    Protection = 'Protection',              //Числовой показатель.
    // Armor = 'Armor',                        //Процентный показатель блокировки урона. Высчитываемый атрибут.
    Stamina = 'Stamina',
    // HealthPoints = 'HealthPoints',

    MaxMagicPoints = 'MaxMagicPoints',

    //дополнительные
    /**
     * AP
     */
    AttackPower = 'AttackPower',
    /**
     * AS
     */
    AttackSpeed = 'AttackSpeed',
    CriticalStrike = 'CriticalStrike',
    // CriticalStrikeChance = 'CriticalStrikeChance',

    //прочее
    Luck = 'Luck',
}