import _ from 'lodash';
import debug from 'debug';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import Item from '../Entities/Item.js';
import {unsigned} from '../../types/main.js';
import ItemStackController from './ItemStackController.js';

export default class ItemStorageV2 implements ItemStorageInterface {
    private readonly _size: number;
    private readonly _itemStackControllers: ItemStackController[];

    constructor(itemStackControllers: ItemStackController[]) {
        this._itemStackControllers = itemStackControllers;
        this._size = itemStackControllers.length;
    }

    addItem(item: Item, count: unsigned): unsigned {
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            count = this._itemStackControllers[i].addItem(item, count);
        }

        return count;
    }
}

class ItemStorageAsContainer {
    _slots;
    _itemStorage;
    _;

    constructor(slots) {
        this._ = {};
        this._itemStorage = new ItemStorageV2(slots);
        this._slots = slots;
        for (let i = 0; i < slots.length; i++) {
            this._[i] = slots;
        }
    }

    getSlot(id) {
        return this._[id];
    }
}

// class ItemStackStrategy {
//     _item;
//     _count;
//
//     addItem(item, count) {
//         //проверка на стеки
//     }
// }
//
// class ItemWithoutStackStrategy {
//     _item;
//     _count;
//
//     addItem(item, count) {
//         this._count += count;
//     }
// }
//
// class Slot {
//     constructor(strategy) {
//     }
// }