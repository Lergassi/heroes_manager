//@ts-ignore
import ContainerInterface from '../core/source/ContainerInterface.js';
import DefaultContainerConfigure from '../core/app/Services/ContainerConfigures/DefaultContainerConfigure.js';
import Container from '../core/source/Container.js';
import CoreContainerConfigure from '../core/app/Services/ContainerConfigures/CoreContainerConfigure.js';
import PlayerContainerConfigure from '../core/app/Services/ContainerConfigures/PlayerContainerConfigure.js';
import LocationFactory from '../core/app/Factories/LocationFactory.js';
import GameObjectFactory from '../core/app/Factories/GameObjectFactory.js';
import IDGeneratorInterface from '../core/source/IDGeneratorInterface.js';
import ItemStackFactory from '../core/app/Factories/ItemStackFactory.js';
import HeroFactory from '../core/app/Factories/HeroFactory.js';
import Location from '../core/app/Components/Location.js';
import RandomItemGenerator from '../core/app/RandomItemGenerator.js';
import EntityManager from '../core/source/EntityManager.js';
import ItemDatabase from '../core/source/ItemDatabase.js';
import _ from 'lodash';
import Item from '../core/app/Entities/Item.js';
import ItemCategory from '../core/app/Entities/ItemCategory.js';
import {extractItems_dev} from '../core/app/indev.js';
import ItemStorageFactory from '../core/app/Factories/ItemStorageFactory.js';
import {debugHero, debugItemStorage, debugNewItemStorage} from '../core/debug/debug_functions.js';
import ItemStorageComponent from '../core/app/Components/ItemStorageComponent.js';
import GameObjectAsReact, {LocationType} from '../core/source/GameObjectAsReact.js';
import GameContainer from '../core/source/GameContainer.js';
import ItemSlot from '../core/app/Components_v2/ItemSlot.js';
import ItemStorageController from '../core/app/Components_v2/ItemStorageController.js';
import HeroClass from '../core/app/Entities/HeroClass.js';
import GameObject from '../core/source/GameObject.js';
import HeroGroup from '../core/app/Components/HeroGroup.js';
import EnemyFactory from '../core/app/Factories/EnemyFactory.js';
import ExperienceComponentFactory from '../core/app/Factories/ExperienceComponentFactory.js';
import EnemyEntity from '../core/app/Entities/EnemyEntity.js';
import HealthPoints from '../core/app/Components/HealthPoints.js';
import ItemCharacterAttributeCollector from '../core/app/Components/ItemCharacterAttributeCollector.js';
import {ServiceID} from '../core/types/enums/ServiceID.js';
import CharacterAttributeCollector from '../core/app/Components/CharacterAttributeCollector.js';
import {ItemCategoryID} from '../core/types/enums/ItemCategoryID.js';
import {CharacterAttributeID} from '../core/types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../core/types/enums/HeroClassID.js';
import {EnemyID} from '../core/types/enums/EnemyID.js';
import {ItemID} from '../core/types/enums/ItemID.js';
import HeroGroupCharacterAttributeCollector from '../core/app/Decorators/HeroGroupCharacterAttributeCollector.js';
import HeroGroupInterface from '../core/app/Interfaces/HeroGroupInterface.js';
import CharacterAttribute from '../core/app/Components/CharacterAttribute.js';
import ArmorDecorator from '../core/app/Components/CharacterAttributes/ArmorDecorator.js';
import Decimal from 'decimal.js';
import DamageControllerInterface from '../core/app/Interfaces/DamageControllerInterface.js';
import {ComponentID} from '../core/types/enums/ComponentID.js';
import {testPrototypeInherit} from './include2.js';
import Fight from '../core/app/Components/Fight.js';
import EquipSlotWithItemCategoryDecorator from '../core/app/Components/EquipSlots/EquipSlotWithItemCategoryDecorator.js';
import ItemFactory from '../core/app/Factories/ItemFactory.js';
import EquipSlotInterface from '../core/app/Interfaces/EquipSlotInterface.js';
import {testSerializeEntityManager} from './include.js';
import ArmorMaterial from '../core/app/Entities/ArmorMaterial.js';
import {ArmorMaterialID} from '../core/types/enums/ArmorMaterialID.js';
import DefaultEquipSlot from '../core/app/Components/EquipSlots/DefaultEquipSlot.js';
import RightHand from '../core/app/Components/EquipSlots/RightHand.js';
import LeftHand from '../core/app/Components/EquipSlots/LeftHand.js';
import FightController from '../core/app/Components/FightController.js';
import AttackController from '../core/app/Components/AttackController.js';
import AttackControllerInterface from '../core/app/Interfaces/AttackControllerInterface.js';
import HeroActivityStateController from '../core/app/Components/HeroActivityStateController.js';
import MainItemStorageListComponent from '../core/app/Components/MainItemStorageListComponent.js';
import ItemStorageUnion from '../core/app/Components/ItemStorageUnion.js';
import Bag from '../core/app/Components/Bag.js';
import EntityManagerInterface from '../core/app/Interfaces/EntityManagerInterface.js';

//todo: Перемести часть кода в общий test/dev/sandbox.
export default class _SandboxController {
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
        // this.testFloatEqual();
        // this.testDecimajs();

        // this.devHeroFactory();
        // this.devEnemyFactory();
        // this.devLocation();
        // this.devGoldLootGeneratorComponent();
        // this.devLevelComponent();
        // this.devLootGenerator();
        // this.devCharacterAttributeCollector();
        // this.devAttackPowerComponent();
        // this.testEntityManager();
        // this.devItemStorageUnion();

