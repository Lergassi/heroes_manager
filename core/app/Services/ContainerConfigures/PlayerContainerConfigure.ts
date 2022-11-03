import ContainerConfigureInterface from '../../../source/ContainerConfigureInterface.js';
import ContainerInterface from '../../../source/ContainerInterface.js';
import GameObjectStorage from '../../../source/GameObjectStorage.js';
import PlayerFactory from '../../Factories/PlayerFactory.js';
import WalletFactory from '../../Factories/WalletFactory.js';
import HeroFactory from '../../Factories/HeroFactory.js';
import EntityManager from '../../../source/EntityManager.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import ItemStorageFactory from '../../Factories/ItemStorageFactory.js';
import ItemStorageManager from '../ItemStorageManager.js';
// import config from '../config/main.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import IDGeneratorInterface from '../../../source/IDGeneratorInterface.js';
import GameObject from '../../../source/GameObject.js';
import MainItemStorageListComponent from '../../Components/MainItemStorageListComponent.js';
import ItemStorageFactoryInterface from '../../Factories/ItemStorageFactoryInterface.js';
import GameObjectFactory from '../../Factories/GameObjectFactory.js';
import MainHeroListComponent from '../../Components/MainHeroListComponent.js';
import AutoIncrementIDGenerator from '../../../source/AutoIncrementIDGenerator.js';
import LocationFactory from '../../Factories/LocationFactory.js';
import ItemDatabase from '../../../source/ItemDatabase.js';
import MainLocationListComponent from '../../Components/MainLocationListComponent.js';
import ExperienceComponentFactory from '../../Factories/ExperienceComponentFactory.js';
import EnemyFactory from '../../Factories/EnemyFactory.js';
import ExperienceComponent from '../../Components/ExperienceComponent.js';
import WalletComponent from '../../Components/WalletComponent.js';
import Currency from '../../Entities/Currency.js';
import _ from 'lodash';
import {ContainerID} from '../../../types/enums/ContainerID.js';
import {CurrencyID} from '../../../types/enums/CurrencyID.js';
import CharacterAttributeValueGenerator from '../CharacterAttributeValueGenerator.js';
import EnemyCharacterAttributeStartValueGenerator from '../EnemyCharacterAttributeStartValueGenerator.js';
import EnemyCharacterAttributeFactory from '../../Factories/EnemyCharacterAttributeFactory.js';
import {EntityID} from '../../../types/enums/EntityID.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import HeroCharacterAttributeFactory from '../../Factories/HeroCharacterAttributeFactory.js';
import ItemStorageControllerWithLimit from '../../Components/ItemStorageControllerWithLimit.js';

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
        container.set<IDGeneratorInterface>(ContainerID.IDGenerator, (container: ContainerInterface) => {
            return new AutoIncrementIDGenerator(1);
        });
        //region dev
        /**
         * @indev
         */
        //Ну допустим...
        Object.defineProperty(Object.prototype, '_generateID', {
            get: () => {
                return container.get<IDGeneratorInterface>(ContainerID.IDGenerator).generateID();
            }
        });
        //endregion dev
        container.set<GameObjectStorage>(ContainerID.GameObjectStorage, (container) => {
            return new GameObjectStorage();
        });
        // container.set<UserFactory>('core.userFactory', (container) => {
        //     return new UserFactory(container.get<AutoIncrementIDGenerator>('player.realtimeObjectIdGenerator'));
        // });

        //Фабрики
        container.set(ContainerID.GameObjectFactory, (container) => {
            return new GameObjectFactory(
                container.get<GameObjectStorage>(ContainerID.GameObjectStorage),
                container.get<IDGeneratorInterface>(ContainerID.IDGenerator),
            );
        });
        //region Фабрики компонентов.
        container.set<ExperienceComponentFactory>(ContainerID.ExperienceComponentFactory, (container) => {
            return new ExperienceComponentFactory({
                maxLevel: 100,
            });
        });
        //endregion Фабрики компонентов.
        container.set<PlayerFactory>('player.playerFactory', (container) => {
            let playerFactory = new PlayerFactory({
                gameObjectFactory: container.get<GameObjectFactory>(ContainerID.GameObjectFactory),
                experienceComponentFactory: container.get<ExperienceComponentFactory>(ContainerID.ExperienceComponentFactory),
                maxLevel: 100,
            });

            //todo: player_env_indev
            container.get<GameObjectStorage>(ContainerID.GameObjectStorage).add(playerFactory.create());

            return playerFactory;
        });
        container.set<WalletFactory>(ContainerID.WalletFactory, (container) => {
            let walletFactory = new WalletFactory(
                container.get<GameObjectFactory>(ContainerID.GameObjectFactory),
                container.get<EntityManagerInterface>(ContainerID.EntityManager),
            );

            //todo: player_env_indev
            let currencies = {
                [CurrencyID.Gold]: 1000,
                [CurrencyID.ResearchPoints]: 10,
            };

            _.map(currencies, (value, currencyID) => {
                walletFactory.create(
                    container.get<EntityManagerInterface>(ContainerID.EntityManager).get<Currency>(EntityID.Currency, currencyID),
                    value,
                );
            });

            return walletFactory;
        });
        container.set<CharacterAttributeValueGenerator>(ContainerID.CharacterAttributeValueGenerator, (container) => {
            return new CharacterAttributeValueGenerator();
        });
        container.set<EnemyCharacterAttributeStartValueGenerator>(ContainerID.CharacterAttributeStartValueGenerator, (container) => {
            return new EnemyCharacterAttributeStartValueGenerator(container.get<CharacterAttributeValueGenerator>(ContainerID.CharacterAttributeValueGenerator));
            // return new CharacterAttributeStartValueGenerator();
        });
        container.set<HeroCharacterAttributeFactory>(ContainerID.HeroCharacterAttributeFactory, (container) => {
            return new HeroCharacterAttributeFactory(
                // container.get<CharacterAttributeStartValueGenerator>(ContainerID.CharacterAttributeStartValueGenerator),
            );
        });
        container.set<EnemyCharacterAttributeFactory>(ContainerID.EnemyCharacterAttributeFactory, (container) => {
            return new EnemyCharacterAttributeFactory(
                container.get<EnemyCharacterAttributeStartValueGenerator>(ContainerID.CharacterAttributeStartValueGenerator),
            );
        });
        container.set<HeroFactory>(ContainerID.HeroFactory, (container) => {
            return new HeroFactory(
                container.get<EntityManagerInterface>(ContainerID.EntityManager),
                container.get<GameObjectFactory>(ContainerID.GameObjectFactory),
                container.get<ExperienceComponentFactory>(ContainerID.ExperienceComponentFactory),
                // container.get<EnemyCharacterAttributeFactory>(ContainerID.CharacterAttributeFactory),
                container.get<HeroCharacterAttributeFactory>(ContainerID.HeroCharacterAttributeFactory),
            );
        });
        container.set<ItemStackFactory>(ContainerID.ItemStackFactory, (container) => {
            return new ItemStackFactory(
                container.get<IDGeneratorInterface>(ContainerID.IDGenerator),
                container.get<EntityManagerInterface>(ContainerID.EntityManager),
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
        container.set(ContainerID.ItemStorageController, (container) => {
            return new ItemStorageControllerWithLimit(4);
        });
        container.set<ItemStorageFactory>(ContainerID.ItemStorageFactory, (container) => {
            return new ItemStorageFactory(
                container.get<GameObjectStorage>(ContainerID.GameObjectStorage),
                container.get<ItemStackFactory>(ContainerID.ItemStackFactory),
                container.get<GameObjectFactory>(ContainerID.GameObjectFactory),
            );
        });
        container.set<EnemyFactory>(ContainerID.EnemyFactory, (container) => {
            return new EnemyFactory(
                container.get<GameObjectFactory>(ContainerID.GameObjectFactory),
                container.get<EntityManagerInterface>(ContainerID.EntityManager),
                container.get<EnemyCharacterAttributeFactory>(ContainerID.EnemyCharacterAttributeFactory),
            );
        });
        container.set<LocationFactory>(ContainerID.LocationFactory, (container) => {
            return new LocationFactory(
                container.get<GameObjectFactory>(ContainerID.GameObjectFactory),
                container.get<ItemStackFactory>(ContainerID.ItemStackFactory),
                container.get<EntityManagerInterface>(ContainerID.EntityManager),
                container.get<ItemDatabase>(ContainerID.ItemDatabase),
                container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory),
                container.get<WalletFactory>(ContainerID.WalletFactory),
                container.get<EnemyFactory>(ContainerID.EnemyFactory),
            );
        });

        //Фасады
        // container.set<ItemStorageManager>(ContainerID.ItemStorageManager, (container) => {
        //     return new ItemStorageManager(container.get<GameObjectStorage>(ContainerID.GameObjectStorage));
        // });

        container.set<MainHeroListComponent>(ContainerID.MainHeroList, (container) => {
            let heroListControllerGameObject = container.get<GameObjectFactory>(ContainerID.GameObjectFactory).create();

            let mainHeroListComponent = heroListControllerGameObject.addComponent(new MainHeroListComponent(
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
        container.set<MainLocationListComponent>(ContainerID.MainLocationList, (container) => {
            let mainLocationList = container.get<GameObjectFactory>(ContainerID.GameObjectFactory).create();

            let mainLocationListComponent = mainLocationList.addComponent(new MainLocationListComponent(
                10,
            ));

            return mainLocationListComponent;
        });

        debug(DebugNamespaceID.Log)(sprintf('Конфигурация %s завершена.', this.constructor.name));

        return container;
    }
}