import {
    devCreateItemStorage, devGameConsole,
    devGameObjectStorage, devGameObjectStorage_newHeroScenario,
    devGameObjectStorage_newPlayerScenario, devHeroPattern, devItemStorageManager,
    playerFactory_create, testItemStorages, testTransaction,
    userFactory_create,
    walletFactory_create
} from './include.js';
import path from 'path';
import Container from '../core/source/Container.js';
import CoreContainerConfigure from '../core/app/ContainerConfigure.js';
import ServerContainerConfigure from '../server/app/ContainerConfigure.js';

let container = new Container();
(new CoreContainerConfigure()).configure(container);
(new ServerContainerConfigure()).configure(container);

// playerFactory_create();
// userFactory_create();
// walletFactory_create();
// devGameObjectStorage();
// devGameObjectStorage_newPlayerScenario();
// devGameObjectStorage_newHeroScenario();
// devCreateItemStorage();
// devGameConsole();
// testTransaction();
// devItemStorageManager();
// testItemStorages();
devHeroPattern();

// console.log(path.resolve(
//     container.get('config.server').projectDir,
//     container.get('config.server').dataDir,
//     container.get('config.server').savesDir,
//     '42',
// ));

// let count = 0;
// let arr = [1,2,3,4,5];
// arr.map(value => {
//     count += value % 2 ? 1 : 0
// });
// console.log(count);