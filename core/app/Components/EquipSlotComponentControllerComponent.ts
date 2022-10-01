import Component from '../../source/Component.js';
import EquipSlot from '../Entities/EquipSlot.js';
import GameObject from '../../source/GameObject.js';
import EquipSlotComponent from './EquipSlotComponent.js';
import AppError from '../../source/AppError.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';

//todo: Придумать другое название. 2 раза Component.
export default class EquipSlotComponentControllerComponent extends Component {
    // private _equipSlots;
    private readonly _equipSlotComponents: EquipSlotComponent[];

    get equipSlotComponents(): EquipSlotComponent[] {
        // return this.gameObject.findComponentsByName<EquipSlotComponent>(EquipSlotComponent.name);
        return this._equipSlotComponents;
    }

    // constructor(id: number, gameObject: GameObject) {
    constructor(
        equipSlotComponents: EquipSlotComponent[],
    ) {
        // super(id, gameObject);
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

        throw AppError.heroNotContainsEquipSlot(equipSlot.name);
    }

    equipItemStack(equipSlot: EquipSlot, itemStack: ItemStack): boolean {
        let equipSlotComponent = this.getEquipSlotComponent(equipSlot);
        equipSlotComponent.placeItemStack(itemStack);

        return true;
    }
}