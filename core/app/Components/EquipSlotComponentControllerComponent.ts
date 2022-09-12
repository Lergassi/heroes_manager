import Component from '../../source/Component.js';
import EquipSlot from '../Entities/EquipSlot.js';
import GameObject from '../../source/GameObject.js';
import EquipSlotComponent from './EquipSlotComponent.js';
import AppError from '../../source/AppError.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';

//todo: Придумать другое название. 2 раза Component.
export default class EquipSlotComponentControllerComponent extends Component {
    // private _equipSlots;

    get equipSlotComponents(): EquipSlotComponent[] {
        return this.gameObject.findComponentsByName<EquipSlotComponent>(EquipSlotComponent.name);
    }

    constructor(id: number, gameObject: GameObject) {
        super(id, gameObject);

        // this._equipSlots = {
        //     head: {},
        //     chest: {},
        //     //...
        // };
    }

    getEquipSlotComponent(equipSlot: EquipSlot) {
        let equipSlotComponents = this.gameObject.findComponentsByName<EquipSlotComponent>(EquipSlotComponent.name);
        for (let i = 0; i < equipSlotComponents.length; i++) {
            if (equipSlotComponents[i].equipSlot === equipSlot) {
                return equipSlotComponents[i];

            }
        }

        throw AppError.heroNotContainsEquipSlot(equipSlot.name);
    }

    equipItemStack(equipSlot: EquipSlot, itemStack: ItemStack): boolean {
        let equipSlotComponent = this.getEquipSlotComponent(equipSlot);
        equipSlotComponent.placeItemStack(itemStack);

        return true;
    }
}