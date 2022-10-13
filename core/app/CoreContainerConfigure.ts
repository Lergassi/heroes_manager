import config from '../config/main.js';
import ContainerConfigureInterface from '../source/ContainerConfigureInterface.js';
import ContainerInterface from '../source/ContainerInterface.js';
import EntityManager from '../source/EntityManager.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import Serializer from '../source/Serializer.js';
import JsonSerializer from '../source/JsonSerializer.js';
import MetadataManager from '../source/MetadataManager.js';
import MetadataManagerCreator from './Services/MetadataManagerCreator.js';
import EntityManagerBuilder from './Services/EntityManagerBuilder.js';
import EntityManagerFacade from '../source/Facades/EntityManagerFacade.js';
import ItemFactory from './Factories/ItemFactory.js';
import ItemDatabase from './ItemDatabase.js';
import {extractItems} from './indev.js';
import EventSystem from '../source/EventSystem.js';
import {ContainerKey} from '../types/enums/ContainerKey.js';

export default class CoreContainerConfigure implements ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        container.set<object>('core.config', config);

        EventSystem.create();

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
        (new EntityManagerBuilder({
            container: container,
            entityManager: container.get<EntityManager>(ContainerKey.EntityManager),
            itemFactory: container.get<ItemFactory>(ContainerKey.ItemFactory),
        })).build();
        container.set<ItemDatabase>(ContainerKey.ItemDatabase, (container) => {
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
        // container.set<EventSystem>('core.eventSystem', (container) => {
        // container.set<EventSystem>(ContainerKey.EventSystem, (container) => {
        //     return EventSystem.create();
        // });

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