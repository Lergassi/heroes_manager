import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObject from '../../source/GameObject.js';
import ItemStorageSlotComponent from '../Components/ItemStorageSlotComponent.js';
import AppError from '../../source/Errors/AppError.js';
import EquipSlotComponent from '../Components/EquipSlotComponent.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {assert} from '../../source/assert.js';
import EquipSlot from '../Entities/EquipSlot.js';
import {ContainerKey} from '../../types/containerKey.js';

export default class EquipCommand extends Command {
    get name(): string {
        return 'hero.equip_from_item_storage';
    }

    configure() {
        super.configure();
        //from
        this.addArgument('item_storage_id', '', true);
        this.addArgument('item_storage_slot_id', '', true);

        //to
        this.addArgument('hero_id', '', true);
        this.addArgument('equip_slot_id', '', true);
    }

    async execute(input: Input) {
        let itemStorageID = parseInt(input.getArgument('item_storage_id'), 10);
        let itemStorageSlotID = parseInt(input.getArgument('item_storage_slot_id'), 10);

        let heroID = parseInt(input.getArgument('hero_id'), 10);
        // let equipSlotComponentID = parseInt(input.getArgument('equip_slot_id'), 10);
        let equipSlotComponentID = input.getArgument('equip_slot_id');

        let itemStorage = this.container.get<GameObjectStorage>(ContainerKey.GameObjectStorage).getOneByID(itemStorageID);
        let itemStorageSlotComponent = <ItemStorageSlotComponent>itemStorage.getComponentByID(itemStorageSlotID);
        assert(itemStorageSlotComponent instanceof ItemStorageSlotComponent);

        if (itemStorageSlotComponent.isFree()) {
            throw new AppError('Исходный ItemStorageSlotComponent пустой.');
        }

        let hero = this.container.get<GameObjectStorage>(ContainerKey.GameObjectStorage).getOneByID(heroID);
        // let equipSlotComponent = <EquipSlotComponent>hero.getComponentByID(equipSlotComponentID);
        let equipSlotComponent = <EquipSlotComponent>hero.get(equipSlotComponentID);
        assert(equipSlotComponent instanceof EquipSlotComponent);

        equipSlotComponent.placeItemStack(itemStorageSlotComponent.itemStack);
        itemStorageSlotComponent.destroyItemStack();
    }
}