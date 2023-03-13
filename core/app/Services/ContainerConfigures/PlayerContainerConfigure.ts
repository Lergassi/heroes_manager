// import config from '../config/main.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import config from '../../../config/config.js';
import AutoIncrementIDGenerator from '../../../source/AutoIncrementIDGenerator.js';
import ContainerConfigureInterface from '../../../source/ContainerConfigureInterface.js';
import ContainerInterface from '../../../source/ContainerInterface.js';
import GameObjectStorage from '../../../source/GameObjectStorage.js';
import IDGeneratorInterface from '../../../source/IDGeneratorInterface.js';
import ItemDatabase from '../../../source/ItemDatabase.js';
import {ComponentID} from '../../../types/enums/ComponentID.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {EntityID} from '../../../types/enums/EntityID.js';
import {ServiceID} from '../../../types/enums/ServiceID.js';
import Production from '../../Components/Craft/Production.js';
import Fence from '../../Components/Fence.js';
import ItemStorageController from '../../Components/ItemStorages/ItemStorageController.js';
import MainHeroList from '../../Components/MainHeroList.js';
import MainLocationList from '../../Components/MainLocationList.js';
import ProductionConfigurator from '../../Components/ProductionConfigurator.js';
import Shop from '../../Components/Shop.js';
import Tavern from '../../Components/Tavern.js';
import Tavern_v2 from '../../Components/Tavern_v2.js';
import TavernController from '../../Components/TavernController.js';
import Item from '../../Entities/Item.js';
import EnemyCharacterAttributeFactory from '../../Factories/EnemyCharacterAttributeFactory.js';
import EnemyFactory from '../../Factories/EnemyFactory.js';
import ExperienceComponentFactory from '../../Factories/ExperienceComponentFactory.js';
import GameObjectFactory from '../../Factories/GameObjectFactory.js';
import HeroCharacterAttributeFactory from '../../Factories/HeroCharacterAttributeFactory.js';
import HeroFactory from '../../Factories/HeroFactory.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import ItemStorageFactory from '../../Factories/ItemStorageFactory.js';
import LocationFactory from '../../Factories/LocationFactory.js';
import PlayerFactory from '../../Factories/PlayerFactory.js';
import VeinFactory from '../../Factories/VeinFactory.js';
import WalletFactory from '../../Factories/WalletFactory.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import ItemStorageInterface from '../../Interfaces/ItemStorageInterface.js';
import WalletInterface from '../../Interfaces/WalletInterface.js';
import EnemyCharacterAttributeGenerator from '../BalanceTools/EnemyCharacterAttributeGenerator.js';
import HeroCharacterAttributeGenerator from '../BalanceTools/HeroCharacterAttributeGenerator.js';
import CharacterAttributeValueGenerator from '../CharacterAttributeValueGenerator.js';
import EnemyCharacterAttributeStartValueGenerator from '../EnemyCharacterAttributeStartValueGenerator.js';
import LocationDatabaseConfigurator from '../LocationDatabaseConfigurator';
import StubFactory from '../StubFactory.js';

/**
 * todo: Временно не актуально.
 * Создает контейнер для нового игрока. Для загрузки данных использовать декоратор.
 */
