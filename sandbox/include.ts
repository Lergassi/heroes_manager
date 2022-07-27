import PlayerFactory from '../core/app/Factories/PlayerFactory.js';
import AutoIncrementIDGenerator from '../core/source/AutoIncrementIDGenerator.js';
import UserFactory from '../core/app/Factories/UserFactory.js';
import Container from '../core/source/Container.js';
import ServerContainerConfigure from '../server/app/ContainerConfigure.js';
import WalletFactory from '../core/app/Factories/WalletFactory.js';
import RepositoryManager from '../core/source/RepositoryManager.js';
import Currency from '../core/app/Entities/Currency.js';
import GameObjectStorage from '../core/source/GameObjectStorage.js';
import GameObject from '../core/source/GameObject.js';
import _ from 'lodash';
import HeroFactory from '../core/app/Factories/HeroFactory.js';
import HeroClass from '../core/app/Entities/HeroClass.js';
import {debugContainer, debugHero, debugItemStorage, debugItemStorages} from '../core/debug/debug_functions.js';
import debug from 'debug';
import ItemStorageFactory from '../core/app/Factories/ItemStorageFactory.js';
import ItemStorageComponent from '../core/app/Components/ItemStorageComponent.js';
import ItemStack from '../core/app/RuntimeObjects/ItemStack.js';
import Item from '../core/app/Entities/Item.js';
import GameConsole from '../core/source/GameConsole/GameConsole.js';
import {Pool} from 'mysql';
import ItemStorageManager from '../core/app/Services/ItemStorageManager.js';
import ItemStackPattern from '../core/app/RuntimeObjects/ItemStackPattern.js';
import ItemRepository from '../core/app/Repositories/ItemRepository.js';
import chalk from 'chalk';
import EquipSlot from '../core/app/Entities/EquipSlot.js';
import ItemStorageSlotComponent from '../core/app/Components/ItemStorageSlotComponent.js';
import ItemStackSlot from '../core/app/RuntimeObjects/ItemStackSlot.js';
import ContainerInterface from '../core/source/ContainerInterface.js';
import ItemStackFactory from '../core/app/Factories/ItemStackFactory.js';
import {inspect} from 'util';
import Serializer, {PrimitiveType} from '../core/source/Serializer.js';
import EquipManager from '../core/app/Services/EquipManager.js';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import PlayerDBObjectRepository from '../server/app/Repositories/PlayerDBObjectRepository.js';
import PlayerDBObject, {PlayerState} from '../server/app/DBObjects/PlayerDBObject.js';
import UserDBObjectRepository from '../server/app/Repositories/UserDBObjectRepository.js';
import UserDBObject from '../server/app/DBObjects/UserDBObject.js';
import UserDBObjectFactory from '../server/app/Factories/UserDBObjectFactory.js';
import {v4} from 'uuid';
import PlayerDBObjectFactory from '../server/app/Factories/PlayerDBObjectFactory.js';

let container = new Container();
(new ServerContainerConfigure()).configure(container);
// (new CoreContainerConfigure()).configure(container);

export function playerFactory_create() {
    let idGenerator: AutoIncrementIDGenerator = container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator');

    let playerFactory = new PlayerFactory(idGenerator, {
        maxLevel: 100,
    });

    let player = playerFactory.create();
    console.log(player);
}

export function userFactory_create() {
    let idGenerator: AutoIncrementIDGenerator = container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator');

    let userFactory = new UserFactory(idGenerator);

    let user = userFactory.create();
    console.log(user);
}

export function walletFactory_create() {
    let idGenerator: AutoIncrementIDGenerator = container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator');

    let walletFactory = new WalletFactory(idGenerator);

    let wallets = [
        walletFactory.create(
            (<RepositoryManager>container.get<RepositoryManager>('core.repositoryManager')).getRepository<Currency>(Currency.name).getOneByAlias('currency_gold'),
            10000
        ),
        walletFactory.create(
            (<RepositoryManager>container.get<RepositoryManager>('core.repositoryManager')).getRepository<Currency>(Currency.name).getOneByAlias('currency_research_points'),
            10
        ),
    ];
    console.log(wallets[0]);
    console.log(wallets[1]);
}

