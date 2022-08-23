import Component from '../../source/Component.js';
import ItemStackSlot from '../RuntimeObjects/ItemStackSlot.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import GameObject from '../../source/GameObject.js';

export default class ItemStorageSlotComponent extends Component {
    private readonly _itemStackSlot: ItemStackSlot;

    get itemStack(): ItemStack {
        return this._itemStackSlot.itemStack;
    }

    constructor(id: string, gameObject: GameObject) {
        super(id, gameObject);
        this._itemStackSlot = new ItemStackSlot();
    }

    placeItemStack(itemStack): void {
        this._itemStackSlot.placeItemStack(itemStack);
    }

    isBusy(): boolean {
        return this._itemStackSlot.isBusy();
    }

    isFree(): boolean {
        return this._itemStackSlot.isFree();
    }

    clear(): void {
        this._itemStackSlot.clear();
    }
}