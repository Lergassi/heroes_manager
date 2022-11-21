import _ from 'lodash';
import debug from 'debug';
import Command from '../../source/GameConsole/Command.js';
import {CommandID} from '../../types/enums/CommandID.js';
import Input from '../../source/GameConsole/Input.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import ItemDatabase from '../../source/ItemDatabase.js';
import ItemStorageFactory from '../Factories/ItemStorageFactory.js';
import ItemStorageV2 from '../Components/ItemStorageV2.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {ItemID} from '../../types/enums/ItemID.js';

export default class CreateStubObjectsCommand extends Command {
    get name(): string {
        return CommandID.create_stub_objects;
    }

    async execute(input: Input) {
        let itemDatabase = this.container.get<ItemDatabase>(ContainerID.ItemDatabase);

        let itemStorage = this.container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(20);
        let itemStorageComponent = itemStorage.get<ItemStorageV2>(ComponentID.ItemStorageComponent);

        itemStorageComponent.addItem(itemDatabase.get(ItemID.Wood), 50);
        itemStorageComponent.addItem(itemDatabase.get(ItemID.IronOre), 50);
        itemStorageComponent.addItem(itemDatabase.get(ItemID.Cotton), 50);
        itemStorageComponent.addItem(itemDatabase.get(ItemID.Leather_01), 50);
        itemStorageComponent.addItem(itemDatabase.get(ItemID.Herb_1), 50);
        itemStorageComponent.addItem(itemDatabase.get(ItemID.OneHandedSword_01), 1);
        itemStorageComponent.addItem(itemDatabase.get(ItemID.Shield_01), 1);
        itemStorageComponent.addItem(itemDatabase.get(ItemID.PlateBreastplate_01), 1);
        itemStorageComponent.addItem(itemDatabase.get(ItemID.PlatePants_01), 1);
        itemStorageComponent.addItem(itemDatabase.get(ItemID.PlateBoots_01), 1);

        this.container.set(ContainerID.StubItemStorage01, itemStorage);
    }
}