export function devGameObjectStorage() {
    let idGenerator: AutoIncrementIDGenerator = container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator');

    let gameObjectStorage = new GameObjectStorage();

    let gameObjects = [
        new GameObject(idGenerator.generateID()),
        new GameObject(idGenerator.generateID()),
        new GameObject(idGenerator.generateID()),
        new GameObject(idGenerator.generateID()),
    ];

    gameObjects.map(value => {
        gameObjectStorage.add(value);
    });

    console.log(gameObjectStorage['_gameObjects'].length === gameObjects.length, 'add: Все объекты были успешно добавлены в GameObjectStorage. Кол-во добавленных объектов соответствует кол-ву объевтов в GameObjectStorage.');
    console.log(_.every(gameObjects, value => {
        return _.indexOf(gameObjectStorage['_gameObjects'], value) !== -1;
    }), 'add: Все объекты были успешно добавлены в GameObjectStorage. Каждые объект найден в GameObjectStorage');
    console.log(_.indexOf(gameObjectStorage['_gameObjects'], new GameObject(idGenerator.generateID())) === -1, 'Объект не добавленный в GameObjectStorage не найден в нем.');

    let removeGameObject = gameObjects[1];
    gameObjectStorage.remove(gameObjects[1]);
    console.log(_.indexOf(gameObjectStorage['_gameObjects'], removeGameObject) === -1, 'remove: Объект не найден в _gameObjects после выполнения метода.');

    console.log(gameObjectStorage.findOneByID(gameObjects[0]['_id']) instanceof GameObject, 'findOneByID: Поиск по id существующего объекта. Возвращаемое значение GameObject.');
    console.log(gameObjectStorage.findOneByID(gameObjects[0]['_id'])['_id'] === gameObjects[0]['_id'], 'findOneByID: Поиск по id существующего объекта. id возвращаемого объекта совпадает с id поиска.');
    console.log(gameObjectStorage.findOneByID(10000) === undefined, 'findOneByID: Поиск по id не существующего объекта. return должен быть undefined.');

    console.log(gameObjectStorage.getOneByID(gameObjects[0]['_id']) instanceof GameObject, 'getOneByID: Поиск по id существующего объекта. Возвращаемое значение GameObject.');
    console.log(gameObjectStorage.getOneByID(gameObjects[0]['_id'])['_id'] === gameObjects[0]['_id'], 'getOneByID: Поиск по id существующего объекта. id возвращаемого объекта совпадает с id поиска.');
    try {
        gameObjectStorage.getOneByID(10000)
    } catch (e) {
        console.log(true, 'getOneByID: Поиск по id не существующего объекта. Исключение сработало.');
    }
}

export function devGameObjectStorage_newPlayerScenario() {
    let userFactory: UserFactory = container.get<UserFactory>('core.userFactory');
    let playerFactory: PlayerFactory = container.get<PlayerFactory>('core.playerFactory');
    let walletFactory: WalletFactory = container.get<WalletFactory>('core.walletFactory');
    let heroFactory: HeroFactory = container.get<HeroFactory>('core.heroFactory');
    let itemStorageFactory: ItemStorageFactory = container.get<ItemStorageFactory>('core.itemStorageFactory');

    let gameObjectStorage: GameObjectStorage = container.get<GameObjectStorage>('core.gameObjectStorage');

    gameObjectStorage.add(userFactory.create());
    gameObjectStorage.add(playerFactory.create());
    gameObjectStorage.add(walletFactory.create(
        container.get<RepositoryManager>('core.repositoryManager').getRepository<Currency>(Currency.name).getOneByAlias('currency_gold'),
        10000,
    ));
    gameObjectStorage.add(walletFactory.create(
        container.get<RepositoryManager>('core.repositoryManager').getRepository<Currency>(Currency.name).getOneByAlias('currency_research_points'),
        10,
    ));
    gameObjectStorage.add(heroFactory.create(container.get<RepositoryManager>('core.repositoryManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior')));
    gameObjectStorage.add(heroFactory.create(container.get<RepositoryManager>('core.repositoryManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior')));
    gameObjectStorage.add(heroFactory.create(container.get<RepositoryManager>('core.repositoryManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage')));
    gameObjectStorage.add(heroFactory.create(container.get<RepositoryManager>('core.repositoryManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue')));

    gameObjectStorage.add(itemStorageFactory.create());
    gameObjectStorage.add(itemStorageFactory.create());
    gameObjectStorage.add(itemStorageFactory.create());
    gameObjectStorage.add(itemStorageFactory.create());
    gameObjectStorage.add(itemStorageFactory.create());

    console.log(gameObjectStorage);
}

