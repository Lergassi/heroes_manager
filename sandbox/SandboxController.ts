// noinspection TypeScriptCheckImport

import ContainerInterface from '../core/source/ContainerInterface.js';
import DefaultContainerConfigure from '../core/app/DefaultContainerConfigure.js';
import Container from '../core/source/Container.js';
// noinspection TypeScriptCheckImport
import CoreContainerConfigure from '../core/app/CoreContainerConfigure.js';
import PlayerContainerConfigure from '../core/app/PlayerContainerConfigure.js';
import LocationFactory from '../core/app/Factories/LocationFactory.js';
import GameObjectFactory from '../core/app/Factories/GameObjectFactory.js';
import IDGeneratorInterface from '../core/source/IDGeneratorInterface.js';
import ItemStackFactory from '../core/app/Factories/ItemStackFactory.js';
import HeroFactory from '../core/app/Factories/HeroFactory.js';
import LocationComponent from '../core/app/Components/LocationComponent.js';
import RandomItemGenerator from '../core/app/RandomItemGenerator.js';
import EntityManager from '../core/source/EntityManager.js';
import ItemDatabase from '../core/app/ItemDatabase.js';
import _ from 'lodash';
import Item from '../core/app/Entities/Item.js';
import ItemCategory from '../core/app/Entities/ItemCategory.js';
import Random from '../core/app/Services/Random.js';
import {extractItems} from '../core/app/indev.js';
import ItemStorageFactory from '../core/app/Factories/ItemStorageFactory.js';
import {debugHero, debugItemStorage, debugNewItemStorage} from '../core/debug/debug_functions.js';
import ItemStorageComponent from '../core/app/Components/ItemStorageComponent.js';
import GameObjectAsReact, {LocationType} from '../core/source/GameObjectAsReact.js';
import GameContainer from '../core/source/GameContainer.js';
import ItemSlot from '../core/app/Components_v2/ItemSlot.js';
import ItemStorageController from '../core/app/Components_v2/ItemStorageController.js';
import HeroClass from '../core/app/Entities/HeroClass.js';
import GameObject from '../core/source/GameObject.js';
import HeroGroupComponent from '../core/app/Components/HeroGroupComponent.js';
import EnemyFactory from '../core/app/Factories/EnemyFactory.js';
import {EntityManagerKey} from '../core/app/types.js';
import ExperienceComponentFactory from '../core/app/Factories/ExperienceComponentFactory.js';
import EnemyType from '../core/app/Entities/EnemyType.js';
import HealthPointsComponent from '../core/app/Components/HealthPointsComponent.js';
import ItemAttributeCollectorComponent from '../core/app/Components/ItemAttributeCollectorComponent.js';
import EnemyGroupComponent from '../core/app/Components/EnemyGroupComponent.js';
import AttackPowerComponent from '../core/app/Components/AttackPowerComponent.js';
import {ContainerKey} from '../core/types/enums/ContainerKey.js';
import CharacterAttributeComponent from '../core/app/Components/CharacterAttributeComponent.js';
import CharacterAttributeRawValueCollectorComponent from '../core/app/Components/CharacterAttributeRawValueCollectorComponent.js';
import {ItemCategoryID} from '../core/types/enums/ItemCategoryID.js';
import {CharacterAttributeID} from '../core/types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../core/types/enums/HeroClassID.js';
import {EnemyTypeID} from '../core/types/enums/EnemyTypeID.js';
import {ItemID} from '../core/types/enums/ItemID.js';

export class SandboxController {
    private _container: ContainerInterface;

    init() {
        this._container = new Container();
        (new DefaultContainerConfigure()).configure(this._container);
        (new CoreContainerConfigure()).configure(this._container);
        (new PlayerContainerConfigure()).configure(this._container);
    }

    run() {
        this.main();
    }

    main() {
        // this.testRound();

        // this.testDateDiffs();
        // this.testNewComponents();
        // this.gameContainerGetStarted();
        // this.testReadonly();
        // this.testRandom_oneFromRange();
        // this.testLodashPull();

        // this.devHeroFactory();
        // this.devLocation();
        // this.devGoldLootGeneratorComponent();
        // this.devLevelComponent();
        // this.devLootGenerator();
        this.devFight();
        // this.devAttackPowerComponent();
    }

