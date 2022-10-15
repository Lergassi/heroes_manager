export enum CharacterAttributeID {
    //главные
    Strength = 'Strength',
    Agility = 'Agility',
    Intelligence = 'Intelligence',

    //здоровье
    MaxHealthPoints = 'MaxHealthPoints',    //базовое значение + предметы + выносливость + бафф
    Protection = 'Protection',
    Stamina = 'Stamina',

    //магия
    MaxMagicPoints = 'MaxMagicPoints',      //базовое значение + предметы + интеллект + бафф

    //сила атаки
    AttackPower = 'AttackPower',            //базовое значение + предметы + усиление от сил/лов/инт + бафф
    AttackSpeed = 'AttackSpeed',
    CriticalStrike = 'CriticalStrike',      //значение - шанс крита. У шанса есть кап.

    //прочее
    Luck = 'Luck',
}