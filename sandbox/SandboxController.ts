import ContainerInterface from '../core/source/ContainerInterface.js';
import Container from '../core/source/Container.js';
import DefaultContainerConfigure from '../core/app/Services/ContainerConfigures/DefaultContainerConfigure.js';
import CoreContainerConfigure from '../core/app/Services/ContainerConfigures/CoreContainerConfigure.js';
import PlayerContainerConfigure from '../core/app/Services/ContainerConfigures/PlayerContainerConfigure.js';
import _ from 'lodash';
import ItemDatabase from '../core/source/ItemDatabase.js';
import Item from '../core/app/Entities/Item.js';
import {ItemID} from '../core/types/enums/ItemID.js';
import EntityManager from '../core/source/EntityManager.js';
import {HeroClassID} from '../core/types/enums/HeroClassID.js';
import EntityManagerBuilder from '../core/app/Services/EntityManagerBuilder.js';
import {ContainerID} from '../core/types/enums/ContainerID.js';
import debug from 'debug';
import {DebugNamespaceID} from '../core/types/enums/DebugNamespaceID.js';
import AddItemInterface from '../core/app/Interfaces/AddItemInterface.js';
import {unsigned} from '../core/types/main.js';
import {DEFAULT_STACK_SIZE} from '../core/app/consts.js';
import ItemKit from '../core/app/Services/ItemKit.js';
import CharacterAttributeValueGeneratorByConfig from '../core/app/Services/CharacterAttributeValueGeneratorByConfig.js';
import {startCharacterAttributeConfig} from '../core/config/start_character_values.js';
import {CharacterAttributeID} from '../core/types/enums/CharacterAttributeID.js';
import HeroFactory from '../core/app/Factories/HeroFactory.js';
import EnemyFactory from '../core/app/Factories/EnemyFactory.js';
import {EnemyID} from '../core/types/enums/EnemyID.js';
import FightController from '../core/app/Components/FightController.js';
import AttackControllerInterface from '../core/app/Interfaces/AttackControllerInterface.js';
import {ComponentID} from '../core/types/enums/ComponentID.js';
import DamageControllerInterface from '../core/app/Interfaces/DamageControllerInterface.js';
import LocationFactory from '../core/app/Factories/LocationFactory.js';
import LocationComponent, {GatheringPointTypeID} from '../core/app/Components/LocationComponent.js';
import AttackGroupController from '../core/app/Components/AttackGroupController.js';
import DamageGroupController from '../core/app/Components/DamageGroupController.js';
import HealthPointsComponent from '../core/app/Components/HealthPointsComponent.js';
import {extractHealthPoints, separator} from '../core/app/indev.js';
import CharacterAttribute from '../core/app/Components/CharacterAttribute.js';
import ItemCharacterAttributeCollector from '../core/app/Components/ItemCharacterAttributeCollector.js';
import CharacterStateController, {CharacterStateCode} from '../core/app/Components/CharacterStateController.js';
import CharacterFightGroup from '../core/app/CharacterFightGroup.js';
import {CurrencyID} from '../core/types/enums/CurrencyID.js';
import WalletFactory from '../core/app/Factories/WalletFactory.js';
import WalletComponent from '../core/app/Components/WalletComponent.js';
import ExperienceComponent from '../core/app/Components/ExperienceComponent.js';
import GatheringPoint from '../core/app/Components/GatheringPoint.js';
import EntityManagerInterface from '../core/app/Interfaces/EntityManagerInterface.js';
import Gatherer from '../core/app/Components/Gatherer.js';
import ItemStorageFactory from '../core/app/Factories/ItemStorageFactory.js';
import ItemStorageControllerWithLimit from '../core/app/Components/ItemStorageControllerWithLimit.js';
import ItemStorageInterface from '../core/app/Interfaces/ItemStorageInterface.js';

export default class SandboxController {
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
        // console.log(_.sum([Number(false)]));
        // console.log(_.sum([false + 0]));
        // console.log(_.sum([<number>(false)]));
        // this._testSumBoolean();
        //-this._testLodashEvery();

        // this.devNewItemStorage();
        // this._devItemDatabase();
        // this._devInstanceofInterface();
        // this._devItemKit();
        // this._devCharacterAttributeGenerator();
        // this._devFight();
        // this._devFightGroup();
        // this._devGroupFight();
        // this._devFullLocation();
        // this._devCharacterGroup();
        // this._devStateSystemV2();
        this._devGather();
        // this._devItemStorageCollection();