    devLocation() {
        let locationFactory = this._container.get<LocationFactory>(ContainerKey.LocationFactory);

        let location = locationFactory.create({
            level: 1,
        });
        console.log(location);
    }

    devHeroFactory() {
        this._container.get<HeroFactory>('player.heroFactory').create({
            heroClass: this._container.get<EntityManager>(ContainerKey.EntityManager).get<HeroClass>(HeroClass, HeroClassID.Warrior),
            level: 1,
        });
    }

    devLocationFactory() {
        let idGenerator = this._container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator');
        let heroFactory = this._container.get<HeroFactory>('player.heroFactory');
        let em = this._container.get<EntityManager>(ContainerKey.EntityManager);

        let heroes = [
            heroFactory.create({
                heroClass: em.get<HeroClass>(HeroClass, HeroClassID.Warrior),
                level: 1,
            }),
            heroFactory.create({
                heroClass: em.get<HeroClass>(HeroClass, HeroClassID.Rogue),
                level: 1,
            }),
            heroFactory.create({
                heroClass: em.get<HeroClass>(HeroClass, HeroClassID.Gunslinger),
                level: 1,
            }),
            heroFactory.create({
                heroClass: em.get<HeroClass>(HeroClass, HeroClassID.Mage),
                level: 1,
            }),
            heroFactory.create({
                heroClass: em.get<HeroClass>(HeroClass, HeroClassID.Mage),
                level: 1,
            }),
            heroFactory.create({
                heroClass: em.get<HeroClass>(HeroClass, HeroClassID.Warrior),
                level: 1,
            }),
        ];

        let locationFactory = new LocationFactory({
            entityManager: this._container.get<EntityManager>('core.entityManager'),
            gameObjectFactory: this._container.get<GameObjectFactory>('player.gameObjectFactory'),
            itemDatabase: this._container.get<ItemDatabase>(ContainerKey.ItemDatabase),
            itemStackFactory: this._container.get<ItemStackFactory>(ContainerKey.ItemStackFactory),
            itemStorageFactory: this._container.get<ItemStorageFactory>('player.itemStorageFactory'),
        });

        let location = locationFactory.create({
            level: 1,
        });
        // console.log(location);

        let locationComponent = location.getComponent<LocationComponent>('locationComponent');
        // console.log(locationComponent);
        // console.log(heroes[0]);
        locationComponent.addHero(heroes[0]);
        locationComponent.addHero(heroes[1]);
        // locationComponent.addHero(heroes[2]);
        // locationComponent.addHero(heroes[2]);
        // console.log(locationComponent['_heroGroupComponent']);
        // // locationComponent.start();
        // // locationComponent.stop();
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
        // console.log(em.get<Item>(Item, ItemID.PlateHelmet_02));
        // console.log(em.get<Item>(Item, ItemID.PlateHelmet_02).name);
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
        // let random = new Random();

        let itemDatabase = new ItemDatabase(
            extractItems(em),
        );
        // console.log(itemDatabase);
        let resources = itemDatabase.filter({
            // itemCategory: [],
            itemCategory: [
                em.get<ItemCategory>(ItemCategory, ItemCategoryID.Resources),
                em.get<ItemCategory>(ItemCategory, ItemCategoryID.OneHandedSwords),
                em.get<ItemCategory>(ItemCategory, ItemCategoryID.Helmets),
                // {itemCategory: null, includeChildren: false},
                // {itemCategory: em.get<ItemCategory>(ItemCategory, ItemCategoryAlias.Resources), includeChildren: false},
                // {itemCategory: em.get<ItemCategory>(ItemCategory, ItemCategoryAlias.Resources)},
            ],
            // quality: [em.get<Quality>(Quality, QualityID.Epic)],
        });
        resources = [
            // itemDatabase.get(ItemID.IronOre),
            itemDatabase.get(ItemID.IronOre),
            itemDatabase.get(ItemID.IronBar),
            itemDatabase.get(ItemID.CopperOre),
        ];
        // console.log(ItemCategoryAlias.Resources, resources);
        // console.log(_.map(resources, item => [item.itemCategory.name, item.name]));
        // console.log(random.one(resources).name);
        // console.log(random.some(resources, 3, {unique: true}));
        // console.log(_.map(Random.some(resources, 3, {unique: true}), item => [item.itemCategory.name, item.name]));
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
        let db: ItemDatabase = this._container.get(ContainerKey.ItemDatabase);
        let itemStackFactory: ItemStackFactory = this._container.get(ContainerKey.ItemStackFactory);

        let item = {
            item: db.get(ItemID.Wood),
            // count: 1,
            count: 123,
        };
        // console.log(item);

        let itemStacks = itemStackFactory.createSome(item.item, item.count);
        console.log(_.map(itemStacks, itemStack => [itemStack.item.name, itemStack.count]));
        console.log(itemStacks.length);
    }

