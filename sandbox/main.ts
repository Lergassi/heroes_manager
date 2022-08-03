import {
    createUserAndPlayer,
    devAutoSaveLoad_main,
    devAutoSaveLoad_serialize,
    devAutoSaveLoad_services,
    devAutoSaveLoad_testEquial,
    devAutoSaveLoad_unserialize,
    devCreateItemStorage, devEntityDatabase,
    devGameConsole,
    devGameObjectStorage,
    devGameObjectStorage_newHeroScenario,
    devGameObjectStorage_newPlayerScenario,
    devHeroPattern,
    devItemStorageManager, devLoadEntityDatabase,
    devManualSaveLoad,
    devPlayerDBObject,
    devRemoveServicesByStringPattern, devSaveEntityDatabase,
    devSyncCreateUserAndPlayer,
    loadUserAndPlayer,
    playerFactory_create,
    testContainerGenerics,
    testEnumSerialier,
    testGeneric,
    testItemStorages,
    testLodashClone,
    testTransaction,
    userFactory_create,
    walletFactory_create
} from './include.js';
import path from 'path';
import Container from '../core/source/Container.js';
import CoreContainerConfigure from '../core/app/CoreContainerConfigure.js';
import ServerContainerConfigure from '../server/app/ServerContainerConfigure.js';
import sum from '../test_objects/sum.js';

// let container = new Container();
// (new CoreContainerConfigure()).configure(container);
// (new ServerContainerConfigure()).configure(container);

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
// devHeroPattern();
// devManualSaveLoad();
// testGeneric();
// devAutoSaveLoad_serialize();
// devAutoSaveLoad_unserialize();
// devAutoSaveLoad_services();
// devAutoSaveLoad_testEquial();
// testContainerGenerics();
// testEnumSerialier();

// devAutoSaveLoad_main();
// createUserAndPlayer();
// loadUserAndPlayer();

// devPlayerDBObject();
// devRemoveServicesByStringPattern();
// devSyncCreateUserAndPlayer();
// devEntityDatabase();
// devLoadEntityDatabase();
// devSaveEntityDatabase();

// testLodashClone();

// console.log(path.resolve(
//     container.get('server.config').projectDir,
//     container.get('server.config').dataDir,
//     container.get('server.config').savesDir,
//     '42',
// ));

// let count = 0;
// let arr = [1,2,3,4,5];
// arr.map(value => {
//     count += value % 2 ? 1 : 0
// });
// console.log(count);

// console.log('sum', sum(1, 2) === 3);