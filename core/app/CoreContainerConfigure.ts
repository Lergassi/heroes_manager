import config from '../config/main.js';
import ContainerConfigureInterface from '../source/ContainerConfigureInterface.js';
import GameConsole from '../source/GameConsole/GameConsole.js';
import HelpCommand from '../../server/app/Commands/HelpCommand.js';
import ListCommand from '../../server/app/Commands/ListCommand.js';
import ContainerInterface from '../source/ContainerInterface.js';
import EntityManager from '../source/EntityManager.js';
import DebugEntitiesCommand from './Commands/DebugCommands/DebugEntitiesCommand.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import Serializer from '../source/Serializer.js';
import JsonSerializer from '../source/JsonSerializer.js';
import MetadataManager from '../source/MetadataManager.js';
import MetadataManagerCreator from './Services/MetadataManagerCreator.js';
import EntityManagerBuilder from './Services/EntityManagerBuilder.js';
import AddItemCommand from './Commands/AddItemCommand.js';
import CreateHeroCommand from './Commands/CreateHeroCommand.js';
import CreateItemStorageCommand from './Commands/CreateItemStorageCommand.js';
import EquipCommand from './Commands/EquipCommand.js';
import RemoveEquipCommand from './Commands/RemoveEquipCommand.js';
import IDGeneratorInterface from '../source/IDGeneratorInterface.js';
import UUIDGenerator from '../source/UUIDGenerator.js';
import GameObjectStorage from '../source/GameObjectStorage.js';
import PlayerFactory from './Factories/PlayerFactory.js';
import WalletFactory from './Factories/WalletFactory.js';
import HeroFactory from './Factories/HeroFactory.js';
import ItemStackFactory from './Factories/ItemStackFactory.js';
import Item from './Entities/Item.js';
import ItemStorageFactory from './Factories/ItemStorageFactory.js';
import ItemStorageManager from './Services/ItemStorageManager.js';
import EquipManager from './Services/EquipManager.js';
import NewGameCommand from './Commands/NewGameCommand.js';
import CreateStartPlayerObjectsCommand from './Commands/CreateStartPlayerObjectsCommand.js';
import DebugContainerCommand from '../../server/app/Commands/DebugCommands/DebugContainerCommand.js';
import DebugUserEnvironmentCommand from '../../server/app/Commands/DebugCommands/DebugUserEnvironmentCommand.js';
import DebugPlayerEnvironmentCommand from './Commands/DebugCommands/DebugPlayerEnvironmentCommand.js';
import InspectGameObjectCommand from './Commands/DebugCommands/InspectGameObjectCommand.js';
import ArmorMaterial from './Entities/ArmorMaterial.js';
import EntityManagerFacade from '../source/Facades/EntityManagerFacade.js';
import ItemFactory from './Factories/ItemFactory.js';
import ItemDatabase from './ItemDatabase.js';
import {extractItems} from './indev.js';
import Random from './Services/Random.js';

export enum ContainerKey {
    EntityManager = 'core.entityManager',
    EntityManagerFacade = 'core.facade.entityManager',
    ItemFactory = 'core.itemFactory',
}

export default class CoreContainerConfigure implements ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        container.set<object>('core.config', config);
        //Тут не save_inject, а просто загрузка данных из файла. На сервере из файла, на клиенте через import и webpack.
        container.set<MetadataManager>('core.metadataManager', (container) => {
            return (new MetadataManagerCreator()).create();
        });
        container.set<EntityManager>(ContainerKey.EntityManager, (container) => {
            return new EntityManager();
        });
        container.set<ItemFactory>(ContainerKey.ItemFactory, (container) => {
            return new ItemFactory(container.get<EntityManager>(ContainerKey.EntityManager));
        });
        (new EntityManagerBuilder(
            container.get<EntityManager>(ContainerKey.EntityManager),
            container.get<ItemFactory>(ContainerKey.ItemFactory),
        )).build();
        container.set<ItemDatabase>('core.itemDatabase', (container) => {
            return new ItemDatabase(extractItems(container.get<EntityManager>(ContainerKey.EntityManager)));
        });
        container.set<EntityManagerFacade>(ContainerKey.EntityManagerFacade, (container) => {
            return new EntityManagerFacade(container.get<EntityManager>(ContainerKey.EntityManager));
        });
        container.set<Serializer>('core.serializer', (container) => {
            return new Serializer(container, container.get<MetadataManager>('core.metadataManager'));
        });
        container.set<JsonSerializer>('core.jsonSerializer', (container) => {
            return new JsonSerializer();
        });
        container.set<Random>('core.random', (container) => {
            return new Random();
        });

        // container.set<IDGeneratorInterface>('core.realtimeObjectIdGenerator', (container: ContainerInterface) => {
        //     return new UUIDGenerator();
        // });
        // container.set<GameObjectStorage>('core.gameObjectStorage', (container) => {
        //     return new GameObjectStorage();
        // });

        // //Фабрики
        // container.set<PlayerFactory>('core.playerFactory', (container) => {
        //     return new PlayerFactory(container.get<IDGeneratorInterface>('core.realtimeObjectIdGenerator'), {
        //         maxLevel: container.get<object>('core.config')['max_player_level'] ?? 100,
        //     });
        // });
        // container.set<WalletFactory>('core.walletFactory', (container) => {
        //     return new WalletFactory(container.get<IDGeneratorInterface>('core.realtimeObjectIdGenerator'));
        // });
        // container.set<HeroFactory>('core.heroFactory', (container) => {
        //     return new HeroFactory(
        //         container.get<IDGeneratorInterface>('core.realtimeObjectIdGenerator'),
        //         container.get<EntityManager>('core.entityManager'),
        //         container.get<object>('core.config'),
        //     );
        // });
        // container.set<ItemStackFactory>('core.itemStackFactory', (container) => {
        //     return new ItemStackFactory(
        //         container.get<IDGeneratorInterface>('core.realtimeObjectIdGenerator'),
        //         container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name),
        //     );
        // });
        // container.set<ItemStorageFactory>('core.itemStorageFactory', (container) => {
        //     return new ItemStorageFactory(
        //         container,
        //         container.get<IDGeneratorInterface>('core.realtimeObjectIdGenerator'),
        //     );
        // });

        debug('log')(sprintf('Конфигурация %s завершена.', 'CoreContainerConfigure'));

        return container;
    }
}