    testItemStorageComponentWithSeparate() {
        let db: ItemDatabase = this._container.get(ContainerKey.ItemDatabase);
        let itemStackFactory: ItemStackFactory = this._container.get(ContainerKey.ItemStackFactory);

        let itemStorage = this._container.get<ItemStorageFactory>('player.itemStorageFactory').create(10);
        let itemStorageComponent = itemStorage.getComponent<ItemStorageComponent>('itemStorageComponent');
        // console.log(itemStorageComponent);
        // debugItemStorage(itemStorage);

        // itemStorageComponent.addItem(db.get(ItemID.Wood), 12);
        let item = db.get(ItemID.Wood);
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
        // itemStorageComponent.addItem(db.get(ItemID.Wood), 12);
        // itemStorageComponent.addItem(db.get(ItemID.Wood), 12);

        debugItemStorage(itemStorage);
    }

    gameObjectAsReact() {
        // let a: LocationType;
        let hero = new GameObjectAsReact<LocationType>(undefined);
        // let n = hero.foo;
    }

    private testNewComponents() {
        let itemStorageFactory = this._container.get<ItemStorageFactory>('player.itemStorageFactory');

        let itemStorage = itemStorageFactory.create(20);
        // console.log(itemStorage);
        // debugNewItemStorage(itemStorage);
        let controller = itemStorage.getComponent<ItemStorageComponent>('itemStorageComponent');
        controller.addItem(this._container.get<ItemDatabase>(ContainerKey.ItemDatabase).get(ItemID.Wood), 24);
        debugItemStorage(itemStorage);
        // let itemStorage = new ItemStorageComponent();
    }

