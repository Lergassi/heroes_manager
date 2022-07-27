import GameObject from '../../source/GameObject.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import EquipSlotComponent from '../Components/EquipSlotComponent.js';
import _ from 'lodash';
import EquipSlot from '../Entities/EquipSlot.js';

export default class EquipManager {
    equipNewItemStack(hero: GameObject, equipSlot: EquipSlot, itemStack: ItemStack) {
        let equipSlotComponent = <EquipSlotComponent>_.find(hero.findComponentsByName(EquipSlotComponent.name), (obj: EquipSlotComponent) => {
            return obj.equipSlot === equipSlot;
        });
        equipSlotComponent.equipItemStack(itemStack);
    }
}