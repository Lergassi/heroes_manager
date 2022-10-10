import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import AppError from '../../source/Errors/AppError.js';
import GameObject from '../../source/GameObject.js';
import EquipSlotComponent from '../Components/EquipSlotComponent.js';
import ItemStorageSlotComponent from '../Components/ItemStorageSlotComponent.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';

export default class RemoveEquipCommand extends Command {
    get name(): string {
        return 'remove_equip_to_item_storage';
    }

    configure() {
        super.configure();
        //from
        this.addArgument('hero_id', '', true)
        this.addArgument('component_id', '', true);

        //to
        this.addArgument('item_storage_id',  '', true);
        this.addArgument('item_storage_slot_component_id',  '', true);
    }

    async execute(input: Input) {
        let heroID = parseInt(input.getArgument('hero_id'));
        let equipSlotComponentID = parseInt(input.getArgument('component_id'));

        let itemStorageID = parseInt(input.getArgument('item_storage_id'));
        let itemStorageSlotComponentID = parseInt(input.getArgument('item_storage_slot_component_id'));

        let hero = <GameObject>this.container.get<GameObjectStorage>('player.gameObjectStorage').getOneByID(heroID);
        let equipSlotComponent = <EquipSlotComponent>hero.getComponentByID(equipSlotComponentID);
        if (equipSlotComponent.isFree()) {
            throw new AppError('EquipSlotComponent пустой.');
        }

        let itemStorage = <GameObject>this.container.get<GameObjectStorage>('player.gameObjectStorage').getOneByID(itemStorageID);
        let itemStorageSlotComponent = <ItemStorageSlotComponent>itemStorage.getComponentByID(itemStorageSlotComponentID);

        itemStorageSlotComponent.placeItemStack(equipSlotComponent.itemStack);
        equipSlotComponent.clear();
    }
}