    gameContainerGetStarted() {
        let itemStackFactory = this._container.get<ItemStackFactory>(ContainerKey.ItemStackFactory);
        let db = this._container.get<ItemDatabase>(ContainerKey.ItemDatabase);

        // let itemStorage = new GameContainer();
        // console.log(itemStorage);
        // console.log(new GameContainer());

        // let itemSlot1 = new ItemSlotComponent();
        // let itemSlot2 = new ItemSlotComponent();
        // // console.log(itemSlot1);
        // itemSlot1.place(itemStackFactory.create(db.get(ItemID.Wood), 10));
        // itemSlot2.place(itemStackFactory.create(db.get(ItemID.Wood), 20));
        // console.log(itemSlot1);
        // console.log(itemSlot2);
        // itemSlot1.replace(itemSlot2);
        // console.log(itemSlot1);
        // console.log(itemSlot2);

        // let itemSlotContainer = new GameContainer();
        // itemSlotContainer.set('itemSlot', new ItemSlot());
        // console.log(itemSlotContainer);
        // let itemSlot = itemSlotContainer.get<ItemSlot>('itemSlot');
        // // console.log(itemSlot);
        // // let itemStack = itemSlot.place(itemStackFactory.create(db.get(ItemID.Wood), 10));
        // let itemStack = itemSlot.place(itemStackFactory.create(db.get(ItemID.Wood), 20));
        // console.log(itemStack);
        // console.log(itemStack.add(4));
        // console.log(itemStack.add(40));
        // console.log(itemStack.add(41));
        // console.log(itemStack.add(91));
        // console.log(itemStack.changeCount(4));
        // console.log(itemStack.add(-12));
        // console.log(itemStack.remove(8));
        // console.log(itemStack.remove(0));
        // console.log(itemStack.remove(2122));
        // console.log(itemStack);

        let itemStorage = new GameContainer();
        let size = 10;
        let itemSlots = [];
        for (let i = 0; i < size; i++) {
            // let itemSlot = new GameContainer();
            // itemSlot.set('itemSlot', new ItemSlot());
            // itemSlots.push(itemSlot);
            let itemSlot = itemStorage.setComponent('slot_' + i, new ItemSlot());
            itemSlots.push(itemSlot);
        }
        // itemStorage.set<GameContainer[]>('itemSlots', itemSlots);
        let itemStorageController = itemStorage.setComponent<ItemStorageController>('controller', new ItemStorageController({
            itemSlots: itemSlots,
            itemStackFactory: itemStackFactory,
        }));

        // console.dir(itemStorage, {depth: 4});
        // itemStorage.get<GameContainer[]>('itemSlots')[0].get<ItemSlot>('itemSlot').place(itemStackFactory.create(db.get(ItemID.Wood), 10));
        itemStorage.getComponent<ItemStorageController>('controller').addItem(db.get(ItemID.Wood), 12);
        itemStorage.getComponent<ItemStorageController>('controller').addItem(db.get(ItemID.Wood), 12);
        itemStorage.getComponent<ItemStorageController>('controller').addItem(db.get(ItemID.Wood), 12);
        // console.log(itemStorage.get<GameContainer[]>('itemSlots')[0]['_components']['itemSlot']);
        debugNewItemStorage(itemStorage);

        // console.log(itemStorageController.addItemStack(itemStackFactory.create(db.get(ItemID.Wood), 10)));
        // console.log(itemStorageController.addItemStack(itemStackFactory.create(db.get(ItemID.Wood), 10)));
        // console.log(itemStorageController.addItemStack(itemStackFactory.create(db.get(ItemID.Wood), 10)));
        // console.log(itemStorageController.addItemStack(itemStackFactory.create(db.get(ItemID.Wood), 10)));
        // console.log(itemStorageController.addItemStack(itemStackFactory.create(db.get(ItemID.Wood), 10)));
        // console.log(itemStorageController.addItemStack(itemStackFactory.create(db.get(ItemID.Wood), 10)));
        // console.log(itemStorageController.addItemStack(itemStackFactory.create(db.get(ItemID.Wood), 10)));
        // console.log(itemStorageController.addItemStack(itemStackFactory.create(db.get(ItemID.Wood), 10)));
        // console.log(itemStorageController.addItemStack(itemStackFactory.create(db.get(ItemID.Wood), 10)));
        // console.log(itemStorageController.addItemStack(itemStackFactory.create(db.get(ItemID.Wood), 10)));
        // console.log(itemStorageController.addItemStack(itemStackFactory.create(db.get(ItemID.Wood), 10)));
        // console.dir(itemStorage, {depth: 5});
    }

    testHeroFactory() {
        let heroClass = this._container.get<EntityManager>(ContainerKey.EntityManager).get<HeroClass>(HeroClass, HeroClassID.Warrior);
        let hero = this._container.get<HeroFactory>('player.heroFactory').create({
            heroClass: heroClass,
            level: 1,
        });
        debugHero(hero);
    }

    testLocationFactory() {
        let location = this._container.get<LocationFactory>(ContainerKey.LocationFactory).create({
            // level: new LevelRange(1, 5),
            level: 1,
        });
        console.log(location);
    }

    // devLocation() {
    //
    // }

    devHeroGroup() {
        let heroFactory = this._container.get<HeroFactory>('player.heroFactory');
        let em = this._container.get<EntityManager>(ContainerKey.EntityManager);

        let heroes = [
            // heroFactory.create(em.get<HeroClass>(HeroClass, HeroClassAlias.Warrior), 9),
            // heroFactory.create(em.get<HeroClass>(HeroClass, HeroClassAlias.Rogue), 42),
            // heroFactory.create(em.get<HeroClass>(HeroClass, HeroClassAlias.Gunslinger)),
            // heroFactory.create(em.get<HeroClass>(HeroClass, HeroClassAlias.Mage)),
            // heroFactory.create(em.get<HeroClass>(HeroClass, HeroClassAlias.Mage)),
            // heroFactory.create(em.get<HeroClass>(HeroClass, HeroClassAlias.Warrior)),
        ];

        // let heroGroup = new GameObject();
        let heroGroup = this._container.get<GameObjectFactory>('player.gameObjectFactory').create();

        let size = 5;
        let heroGroupComponent = heroGroup.set('heroGroup', new HeroGroupComponent({
            size: 5,
        }));
        // console.log(heroGroup);

        // heroGroupComponent.setHero(heroes[0]);
        heroGroupComponent.addHero(heroes[0]);
        heroGroupComponent.addHero(heroes[1]);
        heroGroupComponent.addHero(heroes[2]);
        heroGroupComponent.addHero(heroes[3]);
        heroGroupComponent.addHero(heroes[4]);
        heroGroupComponent.addHero(heroes[5]);
        console.log(heroGroup['_components'][0]);
        heroGroupComponent.removeHero(heroes[3]);
        heroGroupComponent.removeHero(heroes[3]);
        heroGroupComponent.partOfMaxHeroesCount;
        console.log(heroGroup['_components'][0]);
    }

