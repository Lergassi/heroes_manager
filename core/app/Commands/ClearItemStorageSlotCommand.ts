import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {CommandID} from '../../types/enums/CommandID.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';

export default class ClearItemStorageSlotCommand extends Command {
    get name(): string {
        return CommandID.clear_item_storage_slot;
    }

    configure() {
        super.configure();
        this.addArgument('item_storage_id', '', true);
        this.addArgument('item_storage_slot_index', '', true);
    }

    async execute(input: Input) {
        let itemStorageID = parseInt(input.getArgument('item_storage_id'), 10);
        let itemStorageSlotIndex = parseInt(input.getArgument('item_storage_slot_index'), 10);

        //Нужен доступ к слотам.
        this
            .container
            .get<GameObjectStorage>(ServiceID.GameObjectStorage)
            .getOneByID(itemStorageID)
            ?.get<ItemStorageInterface>(ComponentID.ItemStorage)
            ?.clear(itemStorageSlotIndex)
        ;
    }
}