import {Milliseconds, Seconds} from './types.js';
import {sprintf} from 'sprintf-js';

export const ONE_SECOND_IN_MILLISECONDS: Milliseconds = 1000;

export const ONE_MINUTE_IN_SECONDS: Seconds = 60;
export const ONE_HOUR_IN_SECONDS: Seconds = ONE_MINUTE_IN_SECONDS * 60;
export const ONE_DAY_IN_SECONDS: Seconds = ONE_HOUR_IN_SECONDS * 24;

export const DEFAULT_ITEM_STORAGE_SIZE = 20;
export const DEFAULT_STACK_SIZE = 50;

export enum ContainerKey {
    //core
    EntityManager = 'core.entityManager',
    EntityManagerFacade = 'core.facade.entityManager',
    EventSystem = 'core.EventSystem',
    ItemFactory = 'core.itemFactory',

    //player
    IDGenerator = 'player.realtimeObjectIdGenerator',
    GameObjectStorage = 'player.GameObjectStorage',
    GameObjectFactory = 'player.gameObjectFactory',
    ItemStorageManager = 'player.ItemStorageManager',
    //фабрики
    LocationFactory = 'player.LocationFactory',
    EnemyFactory = 'player.EnemyFactory',
    //компоненты
    MainLocationListComponent = 'player.MainLocationListComponent',

    //player Фабрики компонентов (class Component).
    ExperienceComponentFactory = 'player.ExperienceComponentFactory',

}

// export enum ComponentDefaultName {
//     HealthPointsComponent = 'HealthPointsComponent',
// }