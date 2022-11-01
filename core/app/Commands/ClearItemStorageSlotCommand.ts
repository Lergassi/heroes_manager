import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import ItemStorageComponent from '../Components/ItemStorageComponent.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import {ComponentID} from '../../types/enums/ComponentID.js';

export default class ClearItemStorageSlotCommand extends Command {
    get name(): string {
        return CommandNameID.clear_item_storage_slot;
    }

    configure() {
        super.configure();
        this.addArgument('item_storage_id', '', true);
        this.addArgument('item_storage_slot_index', '', true);
    }

    async execute(input: Input) {
        let itemStorageID = parseInt(input.getArgument('item_storage_id'), 10);
        let itemStorageSlotIndex = input.getArgument('item_storage_slot_index');

        //Нужен доступ к слотам.
        this
            .container
            .get<GameObjectStorage>(ContainerID.GameObjectStorage)
            .getOneByID(itemStorageID)
            ?.get<ItemStorageComponent>(ComponentID.ItemStorageComponent)
            ?.clearSlot(itemStorageSlotIndex)
        ;
    }
}