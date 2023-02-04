import config from '../../../config/config.js';
import ContainerConfigureInterface from '../../../source/ContainerConfigureInterface.js';
import ContainerInterface from '../../../source/ContainerInterface.js';
import EntityManager from '../../../source/EntityManager.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import Serializer from '../../../source/Serializer.js';
import JsonSerializer from '../../../source/JsonSerializer.js';
import MetadataManager from '../../../source/MetadataManager.js';
import {HeroClassID} from '../../../types/enums/HeroClassID.js';
import {ItemCategoryID} from '../../../types/enums/ItemCategoryID.js';
import {ItemCategoryPowerRatio} from '../../../types/main.js';
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

        //todo: бд?
        container.set(ServiceID.Data_ItemCategoryPowerRatio, {
            [ItemCategoryID.Helmets]: {ratio: 0.5},
            [ItemCategoryID.ShoulderPads]: {ratio: 0.3},
            [ItemCategoryID.Breastplates]: {ratio: 1},
            [ItemCategoryID.Bracers]: {ratio: 0.2},
            [ItemCategoryID.Gloves]: {ratio: 0.3},
            [ItemCategoryID.Belts]: {ratio: 0.2},
            [ItemCategoryID.Pants]: {ratio: 0.6},
            [ItemCategoryID.Boots]: {ratio: 0.4},
            [ItemCategoryID.Amulets]: {ratio: 0.6},
            [ItemCategoryID.Rings]: {ratio: 0.3},
            [ItemCategoryID.OneHandedSwords]: {ratio: 2},
            [ItemCategoryID.TwoHandedSwords]: {ratio: 4},
            [ItemCategoryID.Daggers]: {ratio: 2},
            [ItemCategoryID.Bows]: {ratio: 2},
            [ItemCategoryID.Staffs]: {ratio: 8},
            [ItemCategoryID.Shields]: {ratio: 8},
            //Топоры, стафы - у всего свой рейт. Дальше может быть зависим от типа одно/двуручное.
        });

        container.set(ServiceID.Data_CommonArmorSet, {
            [ItemCategoryID.Helmets]: {count: 1},
            [ItemCategoryID.ShoulderPads]: {count: 1},
            [ItemCategoryID.Breastplates]: {count: 1},
            [ItemCategoryID.Bracers]: {count: 1},
            [ItemCategoryID.Gloves]: {count: 1},
            [ItemCategoryID.Belts]: {count: 1},
            [ItemCategoryID.Pants]: {count: 1},
            [ItemCategoryID.Boots]: {count: 1},
            [ItemCategoryID.Amulets]: {count: 1},
            [ItemCategoryID.Rings]: {count: 2},
        });

        container.set(ServiceID.Data_WeaponSet, {
            [HeroClassID.Warrior]: {
                [ItemCategoryID.OneHandedSwords]: {count: 1},   //12
                [ItemCategoryID.Shields]: {count: 1},           //13
            },
            [HeroClassID.Rogue]: {
                [ItemCategoryID.Daggers]: {count: 2},           //12,13
            },
            [HeroClassID.Gunslinger]: {
                [ItemCategoryID.Revolvers]: {count: 2},         //...
            },
            [HeroClassID.FireMage]: {
                [ItemCategoryID.Staffs]: {count: 1},
            },
            [HeroClassID.Support1]: {
                [ItemCategoryID.Staffs]: {count: 1},
            },
        });

        container.set(ServiceID.Data_EquipSet, {
            [HeroClassID.Warrior]: _.assign(
                container.get(ServiceID.Data_WeaponSet)[HeroClassID.Warrior],
                container.get(ServiceID.Data_CommonArmorSet),
            ),
            [HeroClassID.Rogue]: _.assign(
                container.get(ServiceID.Data_WeaponSet)[HeroClassID.Rogue],
                container.get(ServiceID.Data_CommonArmorSet),
            ),
            [HeroClassID.Gunslinger]: _.assign(
                container.get(ServiceID.Data_WeaponSet)[HeroClassID.Gunslinger],
                container.get(ServiceID.Data_CommonArmorSet),
            ),
            [HeroClassID.FireMage]: _.assign(
                container.get(ServiceID.Data_WeaponSet)[HeroClassID.FireMage],
                container.get(ServiceID.Data_CommonArmorSet),
            ),
            [HeroClassID.Support1]: _.assign(
                container.get(ServiceID.Data_WeaponSet)[HeroClassID.Support1],
                container.get(ServiceID.Data_CommonArmorSet),
            ),
            //todo: Другие классы.
        });

        let a = {
            // [HeroClassID.Warrior]: ,
        }

        // container.set(ServiceID.Data_WarriorWeaponSet, [
        //     {
        //         [ItemCategoryID.OneHandedSwords]: {count: 1},
        //         [ItemCategoryID.Shields]: {count: 1},
        //     },
        // ]);
        //
        // container.set(ServiceID.Data_RogueWeaponSet, [
        //     {
        //         [ItemCategoryID.Daggers]: {count: 2},
        //     },
        // ]);
        //
        // container.set(ServiceID.Data_GunslingerWeaponSet, [
        //     {
        //         [ItemCategoryID.Revolvers]: {count: 2},
        //     },
        // ]);
        //
        // container.set(ServiceID.Data_FireMageWeaponSet, [
        //     {
        //         [ItemCategoryID.Staffs]: {count: 1},
        //     },
        //     {
        //         [ItemCategoryID.Wands]: {count: 2},
        //     },
        // ]);
        //
        // container.set(ServiceID.Data_Support1WeaponSet, [
        //     {
        //         [ItemCategoryID.Staffs]: {count: 1},
        //     },
        // ]);

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