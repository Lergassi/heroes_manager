export enum ComponentID {
    //Character
    Level = 'Level',
    EquipController = 'EquipController',    //todo: Или экипировка только у героев, а у врагов проще?

    //Hero
    Hero = 'Hero',  //Пока это HeroComponent.

    Experience = 'Experience',
    AverageItemLevel = 'AverageItemLevel',

    // EquipSlots = 'EquipSlots',
    CharacterAttributes = 'CharacterAttributes',
    AttackController = 'AttackController',
    DamageController = 'DamageController',
    HealthPoints = 'HealthPoints',
    MagicPoints = 'MagicPoints',

    LifeStateController = 'LifeStateController',
    ActivityStateController = 'ActivityStateController',
    TakeController = 'TakeController',

    ItemCharacterAttributeCollector = 'ItemCharacterAttributeCollector',
    Gatherer = 'Gatherer',

    //Enemy
    Enemy = 'Enemy',

    //Player/User
    ItemStorage = 'ItemStorage',
    Wallet = 'Wallet',

    //Location
    Location = 'Location',

    //UI
    Render = 'Render',

    //helpers
}