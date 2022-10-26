import Command from '../../../source/GameConsole/Command.js';
import Input from '../../../source/GameConsole/Input.js';
import {CommandNameID} from '../../../types/enums/CommandNameID.js';
import ItemDatabase from '../../../source/ItemDatabase.js';
import {ContainerID} from '../../../types/enums/ContainerID.js';

export default class DebugItemsCommand extends Command {
    get name(): string {
        return CommandNameID.debug_items;
    }

    async execute(input: Input) {
        let itemDatabase = this.container.get<ItemDatabase>(ContainerID.ItemDatabase);
    }
}