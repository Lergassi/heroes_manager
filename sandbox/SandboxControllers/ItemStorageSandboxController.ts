import {log} from 'debug';
import ItemStackController from '../../core/app/Components/ItemStorages/ItemStackController.js';
import ItemStorage from '../../core/app/Components/ItemStorages/ItemStorage.js';
import ItemStorageFactory from '../../core/app/Factories/ItemStorageFactory.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import ItemStorageInterface from '../../core/app/Interfaces/ItemStorageInterface.js';
import ItemDatabase from '../../core/source/ItemDatabase.js';
import {ItemID} from '../../core/types/enums/ItemID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import AbstractSandboxController from './AbstractSandboxController.js';

export default class ItemStorageSandboxController extends AbstractSandboxController {
    run(): void {
        // this._devItemStackController();
        // this._devItemStorage();
        // this._devItemStorageController();
        // this._devEndlessBag();
        // this._devInfinityItemStackController();
        // this._devInfinityBag();
        // this._devCanAddItem();

        this._testItemStorage();
        this._testItemStackController();
    }

    private _devItemStorage() {
        // let itemStorage = new ItemStorageV2(20);
        // let itemStorage = this.container.get<StubFactory>(ServiceID.StubFactory).createDefaultItemStorage();
        //
        // this._testDefaultStubItemStorage(itemStorage);
    }

    private _devItemStackController() {
        let itemDatabase = this.container.get<ItemDatabase>(ServiceID.ItemDatabase);

        let itemID = ItemID.Wood;
        // let itemID = ItemID.IronOre;
        let itemStackController = new ItemStackController();
        itemStackController.addItem(itemID, 5);
        itemStackController.addItem(itemID, 5);
        // console.log(itemStackController);
        // console.log(itemStackController.containItem(itemID, 1) === true);
        // console.log(itemStackController.containItem(itemID, 9) === true);
        // console.log(itemStackController.containItem(itemID, 10) === true);
        // console.log('---');
        // console.log(itemStackController.containItem(itemID, 11) === false);
        // console.log(itemStackController.containItem(itemID, -1) === false);
        // console.log(itemStackController.containItem(itemID, 0) === false);
        // console.log(itemStackController.containItem(itemID, NaN) === false);
        // console.log(itemStackController.containItem(itemID, undefined) === false);
        // console.log(itemStackController.containItem(itemID, null) === false);
        // console.log(itemStackController.containItem(undefined, 1) === false);
        // console.log(itemStackController.containItem(null, 1) === false);
        // console.log('---');
        // console.log(itemStackController.containItem(ItemID.Skin01, 1) === false);
        // console.log('---');
        // console.log(itemStackController.removeItem(itemID, 5));
        // console.log(itemStackController.containItem(itemID, 0) === false);
        // console.log(itemStackController.containItem(itemID, 1) === true);
        // console.log(itemStackController.containItem(itemID, 5) === true);
        // console.log(itemStackController.containItem(itemID, 8) === false);
        // console.log(itemStackController.containItem(itemID, 10) === false);
    }

    private _devItemStorageController() {
        // let itemStorageController = new ItemStorageController(1);
        // itemStorageController.addItemStorage(this.container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).create(20));
        // itemStorageController.addItemStorage(this.container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).create(20));
        // itemStorageController.addItemStorage(this.container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).create(20));
        //
        // this.container.get<StubFactory>(ServiceID.StubFactory).fillDefaultItems(itemStorageController);
        // console.log(itemStorageController);
        // this._testDefaultStubItemStorage(itemStorageController);
    }

    private _devEndlessBag() {
        // let itemStorage = new EndlessItemStorage();
        // this._testEndlessItemStorage(itemStorage);
    }

    private _testDefaultStubItemStorage(itemStorage: ItemStorageInterface) {
        // console.log(itemStorage.containItem(ItemID.Wood, 1) === true);
        // console.log(itemStorage.containItem(ItemID.IronOre, 1) === true);
        // console.log(itemStorage.containItem(ItemID.IronIngot, 1) === true);
        // console.log(itemStorage.containItem(ItemID.Skin01, 1) === false);
        // console.log(itemStorage.containItem(ItemID.OneHandedSword01, 1) === true);
        // console.log(itemStorage.containItem(ItemID.ClothBelt01, 1) === false);
        //
        // console.log(itemStorage.removeItem(ItemID.Wood, 50) === 50);
        // console.log(itemStorage.containItem(ItemID.Wood, 1) === false);
    }

