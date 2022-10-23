import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import Item from '../Entities/Item.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import ItemStackPattern from '../RuntimeObjects/ItemStackPattern.js';
import EntityManager from '../../source/EntityManager.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import {ContainerKey} from '../../types/enums/ContainerKey.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import MainItemStorageListComponent from '../Components/MainItemStorageListComponent.js';
import ItemStorageComponent from '../Components/ItemStorageComponent.js';
import ItemDatabase from '../ItemDatabase.js';
import {assertNotNil} from '../../source/assert.js';

export default class CreateItemCommand extends Command {
    get name(): string {
        return CommandNameID.create_item;
    }

    configure() {
        super.configure();
        this.addArgument('item_id', '', true);
        this.addArgument('count', '', true);
    }

    async execute(input: Input) {
        let itemID: string = input.getArgument('item_id');
        let count: number = parseInt(input.getArgument('count'), 10);

        let item = this.container.get<ItemDatabase>(ContainerKey.ItemDatabase).get(itemID);

        //todo: Со статичным методом уже удобнее, но возможно можно лучше. И геттер.
        ItemStorageComponent.addItemToItemStorages(
            this.container.get<MainItemStorageListComponent>(ContainerKey.MainItemStorageList).itemStorages,
            item,
            count,
        );
    }
}