    private testReadonly() {
        type _ItemType = {
            name: string;
            stackSize: number;
        };

        let wood: _ItemType = {
            name: ItemID.Wood,
            stackSize: 20,
        };
        let sword: _ItemType = {
            name: 'sword',
            stackSize: 1,
        };

        let itemStack: Readonly<{
        // let itemStack: Deep<{
            item: _ItemType,
            count: number,
        }> = {
            item: wood,
            count: 42,
        };
        // itemStack.count = 42;
        // itemStack.item = sword;
        itemStack.item.name = 'asd';

        console.log(itemStack);
    }

    devEnemyFactory() {
        let em = this._container.get<EntityManager>(ContainerKey.EntityManager);
        let enemyFactory = this._container.get<EnemyFactory>(ContainerKey.EnemyFactory);

        // let enemyFactory = new EnemyFactory({
        //     gameObjectFactory: this._container.get<GameObjectFactory>(ContainerKey.GameObjectFactory),
        //     entityManager: this._container.get<EntityManager>(ContainerKey.EntityManager),
        // });

        // console.log(em.entity<EnemyTypeRecord>(EntityManagerKey.EnemyType)[EnemyTypeAlias.Boar]);
        // let enemyType = em.entity<EnemyTypes>(EntityManagerKey.EnemyTypes)[EnemyTypeAlias.Boar];
        // let enemyType = em.entity<EnemyTypeRecord>(EntityManagerKey.EnemyType)[EnemyTypeAlias.Boar];
        // let enemyType = em.entity<EnemyTypeRecord>(EntityManagerKey.EnemyType)[EnemyTypeAlias.Fox];
        // let enemyType = em.entity<EnemyType>(EntityManagerKey.EnemyType, EnemyTypeAlias.Fox);
        let enemyType = em.entity<EnemyType>(EntityManagerKey.EnemyType, EnemyTypeID.Boar);
        // console.log(enemyType);
        // console.log(enemyType.alias);
        let enemy = enemyFactory.create({
            level: 1,
            // type: enemyType,
            enemyTypeID: EnemyTypeID.Boar,
        });
        console.log(enemy);
    }

    testRandom_oneFromRange() {
        console.log(_.random(1, 2));
        // console.log(Random.oneFromRange(1, 10));
    }

    devGoldLootGeneratorComponent() {
        // let goldLootGeneratorComponent = new GoldLootGeneratorComponent(20, 40);
        // console.log(goldLootGeneratorComponent.generate(20));
        // console.log(goldLootGeneratorComponent.generate(20));
        // console.log(goldLootGeneratorComponent.generate(20));
        // console.log(goldLootGeneratorComponent.generate(20));
        // console.log(goldLootGeneratorComponent.generate(20));
        // console.log(goldLootGeneratorComponent.generate(20));
        // console.log(goldLootGeneratorComponent.generate(20));
    }

    devLevelComponent() {
        let levelComponent = this._container.get<ExperienceComponentFactory>(ContainerKey.ExperienceComponentFactory).create({
            level: 1,
        });
        let exp = 444444444;
        // let exp = 4444;
        console.log(levelComponent);
        levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // levelComponent.addExp(exp);
        // console.log(levelComponent);
        // levelComponent.addExp(exp);
        // console.log(levelComponent);
        // levelComponent.addExp(exp);
        // console.log(levelComponent);
        // levelComponent.addExp(exp);
        // console.log(levelComponent);
        // levelComponent.addExp(exp);
        // console.log(levelComponent);
    }

