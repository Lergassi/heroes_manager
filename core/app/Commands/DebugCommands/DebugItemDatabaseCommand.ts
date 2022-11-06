import Command from '../../../source/GameConsole/Command.js';
import Input from '../../../source/GameConsole/Input.js';
import {CommandID} from '../../../types/enums/CommandID.js';
import ItemDatabase from '../../../source/ItemDatabase.js';
import {ContainerID} from '../../../types/enums/ContainerID.js';
import Item from '../../Entities/Item.js';
import {assert, assertNotNil} from '../../../source/assert.js';
import {debugItem} from '../../../debug/debug_functions.js';
import {separator} from '../../indev.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import debug from 'debug';

export default class DebugItemDatabaseCommand extends Command {
    get name(): string {
        return CommandID.debug_item_database;
    }

    async execute(input: Input) {
        let itemDatabase = this.container.get<ItemDatabase>(ContainerID.ItemDatabase);

        let items = itemDatabase['_items'] as {[ID: string]: Item};
        assertNotNil(items);

        console.log(separator(CommandID.debug_item_database));
        let count = 0;
        for (const itemID in items) {
            debugItem(items[itemID]);
            count++;
        }
        console.log(separator());
        debug(DebugNamespaceID.Debug)('Всего предметов: ' + count);
        console.log(separator());
    }
}