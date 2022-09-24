import ContainerInterface from '../core/source/ContainerInterface.js';
import DefaultContainerConfigure from '../core/app/DefaultContainerConfigure.js';
import Container from '../core/source/Container.js';
import CoreContainerConfigure from '../core/app/CoreContainerConfigure.js';
import PlayerContainerConfigure from '../core/app/PlayerContainerConfigure.js';
import LocationFactory from '../core/app/Factories/LocationFactory.js';
import GameObjectFactory from '../core/app/Factories/GameObjectFactory.js';
import IDGeneratorInterface from '../core/source/IDGeneratorInterface.js';
import ItemStackFactory from '../core/app/Factories/ItemStackFactory.js';
import HeroFactory from '../core/app/Factories/HeroFactory.js';
import LocationComponent from '../core/app/Components/LocationComponent.js';
import {LevelRange} from '../core/app/Components/LevelComponent.js';
import RandomItemGenerator from '../core/app/RandomItemGenerator.js';
import EntityManager from '../core/source/EntityManager.js';
import ItemDatabase from '../core/app/ItemDatabase.js';
import _, {result} from 'lodash';
import Item from '../core/app/Entities/Item.js';
import AppError from '../core/source/AppError.js';
import ItemCategory from '../core/app/Entities/ItemCategory.js';
import Quality from '../core/app/Entities/Quality.js';
import Random from '../core/app/Services/Random.js';
import {extractItems} from '../core/app/indev.js';
import ItemStorageFactory from '../core/app/Factories/ItemStorageFactory.js';
import {debugItemStorage} from '../core/debug/debug_functions.js';
import ItemStorageComponent from '../core/app/Components/ItemStorageComponent.js';
import {cpus} from 'os';
import GameObjectAsReact, {LocationProps, LocationType} from '../core/source/GameObjectAsReact.js';

export class SandboxController {
    private _container: ContainerInterface;

    init() {
        this._container = new Container();
        (new DefaultContainerConfigure()).configure(this._container);
        (new CoreContainerConfigure()).configure(this._container);
        (new PlayerContainerConfigure()).configure(this._container);
    }

    // run() {
    //     this._main();
    // }

    main() {
        this.testDateDiffs();
    }

    locationFactory() {
        let idGenerator = this._container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator');
        let heroFactory = this._container.get<HeroFactory>('player.heroFactory');

        let heroes = [
            heroFactory.create('warrior', 9),
            heroFactory.create('rogue', 42),
            heroFactory.create('gunslinger'),
            heroFactory.create('mage'),
            heroFactory.create('mage'),
            heroFactory.create('warrior'),
        ];

        let locationFactory = new LocationFactory(
            idGenerator,
            this._container.get<GameObjectFactory>('player.gameObjectFactory'),
            this._container.get<ItemStackFactory>('player.itemStackFactory'),
            this._container.get<EntityManager>('core.entityManager'),
            this._container.get<ItemDatabase>('core.itemDatabase'),
            this._container.get<Random>('core.random'),
        );

        let location = locationFactory.create({
            level: new LevelRange(1, 5),
            // level: new LevelRange(10, 20),
        });
        // console.log(location);
        let locationComponent = location.getComponent<LocationComponent>('locationComponent');
        locationComponent.addHero(heroes[0]);
        locationComponent.addHero(heroes[1]);
        locationComponent.addHero(heroes[2]);
        // locationComponent.addHero(heroes[3]);
        // locationComponent.addHero(heroes[4]);
        // console.log(locationComponent);
        locationComponent.start();
        locationComponent.stop();
    }

    randomItemGenerator() {
        let em = this._container.get<EntityManager>('core.entityManager');

        let itemDatabase = new ItemDatabase(
            _.concat(em['_repositories'][Item.name]['_items']),
        );
        // console.log(itemDatabase.count());
        // console.log(itemDatabase.count());
        // console.log(itemDatabase.all());

        let randomItemGenerator = new RandomItemGenerator(
            itemDatabase,
        );
        // console.log(randomItemGenerator);
        // console.log(randomItemGenerator.generateItems(4242));
        // console.log(em.get<Item>(Item, 'plate_helmet_02'));
        // console.log(em.get<Item>(Item, 'plate_helmet_02').name);
        console.log(_.map(randomItemGenerator.generateItems(4242), (item) => {
            return item['name'];
        }));

        // // let max = 10_000;
        // let max = 1_000_000;
        // let i = 0;
        // while (i < max) {
        //     // console.log(randomItemGenerator.generate().name);
        //     // console.log(item instanceof Item ? true : false);
        //     let item = randomItemGenerator.generate();
        //     if (!(item instanceof Item)) {
        //         console.log(false);
        //         // console.log(item);
        //     }
        //     ++i;
        // }

        // let items = itemDatabase.all();
        // console.log(items.length);
        // for (let i = 0; i < items.length; i++) {
        //     console.log(items[i] instanceof Item ? true : false);
        // }
    }