export function devGameObjectStorage_newHeroScenario() {
    let heroFactory: HeroFactory = container.get<HeroFactory>('core.heroFactory');
    // let gameObjectStorage: HeroFactory = container.get('core.heroFactory');

    let heroClassAlias = 'hero_class_warrior';
    let heroClass = container.get<RepositoryManager>('core.repositoryManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias(heroClassAlias);

    let heroes = [
        heroFactory.create(container.get<RepositoryManager>('core.repositoryManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior')),
        heroFactory.create(container.get<RepositoryManager>('core.repositoryManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior')),
        heroFactory.create(container.get<RepositoryManager>('core.repositoryManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage')),
        heroFactory.create(container.get<RepositoryManager>('core.repositoryManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue')),
    ];

    _.map(heroes, (value) => {
        debugHero(value);
        debug('debug')(_.repeat('-', 32));
    });
}

export function devCreateItemStorage() {
    let itemStorageFactory: ItemStorageFactory = container.get<ItemStorageFactory>('core.itemStorageFactory');

    // let itemStorage = itemStorageFactory.create(100);
    let itemStorage = itemStorageFactory.create();
    let itemStorageComponent= <ItemStorageComponent>itemStorage.getComponentByName(ItemStorageComponent.name);
    // let freeItemStorageSlotComponent = itemStorageComponent.findFirstFreeItemStorageSlotComponent();
    // debugItemStack(freeItemStorageSlotComponent.itemStack);
    // freeItemStorageSlotComponent.placeItemStack(new ItemStack(container.get('core.repositoryManager').getRepository(Item.name).getOneByAlias('item_wood'), 30));
    // debugItemStack(freeItemStorageSlotComponent.itemStack);

    let freeItemStorageSlotComponent = undefined;
    while (freeItemStorageSlotComponent = itemStorageComponent.findFirstFreeItemStorageSlotComponent()) {
    // while (freeItemStorageSlotComponent = itemStorageComponent.getFirstFreeItemStorageSlotComponent()) {
        freeItemStorageSlotComponent.placeItemStack(new ItemStack(container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator').generateID(), container.get<RepositoryManager>('core.repositoryManager').getRepository<Item>(Item.name).getOneByAlias('item_wood'), 20));
    }
    debugItemStorage(itemStorage);
}

export function devGameConsole() {
    let gameConsole = container.get<GameConsole>('server.gameConsole');

    // gameConsole.register(new HelpCommand(container));
    // gameConsole.register(new ListCommand(container));
    // gameConsole.register(new HelpCommand(container));
    // let name = 'help';
    // let name = 'list';
    // let name = 'create_user_env';
    let name = 'create_user_env';
    // gameConsole.run(name, ['user01@email.com', 'qweasdzxc']);
    gameConsole.run(name, ['user01@email.com', 'qweasdzxc']);

    // let command = new TestCommand(container);
    // let command = new HelpCommand(container);
    // command.run([]);
}

export function testTransaction() {
    let pool: Pool = container.get<Pool>('server.database.pool');
    pool.getConnection((err, connection) => {
        connection.beginTransaction();
    });
}

export function devItemStorageManager() {
    container.get<GameObjectStorage>('core.gameObjectStorage').add(container.get<ItemStorageFactory>('core.itemStorageFactory').create());
    container.get<GameObjectStorage>('core.gameObjectStorage').add(container.get<ItemStorageFactory>('core.itemStorageFactory').create());
    debugItemStorages(container);

    const itemStorageManager = new ItemStorageManager(container.get<GameObjectStorage>('core.gameObjectStorage'));
    itemStorageManager.addItem(new ItemStackPattern(
        container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator'),
        container.get<RepositoryManager>('core.repositoryManager').getRepository<Item>(Item.name).getOneByAlias('item_wood'),
        20,
    ));
    itemStorageManager.addItem(new ItemStackPattern(
        container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator'),
        container.get<RepositoryManager>('core.repositoryManager').getRepository<Item>(Item.name).getOneByAlias('item_one_handed_sword_01'),
        1,
    ));
    itemStorageManager.addItem(new ItemStackPattern(
        container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator'),
        container.get<RepositoryManager>('core.repositoryManager').getRepository<Item>(Item.name).getOneByAlias('item_cloth_helmet_01'),
        1,
    ));
    itemStorageManager.addItem(new ItemStackPattern(
        container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator'),
        container.get<RepositoryManager>('core.repositoryManager').getRepository<Item>(Item.name).getOneByAlias('item_wood'),
        10,
    ));
    itemStorageManager.addItem(new ItemStackPattern(
        container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator'),
        container.get<RepositoryManager>('core.repositoryManager').getRepository<Item>(Item.name).getOneByAlias('item_wood'),
        10,
    ));

    debugItemStorages(container);
}

export function testItemStorages() {
    testItemStorageOverflow(
        container.get<RepositoryManager>('core.repositoryManager').getRepository<Item>(Item.name),
        container.get<ItemStorageFactory>('core.itemStorageFactory'),
    );
    testItemStoragesOverflow(
        container.get<RepositoryManager>('core.repositoryManager').getRepository<Item>(Item.name),
        container.get<ItemStorageFactory>('core.itemStorageFactory'),
    );
}

function testItemStorageOverflow(
    itemRepository: ItemRepository,
    itemStorageFactory: ItemStorageFactory,
) {
    const itemStorage = itemStorageFactory.create();
    const itemStorageComponent = <ItemStorageComponent>itemStorage.getComponentByName(ItemStorageComponent.name);
    let i = 1;
    let max = itemStorageComponent['_size'] + 1;
    try {
        while(i <= max) {
            itemStorageComponent.addItemStack((new ItemStackPattern(
                container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator'),
                itemRepository.getOneByAlias('item_wood'),
                20,
            )).build());
            i++;
        }
        debug('test')(chalk.red('fail') + ' testItemStorageOverflow. Исключение не сработало.');
    } catch (e) {
        if (
            e.message === 'Свободных слотов не найдено.' &&
            i === max
        ) {
            debug('test')(chalk.green('success') + ' testItemStorageOverflow. Исключение сработа правильно.');
        } else {
            debug('test')(chalk.red('fail') + ' testItemStorageOverflow. Исключение сработало не правильно.');
        }
    }
}

function testItemStoragesOverflow(
    itemRepository: ItemRepository,
    itemStorageFactory: ItemStorageFactory,
) {
    let size = 20;
    const gameObjectStorage = new GameObjectStorage([
        itemStorageFactory.create(size),
        itemStorageFactory.create(size),
    ]);
    const itemStorageManager = new ItemStorageManager(gameObjectStorage);

    let itemStorages = gameObjectStorage.findByTag('#item_storage');

    let i = 1;
    let max = 0;
    itemStorages.map((item) => {
        max += Number(item.getComponentByName(ItemStorageComponent.name)['_size']);
    });
    max += 1;

    try {
        while(i <= max) {
            itemStorageManager.addItem(new ItemStackPattern(
                container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator'),
                itemRepository.getOneByAlias('item_wood'),
                20,
            ));
            i++;
        }
        debug('test')(chalk.red('fail') + ' testItemStoragesOverflow. Исключение не сработало.');
    } catch (e) {
        if (
            e.message === 'Свободных слотов не найдено.' &&
            i === max
        ) {
            debug('test')(chalk.green('success') + ' testItemStoragesOverflow. Исключение сработа правильно.');
        } else {
            debug('test')(chalk.red('fail') + ' testItemStoragesOverflow. Исключение сработало не правильно.');
        }
    }
}

export function devHeroPattern() {
    // let heroBuilder = new HeroBuilder(
    //     container.get('core.repositoryManager').getRepository(HeroClass.name),
    //     1,
    //     ,
    // );
    // testEquipSlotItemPatten();
}

export function devManualSaveLoad() {
    const itemStorage = <GameObject>container.get<ItemStorageFactory>('core.itemStorageFactory').create();
    _.map([
        {alias: 'item_wood', count: 20},
        {alias: 'item_wood', count: 20},
        {alias: 'item_wood', count: 20},
        {alias: 'item_plate_helmet_01', count: 1},
        {alias: 'item_one_handed_sword_01', count: 1},
        {alias: 'item_shield_01', count: 1},
    ], (item) => {
        // (<ItemStorageSlotComponent>itemStorage.getComponentByName(ItemStorageComponent.name)).placeItemStack(new ItemStack(
        //
        // ));
    });
    // debugItemStorage(itemStorage);
    // let save = saveItemStorageComponent(<ItemStorageComponent>itemStorage.getComponentByName(ItemStorageComponent.name));
    // console.log(save);
    let itemStorageSlotSaves = [];
    console.log(saveItemStorageSlotComponent(<ItemStorageSlotComponent>itemStorage.findComponentsByName(ItemStorageSlotComponent.name)[0]));
    // _.map(itemStorage.findComponentsByName(ItemStorageSlotComponent.name), (item: ItemStorageSlotComponent) => {
    //     itemStorageSlotSaves.push(saveItemStorageSlotComponent(item));
    // });
}

function saveItemStorageComponent(itemStorageComponent: ItemStorageComponent) {
    return {
        classname: ItemStorageComponent,
        _id: itemStorageComponent['_id'],
        _size: itemStorageComponent['_size'],
        _gameObject: {
            _id: itemStorageComponent['_gameObject']['_id'],
        },
    };
}

function saveItemStorageSlotComponent(itemStorageSlotComponent: ItemStorageSlotComponent) {
    return {
        classname: ItemStorageComponent.name,
        _id: itemStorageSlotComponent['_id'],
        _itemStack: saveItemStackSlot(itemStorageSlotComponent['_itemStackSlot']),
    };
}

function saveItemStackSlot(itemStackSlot: ItemStackSlot) {
    return {
        classname: ItemStackSlot.name,
        _itemStack: itemStackSlot.isBusy() ?
            saveItemStack(itemStackSlot['_itemStack']) :
            undefined
        ,
    };
}

function saveItemStack(itemStack: ItemStack) {
    return {
        classname: ItemStack.name,
        item: {
            _id: itemStack['_item'],
        },
        count: itemStack['_count'],
    };
}

function saveItemStorage() {

}

type Point = { x: number; y: number };
type P = keyof Point;

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;

function test1<T>(): T[] {
    let arr: T[] = [];
    // console.log(typeof {} === T);
    // console.log(T);
    // let t = new T();
    console.log('test1');

    return arr;
}

export function testGeneric() {
    // let a = test1<Item>();
    // a.push(42);

    let p: P = 'x';
}

class TestSaveWithCollection {
    _name;
    _tags;

    constructor() {
        this._name = 'This is name.';
        // this._tags = [1,2,3,4,5];
        this._tags = [1,2,3,4,5,
            container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_wood', 10),
            // {foo: 'bar'},
        ];
    }
}

function createTestItemStorage(container: ContainerInterface) {
    let size = 20;
    let itemStorageFactory = container.get<ItemStorageFactory>('core.itemStorageFactory');
    let itemStorage = itemStorageFactory.create(20);
    itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
        container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_wood', 20)
    );
    itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
        container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_iron_ore', 20)
    );
    itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
        container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_one_handed_sword_01', 1)
    );
    itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
        container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_shield_01', 1)
    );

    return itemStorage;
}

