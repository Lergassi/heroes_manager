import config from '../../../config/main.js';
import ContainerConfigureInterface from '../../../source/ContainerConfigureInterface.js';
import ContainerInterface from '../../../source/ContainerInterface.js';
import EntityManager from '../../../source/EntityManager.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import Serializer from '../../../source/Serializer.js';
import JsonSerializer from '../../../source/JsonSerializer.js';
import MetadataManager from '../../../source/MetadataManager.js';
import MetadataManagerCreator from '../MetadataManagerCreator.js';
import EntityManagerBuilder from '../EntityManagerBuilder.js';
import ItemFactory from '../../Factories/ItemFactory.js';
import ItemDatabase from '../../../source/ItemDatabase.js';
import {extractItems_dev} from '../../indev.js';
import EventSystem from '../../../source/EventSystem.js';
import {ServiceID} from '../../../types/enums/ServiceID.js';
import Item from '../../Entities/Item.js';
import {ItemID} from '../../../types/enums/ItemID.js';
import _ from 'lodash';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import EventSystemFactory from '../EventSystemFactory.js';
import ItemCategoryFactory from '../../Factories/EntityFactories/ItemCategoryFactory.js';
import RecipeFactory from '../../Factories/EntityFactories/RecipeFactory.js';

export default class CoreContainerConfigure implements ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        container.set<object>('core.config', config);

        //region preload
        // let conventCSVDataToJson = new ConventCSVDataToJson();
        // conventCSVDataToJson.run();
        //endregion preload

        EventSystem.init(); //todo: В фабрику?
        container.set(ServiceID.EventSystemFactory, (container) => {
            return new EventSystemFactory();
        });

        //Тут не save_inject, а просто загрузка данных из файла. На сервере из файла, на клиенте через import и webpack.
        container.set<MetadataManager>('core.metadataManager', (container) => {
            return (new MetadataManagerCreator()).create();
        });
        container.set<EntityManager>(ServiceID.EntityManager, (container) => {
            return new EntityManager();
        });
        container.set<ItemFactory>(ServiceID.ItemFactory, (container) => {
            return new ItemFactory(container.get<EntityManagerInterface>(ServiceID.EntityManager));
        });
        container.set<RecipeFactory>(ServiceID.RecipeFactory, (container) => {
            return new RecipeFactory(container.get<EntityManagerInterface>(ServiceID.EntityManager));
        });
        container.set<ItemCategoryFactory>(ServiceID.ItemCategoryFactory, (container) => {
            return new ItemCategoryFactory(container.get<EntityManagerInterface>(ServiceID.EntityManager));
        });
        (new EntityManagerBuilder(
            container,
            container.get<EntityManagerInterface>(ServiceID.EntityManager),
        )).build();
        //@indev
        container.set<ItemDatabase>(ServiceID.ItemDatabase, (container) => {
            let items = extractItems_dev(container.get<EntityManagerInterface>(ServiceID.EntityManager));

            return new ItemDatabase(items);
        });
        container.set<Serializer>('core.serializer', (container) => {
            return new Serializer(container, container.get<MetadataManager>('core.metadataManager'));
        });
        container.set<JsonSerializer>('core.jsonSerializer', (container) => {
            return new JsonSerializer();
        });

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

        debug(DebugNamespaceID.Log)(sprintf('Конфигурация %s завершена.', 'CoreContainerConfigure'));

        return container;
    }
}