    devLootGenerator() {
        let enemyFactory = this._container.get<EnemyFactory>(ContainerKey.EnemyFactory);
        let em = this._container.get<EntityManager>(ContainerKey.EntityManager);

        let enemies: GameObject[] = [];
        enemies.push(enemyFactory.create({
            // type: em.entity<EnemyType>(EntityManagerKey.EnemyType, EnemyTypeID.Boar),
            // enemyType: EnemyTypeID.Boar,
            enemyTypeID: EnemyTypeID.Boar,
            level: 1,
        }));
        enemies.push(enemyFactory.create({
            // type: em.entity<EnemyType>(EntityManagerKey.EnemyType, EnemyTypeID.Boar),
            enemyTypeID: EnemyTypeID.Boar,
            level: 1,
        }));
        enemies.push(enemyFactory.create({
            // type: em.entity<EnemyType>(EntityManagerKey.EnemyType, EnemyTypeID.Boar),
            enemyTypeID: EnemyTypeID.Boar,
            level: 1,
        }));
        console.log(_.map(enemies, (enemy) => {
            return enemy['_id'];
        }));

        // EventSystem.addListener(HealthPointsComponentEventCode.Died, (target) => {
        //     console.log('УРА!!!');
        // });

        // console.log(enemy);
        // console.log(enemy.getComponent<HealthPointsComponent>(HealthPointsComponent.name));
        // enemies[0].getComponent<HealthPointsComponent>(HealthPointsComponent.name).kill();
        enemies[0].getComponent<HealthPointsComponent>(HealthPointsComponent.name).damage(42);
        enemies[0].getComponent<HealthPointsComponent>(HealthPointsComponent.name).damage(42);
        enemies[0].getComponent<HealthPointsComponent>(HealthPointsComponent.name).damage(42);
        enemies[0].getComponent<HealthPointsComponent>(HealthPointsComponent.name).damage(42);
        enemies[1].getComponent<HealthPointsComponent>(HealthPointsComponent.name).kill();
        // enemy.getComponent<HealthPointsComponent>(HealthPointsComponent.name).resurrect();
    }

    private testRound() {
        let values = [
            1,
            1.0,
            1.23,
            1.4,
            1.5,
            1.5,
            1.9,
        ];
        _.map(values, (value) => {
            console.log([value, _.round(value, 0)]);
        });
    }

    devFight() {
        let em = this._container.get<EntityManager>(ContainerKey.EntityManager);
        let heroFactory = this._container.get<HeroFactory>('player.heroFactory');
        let enemyFactory = this._container.get<EnemyFactory>(ContainerKey.EnemyFactory);

        let heroes = [
            heroFactory.create({
                heroClass: em.get<HeroClass>(HeroClass, HeroClassID.Warrior),
                level: 1,
            }),
            heroFactory.create({
                heroClass: em.get<HeroClass>(HeroClass, HeroClassID.Rogue),
                level: 1,
            }),
            heroFactory.create({
                heroClass: em.get<HeroClass>(HeroClass, HeroClassID.Gunslinger),
                level: 1,
            }),
            heroFactory.create({
                heroClass: em.get<HeroClass>(HeroClass, HeroClassID.Mage),
                level: 1,
            }),
            heroFactory.create({
                heroClass: em.get<HeroClass>(HeroClass, HeroClassID.Mage),
                level: 1,
            }),
        ];

        let heroGroupComponent = new HeroGroupComponent({
            size: 5,
        });
        heroGroupComponent.addHero(heroes[0]);
        heroGroupComponent.addHero(heroes[1]);
        heroGroupComponent.addHero(heroes[2]);
        heroGroupComponent.addHero(heroes[3]);
        heroGroupComponent.addHero(heroes[4]);
        console.log(heroGroupComponent);
        console.log(heroes[0]);

        let enemyGroupComponent = new EnemyGroupComponent({
            size: 5,
        });
        enemyGroupComponent.createEnemy({
            enemyTypeID: EnemyTypeID.Boar,
            level: 1,
            enemyFactory: enemyFactory,
        });
        enemyGroupComponent.createEnemy({
            enemyTypeID: EnemyTypeID.Boar,
            level: 1,
            enemyFactory: enemyFactory,
        });
        enemyGroupComponent.createEnemy({
            enemyTypeID: EnemyTypeID.Boar,
            level: 1,
            enemyFactory: enemyFactory,
        });
        enemyGroupComponent.createEnemy({
            enemyTypeID: EnemyTypeID.Boar,
            level: 1,
            enemyFactory: enemyFactory,
        });
        enemyGroupComponent.createEnemy({
            enemyTypeID: EnemyTypeID.Boar,
            level: 1,
            enemyFactory: enemyFactory,
        });
        console.log(enemyGroupComponent);

        // heroGroupComponent.attack(enemyGroupComponent);
        // enemyGroupComponent.attack(heroGroupComponent);
        //...
    }

