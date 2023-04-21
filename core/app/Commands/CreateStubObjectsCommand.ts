import Command from '../../source/GameConsole/Command.js';
import {CommandID} from '../../types/enums/CommandID.js';
import Input from '../../source/GameConsole/Input.js';

export default class CreateStubObjectsCommand extends Command {
    get name(): string {
        return CommandID.create_stub_objects;
    }

    async execute(input: Input) {
        // let itemDatabase = this.container.get<ItemDatabase>(ServiceID.ItemDatabase);
        // let entityManager = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);
        //
        // let size = 20;
        // // let itemStorage = this.container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(size);
        // let itemStorage = new ItemStorage(size, entityManager);
        // // let itemStorageComponent = itemStorage.get<ItemStorageInterface>(ComponentID.ItemStorageComponent);
        //
        // itemStorage._addItem(itemDatabase.get(ItemID.Wood), 50);
        // itemStorage._addItem(itemDatabase.get(ItemID.IronOre), 50);
        // itemStorage._addItem(itemDatabase.get(ItemID.IronIngot), 50);
        // itemStorage._addItem(itemDatabase.get(ItemID.CopperIngot), 50);
        // itemStorage._addItem(itemDatabase.get(ItemID.OneHandedSword01), 1);
        // itemStorage._addItem(itemDatabase.get(ItemID.TwoHandedSword01), 1);
        // itemStorage._addItem(itemDatabase.get(ItemID.Shield01), 1);
        // itemStorage._addItem(itemDatabase.get(ItemID.PlateBreastplate01), 1);
        // itemStorage._addItem(itemDatabase.get(ItemID.PlatePants01), 1);
        // itemStorage._addItem(itemDatabase.get(ItemID.PlateBoots01), 1);

        // this.container.set(ContainerID.StubItemStorage01, itemStorage);
        // return itemStorage;
    }
}