    // private _testEndlessItemStorage(itemStorage: EndlessItemStorage) {
    //     let itemDatabase = this.container.get<ItemDatabase>(ServiceID.ItemDatabase);
    //
    //     console.log(itemStorage._addItem(itemDatabase.get(ItemID.Wood), 0) === 0);
    //     console.log(itemStorage._addItem(itemDatabase.get(ItemID.Wood), 1) === 0);
    //     console.log(itemStorage._addItem(itemDatabase.get(ItemID.Wood), 11111111) === 0);
    //     console.log(itemStorage._addItem(itemDatabase.get(ItemID.Wood), 1111111111111111) === 0);
    //     // console.log(itemStorage.containItem(ItemID.Wood, 0) === false);
    //     // console.log(itemStorage.containItem(ItemID.Wood, 1) === true);
    //     // console.log(itemStorage.containItem(ItemID.Wood, 11111111111111111111111111111) === true);
    // }

    private _devInfinityBag() {
        // let itemDatabase = this.container.get<ItemDatabase>(ServiceID.ItemDatabase);
        // let entityManager = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);
        //
        // let itemStorage = new InfinityItemStorage(entityManager);
        // console.log(itemStorage._addItem(itemDatabase.get(ItemID.Wood), 120) === 0);
        // console.log(itemStorage._addItem(itemDatabase.get(ItemID.Wood), 120) === 0);
        // console.log(itemStorage._addItem(itemDatabase.get(ItemID.Wood), 120) === 0);
        // console.log(itemStorage._addItem(itemDatabase.get(ItemID.Wood), 120) === 0);
        // console.log(itemStorage._addItem(itemDatabase.get(ItemID.IronOre), 120) === 0);
        // console.log(itemStorage._addItem(itemDatabase.get(ItemID.IronOre), 120) === 0);
        // console.log(itemStorage._addItem(itemDatabase.get(ItemID.IronOre), 120) === 0);
        // console.log(itemStorage._addItem(itemDatabase.get(ItemID.IronOre), 120) === 0);
        // console.log(itemStorage._addItem(itemDatabase.get(ItemID.OneHandedSword01), 120) === 0);
        // console.log(itemStorage._addItem(itemDatabase.get(ItemID.OneHandedSword01), 120) === 0);
        // console.log(itemStorage._addItem(itemDatabase.get(ItemID.OneHandedSword01), 120) === 0);
        // console.log(itemStorage._addItem(itemDatabase.get(ItemID.OneHandedSword01), 120) === 0);
        // console.log(itemStorage);

        // console.log(itemStorage.containItem(ItemID.Wood, -1) === false);
        // console.log(itemStorage.containItem(ItemID.Wood, 0) === false);
        // console.log(itemStorage.containItem(ItemID.Wood, 1) === true);
        // console.log(itemStorage.containItem(ItemID.Wood, 120 * 4) === true);
        // console.log(itemStorage.containItem(ItemID.Wood, 120 * 4 + 1) === false);
        // console.log(itemStorage.containItem(ItemID.IronOre, -1) === false);
        // console.log(itemStorage.containItem(ItemID.IronOre, 0) === false);
        // console.log(itemStorage.containItem(ItemID.IronOre, 1) === true);
        // console.log(itemStorage.containItem(ItemID.IronOre, 120 * 4) === true);
        // console.log(itemStorage.containItem(ItemID.IronOre, 120 * 4 + 1) === false);
        // console.log(itemStorage.containItem(ItemID.OneHandedSword01, -1) === false);
        // console.log(itemStorage.containItem(ItemID.OneHandedSword01, 0) === false);
        // console.log(itemStorage.containItem(ItemID.OneHandedSword01, 1) === true);
        // console.log(itemStorage.containItem(ItemID.OneHandedSword01, 120 * 4) === true);
        // console.log(itemStorage.containItem(ItemID.OneHandedSword01, 120 * 4 + 1) === false);
        //
        // console.log(itemStorage.removeItem(ItemID.Wood, 120) === 120);
        // console.log(itemStorage.removeItem(ItemID.Wood, 120) === 120);
        // console.log(itemStorage.removeItem(ItemID.Wood, 120) === 120);
        // console.log(itemStorage.removeItem(ItemID.Wood, 120) === 120);
        // console.log(itemStorage.removeItem(ItemID.Wood, 120) === 0);
        // console.log(itemStorage.removeItem(ItemID.IronOre, 120) === 120);
        // console.log(itemStorage.removeItem(ItemID.IronOre, 120) === 120);
        // console.log(itemStorage.removeItem(ItemID.IronOre, 120) === 120);
        // console.log(itemStorage.removeItem(ItemID.IronOre, 120) === 120);
        // console.log(itemStorage.removeItem(ItemID.IronOre, 120) === 0);
        // console.log(itemStorage.removeItem(ItemID.OneHandedSword01, 120) === 120);
        // console.log(itemStorage.removeItem(ItemID.OneHandedSword01, 120) === 120);
        // console.log(itemStorage.removeItem(ItemID.OneHandedSword01, 120) === 120);
        // console.log(itemStorage.removeItem(ItemID.OneHandedSword01, 120) === 120);
        // console.log(itemStorage.removeItem(ItemID.OneHandedSword01, 120) === 0);
        // console.log(itemStorage);
    }

