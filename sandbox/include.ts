import PlayerFactory from '../core/app/Factories/PlayerFactory.js';
import AutoIncrementIDGenerator from '../core/source/AutoIncrementIDGenerator.js';
import UserFactory from '../core/app/Factories/UserFactory.js';
import Container from '../core/source/Container.js';
import CoreContainerConfigure from '../core/app/ContainerConfigure.js';
import WalletFactory from '../core/app/Factories/WalletFactory.js';
import RepositoryManager from '../core/source/RepositoryManager.js';
import Currency from '../core/app/Entities/Currency.js';
import GameObjectStorage from '../core/source/GameObjectStorage.js';
import GameObject from '../core/source/GameObject.js';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';
import HeroFactory from '../core/app/Factories/HeroFactory.js';
import HeroClass from '../core/app/Entities/HeroClass.js';
import {debugHero, debugItem, debugItemStack, debugItemStorage} from '../core/debug/debug_functions.js';
import debug from 'debug';
import ItemStorageFactory from '../core/app/Factories/ItemStorageFactory.js';
import ItemStorageComponent from '../core/app/Components/ItemStorageComponent.js';
import ItemStack from '../core/app/RuntimeObjects/ItemStack.js';
import Item from '../core/app/Entities/Item.js';

let container = new Container();
(new CoreContainerConfigure).configure(container);

export function playerFactory_create() {
    let idGenerator: AutoIncrementIDGenerator = container.get('realtimeObjectIdGenerator');

    let playerFactory = new PlayerFactory(idGenerator, {
        maxLevel: 100,
    });

    let player = playerFactory.create();
    console.log(player);
}

export function userFactory_create() {
    let idGenerator: AutoIncrementIDGenerator = container.get('realtimeObjectIdGenerator');

    let userFactory = new UserFactory(idGenerator);

    let user = userFactory.create();
    console.log(user);
}

export function walletFactory_create() {
    let idGenerator: AutoIncrementIDGenerator = container.get('realtimeObjectIdGenerator');

    let walletFactory = new WalletFactory(idGenerator);

    let wallets = [
        walletFactory.create(
            (<RepositoryManager>container.get('repositoryManager')).getRepository(Currency.name).getOneByAlias('currency_gold'),
            10000
        ),
        walletFactory.create(
            (<RepositoryManager>container.get('repositoryManager')).getRepository(Currency.name).getOneByAlias('currency_research_points'),
            10
        ),
    ];
    console.log(wallets[0]);
    console.log(wallets[1]);
}

export function devGameObjectStorage() {
    let idGenerator: AutoIncrementIDGenerator = container.get('realtimeObjectIdGenerator');

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
    let userFactory: UserFactory = container.get('userFactory');
    let playerFactory: PlayerFactory = container.get('playerFactory');
    let walletFactory: WalletFactory = container.get('walletFactory');
    let heroFactory: HeroFactory = container.get('heroFactory');
    let itemStorageFactory: ItemStorageFactory = container.get('itemStorageFactory');

    let gameObjectStorage: GameObjectStorage = container.get('gameObjectStorage');

    gameObjectStorage.add(userFactory.create());
    gameObjectStorage.add(playerFactory.create());
    gameObjectStorage.add(walletFactory.create(
        container.get('repositoryManager').getRepository(Currency.name).getOneByAlias('currency_gold'),
        10000,
    ));
    gameObjectStorage.add(walletFactory.create(
        container.get('repositoryManager').getRepository(Currency.name).getOneByAlias('currency_research_points'),
        10,
    ));
    gameObjectStorage.add(heroFactory.create(container.get('repositoryManager').getRepository(HeroClass.name).getOneByAlias('hero_class_warrior'), 1));
    gameObjectStorage.add(heroFactory.create(container.get('repositoryManager').getRepository(HeroClass.name).getOneByAlias('hero_class_warrior'), 1));
    gameObjectStorage.add(heroFactory.create(container.get('repositoryManager').getRepository(HeroClass.name).getOneByAlias('hero_class_mage'), 1));
    gameObjectStorage.add(heroFactory.create(container.get('repositoryManager').getRepository(HeroClass.name).getOneByAlias('hero_class_rogue'), 1));

    gameObjectStorage.add(itemStorageFactory.create());
    gameObjectStorage.add(itemStorageFactory.create());
    gameObjectStorage.add(itemStorageFactory.create());
    gameObjectStorage.add(itemStorageFactory.create());
    gameObjectStorage.add(itemStorageFactory.create());

    console.log(gameObjectStorage);
}

export function devGameObjectStorage_newHeroScenario() {
    let heroFactory: HeroFactory = container.get('heroFactory');
    // let gameObjectStorage: HeroFactory = container.get('heroFactory');

    let heroClassAlias = 'hero_class_warrior';
    let level = 1;
    let heroClass = container.get('repositoryManager').getRepository(HeroClass.name).getOneByAlias(heroClassAlias);

    let heroes = [
        heroFactory.create(container.get('repositoryManager').getRepository(HeroClass.name).getOneByAlias('hero_class_warrior'), level),
        heroFactory.create(container.get('repositoryManager').getRepository(HeroClass.name).getOneByAlias('hero_class_warrior'), level),
        heroFactory.create(container.get('repositoryManager').getRepository(HeroClass.name).getOneByAlias('hero_class_mage'), level),
        heroFactory.create(container.get('repositoryManager').getRepository(HeroClass.name).getOneByAlias('hero_class_rogue'), level),
        // heroFactory.create(container.get('repositoryManager').getRepository(HeroClass.name).getOneByAlias('hero_class_gunslinger'), level),
    ];

    _.map(heroes, (value) => {
        debugHero(value);
        debug('debug')(_.repeat('-', 32));
    });
}

export function devCreateItemStorage() {
    let itemStorageFactory: ItemStorageFactory = container.get('itemStorageFactory');

    // let itemStorage = itemStorageFactory.create(100);
    let itemStorage = itemStorageFactory.create();
    let itemStorageComponent= <ItemStorageComponent>itemStorage.getComponentByName(ItemStorageComponent.name);
    // let freeItemStorageSlotComponent = itemStorageComponent.findFirstFreeItemStorageSlotComponent();
    // debugItemStack(freeItemStorageSlotComponent.itemStack);
    // freeItemStorageSlotComponent.placeItemStack(new ItemStack(container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_wood'), 30));
    // debugItemStack(freeItemStorageSlotComponent.itemStack);

    let freeItemStorageSlotComponent = undefined;
    while (freeItemStorageSlotComponent = itemStorageComponent.findFirstFreeItemStorageSlotComponent()) {
    // while (freeItemStorageSlotComponent = itemStorageComponent.getFirstFreeItemStorageSlotComponent()) {
        freeItemStorageSlotComponent.placeItemStack(new ItemStack(container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_wood'), 20));
    }
    debugItemStorage(itemStorage);
}