import ItemStack from './ItemStack.js';
import AppError from '../../source/AppError.js';

export default class ItemStackSlot {
    private _itemStack: ItemStack;

    get itemStack(): ItemStack {
        return this._itemStack;
    }

    canPlaceItemStack(itemStack: ItemStack) {
        if (this.isBusy()) {
            throw new AppError('ItemStackSlot занят. Сначала его нужно освободить.');
        }
    }

    placeItemStack(itemStack: ItemStack) {
        this.canPlaceItemStack(itemStack);  //todo: Если не знать, что метод проверяет возможность размещения, то будет вызываться лишний метод.
        this._itemStack = itemStack;
    }

    clear() {
        this._itemStack = undefined;
    }

    isBusy(): boolean {
        return this._itemStack !== undefined;
    }

    isFree(): boolean {
        return this._itemStack === undefined;
    }
}