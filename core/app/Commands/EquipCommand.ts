import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObject from '../../source/GameObject.js';
import AppError from '../../source/Errors/AppError.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {assertIsInstanceOf, assertNotNil} from '../../source/assert.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {CommandID} from '../../types/enums/CommandID.js';
import ItemStorageComponent from '../Components/ItemStorages/ItemStorageComponent.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import EquipSlotInterface from '../Interfaces/EquipSlotInterface.js';

/**
 * @deprecated
 */
export default class EquipCommand extends Command {
    get name(): string {
        return CommandID.equip_from_item_storage_slot;
    }

    configure() {
        super.configure();
        //from
        this.addArgument('item_storage_id', '', true);
        this.addArgument('item_storage_slot_index', '', true);

        //to
        this.addArgument('hero_id', '', true);
        this.addArgument('equip_slot_id', '', true);
    }

    async execute(input: Input) {
        let itemStorageID = parseInt(input.getArgument('item_storage_id'), 10);
        let itemStorageSlotIndex = parseInt(input.getArgument('item_storage_slot_index'), 10);

        let heroID = parseInt(input.getArgument('hero_id'), 10);
        let equipSlotID = input.getArgument('equip_slot_id');

        let itemStorage = this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage).getOneByID(itemStorageID);
        let itemStorageSlotComponent = itemStorage.get<ItemStorageComponent>(ComponentID.ItemStorage).getItemStorageSlot(itemStorageSlotIndex);

        if (itemStorageSlotComponent.isFree()) {
            throw new AppError('Исходный ItemStorageSlotComponent пустой.');
        }

        let hero = this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage).getOneByID(heroID);
        assertIsInstanceOf(hero, GameObject);
        let equipSlotComponent = <EquipSlotInterface>hero.get(equipSlotID);
        assertNotNil(equipSlotComponent);

        // if (equipSlotComponent.equip(itemStorageSlotComponent.itemStack.item.id)) {
        //     itemStorageSlotComponent.destroyItemStack();
        // }
    }
}