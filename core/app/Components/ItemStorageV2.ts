import _ from 'lodash';
import debug from 'debug';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import Item from '../Entities/Item.js';
import {unsigned} from '../../types/main.js';
import ItemStackController from './ItemStackController.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';
import {assertIsGreaterThanOrEqual, assertNotNil} from '../../source/assert.js';
import AppError from '../../source/Errors/AppError.js';

export default class ItemStorageV2 implements ItemStorageInterface {
    private readonly _size: number;
    private readonly _itemStackControllers: ItemStackController[];

    private _callbacks;

    // constructor(itemStackControllers: ItemStackController[]) {
    constructor(size: number) {
        assertIsGreaterThanOrEqual(size, 1);
        // this._itemStackControllers = itemStackControllers;
        // this._size = itemStackControllers.length;

        this._itemStackControllers = [];
        for (let i = 0; i < size; i++) {
            this._itemStackControllers.push(new ItemStackController());
        }

        this._callbacks = [];
    }

    addItem(item: Item, count: unsigned): unsigned {
        // assertNotNil(item);
        // assertIsGreaterThanOrEqual(count, 0);

        // if (count === 0) return 0;

        let originCount = count;
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            count = this._itemStackControllers[i].addItem(item, count);
        }

        if (originCount !== count) {
            debug(DebugNamespaceID.Log)(sprintf('В сумку добавлено предметов %s %s из %s.', item.name, originCount - count, originCount));
        }

        // for (let i = 0; i < this._callbacks.length; i++) {
        //     this._callbacks[i]();
        // }
        //todo: Можно ввести уровень сообщений.
        // debug(DebugNamespaceID.Log)(sprintf('Добавлено предметов "%s" %s из %s.', item.name, originCount - count, originCount));

        return count;
    }

    moveTo(itemStorage: ItemStorageInterface): void {
        throw AppError.notImplements();
    }

    show() {
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            // let str = 'i: {...}';
            this._itemStackControllers[i].show();
        }
    }
}

class ItemStorageAsContainer {
    _slots;
    _itemStorage;
    _;

    constructor(slots) {
        this._ = {};
        // this._itemStorage = new ItemStorageV2(slots);
        this._itemStorage = new ItemStorageV2(20);
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