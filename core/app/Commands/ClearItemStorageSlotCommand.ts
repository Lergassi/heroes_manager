import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import ItemStorageComponent from '../Components/ItemStorageComponent.js';
import {ContainerKey} from '../../types/containerKey.js';

export default class ClearItemStorageSlotCommand extends Command {
    get name(): string {
        return 'item_storage.clear_slot';
    }

    configure() {
        super.configure();
        this.addArgument('item_storage_id', '', true);
        this.addArgument('item_storage_slot_id', '', true);
    }

    async execute(input: Input) {
        let itemStorageID = parseInt(input.getArgument('item_storage_id'), 10);
        let itemStorageSlotID = input.getArgument('item_storage_slot_id');

        //Нужен доступ к слотам.
        this
            .container
            .get<GameObjectStorage>(ContainerKey.GameObjectStorage)
            .getOneByID(itemStorageID)
            ?.get<ItemStorageComponent>('itemStorageComponent')
            ?.clearSlot(itemStorageSlotID)
        ;
    }
}