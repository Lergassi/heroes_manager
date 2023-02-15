export enum ComponentID {
    //Player/User
    HeroClassID = 'HeroClassID',
    ItemStorage = 'ItemStorage',
    Wallet = 'Wallet',

    //Character
    Level = 'Level',
    EquipController = 'EquipController',    //todo: Или экипировка только у героев, а у врагов проще?

    //Hero
    Hero = 'Hero',  //Пока это HeroComponent.

    Experience = 'Experience',
    AverageItemLevel = 'AverageItemLevel',

    CharacterAttributes = 'CharacterAttributes',
    AttackController = 'AttackController',
    DamageController = 'DamageController',
    HealthPoints = 'HealthPoints',
    MagicPoints = 'MagicPoints',

    LifeStateController = 'LifeStateController',
    HeroActivityStateController = 'HeroActivityStateController',
    TakeController = 'TakeController',

    ItemCharacterAttributeCollector = 'ItemCharacterAttributeCollector',
    Gatherer = 'Gatherer',

    //Enemy
    EnemyTypeID = 'EnemyTypeID',
    Enemy = 'Enemy',
    ExperienceLootGenerator = 'ExperienceLootGenerator',
    ItemLootGenerator = 'ItemLootGenerator',
    GoldLootGenerator = 'GoldLootGenerator',

    //Location
    Location = 'Location',

    //UI
    Render = 'Render',

    //helpers
}