import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObject from '../../source/GameObject.js';
import ItemStorageSlotComponent from '../Components/ItemStorageSlotComponent.js';
import AppError from '../../source/Errors/AppError.js';
import EquipSlotComponent from '../Components/EquipSlotComponent.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';

export default class EquipCommand extends Command {
    get name(): string {
        return 'equip_from_item_storage';
    }

    configure() {
        super.configure();
        //from
        this.addArgument('item_storage_id', '', true);
        this.addArgument('item_storage_slot_id', '', true);

        //to
        this.addArgument('hero_id', '', true);
        this.addArgument('component_id', '', true);
    }

    async execute(input: Input) {
        let itemStorageID = parseInt(input.getArgument('item_storage_id'));
        let itemStorageSlotID = parseInt(input.getArgument('item_storage_slot_id'));

        let heroID = parseInt(input.getArgument('hero_id'));
        let equipSlotComponentID = parseInt(input.getArgument('component_id'));

        let itemStorage: GameObject = this.container.get<GameObjectStorage>('player.gameObjectStorage').getOneByID(itemStorageID);
        let itemStorageSlotComponent: ItemStorageSlotComponent = <ItemStorageSlotComponent>itemStorage.getComponentByID(itemStorageSlotID);
        if (itemStorageSlotComponent.isFree()) {
            throw new AppError('Исходный ItemStorageSlotComponent пустой.');
        }

        let hero: GameObject = this.container.get<GameObjectStorage>('player.gameObjectStorage').getOneByID(heroID);
        let equipSlotComponent: EquipSlotComponent = <EquipSlotComponent>hero.getComponentByID(equipSlotComponentID);

        equipSlotComponent.placeItemStack(itemStorageSlotComponent.itemStack);
        itemStorageSlotComponent.clear();
    }
}