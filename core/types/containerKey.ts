export enum ContainerKey {
    //core
    EntityManager = 'core.entityManager',
    EntityManagerFacade = 'core.facade.entityManager',
    EventSystem = 'core.EventSystem',
    ItemFactory = 'core.itemFactory',
    ItemDatabase = 'core.ItemDatabase',

    //player
    IDGenerator = 'player.realtimeObjectIdGenerator',
    GameObjectStorage = 'player.GameObjectStorage',
    GameObjectFactory = 'player.gameObjectFactory',
    ItemStorageManager = 'player.ItemStorageManager',
    //фабрики
    LocationFactory = 'player.LocationFactory',
    EnemyFactory = 'player.EnemyFactory',
    ItemStackFactory= 'player.ItemStackFactory',
    //компоненты
    MainLocationListComponent = 'player.MainLocationListComponent',

    //player Фабрики компонентов (class Component).
    ExperienceComponentFactory = 'player.ExperienceComponentFactory',
}