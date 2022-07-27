import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import EquipSlot from '../Entities/EquipSlot.js';
import ItemStackSlot from '../RuntimeObjects/ItemStackSlot.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';

export default class EquipSlotComponent extends Component {
    private readonly _equipSlot: EquipSlot;
    private readonly _itemStackSlot: ItemStackSlot;

    get equipSlot(): EquipSlot {
        return this._equipSlot;
    }

    // get itemStackSlot(): ItemStackSlot {
    //     return this._itemStackSlot;
    // }

    get itemStack(): ItemStack {
        return this._itemStackSlot.isFree() ? undefined : this._itemStackSlot.itemStack;
    }

    constructor(
        id: number,
        gameObject: GameObject,
        equipSlot: EquipSlot,
    ) {
        super(id, gameObject);
        this._equipSlot = equipSlot;
        this._itemStackSlot = new ItemStackSlot();
    }

    equipItemStack(itemStack: ItemStack) {
        // this._equipSlot.canEquipItem(itemStack.item, this.gameObject);
        this._itemStackSlot.placeItemStack(itemStack);
    }

    clear() {
        this._itemStackSlot.clear();
    }

    isBusy(): boolean {
        return this._itemStackSlot.isBusy();
    }

    isFree(): boolean {
        return this._itemStackSlot.isFree();
    }
}