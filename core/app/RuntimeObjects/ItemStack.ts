import Item from '../Entities/Item.js';
import AppError from '../../source/Errors/AppError.js';
import {assertInRange, assertIsGreaterThanOrEqual, assertIsInstanceOf, assertNotNil} from '../../source/assert.js';
import {unsigned} from '../../types/main.js';

export interface ItemStackPlaceInterface {
    /**
     * @deprecated
     */
    get itemStack(): ItemStack;
    placeItemStack(itemStack: ItemStack): void;
    // clear(): void;
}

export default class ItemStack {
    private readonly _item: Item;
    private _count: number;

    /**
     * @deprecated
     */
    get item(): Item {
        return this._item;
    }

    /**
     * @deprecated
     */
    get count(): number {
        return this._count;
    }

    /**
     * @deprecated
     * @param value
     */
    set count(value: number) {
        if (value <= 0 || value > this._item.stackSize) {
            throw AppError.itemStackSizeWrong(this._item);
        }
        this._count = value;
    }

    constructor(item: Item, count: number = 1) {
        assertNotNil(item);
        assertIsInstanceOf(item, Item);
        assertNotNil(count);
        assertInRange(count, 0, item.stackSize, 'Размер стека для предмета не верный.');

        this._item = item;
        this._count = count;
        // if (this._count <= 0 || this._count > this._item.stackSize) {
        //     throw AppError.itemStackSizeWrong(this._item);
        // }
    }

    containsItem(item: Item): boolean {
        return this._item === item;
    }

    hasItemCount(item: Item, count: number): boolean {
        return this._item === item && this._count >= count;
    }

    hasCount(count: number): boolean {
        return this._count >= count;
    }

    isFull(): boolean {
        return this._count >= this._item.stackSize;
    }

    /**
     * Недостаток до полного стека.
     */
    flawCount(): number {
        return this._item.stackSize - this._count;
    }

    /**
     *
     * @param count Положительное число.
     * @return Остаток.
     */
    add(count: unsigned, item?: Item): unsigned {
    //todo: add(item:Item, count: number): number {
        assertIsGreaterThanOrEqual(count, 1);
        if (item && this._item !== item) {
            return count;
        }

        let flaw = this.flawCount();
        if (count <= flaw) {
            this._count += count;
            count = 0;
        } else {
            this._count += flaw;
            count -= flaw;
        }

        return count;
    }

    addWithItem(item:Item, count: unsigned): unsigned {
        assertIsGreaterThanOrEqual(count, 1);

        if (this._item !== item) {
            return count;
        }

        if (this._count >= this._item.stackSize) {
            return count;
        }

        let flaw = this.flawCount();
        if (count <= flaw) {
            this._count += count;
            count = 0;
        } else {
            this._count += flaw;
            count -= flaw;
        }

        return count;
    }

    /**
     * Стек предмета не может быть меньше 1.
     * @param count Положительное число.
     * @return Остаток.
     */
    remove(count: number): number {
        if (count <= 0) {
            return 0;
        }

        if (this._count > count) {
            this._count -= count;
            count = 0;
        } else {
            count -= this._count - 1;
            this._count = 1;
        }

        return count;
    }

    render(callback: (values: Readonly<{
        item: Item,
        count: number,
    }>) => void) {
        callback({
            item: this._item,
            count: this._count,
        });
    }
}