import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import Item from '../Entities/Item.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import EntityManager from '../../source/EntityManager.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {CommandID} from '../../types/enums/CommandID.js';
import MainItemStorageListComponent from '../Components/MainItemStorageListComponent.js';
import ItemStorageComponent from '../Components/ItemStorageComponent.js';
import ItemDatabase from '../../source/ItemDatabase.js';
import {assertNotEmpty, assertNotNil} from '../../source/assert.js';
import {sprintf} from 'sprintf-js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';

export default class CreateItemCommand extends Command {
    get name(): string {
        return CommandID.create_item;
    }

    configure() {
        super.configure();
        this.addArgument('item_id', '', true);
        this.addArgument('count', '', true, 1);
    }

    async execute(input: Input) {
        let itemID = input.getArgument('item_id');
        let count = parseInt(input.getArgument('count'), 10);
        assertNotEmpty(itemID);

        let item = this.container.get<ItemDatabase>(ServiceID.ItemDatabase).get(itemID);
        assertNotNil(item, sprintf('Предмет ID(%s) не найден.', itemID));

        this.container.get<ItemStorageInterface>(ServiceID.ItemStorageController).addItem(item, count);
    }
}