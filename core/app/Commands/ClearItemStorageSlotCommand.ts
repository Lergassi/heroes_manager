import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import ItemStorageComponent from '../Components/ItemStorageComponent.js';
import {ContainerKey} from '../../types/enums/ContainerKey.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import {GameObjectKey} from '../../types/enums/GameObjectKey.js';

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
            .get<GameObjectStorage>(ContainerKey.GameObjectStorage)
            .getOneByID(itemStorageID)
            ?.get<ItemStorageComponent>(GameObjectKey.ItemStorageComponent)
            ?.clearSlot(itemStorageSlotIndex)
        ;
    }
}