        //fight
        // this.devFight();
        // this.devDefence();
        // this.devHeroArmor();
        // this.devEnemyArmor();

        // this.devNewCharacterAttributesGetStarted();

        // this.devNewEquipSlotSystem();
        this.devNewItemStorage();
    }

    devLocation() {
        let locationFactory = this._container.get<LocationFactory>(ServiceID.LocationFactory);

        let location = locationFactory.create({
            level: 1,
        });
        console.log(location);
    }

    devHeroFactory() {
        let hero = this._container.get<HeroFactory>(ServiceID.HeroFactory).create(
            this._container.get<EntityManagerInterface>(ServiceID.EntityManager).get<HeroClass>(HeroClass, HeroClassID.Warrior),
            1,
        );
        console.log(hero);
        // console.log(hero.get<HealthPointsComponent>(HealthPointsComponent.name));
        console.log(hero.get<DamageControllerInterface>(ComponentID.DamageController));
    }

    devLocationFactory() {
        let idGenerator = this._container.get<IDGeneratorInterface>(ServiceID.IDGenerator);
        let heroFactory = this._container.get<HeroFactory>(ServiceID.HeroFactory);
        let em = this._container.get<EntityManagerInterface>(ServiceID.EntityManager);

        let heroes = [
            heroFactory.create(
                em.get<HeroClass>(HeroClass, HeroClassID.Warrior),
                1,
            ),
            heroFactory.create(
                em.get<HeroClass>(HeroClass, HeroClassID.Rogue),
                1,
            ),
            heroFactory.create(
                em.get<HeroClass>(HeroClass, HeroClassID.Gunslinger),
                1,
            ),
            heroFactory.create(
                em.get<HeroClass>(HeroClass, HeroClassID.FireMage),
                1,
            ),
            heroFactory.create(
                em.get<HeroClass>(HeroClass, HeroClassID.FireMage),
                1,
            ),
            heroFactory.create(
                em.get<HeroClass>(HeroClass, HeroClassID.Warrior),
                1,
            ),
        ];

        let locationFactory = new LocationFactory({
            entityManager: this._container.get<EntityManagerInterface>(ServiceID.EntityManager),
            gameObjectFactory: this._container.get<GameObjectFactory>(ServiceID.GameObjectFactory),
            itemDatabase: this._container.get<ItemDatabase>(ServiceID.ItemDatabase),
            itemStackFactory: this._container.get<ItemStackFactory>(ServiceID.ItemStackFactory),
            itemStorageFactory: this._container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory),
        });

        let location = locationFactory.create({
            level: 1,
        });
        // console.log(location);

        let locationComponent = location.getComponent<Location>(ComponentID.Location);
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
        let em = this._container.get<EntityManagerInterface>(ServiceID.EntityManager);

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
        let em = this._container.get<EntityManagerInterface>(ServiceID.EntityManager);
        // let random = new Random();

        let itemDatabase = new ItemDatabase(
            extractItems_dev(em),
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
            itemDatabase.get(ItemID.IronIngot),
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
        // let em: EntityManager = this._container.get(ContainerKey.EntityManager);
        let db: ItemDatabase = this._container.get(ServiceID.ItemDatabase);
        let itemStackFactory: ItemStackFactory = this._container.get(ServiceID.ItemStackFactory);

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
        let db: ItemDatabase = this._container.get(ServiceID.ItemDatabase);
        let itemStackFactory: ItemStackFactory = this._container.get(ServiceID.ItemStackFactory);

        let itemStorage = this._container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).create(10);
        let itemStorageComponent = itemStorage.getComponent<ItemStorageComponent>(ComponentID.ItemStorage);
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
        let itemStorageFactory = this._container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory);

        let itemStorage = itemStorageFactory.create(20);
        // console.log(itemStorage);
        // debugNewItemStorage(itemStorage);
        let controller = itemStorage.getComponent<ItemStorageComponent>(ComponentID.ItemStorage);
        controller.addItem(this._container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.Wood), 24);
        debugItemStorage(itemStorage);
        // let itemStorage = new ItemStorageComponent();
    }

    gameContainerGetStarted() {
        let itemStackFactory = this._container.get<ItemStackFactory>(ServiceID.ItemStackFactory);
        let db = this._container.get<ItemDatabase>(ServiceID.ItemDatabase);

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
        let heroClass = this._container.get<EntityManagerInterface>(ServiceID.EntityManager).get<HeroClass>(HeroClass, HeroClassID.Warrior);
        let hero = this._container.get<HeroFactory>(ServiceID.HeroFactory).create(
            heroClass,
            1,
        );
        debugHero(hero);
    }

    testLocationFactory() {
        let location = this._container.get<LocationFactory>(ServiceID.LocationFactory).create({
            // level: new LevelRange(1, 5),
            level: 1,
        });
        console.log(location);
    }

    // devLocation() {
    //
    // }

    devHeroGroup() {
        let heroFactory = this._container.get<HeroFactory>(ServiceID.HeroFactory);
        let em = this._container.get<EntityManagerInterface>(ServiceID.EntityManager);

        let heroes = [
            // heroFactory.create(em.get<HeroClass>(HeroClass, HeroClassAlias.Warrior), 9),
            // heroFactory.create(em.get<HeroClass>(HeroClass, HeroClassAlias.Rogue), 42),
            // heroFactory.create(em.get<HeroClass>(HeroClass, HeroClassAlias.Gunslinger)),
            // heroFactory.create(em.get<HeroClass>(HeroClass, HeroClassAlias.Mage)),
            // heroFactory.create(em.get<HeroClass>(HeroClass, HeroClassAlias.Mage)),
            // heroFactory.create(em.get<HeroClass>(HeroClass, HeroClassAlias.Warrior)),
        ];

        // let heroGroup = new GameObject();
        let heroGroup = this._container.get<GameObjectFactory>(ServiceID.GameObjectFactory).create();

        let size = 5;
        let heroGroupComponent = heroGroup.set('heroGroup', new HeroGroup(
            5,
        ));
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
        let em = this._container.get<EntityManagerInterface>(ServiceID.EntityManager);
        let enemyFactory = this._container.get<EnemyFactory>(ServiceID.EnemyFactory);

        // let enemyFactory = new EnemyFactory({
        //     gameObjectFactory: this._container.get<GameObjectFactory>(ContainerKey.GameObjectFactory),
        //     entityManager: this._container.get<EntityManagerInterface>(ContainerKey.EntityManager),
        // });

        // console.log(em.entity<EnemyTypeRecord>(EntityManagerKey.EnemyType)[EnemyTypeAlias.Boar]);
        // let enemyType = em.entity<EnemyTypes>(EntityManagerKey.EnemyTypes)[EnemyTypeAlias.Boar];
        // let enemyType = em.entity<EnemyTypeRecord>(EntityManagerKey.EnemyType)[EnemyTypeAlias.Boar];
        // let enemyType = em.entity<EnemyTypeRecord>(EntityManagerKey.EnemyType)[EnemyTypeAlias.Fox];
        // let enemyType = em.entity<EnemyType>(EntityManagerKey.EnemyType, EnemyTypeAlias.Fox);
        // let enemyType = em.entity<EnemyEntity>(EntityManagerKey.EnemyType, EnemyID.Boar);
        // console.log(enemyType);
        // console.log(enemyType.alias);
        let enemy = enemyFactory.create(
            EnemyID.Boar,
            1,
        );
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
        let levelComponent = this._container.get<ExperienceComponentFactory>(ServiceID.ExperienceComponentFactory).create({
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
        let enemyFactory = this._container.get<EnemyFactory>(ServiceID.EnemyFactory);
        let em = this._container.get<EntityManagerInterface>(ServiceID.EntityManager);

        let enemies: GameObject[] = [];
        enemies.push(enemyFactory.create(
            // type: em.entity<EnemyType>(EntityManagerKey.EnemyType, EnemyTypeID.Boar),
            // enemyType: EnemyTypeID.Boar,
            EnemyID.Boar,
            1,
        ));
        enemies.push(enemyFactory.create(
            // type: em.entity<EnemyType>(EntityManagerKey.EnemyType, EnemyTypeID.Boar),
            EnemyID.Boar,
            1,
        ));
        enemies.push(enemyFactory.create(
            // type: em.entity<EnemyType>(EntityManagerKey.EnemyType, EnemyTypeID.Boar),
            EnemyID.Boar,
            1,

        ));
        console.log(_.map(enemies, (enemy) => {
            return enemy['_id'];
        }));

        // EventSystem.addListener(HealthPointsComponentEventCode.Died, (target) => {
        //     console.log('УРА!!!');
        // });

        // console.log(enemy);
        // console.log(enemy.getComponent<HealthPointsComponent>(HealthPointsComponent.name));
        // enemies[0].getComponent<HealthPointsComponent>(HealthPointsComponent.name).kill();
        enemies[0].getComponent<HealthPoints>(ComponentID.HealthPoints).takeDamage(42);
        enemies[0].getComponent<HealthPoints>(ComponentID.HealthPoints).takeDamage(42);
        enemies[0].getComponent<HealthPoints>(ComponentID.HealthPoints).takeDamage(42);
        enemies[0].getComponent<HealthPoints>(ComponentID.HealthPoints).takeDamage(42);
        enemies[1].getComponent<HealthPoints>(ComponentID.HealthPoints).kill();
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

    devCharacterAttributeCollector() {
        let em = this._container.get<EntityManagerInterface>(ServiceID.EntityManager);
        let heroFactory = this._container.get<HeroFactory>(ServiceID.HeroFactory);
        let enemyFactory = this._container.get<EnemyFactory>(ServiceID.EnemyFactory);

        let heroes = [
            heroFactory.create(
                em.get<HeroClass>(HeroClass, HeroClassID.Warrior),
                1,
            ),
            heroFactory.create(
                em.get<HeroClass>(HeroClass, HeroClassID.Rogue),
                1,
            ),
            heroFactory.create(
                em.get<HeroClass>(HeroClass, HeroClassID.Gunslinger),
                1,
            ),
            heroFactory.create(
                em.get<HeroClass>(HeroClass, HeroClassID.FireMage),
                1,
            ),
            heroFactory.create(
                em.get<HeroClass>(HeroClass, HeroClassID.FireMage),
                1,
            ),
        ];

        let heroAttributeCharacterAttributeSummary = new CharacterAttributeCollector();

        let hero = this._container.get<GameObjectFactory>(ServiceID.GameObjectFactory).create();

        let heroGroupComponent: HeroGroupInterface = new HeroGroup(
        // let heroGroupComponent = new HeroGroupComponent({
        // let heroGroupComponent = new HeroGroupComponent({
            5,
        );
        // console.log(heroGroupComponent);
        // hero.set<HeroGroupComponent>(HeroGroupComponent.name, heroGroupComponent);
        // let heroGroupCharacterAttributeCollectorProxy = new HeroGroupCharacterAttributeCollector({
        heroGroupComponent = new HeroGroupCharacterAttributeCollector({
            heroGroup: heroGroupComponent,
            // characterAttributeValueCollector: heroAttributeCharacterAttributeSummary,
        });
        // hero.set(HeroGroupComponent.name, heroGroupCharacterAttributeCollectorProxy);
        heroGroupComponent.addHero(heroes[0]);
        heroGroupComponent.addHero(heroes[1]);
        heroGroupComponent.addHero(heroes[2]);
        heroGroupComponent.addHero(heroes[3]);
        heroGroupComponent.addHero(heroes[4]);

        // heroGroupCharacterAttributeCollectorProxy.addHero(heroes[0]);
        // heroGroupCharacterAttributeCollectorProxy.addHero(heroes[1]);
        // heroGroupCharacterAttributeCollectorProxy.addHero(heroes[2]);
        // heroGroupCharacterAttributeCollectorProxy.addHero(heroes[3]);
        // heroGroupCharacterAttributeCollectorProxy.addHero(heroes[4]);

        // console.log(heroes[0]);
        // console.log(heroes[0].get<TotalCharacterAttributeValueCollectorComponent>(TotalCharacterAttributeValueCollectorComponent.name));
        // console.log(heroes[0].get<CharacterAttributeValueCollector>(CharacterAttributeValueCollector.name));
        // console.log(heroes[0].get<TotalCharacterAttributeValueCollectorComponent>(TotalCharacterAttributeValueCollectorComponent.name).totalValue(CharacterAttributeID.Strength));
        // console.log(heroes[0].get<TotalCharacterAttributeValueCollectorComponent>(TotalCharacterAttributeValueCollectorComponent.name).totalValue(CharacterAttributeID.Agility));
        // console.log(heroes[0].get<TotalCharacterAttributeValueCollectorComponent>(TotalCharacterAttributeValueCollectorComponent.name).totalValue(CharacterAttributeID.Intelligence));
        // console.log(heroes[0].get<TotalCharacterAttributeValueCollectorComponent>(TotalCharacterAttributeValueCollectorComponent.name).totalValue(CharacterAttributeID.AttackPower));

        console.log(heroAttributeCharacterAttributeSummary.value(CharacterAttributeID.Strength));
        console.log(heroAttributeCharacterAttributeSummary.value(CharacterAttributeID.Agility));
        console.log(heroAttributeCharacterAttributeSummary.value(CharacterAttributeID.Intelligence));
        console.log(heroAttributeCharacterAttributeSummary.value(CharacterAttributeID.AttackPower));
        // console.log(heroGroupCharacterAttributeCollectorProxy.totalValue(CharacterAttributeID.Strength));
        // console.log(heroGroupCharacterAttributeCollectorProxy.totalValue(CharacterAttributeID.Agility));
        // console.log(heroGroupCharacterAttributeCollectorProxy.totalValue(CharacterAttributeID.Intelligence));
        // console.log(heroGroupCharacterAttributeCollectorProxy.totalValue(CharacterAttributeID.AttackPower));

        // heroAttributeCharacterAttributeSummary.addCollector(heroes[0].get<CharacterAttributeValueCollector>(CharacterAttributeValueCollector.name));
        // heroAttributeCharacterAttributeSummary.addCollector(heroes[1].get<CharacterAttributeValueCollector>(CharacterAttributeValueCollector.name));
        // heroAttributeCharacterAttributeSummary.addCollector(heroes[2].get<CharacterAttributeValueCollector>(CharacterAttributeValueCollector.name));
        // heroAttributeCharacterAttributeSummary.addCollector(heroes[3].get<CharacterAttributeValueCollector>(CharacterAttributeValueCollector.name));
        // heroAttributeCharacterAttributeSummary.addCollector(heroes[4].get<CharacterAttributeValueCollector>(CharacterAttributeValueCollector.name));
        // console.log(heroAttributeCharacterAttributeSummary.totalValue(CharacterAttributeID.Strength));
        // console.log(heroAttributeCharacterAttributeSummary.totalValue(CharacterAttributeID.Agility));
        // console.log(heroAttributeCharacterAttributeSummary.totalValue(CharacterAttributeID.Intelligence));
        // console.log(heroAttributeCharacterAttributeSummary.totalValue(CharacterAttributeID.AttackPower));

        // heroAttributeCharacterAttributeSummary.removeCollector(heroes[0].get<CharacterAttributeValueCollector>(CharacterAttributeValueCollector.name));
        // heroAttributeCharacterAttributeSummary.removeCollector(heroes[1].get<CharacterAttributeValueCollector>(CharacterAttributeValueCollector.name));
        // heroAttributeCharacterAttributeSummary.removeCollector(heroes[2].get<CharacterAttributeValueCollector>(CharacterAttributeValueCollector.name));
        // heroAttributeCharacterAttributeSummary.removeCollector(heroes[3].get<CharacterAttributeValueCollector>(CharacterAttributeValueCollector.name));
        // heroAttributeCharacterAttributeSummary.removeCollector(heroes[4].get<CharacterAttributeValueCollector>(CharacterAttributeValueCollector.name));
        // console.log(heroAttributeCharacterAttributeSummary.totalValue(CharacterAttributeID.Strength));
        // console.log(heroAttributeCharacterAttributeSummary.totalValue(CharacterAttributeID.Agility));
        // console.log(heroAttributeCharacterAttributeSummary.totalValue(CharacterAttributeID.Intelligence));
        // console.log(heroAttributeCharacterAttributeSummary.totalValue(CharacterAttributeID.AttackPower));

        // let enemyGroupComponent = new EnemyGroupComponent({
        //     size: 5,
        // });
        // enemyGroupComponent.createEnemy({
        //     enemyTypeID: EnemyTypeID.Boar,
        //     level: 1,
        //     enemyFactory: enemyFactory,
        // });
        // enemyGroupComponent.createEnemy({
        //     enemyTypeID: EnemyTypeID.Boar,
        //     level: 1,
        //     enemyFactory: enemyFactory,
        // });
        // enemyGroupComponent.createEnemy({
        //     enemyTypeID: EnemyTypeID.Boar,
        //     level: 1,
        //     enemyFactory: enemyFactory,
        // });
        // enemyGroupComponent.createEnemy({
        //     enemyTypeID: EnemyTypeID.Boar,
        //     level: 1,
        //     enemyFactory: enemyFactory,
        // });
        // enemyGroupComponent.createEnemy({
        //     enemyTypeID: EnemyTypeID.Boar,
        //     level: 1,
        //     enemyFactory: enemyFactory,
        // });
        // console.log(enemyGroupComponent);

        // heroGroupComponent.attack(enemyGroupComponent);
        // enemyGroupComponent.attack(heroGroupComponent);
        //...
    }

    devAttackPowerComponent() {
        let em = this._container.get<ItemDatabase>(ServiceID.ItemDatabase);

        let itemAttributeCollectorComponent = new ItemCharacterAttributeCollector();

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

        // let attackPowerComponent = new AttackPowerComponent({
        //     // range: _.random(16, 34),
        //     // attackPower: new CharacterAttributeValueCollector(),
        //     attackPower: new CharacterAttributeComponent({characterAttributeID: CharacterAttributeID.AttackPower}),
        //     // itemAttributeCollectorComponent: itemAttributeCollectorComponent,
        //     // dependentCharacterAttributeComponents: [attributes[CharacterAttributeID.Strength]],
        // });

        // itemAttributeCollectorComponent.addItem(em.get(ItemID.PlateHelmet_02));
        // console.log(itemAttributeCollectorComponent.increaseCharacterAttribute());

        // console.log([attackPowerComponent.finalMinAttackPower(), attackPowerComponent.finalMaxAttackPower()]);
        // console.log(attackPowerComponent.finalAttackPower());
    }

    testLodashPull() {
        let items = [
            this._container.get<EntityManagerInterface>(ServiceID.EntityManager).get<Item>(Item, ItemID.Wood),
            this._container.get<EntityManagerInterface>(ServiceID.EntityManager).get<Item>(Item, ItemID.IronOre),
            this._container.get<EntityManagerInterface>(ServiceID.EntityManager).get<Item>(Item, ItemID.OneHandedSword01),
            this._container.get<EntityManagerInterface>(ServiceID.EntityManager).get<Item>(Item, ItemID.OneHandedSword01),
            this._container.get<EntityManagerInterface>(ServiceID.EntityManager).get<Item>(Item, ItemID.OneHandedSword01),
        ];
        console.log(items);

        // _.indexOf(items, this._container.get<EntityManagerInterface>(ContainerKey.EntityManager).get<Item>(Item, ItemID.OneHandedSword_01));
        console.log(_.indexOf(items, this._container.get<EntityManagerInterface>(ServiceID.EntityManager).get<Item>(Item, ItemID.OneHandedSword01)));
        _.pullAt(items, _.indexOf(items, this._container.get<EntityManagerInterface>(ServiceID.EntityManager).get<Item>(Item, ItemID.OneHandedSword01)));
        _.pullAt(items, _.indexOf(items, this._container.get<EntityManagerInterface>(ServiceID.EntityManager).get<Item>(Item, ItemID.OneHandedSword01)));
        _.pullAt(items, _.indexOf(items, this._container.get<EntityManagerInterface>(ServiceID.EntityManager).get<Item>(Item, ItemID.OneHandedSword01)));
        _.pullAt(items, _.indexOf(items, this._container.get<EntityManagerInterface>(ServiceID.EntityManager).get<Item>(Item, ItemID.OneHandedSword01)));
        console.log(items);
    }

    addHeroGroupDecorator(heroGroup: HeroGroup) {

    }

    devNewCharacterAttributesGetStarted() {
        // let attackPower = new AttackPower({
        //     left: 16,
        //     right: 24,
        // });
        // console.log(attackPower.value());
        // attackPower.shift(10);
        // attackPower.shift(10);
        // attackPower.shift(10);
        // console.log(attackPower.value());
    }

    //factory
    private createDefence(options: {
        protectionBaseValue: number;
    }) {
        let protection = new CharacterAttribute(
            CharacterAttributeID.Protection,
            new ItemCharacterAttributeCollector(),
            0,
        );

        protection.increaseBaseValue(options.protectionBaseValue);

        let defence = new ArmorDecorator(
            new HealthPoints(
                new CharacterAttribute(
                    CharacterAttributeID.MaxHealthPoints,
                    new ItemCharacterAttributeCollector(),
                    0,
                ),
                new HeroActivityStateController(),
            ),
            protection,
        );

        return defence;
    }

    private devDefence() {
        let defence = this.createDefence({
            // protectionBaseValue: 42,    //4.2% брони
            protectionBaseValue: 300,
        });

        let damage = [
            ..._.range(0, 11),
            ..._.range(20, 101, 10),
        ];
        console.log(damage);

        console.log(defence);
        for (let i = 0; i < damage.length; i++) {
            console.log(damage[i], defence.takeDamage(damage[i]));
        }
        // console.log(defence.finalDamage(100.123));
        // console.log(defence.finalDamage(-100));
    }

    private testFloatEqual() {
        let value = 0.3;
        let validData = [
            1,
            0.3,
            0.29,
            0.299,
            0.2999,
            0.29999,
            0.299999,
            0.2999999,
            0.29999999,
            0.299999999,
            0.2999999999,
            0.29999999999,
            0.299999999999,
            0.2999999999999,
            0.29999999999999,
            0.299999999999999,
            0.2999999999999999,         //< 0.3 => true
            0.29999999999999999,        //< 0.3 => false, 176 знаков после занятой
            0.299999999999999999,
            0.2999999999999999999,
            0.29999999999999999999,
            0.299999999999999999999,
            0.2999999999999999999999,
            0.29999999999999999999999,
            0.299999999999999999999999,
            0.2999999999999999999999999,
            0.29999999999999999999999999,
            0.299999999999999999999999999,
            0.2999999999999999999999999999,
            0.29999999999999999999999999999,
            0.299999999999999999999999999999,
            0.2999999999999999999999999999999,
            0.29999999999999999999999999999999,
            0.299999999999999999999999999999999,
            0.2999999999999999999999999999999999,
            0.29999999999999999999999999999999999,
            0.299999999999999999999999999999999999,
            0.2999999999999999999999999999999999999,
            // 0.299999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,
            // 0.0000000000000000000000001,
            // 0.0000000000000000000000000000000000000001,
            // 0.0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001,
        ];

        for (let i = 0; i < validData.length; i++) {
            // console.log(validData[i], value >= validData[i]);
            console.log(validData[i], value > validData[i]);
        }
        console.log(_.repeat('-', 32));

        // for (let i = 0; i < validData.length; i++) {
        //     // console.log(validData[i], value >= validData[i]);
        //     console.log(validData[i], _.round(validData[i] * 100000), value > _.round(validData[i] * 100000));
        // }
    }

    private testDecimajs() {
        // console.log(0 === 1e-324);
        // let x = new Decimal(0);
        // console.log(x.equals('1e-324'));
        // console.log(_.repeat('-', 32));

        // console.log(0.1, 0.3 - 0.2, 0.1 > (0.3 - 0.2));
        // let x1 = new Decimal(0.1);
        // console.log(x1.greaterThan((new Decimal(0.3)).minus(0.2)))       // false
        // console.log(new Decimal(0).gt(x1));
        // console.log(_.repeat('-', 32));

        // let value = 0.3;
        // let values = [
        //     0.2999999999999999,    //16
        //     0.29999999999999999,    //17
        //     // '0.29999999999999999',
        //     // new Decimal,
        // ];
        // // console.log(0.2999999999999999);
        // // console.log(0.29999999999999999);
        // // console.log(new Decimal('0.29999999999999999'));
        //
        // // console.log(value, values[0], value > values[0]);
        //
        // // let x2 = new Decimal(value);
        // let x2 = new Decimal(0.3);
        // // console.log(x2, values[0], x2.greaterThan(values[0]));
        // // console.log(x2, values[0], x2.greaterThan(new Decimal(values[0])));
        // // console.log(x2, new Decimal(0.29999999999999999), x2.greaterThan(new Decimal(0.29999999999999999)));
        // // console.log(x2, new Decimal(0.29999999999999999), x2.greaterThan(new Decimal(_.round(values[0], 10))));
        //
        // for (let i = 0; i < values.length; i++) {
        //     console.log(value, values[i], value > values[i]);
        //     console.log(x2, values[i], x2.greaterThan(new Decimal(values[i])));
        //     console.log(x2, values[i], x2.greaterThan(new Decimal(values[i].toString())));
        //     console.log(_.repeat('-', 32));
        // }
        // console.log(_.repeat('-', 32));

        let damage = 100;

        let maxProtection = 0.3;
        // let protectionAttribute = 300;
        // let protectionAttribute = 299;
        // let protectionAttribute = 299.9999999999999;    //16
        let protectionAttribute = 299.99999999999999;   //17
        //299.9999999999999
        let onePercentArmorProtectionValue = 10;

        let protection = protectionAttribute / onePercentArmorProtectionValue / 100;
        console.log(protection);
        console.log(protection, maxProtection, protection <= maxProtection);

        let dProtectionAttribute = new Decimal(protectionAttribute);
        console.log(dProtectionAttribute);
        // let dProtection = new Decimal(protectionAttribute);
        console.log(_.repeat('-', 32));

        let a = 0.1;
        let b = 0.2;
        let c = a + b;
        console.log(a, b, c, (a + b) == c);
        console.log(a, b, c, (a + b) === c);
        console.log(a, b, c, (a + b) > c);
        console.log(a, b, c, (a + b) >= c);
        console.log(_.repeat('-', 32));

        console.log((0.1 + 0.2) == 0.3);
        console.log((0.1 + 0.2) === 0.3);
        console.log((0.1 + 0.2) > 0.3);
        console.log((0.1 + 0.2) >= 0.3);
        console.log(_.repeat('-', 32));

        console.log((0.1 + 0.2));
        console.log((0.1 + 0.2).toFixed(4));
        console.log(+(0.1 + 0.2).toFixed(4));
    }

    private devHeroArmor() {
        let entityManager = this._container.get<EntityManagerInterface>(ServiceID.EntityManager);
        let heroFactory = this._container.get<HeroFactory>(ServiceID.HeroFactory);
        let enemyFactory = this._container.get<EnemyFactory>(ServiceID.EnemyFactory);

        let itemCharacterAttributeCollector = new ItemCharacterAttributeCollector()
        let maxHealthPoints = new CharacterAttribute(CharacterAttributeID.MaxHealthPoints, itemCharacterAttributeCollector, 0);
        maxHealthPoints.increaseBaseValue(100);

        let healthPoints: DamageControllerInterface = new HealthPoints(
        // let healthPoints = new HealthPointsComponent(
            maxHealthPoints,
            new HeroActivityStateController(),
        );

        let protection = new CharacterAttribute(
            CharacterAttributeID.Protection,
            itemCharacterAttributeCollector,
            0,
        );
        // protection.increaseBaseValue(-100);
        protection.increaseBaseValue(0);
        // protection.increaseBaseValue(42);
        // protection.increaseBaseValue(100);
        // protection.increaseBaseValue(10000000);

        healthPoints = new ArmorDecorator(
            healthPoints,
            protection,
        );

        // let damageController = new DamageController(
        //     healthPoints,
        //     this.createDefence({
        //         protectionBaseValue: 100,
        //     }),
        // );

        let damage = 42;
        // console.log(damageController);
        // damageController.damage(damage);
        // damageController.damage(damage);
        // damageController.damage(damage);
        // console.log(damageController);

        healthPoints.takeDamage(damage);
        healthPoints.takeDamage(damage);
        healthPoints.takeDamage(damage);
        healthPoints.takeDamage(damage);
    }

    private devEnemyArmor() {
        let enemyFactory = this._container.get<EnemyFactory>(ServiceID.EnemyFactory);

        let enemy = enemyFactory.create(EnemyID.Bear, 1);
        console.log(enemy);
        console.log(enemy.get<DamageControllerInterface>(ComponentID.DamageController));
        console.log(enemy.get<HealthPoints>(ComponentID.HealthPoints));

        // let damage = 100;
        let damage = 24;

        // let maxIterations = 10_000;
        // let i = 0;
        // while (i < maxIterations) {
        //     enemy.get<DamageControllerInterface>(GameObjectKey.DamageController).damage(damage);
        //     ++i;
        // }
    }

    private devFight() {
        // let heroFactory = this._container.get<HeroFactory>(ContainerID.HeroFactory);
        // let enemyFactory = this._container.get<EnemyFactory>(ContainerID.EnemyFactory);
        //
        // let hero = heroFactory.create(HeroClassID.Warrior, 1);
        // let enemy = enemyFactory.create(EnemyID.Bear, 1, {
        //     characterAttributeValues: {
        //         [CharacterAttributeID.AttackPower]: 1000042,
        //     },
        // });
        // console.log(hero);
        // console.log(enemy);
        //
        // let heroAttackController = new FightController(
        //     hero.get<AttackControllerInterface>(GameObjectKey.AttackController),
        //     hero.get<DamageControllerInterface>(GameObjectKey.DamageController),
        // );
        // let enemyAttackController = new FightController(
        //     enemy.get<AttackControllerInterface>(GameObjectKey.AttackController),
        //     enemy.get<DamageControllerInterface>(GameObjectKey.DamageController),
        // );
        // console.log(heroAttackController);
        // console.log(enemyAttackController);
        //
        // // let maxHits = 10_000;
        // // let currentHit = 0;
        // // while (currentHit < maxHits) {
        // //     heroAttackController.hit(enemyAttackController);
        // //     ++currentHit;
        // // }
        // // heroAttackController.hit(enemyAttackController);
        // // enemyAttackController.hit(heroAttackController);
        // // heroAttackController.exchangeHits(enemyAttackController);
        // // heroAttackController.exchangeHits(enemyAttackController);
        // // heroAttackController.exchangeHits(enemyAttackController);
        // // heroAttackController.exchangeHits(enemyAttackController);
        // // heroAttackController.exchangeHits(enemyAttackController);
        // // heroAttackController.exchangeHits(enemyAttackController);
        // // heroAttackController.exchangeHits(enemyAttackController);
        // // heroAttackController.exchangeHits(enemyAttackController);
        //
        // // heroAttackController.hit(enemyAttackController);
        // heroAttackController.fightToDead(enemyAttackController);
        // console.log(heroAttackController);
        // console.log(enemyAttackController);
    }

    private devNewEquipSlotSystem() {
        let itemStackFactory = this._container.get<ItemStackFactory>(ServiceID.ItemStackFactory);
        let entityManager = this._container.get<EntityManagerInterface>(ServiceID.EntityManager);
        let itemDatabase = this._container.get<ItemDatabase>(ServiceID.ItemDatabase);

        // let equipSlot: EquipSlotInterface = new DefaultEquipSlot([
        //     entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Helmets),
        //     // entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Amulets),
        // ]);
        //
        // equipSlot = new ArmorMaterialEquipSlotDecorator(
        //     equipSlot,
        //     [entityManager.get<ArmorMaterial>(ArmorMaterial, ArmorMaterialID.Plate)],
        // );
        //
        // equipSlot.createItemStack(
        //     itemDatabase.get(ItemID.PlateHelmet_01),
        //     // itemDatabase.get(ItemID.LeatherHelmet_01),
        //     // itemDatabase.get(ItemID.PlateBelt_01),
        //     1,
        //     itemStackFactory,
        // );
        //
        // console.log(equipSlot);

        // let warriorRightHand: EquipSlotInterface = new DefaultEquipSlot();
        // let warriorLeftHand: EquipSlotInterface = new DefaultEquipSlot();
        //
        // warriorRightHand = new EquipSlotWithItemCategoryDecorator(
        //     warriorRightHand,
        //     [
        //         entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.OneHandedSwords),
        //         entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.OneHandedAxes),
        //     ]);
        // warriorLeftHand = new EquipSlotWithItemCategoryDecorator(
        //     warriorLeftHand,
        //     [
        //         entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Shields),
        //     ]);
        // warriorRightHand.createItemStack(itemDatabase.get(ItemID.OneHandedSword_01), 1, itemStackFactory);
        // warriorLeftHand.createItemStack(itemDatabase.get(ItemID.Shield_01), 1, itemStackFactory);
        // console.log(warriorRightHand);
        // console.log(warriorLeftHand);

        // let mageRightHand: EquipSlotInterface = new DefaultEquipSlot();
        // let mageLeftHand: EquipSlotInterface = new DefaultEquipSlot();
        // let mageLeftHand = new DefaultEquipSlot();
        // let mageLeftHand: EquipSlotInterface = new LeftHand();
        let mageLeftHand: EquipSlotInterface = new LeftHand();
        let mageRightHand: EquipSlotInterface = new RightHand(mageLeftHand as LeftHand);

        // mageRightHand = new Decorator(mageRightHand);
        // mageLeftHand = new Decorator(mageRightHand);

        mageRightHand = new EquipSlotWithItemCategoryDecorator(
            mageRightHand,
            [
                entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Staffs),
                entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Wands),
            ]);
        mageLeftHand = new EquipSlotWithItemCategoryDecorator(
            mageLeftHand,
            [
                entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Wands),
            ]);
        // mageRightHand = new RightHandDecorator(mageRightHand);    //Логика должна быть привяза к правой руке. А левая ничего не делает. У неё нет логики никакой. Её нельзя разблокировать.
        // mageLeftHand = new Decorator(mageLeftHand, mageRightHand);    //Логика должна быть привяза к правой руке. А левая ничего не делает. У неё нет логики никакой. Её нельзя разблокировать.

        mageRightHand.createItemStack(itemDatabase.get(ItemID.Staff01),1, itemStackFactory);
        // mageRightHand.destroyItemStack();
        // mageRightHand.createItemStack(itemDatabase.get(ItemID.Wand_01),1, itemStackFactory);
        // mageLeftHand.createItemStack(itemDatabase.get(ItemID.Staff_01),1, itemStackFactory);
        mageLeftHand.createItemStack(itemDatabase.get(ItemID.Wand01),1, itemStackFactory);
        console.log(mageRightHand);
        console.log(mageLeftHand);

        // rightHand.equip('two_hand_sword');   //Левая блокируется.
        // leftHand.equip('shield');   //Ошибка. Слот заблокирован.
        // //или
        // leftHand.equip('shield');    //Может быть постоянный блок, если герою доступны только двуручки.
    }

    private testEntityManager() {
        console.log(this._container.get(ServiceID.EntityManager));
        // console.log(this._container.get<EntityManagerInterface>(ContainerKey.EntityManager).get(EntityManagerKey.EnemyType, EnemyID.Bear));
    }

    private devItemStorageUnion() {
        let itemStorageFactory = this._container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory);
        let itemDatabase = this._container.get<ItemDatabase>(ServiceID.ItemDatabase);

        let items = [
            {item: itemDatabase.get(ItemID.Wood), count: 244},
            {item: itemDatabase.get(ItemID.Wood), count: 244},
            {item: itemDatabase.get(ItemID.Wood), count: 25},   //Сумма -> остаток
            {item: itemDatabase.get(ItemID.Wood), count: 25},   //50
            {item: itemDatabase.get(ItemID.Wood), count: 50},
            {item: itemDatabase.get(ItemID.Wood), count: 50},
            {item: itemDatabase.get(ItemID.Wood), count: 26},
            {item: itemDatabase.get(ItemID.Wood), count: 26},   //50    -> 2
            {item: itemDatabase.get(ItemID.Wood), count: 26},   //28
            {item: itemDatabase.get(ItemID.Wood), count: 4},    //32
        ];

        let itemStorage = itemStorageFactory.create(10);
        for (let i = 0; i < items.length; i++) {
            itemStorage.get<ItemStorageComponent>(ItemStorageComponent.name).addItem(items[i].item, items[i].count);
        }
        console.log(itemStorage);

        let mainItemStorageList = new MainItemStorageListComponent(3);

        mainItemStorageList.create(10, itemStorageFactory);
        mainItemStorageList.create(10, itemStorageFactory);
        mainItemStorageList.create(10, itemStorageFactory);

        // for (let i = 0; i < items.length; i++) {
        //     let maxIterations = 10_000;
        //     let currentIteration = 0;
        //     while (items[i].count > 0 || currentIteration < maxIterations) {
        //         // items[i].count -= items[i].count - itemStorageUnion.addItem(mainItemStorageList.itemStorages, items[i].item, items[i].count);
        //         items[i].count -= items[i].count - ItemStorageComponent.addItemToItemStorages(mainItemStorageList.itemStorages, items[i].item, items[i].count);
        //         // console.log('flaw', items[i].item.name, items[i].count);
        //         ++currentIteration;
        //     }
        // }

        ItemStorageComponent.addItemToItemStorages(mainItemStorageList.itemStorages, itemDatabase.get(ItemID.Wood), 51);
        ItemStorageComponent.addItemToItemStorages(mainItemStorageList.itemStorages, itemDatabase.get(ItemID.Wood), 51);
        ItemStorageComponent.addItemToItemStorages(mainItemStorageList.itemStorages, itemDatabase.get(ItemID.Wood), 51);

        console.log(mainItemStorageList);
        console.log(mainItemStorageList.itemStorages);

        // mainItemStorageList.map((itemStorage, index) => {
        //     console.log(itemStorage);
        // });
    }

    private devNewItemStorage() {
        let itemDatabase = this._container.get<ItemDatabase>(ServiceID.ItemDatabase);
        let itemStackFactory = this._container.get<ItemStackFactory>(ServiceID.ItemStackFactory);

        let itemStorage = new Bag(
            10,
            itemStackFactory,
        );
        // console.log(itemStorage);

        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 12));
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 12));
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 12));
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 12));
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 12));
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 40));
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 100));
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 100));
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 100));
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 100));
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 100));
        console.log(itemStorage);
    }
}