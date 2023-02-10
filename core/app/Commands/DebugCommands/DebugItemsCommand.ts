import EntityManager from '../../../source/EntityManager.js';
import Command from '../../../source/GameConsole/Command.js';
import Input from '../../../source/GameConsole/Input.js';
import {CommandID} from '../../../types/enums/CommandID.js';
import ItemDatabase from '../../../source/ItemDatabase.js';
import {ServiceID} from '../../../types/enums/ServiceID.js';
import Item from '../../Entities/Item.js';
import {assert, assertNotNil} from '../../../source/assert.js';
import {debugItem} from '../../../debug/debug_functions.js';
import {separator} from '../../indev.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import debug from 'debug';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';

export default class DebugItemsCommand extends Command {
    get name(): string {
        return CommandID.debug_items;
    }

    async execute(input: Input) {
        let entityManager = this.container.get<EntityManagerInterface>(ServiceID.EntityManager) as EntityManager;

        entityManager.debug.items();

        // let items = itemDatabase['_items'] as {[ID: string]: Item};
        // assertNotNil(items);
        //
        // console.log(separator(CommandID.debug_items));
        // let count = 0;
        // for (const itemID in items) {
        //     debugItem(items[itemID]);
        //     count++;
        // }
        // console.log(separator());
        // debug(DebugNamespaceID.Debug)('Всего предметов: ' + count);
        // console.log(separator());
    }
}