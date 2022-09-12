import ItemStack from './ItemStack.js';
import AppError from '../../source/AppError.js';
import _ from 'lodash';

export default class ItemStackSlot {
    private _itemStack: ItemStack;

    get itemStack(): ItemStack {
        return this._itemStack;
    }

    constructor() {
        this._itemStack = null;
    }

    canPlaceItemStack(itemStack: ItemStack) {
        if (!this.isFree()) {
            throw new AppError('ItemStackSlot занят. Сначала его нужно освободить.');
        }
    }

    //todo: Если будет ошибка, то стек созданный в момент вызова метода потеряется. placeItemStack(new ItemStack(...)) Возможно стоит переделать на паттерти, а стек создавать уже внутри слота после всех проверок.
    //todo: А зачем нужна проверка если есть метод clear?
    placeItemStack(itemStack: ItemStack) {
        this.canPlaceItemStack(itemStack);  //todo: Если не знать, что метод проверяет возможность размещения, то будет вызываться лишний метод.
        this._itemStack = itemStack;
    }

    clear() {
        this._itemStack = null;
    }

    isFree(): boolean {
        return _.isNil(this._itemStack);
    }
}