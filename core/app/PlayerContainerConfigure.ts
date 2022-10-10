import ContainerConfigureInterface from '../source/ContainerConfigureInterface.js';
import ContainerInterface from '../source/ContainerInterface.js';
import GameObjectStorage from '../source/GameObjectStorage.js';
import PlayerFactory from './Factories/PlayerFactory.js';
import WalletFactory from './Factories/WalletFactory.js';
import HeroFactory from './Factories/HeroFactory.js';
import EntityManager from '../source/EntityManager.js';
import ItemStackFactory from './Factories/ItemStackFactory.js';
import Item from './Entities/Item.js';
import ItemStorageFactory from './Factories/ItemStorageFactory.js';
import ItemStorageManager from './Services/ItemStorageManager.js';
import EquipManager from './Services/EquipManager.js';
import GameConsole from '../source/GameConsole/GameConsole.js';
import AddItemCommand from './Commands/AddItemCommand.js';
import CreateHeroCommand from './Commands/CreateHeroCommand.js';
import CreateItemStorageCommand from './Commands/CreateItemStorageCommand.js';
import EquipCommand from './Commands/EquipCommand.js';
import RemoveEquipCommand from './Commands/RemoveEquipCommand.js';
// import config from '../config/main.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import IDGeneratorInterface from '../source/IDGeneratorInterface.js';
import UUIDGenerator from '../source/UUIDGenerator.js';
import GameObject from '../source/GameObject.js';
import MainItemStorageListComponent from './Components/MainItemStorageListComponent.js';
import PlayerItemStorageFactory from './Factories/PlayerItemStorageFactory.js';
import ItemStorageFactoryInterface from './Factories/ItemStorageFactoryInterface.js';
import TechItemStorageFactoryDecorator from './Factories/TechItemStorageFactoryDecorator.js';
import GameObjectFactory from './Factories/GameObjectFactory.js';
import MainHeroListComponent from './Components/MainHeroListComponent.js';
import AutoIncrementIDGenerator from '../source/AutoIncrementIDGenerator.js';
import LocationFactory from './Factories/LocationFactory.js';
import ItemDatabase from './ItemDatabase.js';
import Random from './Services/Random.js';
import Component from '../source/Component.js';
import EventSystem from '../source/EventSystem.js';
import MainLocationListComponent from './Components/MainLocationListComponent.js';
import {ContainerKey} from './consts.js';
import CreateLocationCommand from './Commands/CreateLocationCommand.js';
import ExperienceComponentFactory from './Factories/ExperienceComponentFactory.js';
import Container from '../source/Container.js';
import EnemyFactory from './Factories/EnemyFactory.js';
import ExperienceComponent from './Components/ExperienceComponent.js';
import {CurrencyAlias, CurrencyWalletAlias} from './types.js';
import WalletComponent from './Components/WalletComponent.js';
import Currency from './Entities/Currency.js';
import _ from 'lodash';

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
        container.set<IDGeneratorInterface>('player.realtimeObjectIdGenerator', (container: ContainerInterface) => {
            return new AutoIncrementIDGenerator(1);
        });
        //region dev
        /**
         * @indev
         */
        //Ну допустим...
        Object.defineProperty(Object.prototype, '_generateID', {
            get: () => {
                return container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator').generateID();
            }
        });
        //endregion dev
        container.set<GameObjectStorage>('player.gameObjectStorage', (container) => {
            return new GameObjectStorage();
        });
        // container.set<UserFactory>('core.userFactory', (container) => {
        //     return new UserFactory(container.get<AutoIncrementIDGenerator>('player.realtimeObjectIdGenerator'));
        // });

        //Фабрики
        container.set('player.gameObjectFactory', (container) => {
            return new GameObjectFactory(
                container.get<GameObjectStorage>('player.gameObjectStorage'),
                container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
            );
        });
        //region Фабрики компонентов.
        container.set<ExperienceComponentFactory>(ContainerKey.ExperienceComponentFactory, (container) => {
            return new ExperienceComponentFactory({
                maxLevel: 100,
            });
        });
        //endregion Фабрики компонентов.
        container.set<PlayerFactory>('player.playerFactory', (container) => {
            let playerFactory = new PlayerFactory({
                gameObjectFactory: container.get<GameObjectFactory>(ContainerKey.GameObjectFactory),
                experienceComponentFactory: container.get<ExperienceComponentFactory>(ContainerKey.ExperienceComponentFactory),
                maxLevel: 100,
            });

            //todo: player_env_indev
            container.get<GameObjectStorage>('player.gameObjectStorage').add(playerFactory.create());

            return playerFactory;
        });
        container.set<WalletFactory>('player.walletFactory', (container) => {
            let walletFactory = new WalletFactory({
                gameObjectFactory: container.get<GameObjectFactory>(ContainerKey.GameObjectFactory)
            });

            //todo: player_env_indev
            let currencies = [
                CurrencyAlias.Gold,
                CurrencyAlias.ResearchPoints,
            ];

            _.map(currencies, (currencyAlias) => {
                container.get<GameObjectStorage>('player.gameObjectStorage').add(walletFactory.create({
                    currency: container.get<EntityManager>(ContainerKey.EntityManager).get<Currency>(Currency, currencyAlias),
                    value: 1000,
                }));
            });

            return walletFactory;
        });
        container.set<HeroFactory>('player.heroFactory', (container) => {
            return new HeroFactory({
                config: container.get<object>('core.config'),
                entityManager: container.get<EntityManager>('core.entityManager'),
                gameObjectFactory: container.get<GameObjectFactory>('player.gameObjectFactory'),
                idGenerator: container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                experienceComponentFactory: container.get<ExperienceComponentFactory>(ContainerKey.ExperienceComponentFactory),
            });
        });
        container.set<ItemStackFactory>('player.itemStackFactory', (container) => {
            return new ItemStackFactory(
                container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                container.get<EntityManager>('core.entityManager'),
            );
        });
        //todo: Только не player а core.
        // container.set<BasicItemStorageFactory>('player.basicItemStorageFactory', (container) => {
        //     return new BasicItemStorageFactory(
        //         container,
        //         container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
        //     );
        // });
        // container.set<TechItemStorageFactory>('player.techItemStorageFactory', (container) => {
        //     return new TechItemStorageFactory(
        //         container.get<ItemStorageFactoryInterface>('player.basicItemStorageFactory'),
        //         container,
        //     );
        // });
        container.set<MainItemStorageListComponent>('player.itemStorageCollection', (container) => {
            let idGenerator = container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator');
            let itemStorageCollectionGameObject = new GameObject(idGenerator.generateID());

            //todo: Не удобно. Игровые обязательные объекты должны быть вынесены в другое место.
            let itemStorageCollectionComponent = itemStorageCollectionGameObject.addComponent<MainItemStorageListComponent>(new MainItemStorageListComponent(
                // 1,
                0,
                4,
                [
                    // container.get<ItemStorageFactoryInterface>('player.techItemStorageFactory').create(DEFAULT_ITEM_STORAGE_SIZE),
                ],
            ));

            container.get<GameObjectStorage>('player.gameObjectStorage').add(itemStorageCollectionGameObject);

            return itemStorageCollectionComponent;
        });
        // container.set<PlayerItemStorageFactory>('player.playerItemStorageFactory', (container) => {
        //     return new PlayerItemStorageFactory(
        //         container.get<ItemStorageFactoryInterface>('player.techItemStorageFactory'),
        //         container,
        //         container.get<ItemStorageListComponent>('player.itemStorageCollection'),
        //     );
        // });
        // //alias
        // container.set<ItemStorageFactoryInterface>('player.itemStorageFactory', (container) => {
        //     return container.get<ItemStorageFactoryInterface>('player.playerItemStorageFactory');
        // });
        container.set<ItemStorageFactoryInterface>('player.itemStorageFactory', (container) => {
            // return new TechItemStorageFactoryDecorator(
            //     new ItemStorageFactory(
            //         container,
            //         container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
            //     ),
            //     container.get<GameObjectStorage>('player.gameObjectStorage'),
            // );
            return new ItemStorageFactory(
                container.get<GameObjectStorage>('player.gameObjectStorage'),
                container.get<ItemStackFactory>('player.itemStackFactory'),
                container.get<GameObjectFactory>('player.gameObjectFactory'),
            );
        });
        container.set<LocationFactory>(ContainerKey.LocationFactory, (container) => {
            return new LocationFactory({
                entityManager: container.get<EntityManager>('core.entityManager'),
                gameObjectFactory: container.get<GameObjectFactory>('player.gameObjectFactory'),
                itemDatabase: container.get<ItemDatabase>('core.itemDatabase'),
                itemStackFactory: container.get<ItemStackFactory>('player.itemStackFactory'),
                itemStorageFactory: container.get<ItemStorageFactory>('player.itemStorageFactory'),
            });
        });
        container.set<EnemyFactory>(ContainerKey.EnemyFactory, (container) => {
            return new EnemyFactory({
                entityManager: container.get<EntityManager>('core.entityManager'),
                gameObjectFactory: container.get<GameObjectFactory>('player.gameObjectFactory'),
                playerExperienceComponent: container.get<GameObjectStorage>('player.gameObjectStorage').getOneByTag('#player').getComponent<ExperienceComponent>(ExperienceComponent.name),
                // playerWalletComponent: container.get<GameObjectStorage>('player.gameObjectStorage').getOneByTag('#wallet.' + CurrencyAlias.Gold).getComponent<WalletComponent>(WalletComponent.name),
                playerWalletComponent: container.get<GameObjectStorage>('player.gameObjectStorage').getOneByTag(CurrencyWalletAlias.Gold).getComponent<WalletComponent>(WalletComponent.name),
            });
        });

        //Фасады
        container.set<ItemStorageManager>('player.itemStorageManager', (container) => {
            return new ItemStorageManager(container.get<GameObjectStorage>('player.gameObjectStorage'));
        });
        container.set<EquipManager>('player.equipManager', (container) => {
            return new EquipManager();
        });

        container.set<MainHeroListComponent>('player.heroesListComponent', (container) => {
            let heroListControllerGameObject = container.get<GameObjectFactory>('player.gameObjectFactory').create();

            let mainHeroListComponent = heroListControllerGameObject.addComponent(new MainHeroListComponent(
                0,
                10,
            ));

            return mainHeroListComponent;
        });

        //todo: Надо както сделать по другому такую логику.
        container.set<MainLocationListComponent>(ContainerKey.MainLocationListComponent, (container) => {
            let mainLocationList = container.get<GameObjectFactory>('player.gameObjectFactory').create();

            let mainLocationListComponent = mainLocationList.addComponent(new MainLocationListComponent(
                0,
                10,
            ));

            return mainLocationListComponent;
        });

        // this._gameConsoleConfigure(container);

        debug('log')(sprintf('Конфигурация %s завершена.', this.constructor.name));

        return container;
    }
}