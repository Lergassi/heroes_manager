import Item from '../Entities/Item.js';
import AppError from '../../source/AppError.js';
import {sprintf} from 'sprintf-js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import {floor} from 'lodash';

export interface ItemStackPlaceInterface {
    /**
     * @deprecated
     */
    get itemStack(): ItemStack;
    placeItemStack(itemStack: ItemStack): void;
    // clear(): void;
}

// /**
//  * Случаи, когда нужно указать предмет и его количество. В том числе для не stackable.
//  */
// export interface ItemCountInterface {
//     get item(): Item;
//     get count(): number;
//     set count(value: number);
// }

// export interface ItemCountReadonlyInterface {
//     get item(): Item;
//     get count(): number;
// }

// export class ItemCountReadonly implements ItemCountReadonlyInterface {
//     private readonly _itemCount: ItemCountInterface;
//
//     get item(): Item {
//         return this._itemCount.item;
//     }
//
//     get count(): number {
//         return this._itemCount.count;
//     }
//
//     constructor(item: Item, count: number) {
//         this._itemCount = new ItemCount(item, count);
//     }
// }
//
// //todo: Надо както по другому назвать. Для экипировки как то не правильно когда будут отображаться меч с кол-вом 100 например.
// export class ItemCount implements ItemCountInterface {
//     private readonly _item: Item;
//     private _count: number;
//
//     get item(): Item {
//         return this._item;
//     }
//
//     get count(): number {
//         return this._count;
//     }
//
//     set count(value: number) {
//         this._count = value;
//     }
//
//     constructor(item: Item, count: number) {
//         this._item = item;
//         this._count = count;
//     }
// }

export default class ItemStack {
    private readonly _id: string;
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

    constructor(id: string, item: Item, count: number = 1) {
        this._id = id;
        this._item = item;
        this._count = count;
        if (this._count <= 0 || this._count > this._item.stackSize) {
            throw AppError.itemStackSizeWrong(this._item);
        }
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

    flawCount(): number {
        return this._item.stackSize - this._count;
    }

    /**
     *
     * @param count Положительное число.
     * @return Остаток.
     */
    add(count: number): number {
        if (count <= 0) {
            return 0;
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