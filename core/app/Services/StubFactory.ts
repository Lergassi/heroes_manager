import ContainerInterface from '../../source/ContainerInterface.js';

export default class StubFactory {
    private readonly _container: ContainerInterface;

    constructor(container: ContainerInterface) {
        this._container = container;
    }

    // /**
    //  * Ресуры, материалы, оружие.
    //  */
    // createDefaultItemStorage(): ItemStorageInterface {
    //     let size = 20;
    //     let itemStorage = new ItemStorageV2(size);
    //
    //     this.fillDefaultItems(itemStorage);
    //
    //     return itemStorage;
    // }
    //
    // fillDefaultItems(itemStorage: ItemStorageInterface) {
    //     let itemDatabase = this._container.get<ItemDatabase>(ServiceID.ItemDatabase);
    //
    //     itemStorage.addItem(itemDatabase.get(ItemID.Wood), 50);
    //     itemStorage.addItem(itemDatabase.get(ItemID.IronOre), 50);
    //     itemStorage.addItem(itemDatabase.get(ItemID.IronIngot), 50);
    //     itemStorage.addItem(itemDatabase.get(ItemID.CopperIngot), 50);
    //     itemStorage.addItem(itemDatabase.get(ItemID.OneHandedSword01), 1);
    //     itemStorage.addItem(itemDatabase.get(ItemID.TwoHandedSword01), 1);
    //     itemStorage.addItem(itemDatabase.get(ItemID.Shield01), 1);
    //     itemStorage.addItem(itemDatabase.get(ItemID.PlateBreastplate01), 1);
    //     itemStorage.addItem(itemDatabase.get(ItemID.PlatePants01), 1);
    //     itemStorage.addItem(itemDatabase.get(ItemID.PlateBoots01), 1);
    // }
}