    itemDatabaseFilter() {
        let em = this._container.get<EntityManager>('core.entityManager');
        let random = new Random();

        let itemDatabase = new ItemDatabase(
            extractItems(em),
        );
        // console.log(itemDatabase);
        let resources = itemDatabase.filter({
            // itemCategory: [],
            itemCategory: [
                em.get<ItemCategory>(ItemCategory, 'resources'),
                em.get<ItemCategory>(ItemCategory, 'one_handed_swords'),
                em.get<ItemCategory>(ItemCategory, 'helmets'),
                // {itemCategory: null, includeChildren: false},
                // {itemCategory: em.get<ItemCategory>(ItemCategory, 'resources'), includeChildren: false},
                // {itemCategory: em.get<ItemCategory>(ItemCategory, 'resources')},
            ],
            // quality: [em.get<Quality>(Quality, 'epic')],
        });
        resources = [
            // itemDatabase.get('iron_ore'),
            itemDatabase.get('iron_ore'),
            itemDatabase.get('iron_bar'),
            itemDatabase.get('copper_ore'),
        ];
        // console.log('resources', resources);
        console.log(_.map(resources, item => [item.itemCategory.name, item.name]));
        // console.log(random.one(resources).name);
        // console.log(random.some(resources, 3, {unique: true}));
        console.log(_.map(random.some(resources, 3, {unique: true}), item => [item.itemCategory.name, item.name]));
    }

    testDateDiffs() {
        // let now = new Date();
        let now = new Date();
        let created = new Date('2022-09-20T19:41:41.987Z');
        let future = new Date('2022-12-17T03:24:00');
        // console.log(now);
        console.log(created);
        // created.setMinutes(123123123);
        created.setMinutes(created.getMinutes() + 20);
        console.log(created);
        // console.log(new Date() > created);
        // console.log(future);
        // console.log(now > future);
        // console.log(now < future);
    }

    chanceGetStarted() {
        console.log('chanceGetStarted');
        /*
            Есть предметы выпадающие из врага. Пусть враг скелет
                предмет 1 = 20%/0.2 - ткань; Это вероятность на каждое убийство.
                предмет 2 = 10%/0.1 - кости
                предмет 3 = 1%/0.01 - epic меч
                предмет 4 = 5%/0.05 - серый предмет
                В луте может не быть предметов вообще. Кроме золото, но у него нет шанса.
         */
    }

    testItemStackSeparate() {
        // let em: EntityManager = this._container.get('core.entityManager');
        let db: ItemDatabase = this._container.get('core.itemDatabase');
        let itemStackFactory: ItemStackFactory = this._container.get('player.itemStackFactory');

        let item = {
            item: db.get('wood'),
            // count: 1,
            count: 123,
        };
        // console.log(item);

        let itemStacks = itemStackFactory.createSome(item.item, item.count);
        console.log(_.map(itemStacks, itemStack => [itemStack.item.name, itemStack.count]));
        console.log(itemStacks.length);
    }

    testItemStorageComponentWithSeparate() {
        let db: ItemDatabase = this._container.get('core.itemDatabase');
        let itemStackFactory: ItemStackFactory = this._container.get('player.itemStackFactory');

        let itemStorage = this._container.get<ItemStorageFactory>('player.itemStorageFactory').create(10);
        let itemStorageComponent = itemStorage.getComponent<ItemStorageComponent>('itemStorageComponent');
        // console.log(itemStorageComponent);
        // debugItemStorage(itemStorage);

        // itemStorageComponent.addItem(db.get('wood'), 12);
        let item = db.get('wood');
        // let counts = [
        //     8,
        //     8,
        //     8,
        //     // 145,
        //     // 12,
        //     // 22,
        //     // 42,
        //     // 55,
        //     // 56,
        //     // 54,
        //     // 100,
        //     // 2000,
        // ];
        let counts = _.fill(Array(100), 8);
        let remainder = [];
        // remainder.push(itemStorageComponent.addItem(item, counts[0]));
        // remainder.push(itemStorageComponent.addItem(item, counts[1]));
        // remainder.push(itemStorageComponent.addItem(item, counts[2]));
        _.map(counts, (count) => {
            remainder.push(itemStorageComponent.addItem(item, count));
        });
        console.log(counts, remainder);
        // itemStorageComponent.addItem(db.get('wood'), 12);
        // itemStorageComponent.addItem(db.get('wood'), 12);

        debugItemStorage(itemStorage);
    }

    gameObjectAsReact() {
        // let a: LocationType;
        let hero = new GameObjectAsReact<LocationType>(undefined);
        // let n = hero.foo;
    }
}