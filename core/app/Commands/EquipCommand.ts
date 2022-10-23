import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObject from '../../source/GameObject.js';
import ItemStorageSlotComponent from '../Components/ItemStorageSlotComponent.js';
import AppError from '../../source/Errors/AppError.js';
import EquipSlotComponent from '../Components/EquipSlotComponent.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {assert, assertIsInstanceOf, assertNotNil} from '../../source/assert.js';
import {ContainerKey} from '../../types/enums/ContainerKey.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import ItemStorageComponent from '../Components/ItemStorageComponent.js';
import {GameObjectKey} from '../../types/enums/GameObjectKey.js';
import EquipSlotInterface from '../Interfaces/EquipSlotInterface.js';

export default class EquipCommand extends Command {
    get name(): string {
        return CommandNameID.equip_from_item_storage_slot;
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

        let itemStorage = this.container.get<GameObjectStorage>(ContainerKey.GameObjectStorage).getOneByID(itemStorageID);
        console.log(itemStorage);
        // assertIsInstanceOf(itemStorage, GameObject);
        let itemStorageSlotComponent = itemStorage.get<ItemStorageComponent>(GameObjectKey.ItemStorageComponent).getItemStorageSlot(itemStorageSlotIndex);
        console.log(itemStorageSlotComponent);
        // assert(itemStorageSlotComponent instanceof ItemStorageSlotComponent);

        if (itemStorageSlotComponent.isFree()) {
            throw new AppError('Исходный ItemStorageSlotComponent пустой.');
        }

        let hero = this.container.get<GameObjectStorage>(ContainerKey.GameObjectStorage).getOneByID(heroID);
        assertIsInstanceOf(hero, GameObject);
        // let equipSlotComponent = <EquipSlotComponent>hero.get(equipSlotID);
        let equipSlotComponent = <EquipSlotInterface>hero.get(equipSlotID);
        // assert(equipSlotComponent instanceof EquipSlotComponent);
        assertNotNil(equipSlotComponent);

        equipSlotComponent.equip(itemStorageSlotComponent.itemStack);
        itemStorageSlotComponent.destroyItemStack();
    }
}