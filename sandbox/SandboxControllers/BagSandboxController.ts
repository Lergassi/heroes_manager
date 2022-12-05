import AbstractSandboxController from './AbstractSandboxController.js';
import StubFactory from '../../core/app/Services/StubFactory.js';
import {ContainerID} from '../../core/types/enums/ContainerID.js';
import {ItemID} from '../../core/types/enums/ItemID.js';
import ItemStackController from '../../core/app/Components/ItemStackController.js';
import ItemDatabase from '../../core/source/ItemDatabase.js';
import ItemStorageController from '../../core/app/Components/ItemStorageController.js';
import ItemStorageFactory from '../../core/app/Factories/ItemStorageFactory.js';
import ItemStorageInterface from '../../core/app/Interfaces/ItemStorageInterface.js';
import EndlessItemStorage from '../../core/app/Components/EndlessItemStorage.js';
import InfinityItemStackController from '../../core/app/Components/InfinityItemStackController.js';
import InfinityItemStorage from '../../core/app/Components/InfinityItemStorage.js';

export default class BagSandboxController extends AbstractSandboxController {
    run(): void {
        // this._devItemStackController();
        // this._devItemStorage();
        // this._devItemStorageController();
        // this._devEndlessBag();
        // this._devInfinityItemStackController();
        this._devInfinityBag();
    }

    private _devItemStorage() {
        // let itemStorage = new ItemStorageV2(20);
        let itemStorage = this.container.get<StubFactory>(ContainerID.StubFactory).createDefaultItemStorage();

        this._testDefaultStubItemStorage(itemStorage);
    }

    private _devItemStackController() {
        let itemDatabase = this.container.get<ItemDatabase>(ContainerID.ItemDatabase);

        let itemID = ItemID.Wood;
        // let itemID = ItemID.IronOre;
        let itemStackController = new ItemStackController();
        itemStackController.addItem(itemDatabase.get(itemID), 5);
        itemStackController.addItem(itemDatabase.get(itemID), 5);
        console.log(itemStackController);
        console.log(itemStackController.containItem(itemID, 1) === true);
        console.log(itemStackController.containItem(itemID, 9) === true);
        console.log(itemStackController.containItem(itemID, 10) === true);
        console.log('---');
        console.log(itemStackController.containItem(itemID, 11) === false);
        console.log(itemStackController.containItem(itemID, -1) === false);
        console.log(itemStackController.containItem(itemID, 0) === false);
        console.log(itemStackController.containItem(itemID, NaN) === false);
        console.log(itemStackController.containItem(itemID, undefined) === false);
        console.log(itemStackController.containItem(itemID, null) === false);
        console.log(itemStackController.containItem(undefined, 1) === false);
        console.log(itemStackController.containItem(null, 1) === false);
        console.log('---');
        console.log(itemStackController.containItem(ItemID.Skin01, 1) === false);
        console.log('---');
        console.log(itemStackController.removeItem(itemID, 5));
        console.log(itemStackController.containItem(itemID, 0) === false);
        console.log(itemStackController.containItem(itemID, 1) === true);
        console.log(itemStackController.containItem(itemID, 5) === true);
        console.log(itemStackController.containItem(itemID, 8) === false);
        console.log(itemStackController.containItem(itemID, 10) === false);
    }

    private _devItemStorageController() {
        let itemStorageController = new ItemStorageController();
        itemStorageController.addItemStorage(this.container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(20));
        itemStorageController.addItemStorage(this.container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(20));
        itemStorageController.addItemStorage(this.container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(20));

        this.container.get<StubFactory>(ContainerID.StubFactory).fillDefaultItems(itemStorageController);
        console.log(itemStorageController);
        this._testDefaultStubItemStorage(itemStorageController);
    }

    private _devEndlessBag() {
        let itemStorage = new EndlessItemStorage();
        this._testEndlessItemStorage(itemStorage);
    }

    private _testDefaultStubItemStorage(itemStorage: ItemStorageInterface) {
        console.log(itemStorage.containItem(ItemID.Wood, 1) === true);
        console.log(itemStorage.containItem(ItemID.IronOre, 1) === true);
        console.log(itemStorage.containItem(ItemID.IronIngot, 1) === true);
        console.log(itemStorage.containItem(ItemID.Skin01, 1) === false);
        console.log(itemStorage.containItem(ItemID.OneHandedSword01, 1) === true);
        console.log(itemStorage.containItem(ItemID.ClothBelt01, 1) === false);

        console.log(itemStorage.removeItem(ItemID.Wood, 50) === 50);
        console.log(itemStorage.containItem(ItemID.Wood, 1) === false);
    }

    private _testEndlessItemStorage(itemStorage: EndlessItemStorage) {
        let itemDatabase = this.container.get<ItemDatabase>(ContainerID.ItemDatabase);

        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 0) === 0);
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 1) === 0);
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 11111111) === 0);
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 1111111111111111) === 0);
        console.log(itemStorage.containItem(ItemID.Wood, 0) === false);
        console.log(itemStorage.containItem(ItemID.Wood, 1) === true);
        console.log(itemStorage.containItem(ItemID.Wood, 11111111111111111111111111111) === true);
    }

    private _devInfinityItemStackController() {
        let itemDatabase = this.container.get<ItemDatabase>(ContainerID.ItemDatabase);

        let infinityItemStackController = new InfinityItemStackController();
        console.log(infinityItemStackController.addItem(itemDatabase.get(ItemID.Wood), 120) === 0);
        console.log(infinityItemStackController.addItem(itemDatabase.get(ItemID.Wood), 120) === 0);
        console.log(infinityItemStackController.addItem(itemDatabase.get(ItemID.Wood), 120) === 0);
        console.log(infinityItemStackController.addItem(itemDatabase.get(ItemID.Wood), 120) === 0);
        console.log(infinityItemStackController);

        console.log(infinityItemStackController.containItem(ItemID.Wood, -1) === false);
        console.log(infinityItemStackController.containItem(ItemID.Wood, 0) === false);
        console.log(infinityItemStackController.containItem(ItemID.Wood, 1) === true);
        console.log(infinityItemStackController.containItem(ItemID.Wood, 120 * 4) === true);
        console.log(infinityItemStackController.containItem(ItemID.Wood, 120 * 4 + 1) === false);

        console.log(infinityItemStackController.removeItem(ItemID.Wood, 120) === 120);
        console.log(infinityItemStackController.removeItem(ItemID.Wood, 120) === 120);
        console.log(infinityItemStackController.removeItem(ItemID.Wood, 120) === 120);
        console.log(infinityItemStackController.removeItem(ItemID.Wood, 120) === 120);
        console.log(infinityItemStackController.removeItem(ItemID.Wood, 120) === 0);
        console.log(infinityItemStackController);
    }

    private _devInfinityBag() {
        let itemDatabase = this.container.get<ItemDatabase>(ContainerID.ItemDatabase);

        let itemStorage = new InfinityItemStorage();
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 120) === 0);
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 120) === 0);
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 120) === 0);
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.Wood), 120) === 0);
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.IronOre), 120) === 0);
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.IronOre), 120) === 0);
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.IronOre), 120) === 0);
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.IronOre), 120) === 0);
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.OneHandedSword01), 120) === 0);
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.OneHandedSword01), 120) === 0);
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.OneHandedSword01), 120) === 0);
        console.log(itemStorage.addItem(itemDatabase.get(ItemID.OneHandedSword01), 120) === 0);
        console.log(itemStorage);

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
}