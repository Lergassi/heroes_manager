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
import ItemStorageListComponent from './Components/ItemStorageListComponent.js';
import PlayerItemStorageFactory from './Factories/PlayerItemStorageFactory.js';
import ItemStorageFactoryInterface from './Factories/ItemStorageFactoryInterface.js';
import TechItemStorageFactoryDecorator from './Factories/TechItemStorageFactoryDecorator.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from './Components/ItemStorageComponent.js';
import GameObjectFactory from './Factories/GameObjectFactory.js';
import HeroListComponent from './Components/HeroListComponent.js';
import AutoIncrementIDGenerator from '../source/AutoIncrementIDGenerator.js';
import LocationFactory from './Factories/LocationFactory.js';
import ItemDatabase from './ItemDatabase.js';
import Random from './Services/Random.js';

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
        container.set<GameObjectStorage>('player.gameObjectStorage', (container) => {
            return new GameObjectStorage();
        });
        // container.set<UserFactory>('core.userFactory', (container) => {
        //     return new UserFactory(container.get<AutoIncrementIDGenerator>('player.realtimeObjectIdGenerator'));
        // });

        //Фабрики
        container.set('player.gameObjectFactory', (container) => {
            return new GameObjectFactory(container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'));
        });
        container.set<PlayerFactory>('player.playerFactory', (container) => {
            return new PlayerFactory(container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'), {
                maxLevel: 100,
            });
        });
        container.set<WalletFactory>('player.walletFactory', (container) => {
            return new WalletFactory(container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'));
        });
        container.set<HeroFactory>('player.heroFactory', (container) => {
            return new HeroFactory(
                container.get<GameObjectStorage>('player.gameObjectStorage'),
                container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                container.get<EntityManager>('core.entityManager'),
                container.get<object>('core.config'),
            );
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
        container.set<ItemStorageListComponent>('player.itemStorageCollection', (container) => {
            let idGenerator = container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator');
            let itemStorageCollectionGameObject = new GameObject(idGenerator.generateID());

            //todo: Не удобно. Игровые обязательные объекты должны быть вынесены в другое место.
            let itemStorageCollectionComponent = itemStorageCollectionGameObject.addComponent<ItemStorageListComponent>(new ItemStorageListComponent(
                idGenerator.generateID(),
                itemStorageCollectionGameObject,
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
                container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
            );
        });
        container.set<LocationFactory>('player.locationFactory', (container) => {
            return new LocationFactory(
                container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                container.get<GameObjectFactory>('player.gameObjectFactory'),
                container.get<ItemStackFactory>('player.itemStackFactory'),
                container.get<EntityManager>('core.entityManager'),
                container.get<ItemDatabase>('core.itemDatabase'),
                container.get<Random>('core.random'),
            );
        });

        //Фасады
        container.set<ItemStorageManager>('player.itemStorageManager', (container) => {
            return new ItemStorageManager(container.get<GameObjectStorage>('player.gameObjectStorage'));
        });
        container.set<EquipManager>('player.equipManager', (container) => {
            return new EquipManager();
        });

        container.set<HeroListComponent>('player.heroesListComponent', (container) => {
            let heroControllerGameObject = container.get<GameObjectFactory>('player.gameObjectFactory').create();

            let heroController = heroControllerGameObject.addComponent(new HeroListComponent(
                container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator').generateID(),
                heroControllerGameObject
            ));

            return heroController;
        });

        container.get<GameObjectStorage>('player.gameObjectStorage').add(container.get<PlayerFactory>('player.playerFactory').create());

        // this._gameConsoleConfigure(container);

        debug('log')(sprintf('Конфигурация %s завершена.', this.constructor.name));

        return container;
    }

    private _gameConsoleConfigure(container: ContainerInterface) {
        let gameConsole: GameConsole = container.get<GameConsole>('gameConsole');

        gameConsole.register(new AddItemCommand(container));
        gameConsole.register(new CreateHeroCommand(container));
        gameConsole.register(new CreateItemStorageCommand(container));
        gameConsole.register(new EquipCommand(container));
        gameConsole.register(new RemoveEquipCommand(container));

        /* DEBUG */
    }
}