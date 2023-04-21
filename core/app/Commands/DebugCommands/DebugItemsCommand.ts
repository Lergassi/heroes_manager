import {database} from '../../../data/ts/database.js';
import EntityManager from '../../../source/EntityManager.js';
import Command from '../../../source/GameConsole/Command.js';
import Input from '../../../source/GameConsole/Input.js';
import {CommandID} from '../../../types/enums/CommandID.js';
import {ServiceID} from '../../../types/enums/ServiceID.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';

export default class DebugItemsCommand extends Command {
    get name(): string {
        return CommandID.debug_items;
    }

    async execute(input: Input) {
        let entityManager = this.container.get<EntityManagerInterface>(ServiceID.EntityManager) as EntityManager;

        entityManager.debug.items();
        database.items.data.debug();

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