export default class PlayerContainerConfigure implements ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        // container.set<object>('core.config', config);
        // container.set<IDGeneratorInterface>('player.realtimeObjectIdGenerator', (container: ContainerInterface) => {
        //     return new UUIDGenerator();
        // });
        container.set<IDGeneratorInterface>(ServiceID.IDGenerator, (container: ContainerInterface) => {
            return new AutoIncrementIDGenerator(1);
        });
        //region dev
        /**
         * @indev
         */
        //Ну допустим...
        // Object.defineProperty(Object.prototype, '_generateID', {
        //     get: () => {
        //         return container.get<IDGeneratorInterface>(ServiceID.IDGenerator).generateID();
        //     }
        // });
        //endregion dev
        container.set<GameObjectStorage>(ServiceID.GameObjectStorage, (container) => {
            return new GameObjectStorage();
        });
        // container.set<UserFactory>('core.userFactory', (container) => {
        //     return new UserFactory(container.get<AutoIncrementIDGenerator>('player.realtimeObjectIdGenerator'));
        // });

        //Фабрики
        container.set(ServiceID.GameObjectFactory, (container) => {
            return new GameObjectFactory(
                container.get<GameObjectStorage>(ServiceID.GameObjectStorage),
                container.get<IDGeneratorInterface>(ServiceID.IDGenerator),
            );
        });
        //region Фабрики компонентов.
        container.set<ExperienceComponentFactory>(ServiceID.ExperienceComponentFactory, (container) => {
            return new ExperienceComponentFactory({
                maxLevel: config.max_hero_level,
                heroCharacterAttributeValueGenerator: container.get<HeroCharacterAttributeGenerator>(ServiceID.HeroCharacterAttributeGenerator),
            });
        });
        //endregion Фабрики компонентов.
        container.set<PlayerFactory>('player.playerFactory', (container) => {
            let playerFactory = new PlayerFactory({
                gameObjectFactory: container.get<GameObjectFactory>(ServiceID.GameObjectFactory),
                experienceComponentFactory: container.get<ExperienceComponentFactory>(ServiceID.ExperienceComponentFactory),
                maxLevel: 100,
            });

            //todo: player_env_indev
            container.get<GameObjectStorage>(ServiceID.GameObjectStorage).add(playerFactory.create());

            return playerFactory;
        });
        container.set<WalletFactory>(ServiceID.WalletFactory, (container) => {
            let walletFactory = new WalletFactory(
                container.get<GameObjectFactory>(ServiceID.GameObjectFactory),
                container.get<EntityManagerInterface>(ServiceID.EntityManager),
            );

            return walletFactory;
        });
        //Где была зависимость?
        // container.set<WalletInterface>(ServiceID.Wallet, container.get<WalletFactory>(ServiceID.WalletFactory).create(0).get<WalletInterface>(ComponentID.Wallet));
        container.set<CharacterAttributeValueGenerator>(ServiceID.CharacterAttributeValueGenerator, (container) => {
            return new CharacterAttributeValueGenerator();
        });
        container.set<HeroCharacterAttributeFactory>(ServiceID.HeroCharacterAttributeFactory, (container) => {
            return new HeroCharacterAttributeFactory(
                container.get<HeroCharacterAttributeGenerator>(ServiceID.HeroCharacterAttributeGenerator),
            );
        });
        container.set<EnemyCharacterAttributeFactory>(ServiceID.EnemyCharacterAttributeFactory, (container) => {
            return new EnemyCharacterAttributeFactory(container.get<EnemyCharacterAttributeGenerator>(ServiceID.EnemyCharacterAttributeGenerator));
        });
        container.set<HeroFactory>(ServiceID.HeroFactory, (container) => {
            return new HeroFactory(
                container.get<EntityManagerInterface>(ServiceID.EntityManager),
                container.get<GameObjectFactory>(ServiceID.GameObjectFactory),
                container.get<ExperienceComponentFactory>(ServiceID.ExperienceComponentFactory),
                container.get<HeroCharacterAttributeFactory>(ServiceID.HeroCharacterAttributeFactory),
            );
        });
        container.set<ItemStackFactory>(ServiceID.ItemStackFactory, (container) => {
            return new ItemStackFactory(
                container.get<IDGeneratorInterface>(ServiceID.IDGenerator),
                container.get<EntityManagerInterface>(ServiceID.EntityManager),
            );
        });
        container.set<Tavern>(ServiceID.Tavern, (container) => {
            return new Tavern();
        });
        container.set<Tavern_v2>(ServiceID.Tavern_v2, (container) => {
            return new Tavern_v2();
        });
        container.set<TavernController>(ServiceID.TavernController, (container) => {
            return new TavernController(
                container.get<Tavern>(ServiceID.Tavern),
            );
        });
        // container.set<MainItemStorageListComponent>(ContainerID.MainItemStorageList, (container) => {
        //     let itemStorageCollectionGameObject = container.get<GameObjectFactory>(ContainerID.GameObjectFactory).create();
        //
        //     //todo: Не удобно. Игровые обязательные объекты должны быть вынесены в другое место.
        //     let itemStorageCollectionComponent = itemStorageCollectionGameObject.addComponent<MainItemStorageListComponent>(new MainItemStorageListComponent(
        //         4,
        //         [
        //             // container.get<ItemStorageFactoryInterface>('player.techItemStorageFactory').create(DEFAULT_ITEM_STORAGE_SIZE),
        //         ],
        //     ));
        //
        //     return itemStorageCollectionComponent;
        // });
        container.set<ItemStorageInterface>(ServiceID.ItemStorageController, (container) => {
            let max = 4;

            return new ItemStorageController(max);
        });
        container.set<ItemStorageFactory>(ServiceID.ItemStorageFactory, (container) => {
            return new ItemStorageFactory(
                container.get<GameObjectStorage>(ServiceID.GameObjectStorage),
                container.get<ItemStackFactory>(ServiceID.ItemStackFactory),
                container.get<GameObjectFactory>(ServiceID.GameObjectFactory),
                container.get<EntityManagerInterface>(ServiceID.EntityManager),
            );
        });
        container.set<EnemyFactory>(ServiceID.EnemyFactory, (container) => {
            return new EnemyFactory(
                container.get<GameObjectFactory>(ServiceID.GameObjectFactory),
                container.get<EntityManagerInterface>(ServiceID.EntityManager),
                container.get<EnemyCharacterAttributeFactory>(ServiceID.EnemyCharacterAttributeFactory),
            );
        });
        container.set<LocationDatabaseConfigurator>(ServiceID.LocationConfigurator, new LocationDatabaseConfigurator(
            container.get<EnemyFactory>(ServiceID.EnemyFactory),
        ));
        container.set<LocationFactory>(ServiceID.LocationFactory, (container) => {
            return new LocationFactory(
                container.get<GameObjectFactory>(ServiceID.GameObjectFactory),
                container.get<ItemStackFactory>(ServiceID.ItemStackFactory),
                container.get<EntityManagerInterface>(ServiceID.EntityManager),
                container.get<ItemDatabase>(ServiceID.ItemDatabase),
                container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory),
                container.get<WalletFactory>(ServiceID.WalletFactory),
                container.get<EnemyFactory>(ServiceID.EnemyFactory),
                container.get<LocationDatabaseConfigurator>(ServiceID.LocationConfigurator),
            );
        });
        container.set<VeinFactory>(ServiceID.VeinFactory, new VeinFactory());
        container.set<Production>(ServiceID.Production, (container) => {
            return new Production(
                container.get<EntityManagerInterface>(ServiceID.EntityManager),
            );
        });

        //Фасады
        // container.set<ItemStorageManager>(ContainerID.ItemStorageManager, (container) => {
        //     return new ItemStorageManager(container.get<GameObjectStorage>(ContainerID.GameObjectStorage));
        // });

        container.set<MainHeroList>(ServiceID.MainHeroList, (container) => {
            let heroListControllerGameObject = container.get<GameObjectFactory>(ServiceID.GameObjectFactory).create();

            let mainHeroListComponent = heroListControllerGameObject.addComponent(new MainHeroList(
                container.get<GameObjectStorage>(ServiceID.GameObjectStorage),
                container.get<HeroFactory>(ServiceID.HeroFactory),
                // 10,
                100,    //todo: В настройки.
                // 1000,    //todo: В настройки.
                // 10_000,    //todo: В настройки.
                // 100_000,    //todo: В настройки.
                // 1_000_000,    //todo: В настройки.
            ));

            return mainHeroListComponent;
        });

        //todo: Надо както сделать по другому такую логику.
        container.set<MainLocationList>(ServiceID.MainLocationList, (container) => {
            let max = 1000;
            let mainLocationList = new MainLocationList(
                max,
            );

            return mainLocationList;
        });

        // container.set(ServiceID.Shop, (container) => {
        //     let shop = new Shop();
        //     container.get<EntityManagerInterface>(ServiceID.EntityManager).map<Item>(EntityID.Item, (item) => {
        //         shop.config(item, item.getProperty('defaultBuyPrice') ?? 0);
        //     });
        //
        //     return shop;
        // });
        // container.set(ServiceID.Fence, (container) => {
        //     let fence = new Fence();
        //     container.get<EntityManagerInterface>(ServiceID.EntityManager).map<Item>(EntityID.Item, (item) => {
        //         fence.config(item, item.getProperty('defaultSellPrice') ?? 0);
        //     });
        //
        //     return fence;
        // });

        container.set(ServiceID.StubFactory, (container) => {
            return new StubFactory(container);
        });

        debug(DebugNamespaceID.Log)(sprintf('Конфигурация %s завершена.', this.constructor.name));

        return container;
    }
}