import {Milliseconds, Seconds} from './types.js';

export const ONE_SECOND_IN_MILLISECONDS: Milliseconds = 1000;

export const ONE_MINUTE_IN_SECONDS: Seconds = 60;
export const ONE_HOUR_IN_SECONDS: Seconds = ONE_MINUTE_IN_SECONDS * 60;
export const ONE_DAY_IN_SECONDS: Seconds = ONE_HOUR_IN_SECONDS * 24;

export const DEFAULT_ITEM_STORAGE_SIZE = 20;
export const DEFAULT_STACK_SIZE = 50;

let corePrefix = 'core.';
let playerPrefix = 'player.';

export enum ContainerKey {
    EntityManager = 'core.entityManager',
    EntityManagerFacade = 'core.facade.entityManager',
    EventSystem = 'core.EventSystem',
    ItemFactory = 'core.itemFactory',

    IDGenerator = 'player.realtimeObjectIdGenerator',
    GameObjectFactory = 'player.gameObjectFactory',
    MainLocationListComponent = 'player.MainLocationListComponent',
    LocationFactory = 'player.LocationFactory',
    EnemyFactory = 'player.EnemyFactory',

    //components
    ExperienceComponentFactory = 'player.ExperienceComponentFactory',
}

// export enum ComponentDefaultName {
//     HealthPointsComponent = 'HealthPointsComponent',
// }