import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import {ItemID} from '../../types/enums/ItemID.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import Item from '../Entities/Item.js';
import {unsigned} from '../types.js';
import {assertIsGreaterThanOrEqual, assertIsInstanceOf} from '../../source/assert.js';
import EventSystem from '../../source/EventSystem.js';
import {ItemStorageComponentEventCode} from './ItemStorageComponent.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';

export default class ItemStorageV2 implements ItemStorageInterface {
    private readonly _size: unsigned;
    private readonly _itemStacks: ItemStack[];
    private readonly _itemStackFactory: ItemStackFactory;

    constructor(size: unsigned, itemStackFactory: ItemStackFactory) {
        assertIsGreaterThanOrEqual(size, 1);

        this._size = size;
        this._itemStacks = [];
        this._itemStackFactory = itemStackFactory;

        let index = 0;
        while (index < this._size) {
            this._itemStacks.push(null);
            ++index;
        }
    }

    addItem(item: Item, count: unsigned): unsigned {
        assertIsInstanceOf(item, Item);
        assertIsGreaterThanOrEqual(count, 1);

        let currentCount = count;
        for (let i = 0; i < this._itemStacks.length; i++) {
            if (currentCount <= 0) {
                break;
            }

            if (!this._itemStacks[i]) {
                let itemStackCount = currentCount >= item.stackSize ? item.stackSize : currentCount;
                currentCount -= itemStackCount;
                this._itemStacks[i] = this._itemStackFactory.create(item, itemStackCount);
            } else if (!this._itemStacks[i].isFull()) {
                let flawCount = this._itemStacks[i].flawCount();
                let itemStackCount = currentCount <= flawCount ? currentCount : flawCount;
                currentCount -= itemStackCount;
                this._itemStacks[i].add(itemStackCount);
            }

            // if (this._itemStacks[i].isFull()) {
            //     continue;
            // }
            //
            // let flawCount = this._itemStacks[i].flawCount();
            // if (currentCount <= flawCount) {
            //     this._itemStacks[i].add(currentCount);
            //     currentCount = 0;
            // } else {
            //     this._itemStacks[i].add(flawCount);
            //     currentCount -= flawCount;
            // }
        }
        // let slotsWithItem = this.getItemStorageSlotComponentsWithItem(item);
        // let freeSlots = this.getFreeItemStorageSlotComponents();
        // while (currentCount > 0) {
        //     //Сначала заполняет не полные стеки.
        //     for (let i = 0; i < this._itemStacks.length; i++) {
        //         console.log(this._itemStacks[i]);
        //         if (!this._itemStacks[i]) {
        //             continue;
        //         }
        //
        //         if (this._itemStacks[i].isFull()) {
        //             continue;
        //         }
        //
        //         let flawCount = this._itemStacks[i].flawCount();
        //         if (currentCount <= flawCount) {
        //             this._itemStacks[i].add(currentCount);
        //             currentCount = 0;
        //         } else {
        //             this._itemStacks[i].add(flawCount);
        //             currentCount -= flawCount;
        //         }
        //     }
        //
        //     // if (currentCount > 0) {
        //     //     if (!freeSlots.length) {
        //     //         break;
        //     //     }
        //     //
        //     //     for (let j = 0; j < freeSlots.length; j++) {
        //     //         let stackSize = currentCount <= item.stackSize ? currentCount : item.stackSize;
        //     //         freeSlots[j].placeItemStack(this._itemStackFactory.create(item, stackSize));
        //     //         currentCount -= stackSize;
        //     //         if (currentCount <= 0) {
        //     //             break;
        //     //         }
        //     //     }
        //     //     break;
        //     //     // currentCount = -1;
        //     // }
        // }

        EventSystem.event(ItemStorageComponentEventCode.Update, this);

        return currentCount;
    }

    removeItem(item: Item, count: unsigned): unsigned {
        return undefined;
    }
}