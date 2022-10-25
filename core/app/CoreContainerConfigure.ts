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
import ItemFactory from './Factories/ItemFactory.js';
import ItemDatabase from './ItemDatabase.js';
import {extractItems_dev} from './indev.js';
import EventSystem from '../source/EventSystem.js';
import {ContainerKey} from '../types/enums/ContainerKey.js';
import Item from './Entities/Item.js';
import {ItemID} from '../types/enums/ItemID.js';
import _ from 'lodash';
import EntityManagerInterface from './Interfaces/EntityManagerInterface.js';

export default class CoreContainerConfigure implements ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        container.set<object>('core.config', config);

        EventSystem.init();

        //Тут не save_inject, а просто загрузка данных из файла. На сервере из файла, на клиенте через import и webpack.
        container.set<MetadataManager>('core.metadataManager', (container) => {
            return (new MetadataManagerCreator()).create();
        });
        container.set<EntityManager>(ContainerKey.EntityManager, (container) => {
            return new EntityManager();
        });
        // container.set<ItemFactory>(ContainerKey.ItemFactory, (container) => {
        //     return new ItemFactory(container.get<EntityManagerInterface>(ContainerKey.EntityManager));
        // });
        (new EntityManagerBuilder(
            container,
            container.get<EntityManagerInterface>(ContainerKey.EntityManager),
        )).build();
        //@indev
        container.set<ItemDatabase>(ContainerKey.ItemDatabase, (container) => {
            let items = extractItems_dev(container.get<EntityManagerInterface>(ContainerKey.EntityManager));

            return new ItemDatabase(items);
        });
        // console.log(container.get(ContainerKey.ItemDatabase));
        // console.log(container.get<ItemDatabase>(ContainerKey.ItemDatabase).get(ItemID.Wood));
        // console.log(container.get<ItemDatabase>(ContainerKey.ItemDatabase).get(ItemID.WoodBoards));
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
        //         container.get<EntityManagerInterface>(ContainerKey.EntityManager),
        //         container.get<object>('core.config'),
        //     );
        // });
        // container.set<ItemStackFactory>('core.itemStackFactory', (container) => {
        //     return new ItemStackFactory(
        //         container.get<IDGeneratorInterface>('core.realtimeObjectIdGenerator'),
        //         container.get<EntityManagerInterface>(ContainerKey.EntityManager).getRepository<Item>(Item.name),
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