function createTestWallet(container: ContainerInterface) {
    let wallet = container.get<WalletFactory>('core.walletFactory').create(container.get<RepositoryManager>('core.repositoryManager').getRepository<Currency>(Currency.name).getOneByAlias('currency_gold'));

    return wallet;
}

function createTestHero(continer: ContainerInterface) {
    let equipManager = continer.get<EquipManager>('core.equipManager');

    let hero = continer.get<HeroFactory>('core.heroFactory').create(
        continer.get<RepositoryManager>('core.repositoryManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
    );

    equipManager.equipNewItemStack(
        hero,
        continer.get<RepositoryManager>('core.repositoryManager').getRepository<EquipSlot>(EquipSlot.name).getOneByAlias('equip_slot_head'),
        continer.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_plate_helmet_01'),
        );
    equipManager.equipNewItemStack(
        hero,
        continer.get<RepositoryManager>('core.repositoryManager').getRepository<EquipSlot>(EquipSlot.name).getOneByAlias('equip_slot_right_hand'),
        continer.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_one_handed_sword_01'),
    );
    equipManager.equipNewItemStack(
        hero,
        continer.get<RepositoryManager>('core.repositoryManager').getRepository<EquipSlot>(EquipSlot.name).getOneByAlias('equip_slot_left_hand'),
        continer.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_shield_01'),
    );

    // hero.getComponentByName<E>()

    return hero;
}

export function devAutoSaveLoad_serialize() {
    // console.log(metadata);

    // let serializer = new Serializer(metadata, container);
    let serializer = container.get<Serializer>('server.serializer');

    // let testSaveWithCollection = new TestSaveWithCollection();
    // let serializeObject = serializer.serialize(testSaveWithCollection);
    // console.log(serializeObject);

    // let itemStack = container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_wood', 10);
    // let serializeObject = serializer.serialize(itemStack);
    // console.log(serializeObject);

    // let itemStackSlot = new ItemStackSlot();
    // itemStackSlot.placeItemStack(container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_wood', 10));
    // let serializeObject = serializer.serialize(itemStackSlot);
    // console.log(serializeObject);

    // let itemStorageComponent = itemStorage.getComponentByName(ItemStorageComponent.name);
    // let serializeObject = serializer.serialize(itemStorageComponent);
    // console.log(serializeObject);

    // let itemStorageSlotComponent = itemStorage.findComponentsByName(ItemStorageSlotComponent.name)[0];
    // let serializeObject = serializer.serialize(itemStorageSlotComponent);
    // console.log(serializeObject);

    let itemStorage = createTestItemStorage(container);
    let serializeObject = serializer.serialize(itemStorage);
    console.log(inspect(serializeObject, {
        depth: 10,
    }));

    // let wallet = createTestWallet(container);
    // let serializeObject = serializer.serialize(wallet);
    // console.log(inspect(serializeObject, {
    //     depth: 10,
    // }));

    // let hero = createTestHero(container);
    // debugHero(hero);
    // let serializeObject = serializer.serialize(hero);
    // console.log('serializeObject', inspect(serializeObject, {
    //     depth: 10,
    // }));
    console.log('json', JSON.stringify(serializeObject));
}

// function save(metadata, object) {
//     // console.log(object);
//     let objectMetadata = getMetadata(metadata, object.constructor.name);
//
//     let saveObject = {
//         classname: object.constructor.name,
//     };
//     for (const fieldKey in objectMetadata.mapping) {
//         if (!object.hasOwnProperty(fieldKey)) {
//             throw new AppError(sprintf('Поле "%s" не найдено в объекте "%s".', fieldKey, object.constructor.name));
//         }
//
//         if (objectMetadata.mapping[fieldKey].hasOwnProperty('callback')) {
//             saveObject[fieldKey] = objectMetadata.mapping[fieldKey]['callback'](metadata, object);
//             continue;
//         }
//
//         switch (objectMetadata.mapping[fieldKey].type) {
//             case SerializeType.Number:
//             case SerializeType.String:
//                 saveObject[fieldKey] = object[fieldKey];
//                 break;
//             case SerializeType.Object:
//                 saveObject[fieldKey] = save(metadata, object[fieldKey]);
//                 break;
//             case SerializeType.Collection:
//                 saveObject[fieldKey] = saveCollection(metadata, object[fieldKey])
//                 break;
//             case SerializeType.Link:
//                 saveObject[fieldKey] = getLink(object[fieldKey]);
//                 break;
//             default:
//                 throw new AppError(sprintf('Тип "%s" не поддерживается системой сериализации.', objectMetadata.mapping[fieldKey].type));
//                 break;
//         }
//     }
//
//     return saveObject;
// }
//
// function saveCollection(metadata, collection) {
//     return _.map(collection, (item) => {
//         if (PrimitiveType[typeof item]) {
//             return item.toString();
//         } else {
//             return save(metadata, item);
//         }
//     });
// }
//
// function saveObjet(object: object) {
//
// }
//
// function getMetadata(metadata: object, name: string) {
//     if (!metadata.hasOwnProperty(name)) {
//         throw AppError.metadataNotFound(name)
//     }
//
//     return metadata[name];
// }
//
// function getLink(object) {
//     let idGetMethodNames = [
//         '_id',
//         'id',
//     ];
//
//     let idGetMethodName = _.filter(idGetMethodNames, (idGetMethodName) => {
//         return object.hasOwnProperty(idGetMethodName);
//     })[0].toString();
//     if (!idGetMethodName) {
//         throw new AppError(sprintf('У объекта %s не найден ни один из методов доступа к id (%s).',
//             object.constructor.name,
//             _.join(idGetMethodNames, ', '),
//             ));
//     }
//
//     return {
//         classname: object.constructor.name,
//         id: object[idGetMethodName],
//     };
// }

export function testContainerGenerics() {
    // let repositoryManager = container.get<RepositoryManager>('core.repositoryManager');
    // let repositoryManager = container.get('core.repositoryManager');
    // repositoryManager.testRepositoryManagerMethod();

    let o: {[key: string]: any} = {};
    // let o: object = {};
    o.foo;
}

export function testLodashClone() {
    // let o1 = [1,2,3,4,5];
    let o1 = [{name: 'warrior', level: 1}, {name: 'mage', level: 1}];
    // let o2 = _.clone(o1);
    let o2 = _.cloneDeep(o1);
    // let o2 = o1;
    // let o2 = o1.concat();
    // o2.push(42);
    // o2.push(42);
    // o2.push(42);
    o2.push({name: 'rogue', level: 1});
    o1[0].level = 100;
    console.log(o1);
    console.log(o2);
}

export function testEnumSerialier() {
    let str = '';
    console.log(typeof str);
    console.log(PrimitiveType[typeof str]);
}

export function devAutoSaveLoad_unserialize() {
    let savePath = path.resolve(
        container.get<object>('server.config')['savesDir'],
        'test.json',
    );
    let data = JSON.parse(fs.readFileSync(savePath).toString());
    // console.log(data);

    let serializer = container.get<Serializer>('server.serializer');
    let object = serializer.unserialize(data);
    // console.log(object);
    console.log(inspect(object, {
        depth: 10,
    }));
}

export function devAutoSaveLoad_testEquial() {
    let serializer = container.get<Serializer>('server.serializer');

    testEqualSerializeObjects('ItemStorage', serializer, createTestItemStorage(container));
    testEqualSerializeObjects('Wallet', serializer, createTestWallet(container));
    testEqualSerializeObjects('Hero', serializer, createTestHero(container));
}

function testEqualSerializeObjects(name, serializer, object) {
    console.log('testEqualSerializeObjects: ' + name);
    let firstSerializeObject = serializer.serialize(object);
    let firstJson = JSON.stringify(firstSerializeObject);

    let unserializeObject = serializer.unserialize(firstSerializeObject);

    let secondSerializeObject = serializer.serialize(unserializeObject);
    let secondJson = JSON.stringify(secondSerializeObject);
    // console.log(object !== unserializeObject, 'objects not equal');
    // console.log(firstJson === secondJson, 'json equal');
    console.log(
        crypto.createHash('md5').update(firstJson).digest("hex") ===
        crypto.createHash('md5').update(secondJson).digest("hex"),
        'hash equal'
    );
}

export async function devAutoSaveLoad_main() {
    await container.get<GameConsole>('server.gameConsole').run('load_user_env', ['user03@email.com']);
    await container.get<GameConsole>('server.gameConsole').run('load_player_env', ['1']);
    // console.log(container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator'));
    // await container.get<GameConsole>('server.gameConsole').run('save_player_env');
    await container.get<GameConsole>('server.gameConsole').run('debug_player_env');

    // let itemStorageID = 8;
    // _.map([17, 18, 19, 20, 21], (componentID) => {
    //     container.get<GameObjectStorage>('core.gameObjectStorage')
    //         .getOneByID(itemStorageID)
    //         .getComponentByID<ItemStorageSlotComponent>(componentID)
    //         .clear()
    //     ;
    // });
    // await container.get<GameConsole>('server.gameConsole').run('debug_player_env');

    // container.get<ItemStorageManager>('core.itemStorageManager').addItemStack(
    //     container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_wood', 20),
    // );
    // container.get<ItemStorageManager>('core.itemStorageManager').addItemStack(
    //     container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_wood', 20),
    // );
    // container.get<ItemStorageManager>('core.itemStorageManager').addItemStack(
    //     container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_wood', 20),
    // );
    // container.get<ItemStorageManager>('core.itemStorageManager').addItemStack(
    //     container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_wood', 20),
    // );
    // container.get<ItemStorageManager>('core.itemStorageManager').addItemStack(
    //     container.get<ItemStackFactory>('core.itemStackFactory').createByItemAlias('item_wood', 20),
    // );
    // await container.get<GameConsole>('server.gameConsole').run('save_player_env');
}

export function devAutoSaveLoad_services() {
    let IDGenerator = new AutoIncrementIDGenerator(100);

    let serializer = container.get<Serializer>('server.serializer');
    let serializeObject = serializer.serialize(IDGenerator);
    console.log(serializeObject);

    let unserializeIDGenerator = serializer.unserialize(serializeObject);
    console.log('unserializeIDGenerator', unserializeIDGenerator);
}

//Весь сценарий создания пользователя и игрока.
export async function createUserAndPlayer() {
    await container.get<GameConsole>('server.gameConsole').run('create_user_env', ['user01@email.com', 'qweasdzxc']);
    await container.get<GameConsole>('server.gameConsole').run('create_user_env', ['user01@email.com', 'qweasdzxc']);
    await container.get<GameConsole>('server.gameConsole').run('create_player_env');
    await container.get<GameConsole>('server.gameConsole').run('save_player_env');
}

export async function loadUserAndPlayer() {
    await container.get<GameConsole>('server.gameConsole').run('load_user_env', ['user01@email.com']);
    await container.get<GameConsole>('server.gameConsole').run('load_player_env', ['1']);
    await container.get<GameConsole>('server.gameConsole').run('debug_player_env');
}

export function devPlayerDBObject() {
    let userDBObjectFactory = container.get<UserDBObjectFactory>('server.userDBObjectFactory');
    let userDBObjectRepository = container.get<UserDBObjectRepository<UserDBObject>>('server.userDBObjectRepository');
    let playerDBObjectFactory = container.get<PlayerDBObjectFactory>('server.playerDBObjectFactory');
    let playerDBObjectRepository = container.get<PlayerDBObjectRepository<PlayerDBObject>>('server.playerDBObjectRepository');

    let email = 'user11@emal.com';
    let userDBObject = userDBObjectFactory.create(email, 'qweasdzxc');
    new Promise((resolve, reject) => {
        container.get<Pool>('server.database.pool').getConnection((err, connection) => {
            userDBObjectRepository.save(
                connection,
                userDBObject,
                () => {
                    console.log('user created: ' + userDBObject['_id']);
                    let playerDBObject = playerDBObjectFactory.create('this is name', userDBObject);
                    playerDBObjectRepository.save(connection, playerDBObject, () => {
                        console.log('player created: ' + playerDBObject['_id']);
                    }, reject);
                    // resolve();
                },
                reject,
            );
        });
    });
}

export async function devRemoveServicesByStringPattern() {
    await container.get<GameConsole>('server.gameConsole').run('load_user_env', ['user01@email.com']);
    await container.get<GameConsole>('server.gameConsole').run('load_player_env', ['player01']);
    // await container.get<GameConsole>('server.gameConsole').run('debug_player_env');
    debugContainer(container);
    // container.remove('core');
    // container.remove('core.');
    container.remove('core.*');
    debugContainer(container);
}

export async function devSyncCreateUserAndPlayer() {
    // await container.get<GameConsole>('server.gameConsole').run('load_user_env', ['user01@email.com']);
    // await container.get<GameConsole>('server.gameConsole').run('load_player_env', ['player01']);
    // await container.get<GameConsole>('server.gameConsole').run('debug_player_env');

    let username = 'user05';
    await container.get<GameConsole>('server.gameConsole').run('create_user_env_sync', [username + '@email.com', 'qweasdzxc']);
    console.log('result in function', container.get('result'));
    // await container.get<GameConsole>('server.gameConsole').run('create_player_env', ['user03_player01']);
    // await container.get<GameConsole>('server.gameConsole').run('debug_player_env');
    // await container.get<GameConsole>('server.gameConsole').run('save_player_env');
}