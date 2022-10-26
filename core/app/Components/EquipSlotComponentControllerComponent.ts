import Component from '../../source/Component.js';
import EquipSlot from '../Entities/EquipSlot.js';
import EquipSlotComponent from './EquipSlotComponent.js';
import AppError from '../../source/Errors/AppError.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';

/**
 * @deprecated
 */
export default class EquipSlotComponentControllerComponent extends Component {
    private readonly _equipSlotComponents: EquipSlotComponent[];

    get equipSlotComponents(): EquipSlotComponent[] {
        return this._equipSlotComponents;
    }

    constructor(
        equipSlotComponents: EquipSlotComponent[],
    ) {
        super();

        this._equipSlotComponents = equipSlotComponents;

        // this._equipSlots = {
        //     head: {},
        //     chest: {},
        //     //...
        // };
    }

    getEquipSlotComponent(equipSlot: EquipSlot) {
        // let equipSlotComponents = this.gameObject.findComponentsByName<EquipSlotComponent>(EquipSlotComponent.name);
        let equipSlotComponents = this._equipSlotComponents;
        for (let i = 0; i < equipSlotComponents.length; i++) {
            if (equipSlotComponents[i].equipSlot === equipSlot) {
                return equipSlotComponents[i];

            }
        }

        throw AppError.heroNotContainsEquipSlot();
    }

    equipItemStack(equipSlot: EquipSlot, itemStack: ItemStack): boolean {
        let equipSlotComponent = this.getEquipSlotComponent(equipSlot);
        equipSlotComponent.placeItemStack(itemStack);

        return true;
    }
}