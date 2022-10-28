import HeroCharacterAttributeFactory from '../../app/Factories/HeroCharacterAttributeFactory.js';

export enum ContainerID {
    //core
    EntityManager = 'core.EntityManager',
    // EntityManagerFacade = 'core.facade.entityManager',
    ItemFactory = 'core.ItemFactory',
    ItemDatabase = 'core.ItemDatabase',
    GameConsole = 'core.GameConsole',

    //player
    EventSystem = 'core.EventSystem',
    IDGenerator = 'player.realtimeObjectIdGenerator',
    GameObjectStorage = 'player.GameObjectStorage',
    GameObjectFactory = 'player.GameObjectFactory',
    ItemStorageFactory = 'player.ItemStorageFactory',
    ItemStorageManager = 'player.ItemStorageManager',
    CharacterAttributeStartValueGenerator = 'player.CharacterAttributeStartValueGenerator',
    CharacterAttributeValueGenerator = 'player.CharacterAttributeValueGenerator',

    //фабрики
    HeroFactory = 'player.HeroFactory',
    LocationFactory = 'player.LocationFactory',
    EnemyFactory = 'player.EnemyFactory',
    ItemStackFactory = 'player.ItemStackFactory',
    HeroCharacterAttributeFactory = 'player.HeroCharacterAttributeFactory',
    EnemyCharacterAttributeFactory = 'player.EnemyCharacterAttributeFactory',

    //компоненты из GameObject
    MainItemStorageList = 'player.MainItemStorageList',
    MainHeroList = 'player.MainHeroList',
    MainLocationList = 'player.MainLocationList',

    //player Фабрики компонентов (class Component).
    ExperienceComponentFactory = 'player.ExperienceComponentFactory',
}