        // this._testVanillaJS();
        // this._testLodash();
        // this._test1();
        // this._testNewEntityManager();
        // this._testEnumKey();
        // this._testDebugNamespace();
    }

    private _test1() {
        let a = [
            {id: 42, name: 'value 42'},
            {id: 43, name: 'value 43'},
            {id: 44, name: 'value 44'},
        ];

        // let o = {
        //     42: {id: 42, name: 'foo'},
        //     43: {id: 43, name: 'foo'},
        // };

        let o = _.keyBy(a, function(o) {
            return o.id;
        });
        console.log(a);
        console.log(o);
    }

    private _devItemDatabase() {
        let itemDatabase = new ItemDatabase({
            'Wood': new Item(
                'Wood',
                '',
                '',
                11,
                11,
                11,
                undefined,
                undefined,
                undefined,
                undefined,
            ),
        });
        console.log(itemDatabase);
        console.log(itemDatabase.get(ItemID.Wood));
        console.log(itemDatabase.get(ItemID.IronOre));
    }

    private _testNewEntityManager() {
        let container = new Container();
        let entityManager = new EntityManager();

        (new EntityManagerBuilder(
            container,
            entityManager,
        )).build();
        console.log(entityManager);
        // let equipSlotFactory = new EquipSlotEntityFactory(entityManager);
        // equipSlotFactory.createArmorSlot(
        //     EquipSlotID.Head,
        //     'Голова',
        //     500,
        //     [
        //         // ItemCategoryID.Helmets,
        //     ],
        // );
        // console.log(entityManager);
    }

    private _testEnumKey() {
        let itemCategories: {[id in HeroClassID]?: number};
        itemCategories = {
            // [HeroClassID.Archer]: 42,
        };
        itemCategories['Archer'] = 42;
        console.log(itemCategories);
    }

    private _testDebugNamespace() {
        debug(DebugNamespaceID.Debug)('this is ' + DebugNamespaceID.Debug);
        debug(DebugNamespaceID.Log)('this is ' + DebugNamespaceID.Log);
        debug(DebugNamespaceID.Info)('this is ' + DebugNamespaceID.Info);
        debug(DebugNamespaceID.Warning)('this is ' + DebugNamespaceID.Warning);
        debug(DebugNamespaceID.Error)('this is ' + DebugNamespaceID.Error);
    }

    private _devInstanceofInterface() {
        let item: AddItemInterface = {
            addItem(item: Item, count: unsigned): unsigned {
                return 0;
            },
            moveItemsTo(target: AddItemInterface) {
            }
        };
        // console.log(item);
        // console.log(item.hasOwnProperty('addItem'));
        // console.log(item.hasOwnProperty('addItem1'));
        // console.log(item.hasOwnProperty(AddItemInterfaceType.addItem.name));
        // console.log(item instanceof AddItemInterface);
        // console.log(item. instanceof AddItemInterfaceTy);
        // console.log(AddItemInterface.name);
    }

    private _testLodash() {
        // console.log(0, _.isEmpty(0));
        // console.log('', _.isEmpty(''));
        // console.log(undefined, _.isEmpty(undefined));
        // console.log(null, _.isEmpty(null));
        // console.log([], _.isEmpty([]));
        // console.log({}, _.isEmpty({}));
        //
        // console.log(' ', _.isEmpty(' '));
        // console.log(1, _.isEmpty(1));

        // console.log('armorMaterial', _.isPlainObject(new ArmorMaterial('1', 'Латы', 500)));
        // console.log('object', _.isPlainObject({}));
        // console.log('array', _.isPlainObject([]));
        // console.log('null', _.isPlainObject(null));

        // assertIsEmpty();
        // assertNotEmpty();
        //
        // not(assertIsEmpty({}));
    }

    private _testVanillaJS() {
        console.log(null === null);
        console.log(typeof null);
    }

    private _devItemKit() {
        let itemKit = new ItemKit([
            {item: ItemID.Wood, count: DEFAULT_STACK_SIZE},
            {item: ItemID.IronOre, count: DEFAULT_STACK_SIZE},
            {item: ItemID.IronBar, count: DEFAULT_STACK_SIZE},
            {item: ItemID.Herb_1, count: DEFAULT_STACK_SIZE},
            {item: ItemID.BoarSkin, count: DEFAULT_STACK_SIZE},
            {item: ItemID.Leather_01, count: DEFAULT_STACK_SIZE},
            // {item: ItemID.BoarMeat, count: DEFAULT_STACK_SIZE},
            {item: ItemID.MagicResources_01, count: 1},
        ]);

        let itemStorage = this._container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(20);

        // itemKit.create(
        //     itemStorage.get<ItemStorageInterface>(GameObjectKey.ItemStorageComponent),
        //     this._container.get<ItemDatabase>(ContainerID.ItemDatabase),
        //
        // );
        // console.log(itemStorage);
    }

    private _devCharacterAttributeGenerator() {
        let heroFactory = this._container.get<HeroFactory>(ContainerID.HeroFactory);

        let generator = new CharacterAttributeValueGeneratorByConfig(startCharacterAttributeConfig);
        console.log(generator);

        // console.log(generator.generate(HeroClassID.Warrior, CharacterAttributeID.Strength));
        // console.log(generator.generate(HeroClassID.Rogue, CharacterAttributeID.Strength));
        // console.log(generator.generate(HeroClassID.Gunslinger, CharacterAttributeID.Strength));

        console.log(generator.generate(HeroClassID.Warrior, CharacterAttributeID.MaxHealthPoints));
        console.log(generator.generate(HeroClassID.Rogue, CharacterAttributeID.MaxHealthPoints));
        console.log(generator.generate(HeroClassID.Gunslinger, CharacterAttributeID.MaxHealthPoints));
        console.log(generator.generate(HeroClassID.FireMage, CharacterAttributeID.MaxHealthPoints));
        console.log(generator.generate(HeroClassID.Paladin, CharacterAttributeID.MaxHealthPoints));

        console.log(heroFactory.create(HeroClassID.Warrior, 1));
        console.log(heroFactory.create(HeroClassID.Paladin, 1));
    }

    // private _createAttackController(): AttackControllerInterface {
    //
    // }

    private _devFight() {
        let heroFactory = this._container.get<HeroFactory>(ContainerID.HeroFactory);
        let enemyFactory = this._container.get<EnemyFactory>(ContainerID.EnemyFactory);

        let hero = heroFactory.create(HeroClassID.Warrior, 1);
        let enemy = enemyFactory.create(EnemyID.Bear, 1, {
            baseCharacterAttributeValues: {
                // [CharacterAttributeID.AttackPower]: 0,
                // [CharacterAttributeID.AttackPower]: 1,
                // [CharacterAttributeID.AttackPower]: 10,
                [CharacterAttributeID.AttackPower]: 200,
                // [CharacterAttributeID.AttackPower]: 100000,
                [CharacterAttributeID.MaxHealthPoints]: 1000000,
                // [CharacterAttributeID.MaxHealthPoints]: 1000,
                // [CharacterAttributeID.AttackPower]: 1012312,
            },
        });
        console.log(hero);
        console.log(enemy);

        // let heroes = _.map(_.range(0, 10), (index) => {
        //     return heroFactory.create(HeroClassID.Warrior, 1);
        // });
        let heroes = [
            heroFactory.create(HeroClassID.Warrior, 1, {
                baseCharacterAttributeValues: {
                    // [CharacterAttributeID.MaxHealthPoints]: 10000,
                    [CharacterAttributeID.MaxHealthPoints]: 1000,
                },
            }),
            heroFactory.create(HeroClassID.Warrior, 1),
            heroFactory.create(HeroClassID.Warrior, 1),
            heroFactory.create(HeroClassID.Warrior, 1),
            heroFactory.create(HeroClassID.Warrior, 1, {
                baseCharacterAttributeValues: {
                    // [CharacterAttributeID.MaxHealthPoints]: 10000,
                    [CharacterAttributeID.MaxHealthPoints]: 1000,
                },
            }),
        ];
        // heroes[0].get<HealthPointsComponent>(HealthPointsComponent.name).kill();
        // heroes[1].get<HealthPointsComponent>(HealthPointsComponent.name).kill();
        // heroes[2].get<HealthPointsComponent>(HealthPointsComponent.name).kill();
        // heroes[3].get<HealthPointsComponent>(HealthPointsComponent.name).kill();
        console.log('heroes', extractHealthPoints(heroes));

        let enemies = [
            enemyFactory.create(EnemyID.Bear, 1, {
                baseCharacterAttributeValues: {
                    [CharacterAttributeID.AttackPower]: 16,
                    [CharacterAttributeID.MaxHealthPoints]: 200,
                },
            }),
            enemyFactory.create(EnemyID.Bear, 1, {
                baseCharacterAttributeValues: {
                    [CharacterAttributeID.AttackPower]: 16,
                    [CharacterAttributeID.MaxHealthPoints]: 200,
                },
            }),
            enemyFactory.create(EnemyID.Bear, 1, {
                baseCharacterAttributeValues: {
                    [CharacterAttributeID.AttackPower]: 16,
                    [CharacterAttributeID.MaxHealthPoints]: 200,
                },
            }),
            enemyFactory.create(EnemyID.Bear, 1, {
                baseCharacterAttributeValues: {
                    [CharacterAttributeID.AttackPower]: 16,
                    [CharacterAttributeID.MaxHealthPoints]: 200,
                },
            }),
            enemyFactory.create(EnemyID.Bear, 1, {
                baseCharacterAttributeValues: {
                    [CharacterAttributeID.AttackPower]: 16,
                    [CharacterAttributeID.MaxHealthPoints]: 200,
                },
            }),
        ];
        console.log('enemies', extractHealthPoints(enemies));

        let heroAttackGroupController = new AttackGroupController(_.map(heroes, (hero) => {
            return hero.get<AttackControllerInterface>(ComponentID.AttackController);
        }));
        let heroDamageGroupController = new DamageGroupController(_.map(heroes, (hero) => {
            return hero.get<DamageControllerInterface>(ComponentID.DamageController);
        }));
        let heroFightController = new FightController(  //todo: Это можно объединить и сделать FightController у каждого персонажа.
            // hero.get<AttackControllerInterface>(GameObjectKey.AttackController),
            // new AttackGroupController([
            //     (heroFactory.create(HeroClassID.Warrior, 1)).get<AttackControllerInterface>(GameObjectKey.AttackController),
            // ]),
            heroAttackGroupController,
            // hero.get<DamageControllerInterface>(GameObjectKey.DamageController),
            heroDamageGroupController,
        );

        let enemyAttackGroupController = new AttackGroupController(_.map(enemies, (enemy) => {
            return enemy.get<AttackControllerInterface>(ComponentID.AttackController);
        }));
        let enemyDamageGroupController = new DamageGroupController(_.map(enemies, (enemy) => {
            return enemy.get<DamageControllerInterface>(ComponentID.DamageController);
        }));
        let enemyFightController = new FightController(
            // enemy.get<AttackControllerInterface>(GameObjectKey.AttackController),
            // enemy.get<DamageControllerInterface>(GameObjectKey.DamageController),
            enemyAttackGroupController,
            enemyDamageGroupController,
        );
        console.log(heroFightController);
        console.log(enemyFightController);

        // heroFightController.attackTo(enemyFightController);
        // separator('end heroFightController.attackTo');
        // heroFightController.attackFrom(enemyFightController);
        // separator('end heroFightController.attackFrom');
        // // heroFightController.attackFrom(enemyFightController);
        // console.log(extractHealthPoints(heroes));
        // // console.log(extractHealthPoints());

        let checkEndFightCallback = (fightController: FightController) => {
            return !fightController.canAttack();
        };

        // let maxHits = 10_000;
        // let maxHits = 100;
        let maxHits = 1000;
        let currentHit = 0;
        while (currentHit < maxHits) {
            // if (!heroFightController.canAttack() || !enemyFightController.canAttack()) {
            if (checkEndFightCallback(heroFightController) || checkEndFightCallback(enemyFightController)) {
                debug(DebugNamespaceID.Log)('Сражение завершено.');
                break;
            }
            // console.log('Обмен ударами: ' + currentHit);
            console.log(separator('Обмен ударами: ' + currentHit));
            console.log(separator('heroFightController атакует enemyFightController'));
            console.log('heroes', extractHealthPoints(heroes));
            console.log('enemies', extractHealthPoints(enemies));
            // heroFightController.attackTo(enemyFightController, () => {
            //     console.log('this is afterDiedCallback. Герой получает награду.');
            //     enemy.get<ExperienceGeneratorComponent>(ExperienceGeneratorComponent.name).distribute(hero.get<ExperienceComponent>(ExperienceComponent.name));
            //     // heroAttackGroupController.remove(hero - нет доступа);
            // });
            // heroFightController.attackTo(enemyFightController, {
            //     wallet: this._container.get<WalletFactory>(ContainerID.WalletFactory).create(CurrencyID.Gold).get<WalletComponent>(WalletComponent.name),
            //     experienceDistributor: new ExperienceComponent(1, 100),
            // });
            // heroFightController.attackTo2(enemyFightController, {
            heroFightController.attackTo(enemyFightController, {
                wallet: this._container.get<WalletFactory>(ContainerID.WalletFactory).create(CurrencyID.Gold).get<WalletComponent>(WalletComponent.name),
                experienceDistributor: new ExperienceComponent(1, 100),
            });
            console.log(separator('enemyFightController атакует heroFightController'));
            console.log('heroes', extractHealthPoints(heroes));
            console.log('enemies', extractHealthPoints(enemies));
            // heroFightController.attackFrom(enemyFightController, () => {
            //     console.log('this is afterDiedCallback. Враг получает награду.');
            // });
            // heroFightController.attackFrom(enemyFightController);
            enemyFightController.attackTo(heroFightController);
            // heroFightController.exchangeHits(enemyFightController);

            if (checkEndFightCallback(heroFightController) || checkEndFightCallback(enemyFightController)) {
                debug(DebugNamespaceID.Log)(separator('Сражение завершено.'));
                break;
            }

            ++currentHit;
            console.log(separator('end Обмен ударами'));
        }
        // heroFightController.fightToDead(enemyFightController);
        console.log('heroes', extractHealthPoints(heroes));
        // console.log('enemy', extractHealthPoints([enemy]));
        console.log('enemies', extractHealthPoints(enemies));

        // enemyFightController.attackTo(hero.get<AttackControllerInterface>(GameObjectKey.AttackController));
        // enemyFightController.attackTo(hero.get<AttackControllerInterface>(GameObjectKey.AttackController));
        // enemyFightController.takeHit(hero.get<AttackControllerInterface>(GameObjectKey.AttackController));
        // enemyFightController.takeHit(hero.get<AttackControllerInterface>(GameObjectKey.AttackController));
        // enemyFightController.takeHit(hero.get<AttackControllerInterface>(GameObjectKey.AttackController));
        // enemyFightController.takeHit(hero.get<AttackControllerInterface>(GameObjectKey.AttackController));
        // enemyFightController.takeHit(hero.get<AttackControllerInterface>(GameObjectKey.AttackController));
        // enemyFightController.takeHit(hero.get<AttackControllerInterface>(GameObjectKey.AttackController));
        // enemyFightController.takeHit(hero.get<AttackControllerInterface>(GameObjectKey.AttackController));
        // enemyFightController.takeHit(hero.get<AttackControllerInterface>(GameObjectKey.AttackController));
        // enemyFightController.takeHit(hero.get<AttackControllerInterface>(GameObjectKey.AttackController));
        // enemyFightController.exchangeHits(, heroFightController);
        // heroFightController.exchangeHits(enemyFightController);
        // heroFightController.exchangeHits(enemyFightController);
        // heroFightController.exchangeHits(enemyFightController);
        // heroFightController.exchangeHits(enemyFightController);
        // heroFightController.exchangeHits(enemyFightController);
        // heroFightController.exchangeHits(enemyFightController);
        // heroFightController.exchangeHits(enemyFightController);
        // heroFightController.exchangeHits(enemyFightController);

        // heroFightController.hit(enemyFightController);
        // heroFightController.fightToDead(enemyFightController);
        // console.log(heroFightController);
        // console.log(enemyFightController);
        // console.log(hero);
        // console.log(enemy);
    }

    private _devGroupFight() {
        let heroFactory = this._container.get<HeroFactory>(ContainerID.HeroFactory);
        let enemyFactory = this._container.get<EnemyFactory>(ContainerID.EnemyFactory);

        let heroes = [
            heroFactory.create(HeroClassID.Warrior, 1, {
                baseCharacterAttributeValues: {
                    [CharacterAttributeID.MaxHealthPoints]: 10000,
                },
            }),
            heroFactory.create(HeroClassID.Rogue, 1),
            heroFactory.create(HeroClassID.FireMage, 1),
            heroFactory.create(HeroClassID.Gunslinger, 1),
            heroFactory.create(HeroClassID.Priest, 1),
        ];
        console.log(heroes);
        console.log(_.map(heroes, (hero) => {
            return hero.get<HealthPointsComponent>(HealthPointsComponent.name)['_currentHealthPoints'];
        }));
        // console.log(heroes[0].get<AttackControllerInterface>(GameObjectKey.AttackController).attack());
        // console.log(heroes[1].get<AttackControllerInterface>(GameObjectKey.AttackController).attack());
        // console.log(heroes[2].get<AttackControllerInterface>(GameObjectKey.AttackController).attack());
        // console.log(heroes[3].get<AttackControllerInterface>(GameObjectKey.AttackController).attack());
        // console.log(heroes[4].get<AttackControllerInterface>(GameObjectKey.AttackController).attack());

        // let attackGroupController = new AttackGroupController();
        // let attackGroupController = new AttackGroupController([
        //     heroes[0].get<AttackControllerInterface>(GameObjectKey.AttackController),
        //     heroes[1].get<AttackControllerInterface>(GameObjectKey.AttackController),
        // ]);
        // attackGroupController.add(heroes[2].get<AttackControllerInterface>(GameObjectKey.AttackController));
        // attackGroupController.add(heroes[3].get<AttackControllerInterface>(GameObjectKey.AttackController));
        // attackGroupController.add(heroes[4].get<AttackControllerInterface>(GameObjectKey.AttackController));
        // attackGroupController.add(heroes[4].get<AttackControllerInterface>(GameObjectKey.AttackController));
        // attackGroupController.add(heroes[4].get<AttackControllerInterface>(GameObjectKey.AttackController));
        // attackGroupController.add(heroes[4].get<AttackControllerInterface>(GameObjectKey.AttackController));
        //
        // attackGroupController.remove(heroes[2].get<AttackControllerInterface>(GameObjectKey.AttackController));
        // attackGroupController.remove(heroes[2].get<AttackControllerInterface>(GameObjectKey.AttackController));
        // attackGroupController.remove(heroes[2].get<AttackControllerInterface>(GameObjectKey.AttackController));
        // attackGroupController.remove(heroes[2].get<AttackControllerInterface>(GameObjectKey.AttackController));
        let attackGroupController = new AttackGroupController(_.map(heroes, (hero) => {
            return hero.get<AttackControllerInterface>(ComponentID.AttackController);
        }));
        console.log('attackGroupController', attackGroupController);
        console.log('attackGroupController.attack', attackGroupController.generateAttack());
        console.log('attackGroupController.attack', attackGroupController.generateAttack());
        console.log('attackGroupController.attack', attackGroupController.generateAttack());
        console.log('attackGroupController.attack', attackGroupController.generateAttack());
        console.log('attackGroupController.attack', attackGroupController.generateAttack());

        // let damageGroupController = new DamageGroupController([
        //     heroes[0].get<DamageControllerInterface>(GameObjectKey.DamageController),
        // ]);
        let damageGroupController = new DamageGroupController(_.map(heroes, (hero) => {
            return hero.get<DamageControllerInterface>(ComponentID.DamageController);
        }));
        console.log(damageGroupController);
        damageGroupController.takeDamage(5000);
        console.log('-'.repeat(32));
        damageGroupController.takeDamage(5000);

        // let enemies = [
        //     enemyFactory.create(EnemyID.Bear, 1, {
        //         characterAttributeValues: {
        //             [CharacterAttributeID.AttackPower]: 10,
        //         },
        //     }),
        //     enemyFactory.create(EnemyID.Bear, 1, {
        //         characterAttributeValues: {
        //             [CharacterAttributeID.AttackPower]: 10,
        //         },
        //     }),
        //     enemyFactory.create(EnemyID.Bear, 1, {
        //         characterAttributeValues: {
        //             [CharacterAttributeID.AttackPower]: 10,
        //         },
        //     }),
        // ];
        // console.log(enemies);
        // console.log(enemies[0].get<AttackControllerInterface>(GameObjectKey.AttackController));
        // console.log(enemies[1].get<AttackControllerInterface>(GameObjectKey.AttackController));

        // let heroFightGroup = new FightGroup();
        // heroFightGroup.addFightController(new FightController(
        //     heroes[0].get<AttackControllerInterface>(GameObjectKey.AttackController),
        //     heroes[0].get<DamageControllerInterface>(GameObjectKey.DamageController),
        // ));
        // heroFightGroup.addFightController(new FightController(
        //     heroes[1].get<AttackControllerInterface>(GameObjectKey.AttackController),
        //     heroes[1].get<DamageControllerInterface>(GameObjectKey.DamageController),
        // ));
        // heroFightGroup.addFightController(new FightController(
        //     heroes[2].get<AttackControllerInterface>(GameObjectKey.AttackController),
        //     heroes[2].get<DamageControllerInterface>(GameObjectKey.DamageController),
        // ));
        // heroFightGroup.addFightController(new FightController(
        //     heroes[3].get<AttackControllerInterface>(GameObjectKey.AttackController),
        //     heroes[3].get<DamageControllerInterface>(GameObjectKey.DamageController),
        // ));
        // heroFightGroup.addFightController(new FightController(
        //     heroes[4].get<AttackControllerInterface>(GameObjectKey.AttackController),
        //     heroes[4].get<DamageControllerInterface>(GameObjectKey.DamageController),
        // ));
        // console.log(heroFightGroup);
        //
        // let enemyFightGroup = new FightGroup();
        // enemyFightGroup.addFightController(new FightController(
        //     enemies[0].get<AttackControllerInterface>(GameObjectKey.AttackController),
        //     enemies[0].get<DamageControllerInterface>(GameObjectKey.DamageController),
        // ));
        // enemyFightGroup.addFightController(new FightController(
        //     enemies[1].get<AttackControllerInterface>(GameObjectKey.AttackController),
        //     enemies[1].get<DamageControllerInterface>(GameObjectKey.DamageController),
        // ));
        // enemyFightGroup.addFightController(new FightController(
        //     enemies[2].get<AttackControllerInterface>(GameObjectKey.AttackController),
        //     enemies[2].get<DamageControllerInterface>(GameObjectKey.DamageController),
        // ));
        // console.log(enemyFightGroup);
    }

    private _devFullLocation() {
        let locationFactory = this._container.get<LocationFactory>(ContainerID.LocationFactory);
        let heroFactory = this._container.get<HeroFactory>(ContainerID.HeroFactory);

        let location = locationFactory.create(1);
        let locationComponent = location.get<LocationComponent>(LocationComponent.name);

        locationComponent.addHero(heroFactory.create(HeroClassID.Warrior, 1));
        locationComponent.addHero(heroFactory.create(HeroClassID.Rogue, 1));
        locationComponent.addHero(heroFactory.create(HeroClassID.FireMage, 1));
        locationComponent.addHero(heroFactory.create(HeroClassID.Gunslinger, 1));
        locationComponent.addHero(heroFactory.create(HeroClassID.Priest, 1));

        console.log(location);

        // locationComponent.start();
    }

    private _devCharacterGroup() {
        // let
    }

    private _testSumBoolean() {
        let arr = [true, true, false, true];
        console.log(_.sum(_.map(arr, (item) => {
            return Boolean(item);
        })));
    }

    private _devStateSystemV2() {
        let heroFactory = this._container.get<HeroFactory>(ContainerID.HeroFactory);

        let stateController1 = new CharacterStateController();
        // stateController1.addState('state1');
        // stateController1.addState('state2');
        // stateController1.addState('state3');
        // stateController1.addState('state3');
        // stateController1.addState('state3');
        //
        // stateController1.removeState('state3');
        // console.log(stateController1.hasState('state1'));
        // console.log(stateController1.hasState('state2'));
        // console.log(stateController1.hasState(['state1', 'state2', 'state3']));
        // console.log(stateController1.hasState(['state3']));
        // console.log(stateController1.hasState(''));
        // console.log(stateController1.hasState(' '));
        // console.log(stateController1.hasState(undefined));
        // console.log(stateController1.hasState('state3'));
        // console.log(stateController1.hasState('state4'));
        // stateController1.removeState('state2');
        // stateController1.removeState('state2');
        // stateController1.removeState('state2123');

        let healthPoints1 = new HealthPointsComponent(
            new CharacterAttribute(CharacterAttributeID.MaxHealthPoints, new ItemCharacterAttributeCollector(), 100),
            stateController1,
        );
        let healthPoints2 = new HealthPointsComponent(
            new CharacterAttribute(CharacterAttributeID.MaxHealthPoints, new ItemCharacterAttributeCollector(), 100),
            new CharacterStateController(),
        );
        // console.log(1);
        healthPoints1.kill();
        // console.log(2);
        healthPoints1.kill();
        healthPoints1.kill();
        healthPoints1.kill();
        // console.log(3);
        healthPoints2.kill();
        healthPoints2.kill();
        healthPoints2.kill();
        // console.log(4);
        console.log(stateController1.hasState(CharacterStateCode.Dead));
        console.log(healthPoints1);
        console.log(stateController1);
    }

    private _testLodashEvery() {
        let arr = [true, true, true];
        // let arr = [true, true, true, false];
        // let arr = [false, false, false];
        // console.log(_.every(arr));
        console.log(_.every(arr, Boolean));
    }

    private _devFightGroup() {
        let heroFactory = this._container.get<HeroFactory>(ContainerID.HeroFactory);
        let enemyFactory = this._container.get<EnemyFactory>(ContainerID.EnemyFactory);

        let heroFightGroup = new CharacterFightGroup(5);
        heroFightGroup.addCharacter(heroFactory.create(HeroClassID.Warrior, 1));
        heroFightGroup.addCharacter(heroFactory.create(HeroClassID.Warrior, 1));
        heroFightGroup.addCharacter(heroFactory.create(HeroClassID.Warrior, 1));
        heroFightGroup.addCharacter(heroFactory.create(HeroClassID.Warrior, 1));
        heroFightGroup.addCharacter(heroFactory.create(HeroClassID.Warrior, 1));
        console.log(heroFightGroup);

        let enemyFightGroup = new CharacterFightGroup(5);
        enemyFightGroup.addCharacter(enemyFactory.create(EnemyID.Bear, 1));
        enemyFightGroup.addCharacter(enemyFactory.create(EnemyID.Bear, 1));
        enemyFightGroup.addCharacter(enemyFactory.create(EnemyID.Bear, 1));
        enemyFightGroup.addCharacter(enemyFactory.create(EnemyID.Bear, 1));
        enemyFightGroup.addCharacter(enemyFactory.create(EnemyID.Bear, 1));
        console.log(enemyFightGroup);

        // heroFightGroup.attackTo(enemyFightGroup);
        _.map(_.range(1, 10), () => {
            console.log(separator('Атакует группа героев.'));
            heroFightGroup.attackTo(enemyFightGroup);
            console.log(separator('Атакует группа врагов.'));
            enemyFightGroup.attackTo(heroFightGroup);
            console.log(separator('Конец обмена ударами.'));
        });
        console.log(heroFightGroup);
        console.log(enemyFightGroup);

    }

    private _devGather() {
        let entityManager = this._container.get<EntityManagerInterface>(ContainerID.EntityManager);
        let itemDatabase = this._container.get<ItemDatabase>(ContainerID.ItemDatabase);

        let itemStorage = this._container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(10).get<ItemStorageInterface>(ComponentID.ItemStorageComponent);
        // let itemStorageManager = this._container.get<ItemStorageManager>(ContainerID.ItemStorageManager);
        // itemStorageManager.addItem(itemDatabase.get(ItemID.Wood), 12);
        // console.log(itemStorageManager);

        let gatheringPoint = new GatheringPoint(GatheringPointTypeID.normal, itemDatabase.get(ItemID.Wood), 32);
        // let gatheringPoint = new GatheringPoint(GatheringPointTypeID.normal, itemDatabase.get(ItemID.Wood), 1);

        let stateController = new CharacterStateController();
        // stateController.addState(CharacterStateCode.Dead);
        // let gatherer = new Gatherer(stateController, itemStorageManager);
        let gatherer = new Gatherer(stateController, itemStorage);

        // for (let i = 0; i < 1000; i++) {
        //     if (!gatheringPoint.gather(gatherer)) {
        //         break;
        //     }
        // }
        // gatheringPoint.gather(gatherer);
        // gatheringPoint.gather(gatherer);
        // gatheringPoint.gather(gatherer);

        // console.log(gatheringPoint.gather2());
        // for (let i = 0; i < 100; i++) {
        //     // console.log(gatheringPoint.gather2());
        //     if (!gatheringPoint.gather2()) {
        //         break;
        //     }
        // }

        // gatherer.gather3(gatheringPoint);
        for (let i = 0; i < 100; i++) {
            // if (!gatherer.gather3(gatheringPoint)) break;    //todo: А что если жила вернет 0 при добычи? -> Когда значение жилы опуститься до нуля другая часть программы удалит её. Тут цикл просто для теста.
            // if (!gatherer.gather3(gatheringPoint, itemStorageManager)) break;
            if (!gatherer.gather3(gatheringPoint, itemStorage)) break;
            // if (!gatheringPoint.gather2()) {
            //     break;
            // }
        }

        console.log(gatheringPoint);
        console.log(gatherer);
        console.log(itemStorage);
    }

    private _devItemStorageCollection() {
        let itemStorageFactory = this._container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory);
        let itemDatabase = this._container.get<ItemDatabase>(ContainerID.ItemDatabase);

        let itemStorages = [
            itemStorageFactory.create(10),
            itemStorageFactory.create(10),
            itemStorageFactory.create(10),
            itemStorageFactory.create(10),
            itemStorageFactory.create(10),
        ]

        // let itemStorageController = new ItemStorageController([
        //     itemStorageFactory.create(2),
        //     // itemStorages[0],
        //     // itemStorages[1],
        // ]);
        let maxItemStorages = 5;
        let itemStorageController = new ItemStorageControllerWithLimit(maxItemStorages);
        itemStorageController.addItemStorage(itemStorageFactory.create(2));
        // itemStorageController.addItemStorage(itemStorages[3]);
        // itemStorageController.addItemStorage(itemStorages[4]);
        // itemStorageController.addItemStorage(itemStorages[4]);
        // itemStorageController.addItemStorage(itemStorages[4]);

        console.log(itemStorageController.addItem(itemDatabase.get(ItemID.Wood), 50));
        console.log(itemStorageController.addItem(itemDatabase.get(ItemID.Wood), 50));
        console.log(itemStorageController.addItem(itemDatabase.get(ItemID.Wood), 50));
        // console.log(itemStorageController.addItem(itemDatabase.get(ItemID.Wood), 24));
        // console.log(itemStorageController.addItem(itemDatabase.get(ItemID.Wood), 24));
        // console.log(itemStorageController.addItem(itemDatabase.get(ItemID.Wood), 24));
        // console.log(itemStorageController.addItem(itemDatabase.get(ItemID.Wood), 24));
        // console.log(itemStorageController.addItem(itemDatabase.get(ItemID.Wood), 24));
        // console.log(itemStorageController.addItem(itemDatabase.get(ItemID.Wood), 24));
        // console.log(itemStorageController.addItem(itemDatabase.get(ItemID.Wood), 24));
        // console.log(itemStorageController.addItem(itemDatabase.get(ItemID.Wood), 24));
        console.log(itemStorageController);
    }

    private _createItemStorageController() {

    }
}