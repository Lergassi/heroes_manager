import HeroCharacterAttributeFactory from '../../app/Factories/HeroCharacterAttributeFactory.js';

export enum ServiceID {
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
    Wallet = 'player.Wallet',

    Shop = 'player.Shop',
    Fence = 'player.Fence',

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
    UI_Game = 'core.ui.game',
    UI_Updater = 'core.ui.Updater',

    //React components
    UI_Wallet = 'player.ui.Wallet',
    UI_ItemStorage = 'player.ui.PlayerItemStorage',
    UI_ItemStorageController = 'player.ui.ItemStorageController',
    UI_DetailHero = 'player.ui.DetailHero',
    UI_MainHeroList = 'player.ui.MainHeroList',
    UI_DetailLocation = 'player.ui.DetailLocation',
    UI_MainLocationList = 'player.ui.MainLocationList',

    //data
    Data_ItemCategoryPowerRatio = 'Data_ItemCategoryPowerRatio',

    //...
    Data_CommonArmorSet = 'Data_CommonArmorSet',
    Data_WeaponSet = 'Data_WeaponSet',
    // Data_HealthPointsEquipSet = 'Data_HealthPointsEquipSet',
    // Data_AttackPowerEquipSet = 'Data_AttackPowerEquipSet',
    Data_EquipSet = 'Data_EquipSet',

    // Data_WarriorEquipSet = 'Data_WarriorEquipSet',
    // Data_RogueWeaponSet = 'Data_RogueWeaponSet',
    // Data_GunslingerWeaponSet = 'Data_GunslingerWeaponSet',
    // Data_FireMageWeaponSet = 'Data_FireMageWeaponSet',
    // Data_Support1WeaponSet = 'Data_Support1WeaponSet',
    //... и тд
}