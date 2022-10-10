import ItemStack from '../RuntimeObjects/ItemStack.js';
import _ from 'lodash';
import AppError from '../../source/Errors/AppError.js';
import Item from '../Entities/Item.js';

// export interface PlaceInterface {
//     place(itemStack: ItemStack): void;
//     destroyItemStack(): void;
// }

// export default class ItemSlotComponent implements PlaceInterface {
//todo: Это будет универсальный слот. Потом он будет использоваться в других местах, например в слоте экипировки. Механика слота и ItemStack может измениться, поэтому для itemStack геттера не делать!
export default class ItemSlot {
    private _itemStack: ItemStack;

    constructor() {
        this._itemStack = null;
    }

    /**
     * @throws
     * @param itemStack
     */
    place(itemStack: ItemStack): ItemStack {
        if (this.isBusy()) {
            throw new AppError('Слот занят.');
        }

        this._itemStack = itemStack;

        return itemStack;
    }

    replace(target: ItemSlot) {
        let thisItemStack = this._itemStack;
        this.destroyItemStack();
        this.place(target._itemStack);
        target.destroyItemStack();
        target.place(thisItemStack);
    }

    isBusy(): boolean {
        return !_.isNil(this._itemStack);
    }

    isFree() {
        return !this.isBusy();
    }

    destroyItemStack(): void {
        this._itemStack = null;
    }

    containsItem(item: Item): boolean {
        return this.isBusy() && this._itemStack.containsItem(item);
    }

    hasItemCount(item: Item, count: number): boolean {
        return this.isBusy() && this._itemStack.hasItemCount(item, count);
    }

    hasCount(count: number) {
        return this.isBusy() && this._itemStack.hasCount(count);
    }

    // flawCount(count: number) {
    //     return this.isBusy() && this._itemStack.flawCount(count);
    // }
}