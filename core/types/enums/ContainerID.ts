import HeroCharacterAttributeFactory from '../../app/Factories/HeroCharacterAttributeFactory.js';

export enum ContainerID {
    //core
    EventSystem = 'core.EventSystem',
    EventSystemFactory = 'core.EventSystemFactory',
    EntityManager = 'core.EntityManager',
    ItemFactory = 'core.ItemFactory',
    RecipeFactory = 'core.RecipeFactory',
    ItemCategoryFactory = 'ItemCategoryFactory',
    ItemDatabase = 'core.ItemDatabase',
    GameConsole = 'core.GameConsole',

    //player
    IDGenerator = 'player.realtimeObjectIdGenerator',
    GameObjectStorage = 'player.GameObjectStorage',
    GameObjectFactory = 'player.GameObjectFactory',
    ItemStorageFactory = 'player.ItemStorageFactory',
    CharacterAttributeStartValueGenerator = 'player.CharacterAttributeStartValueGenerator',
    CharacterAttributeValueGenerator = 'player.CharacterAttributeValueGenerator',

    //фабрики
    HeroFactory = 'player.HeroFactory',
    LocationFactory = 'player.LocationFactory',
    EnemyFactory = 'player.EnemyFactory',
    ItemStackFactory = 'player.ItemStackFactory',
    HeroCharacterAttributeFactory = 'player.HeroCharacterAttributeFactory',
    EnemyCharacterAttributeFactory = 'player.EnemyCharacterAttributeFactory',
    WalletFactory = 'player.WalletFactory',

    //компоненты из GameObject
    ItemStorageController = 'player.ItemStorageController',
    /**
     * @deprecated
     */
    MainItemStorageList = 'player.MainItemStorageList',
    MainHeroList = 'player.MainHeroList',
    MainLocationList = 'player.MainLocationList',

    //player Фабрики компонентов (class Component).
    ExperienceComponentFactory = 'player.ExperienceComponentFactory',

    //stubs
    // StubItemStorage01 = 'player.stubs.ItemStorage01',
    StubFactory = 'StubFactory',

    //ui
    //components
    UI_MainItemStorageList = 'player.ui.MainItemStorageList',
    UI_MainHeroList = 'player.ui.MainHeroList',
    UI_MainLocationList = 'player.ui.MainLocationList',
}