    devAttackPowerComponent() {
        let em = this._container.get<ItemDatabase>(ContainerKey.ItemDatabase);

        let itemAttributeCollectorComponent = new ItemAttributeCollectorComponent();

        let attributes = {
            // [CharacterAttributeID.Strength]: new CharacterAttributeComponent({
            //     baseValue: _.random(8, 12),
            //     // baseValue: 0,
            //     characterAttributeID: CharacterAttributeID.Strength,
            //     itemAttributeCollectorComponent: itemAttributeCollectorComponent,
            // }),
            // [CharacterAttributeID.AttackPower]: new CharacterAttributeComponent({
            //     baseValue: _.random(8, 12),
            //     // baseValue: 0,
            //     characterAttributeID: CharacterAttributeID.AttackPower,
            //     itemAttributeCollectorComponent: itemAttributeCollectorComponent,
            // })
        };

        let attackPowerComponent = new AttackPowerComponent({
            range: _.random(16, 34),
            characterAttributeCollectorComponent: new CharacterAttributeRawValueCollectorComponent(),
            // itemAttributeCollectorComponent: itemAttributeCollectorComponent,
            dependentCharacterAttributeComponents: [attributes[CharacterAttributeID.Strength]],
        });

        // itemAttributeCollectorComponent.addItem(em.get(ItemID.PlateHelmet_02));
        // console.log(itemAttributeCollectorComponent.increaseCharacterAttribute());

        console.log([attackPowerComponent.finalMinAttackPower(), attackPowerComponent.finalMaxAttackPower()]);
        // console.log(attackPowerComponent.finalAttackPower());
    }

    testLodashPull() {
        let items = [
            this._container.get<EntityManager>(ContainerKey.EntityManager).get<Item>(Item, ItemID.Wood),
            this._container.get<EntityManager>(ContainerKey.EntityManager).get<Item>(Item, ItemID.IronOre),
            this._container.get<EntityManager>(ContainerKey.EntityManager).get<Item>(Item, ItemID.OneHandedSword_01),
            this._container.get<EntityManager>(ContainerKey.EntityManager).get<Item>(Item, ItemID.OneHandedSword_01),
            this._container.get<EntityManager>(ContainerKey.EntityManager).get<Item>(Item, ItemID.OneHandedSword_01),
        ];
        console.log(items);

        // _.indexOf(items, this._container.get<EntityManager>(ContainerKey.EntityManager).get<Item>(Item, ItemID.OneHandedSword_01));
        console.log(_.indexOf(items, this._container.get<EntityManager>(ContainerKey.EntityManager).get<Item>(Item, ItemID.OneHandedSword_01)));
        _.pullAt(items, _.indexOf(items, this._container.get<EntityManager>(ContainerKey.EntityManager).get<Item>(Item, ItemID.OneHandedSword_01)));
        _.pullAt(items, _.indexOf(items, this._container.get<EntityManager>(ContainerKey.EntityManager).get<Item>(Item, ItemID.OneHandedSword_01)));
        _.pullAt(items, _.indexOf(items, this._container.get<EntityManager>(ContainerKey.EntityManager).get<Item>(Item, ItemID.OneHandedSword_01)));
        _.pullAt(items, _.indexOf(items, this._container.get<EntityManager>(ContainerKey.EntityManager).get<Item>(Item, ItemID.OneHandedSword_01)));
        console.log(items);
    }
}