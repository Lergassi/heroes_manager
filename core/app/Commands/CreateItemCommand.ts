import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {CommandID} from '../../types/enums/CommandID.js';
import {assertNotEmpty} from '../../source/assert.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';

export default class CreateItemCommand extends Command {
    get name(): string {
        return CommandID.create_item;
    }

    configure() {
        super.configure();
        this.addArgument('item_id', '', true);
        this.addArgument('count', '', false, 1);
    }

    async execute(input: Input) {
        let itemID = input.getArgument('item_id') as ItemID;
        let count = parseInt(input.getArgument('count'), 10);
        assertNotEmpty(itemID);

        // let item = this.container.get<ItemDatabase>(ServiceID.ItemDatabase).get(itemID);
        // assertNotNil(item, sprintf('Предмет ID(%s) не найден.', itemID));

        // this.container.get<ItemStorageInterface>(ServiceID.ItemStorageController)._addItem(item, count);
        this.container.get<ItemStorageInterface>(ServiceID.ItemStorageController).addItem(itemID, count);
    }
}