    private _devCanAddItem() {
        let em = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);

        let itemStackController = new ItemStackController();
        // console.log(itemStackController.canAddItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10));
        // console.log(itemStackController.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 1));
        // console.log(itemStackController.canAddItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10));
        // console.log(itemStackController.canAddItem(em.get<Item>(EntityID.Item, ItemID.IronOre), 10));

        // console.log(itemStackController.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10));
        // console.log(itemStackController.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10));
        // console.log(itemStackController.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10));
        // console.log(itemStackController.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10));
        // console.log(itemStackController.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10));
        // console.log(itemStackController.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10));

        let itemStorage = new ItemStorage(2, em);

        // console.log(itemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10));
        // console.log(itemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.IronOre), 10));
        // console.log(itemStorage._addItem(em.get<Item>(EntityID.Item, ItemID.OneHandedSword01), 10));
        // console.log(itemStorage.canAddItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10));
        // console.log(itemStorage.canAddItem(em.get<Item>(EntityID.Item, ItemID.IronOre), 10));
        // console.log(itemStorage.canAddItem(em.get<Item>(EntityID.Item, ItemID.OneHandedSword01), 10));
        // itemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.IronOre), 10);
        // console.log(itemStorage.canAddItem(em.get<Item>(EntityID.Item, ItemID.IronOre), 10));
    }

    private _testItemStorage() {
        // let itemStorage = new ItemStorage(20, this.container.get<EntityManagerInterface>(ServiceID.EntityManager));
        //
        // console.log(itemStorage.addItem(ItemID.Wood, 0) === 0);
        // console.log(itemStorage.addItem(ItemID.Wood, 1) === 1);
        // console.log(itemStorage.addItem(ItemID.Wood, 10) === 10);
        // console.log(itemStorage.addItem(ItemID.OneHandedSword01, 0) === 0);
        // console.log(itemStorage.addItem(ItemID.OneHandedSword01, 1) === 1);
        // console.log(itemStorage.addItem(ItemID.OneHandedSword01, 2) === 2);
    }

    private _testItemStackController() {
        let validData_for_canAddItem = [
            // [ItemID.Wood, null, 0],
            // [ItemID.Wood, undefined, 0],
            [ItemID.Wood, -1000000, 0],
            [ItemID.Wood, -3, 0],
            [ItemID.Wood, -2, 0],
            [ItemID.Wood, -1, 0],
            [ItemID.Wood, 0, 0],
            [ItemID.Wood, 1, 1],
            [ItemID.Wood, 2, 2],
            [ItemID.Wood, 3, 3],
            [ItemID.Wood, 10, 10],
            [ItemID.Wood, 48, 48],
            [ItemID.Wood, 49, 49],
            [ItemID.Wood, 50, 50],
            [ItemID.Wood, 51, 50],
            [ItemID.Wood, 52, 50],
            [ItemID.Wood, 1000000, 50],
            [ItemID.OneHandedSword01, -1000000, 0],
            [ItemID.OneHandedSword01, -2, 0],
            [ItemID.OneHandedSword01, -1, 0],
            [ItemID.OneHandedSword01, 0, 0],
            [ItemID.OneHandedSword01, 1, 1],
            [ItemID.OneHandedSword01, 2, 1],
            [ItemID.OneHandedSword01, 10, 1],
            [ItemID.OneHandedSword01, 48, 1],
            [ItemID.OneHandedSword01, 49, 1],
            [ItemID.OneHandedSword01, 50, 1],
            [ItemID.OneHandedSword01, 51, 1],
            [ItemID.OneHandedSword01, 52, 1],
            [ItemID.OneHandedSword01, 1000000, 1],
        ];
        _.forEach(validData_for_canAddItem, (value) => {
            let actual = (new ItemStackController()).canAddItem(value[0] as ItemID, value[1] as number);
            if (actual !== value[2]) console.log('F', actual, value);
        });
        _.forEach(validData_for_canAddItem, (value) => {
            let actual = (new ItemStackController()).addItem(value[0] as ItemID, value[1] as number);
            if (actual !== value[2]) console.log('F', actual, value);
        });

        _.forEach(validData_for_canAddItem, (value) => {
            let actual = (this.container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).create(1)).addItem(value[0] as ItemID, value[1] as number);
            if (actual !== value[2]) console.log('F', actual, value);
        });
        console.log('test end');
        // let itemStorage = this.container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).create(5);
        // console.log(itemStorage.canAddItem(ItemID.Wood, -2131321) === 0);
        // console.log(itemStorage.canAddItem(ItemID.Wood, -2) === 0);
        // console.log(itemStorage.canAddItem(ItemID.Wood, -1) === 0);
        // console.log(itemStorage.canAddItem(ItemID.Wood, 0) === 0);
        // console.log(itemStorage.canAddItem(ItemID.Wood, 1) === 1);
        // console.log(itemStorage.canAddItem(ItemID.Wood, 48) === 48);
        // console.log(itemStorage.canAddItem(ItemID.Wood, 49) === 49);
        // console.log(itemStorage.canAddItem(ItemID.Wood, 50) === 50);
        // console.log(itemStorage.canAddItem(ItemID.Wood, 250) === 250);
        // console.log(itemStorage.canAddItem(ItemID.Wood, 251) === 250);
        // console.log(itemStorage.canAddItem(ItemID.Wood, 121124141) === 250);
        // console.log(itemStorage.canAddItem(ItemID.OneHandedSword01, -1231231) === 0);
        // console.log(itemStorage.canAddItem(ItemID.OneHandedSword01, -2) === 0);
        // console.log(itemStorage.canAddItem(ItemID.OneHandedSword01, -1) === 0);
        // console.log(itemStorage.canAddItem(ItemID.OneHandedSword01, 0) === 0);
        // console.log(itemStorage.canAddItem(ItemID.OneHandedSword01, 1) === 1);
        // console.log(itemStorage.canAddItem(ItemID.OneHandedSword01, 2) === 2);
        // console.log(itemStorage.canAddItem(ItemID.OneHandedSword01, 3) === 3);
        // console.log(itemStorage.canAddItem(ItemID.OneHandedSword01, 4) === 4);
        // console.log(itemStorage.canAddItem(ItemID.OneHandedSword01, 5) === 5);
        // console.log(itemStorage.canAddItem(ItemID.OneHandedSword01, 6) === 5);
        // console.log(itemStorage.canAddItem(ItemID.OneHandedSword01, 7) === 5);
        // console.log(itemStorage.canAddItem(ItemID.OneHandedSword01, 101313213) === 5);

        // itemStorage.addItem(ItemID.Wood, 12);
        // console.log(itemStorage.isEmpty());
    }
}