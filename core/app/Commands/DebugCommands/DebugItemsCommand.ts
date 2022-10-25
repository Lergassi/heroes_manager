import Command from '../../../source/GameConsole/Command.js';
import Input from '../../../source/GameConsole/Input.js';
import {CommandNameID} from '../../../types/enums/CommandNameID.js';
import ItemDatabase from '../../ItemDatabase.js';
import {ContainerKey} from '../../../types/enums/ContainerKey.js';

export default class DebugItemsCommand extends Command {
    get name(): string {
        return CommandNameID.debug_items;
    }

    async execute(input: Input) {
        let itemDatabase = this.container.get<ItemDatabase>(ContainerKey.ItemDatabase);
    }
}