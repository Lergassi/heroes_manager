import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import AppError from '../../source/Errors/AppError.js';
import GameObject from '../../source/GameObject.js';
import EquipSlotComponent from '../Components/EquipSlotComponent.js';
import ItemStorageSlotComponent from '../Components/ItemStorageSlotComponent.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {CommandID} from '../../types/enums/CommandID.js';

export default class RemoveEquipCommand extends Command {
    get name(): string {
        return CommandID.remove_equip_to_item_storage_slot;  //todo: Добавить команду destroyItem без перемещения в сумку.
    }

    configure() {
        super.configure();
        //from
        this.addArgument('hero_id', '', true)
        this.addArgument('equip_slot_id', '', true);

        //to
        // this.addArgument('item_storage_id',  '', true);
        // this.addArgument('item_storage_slot_component_id',  '', true);
    }

    async execute(input: Input) {
        let heroID = parseInt(input.getArgument('hero_id'), 10);
        let equipSlotID = input.getArgument('component_id');

        // let itemStorageID = parseInt(input.getArgument('item_storage_id'), 10);
        // let itemStorageSlotComponentID = parseInt(input.getArgument('item_storage_slot_component_id'), 10);

        let hero = <GameObject>this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage).getOneByID(heroID);
        // let equipSlotComponent = <EquipSlotComponent>hero.getComponentByID(equipSlotComponentID);
        // if (equipSlotComponent.isFree()) {
        //     throw new AppError('EquipSlotComponent пустой.');
        // }

        // let itemStorage = <GameObject>this.container.get<GameObjectStorage>(ContainerID.GameObjectStorage).getOneByID(itemStorageID);
        // let itemStorageSlotComponent = <ItemStorageSlotComponent>itemStorage.getComponentByID(itemStorageSlotComponentID);
        //
        // if (itemStorageSlotComponent.placeItemStack(equipSlotComponent.itemStack)) {
        //     equipSlotComponent.clear();
        // }
    }
}