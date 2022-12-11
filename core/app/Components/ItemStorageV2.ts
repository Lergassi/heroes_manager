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
import Viewer from '../../source/Viewer.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {ComponentID} from '../../types/enums/ComponentID.js';

interface ItemStorageUIInterface {
    readSlot(callback);
    updateSlot(callback);
    // readSlot2(): {item, count, ...};
    setUpdateHandler(callback);
}

// export interface ItemStorageV2Events {
//
// }

export default class ItemStorageV2 implements ItemStorageInterface {
    private readonly _size: number;
    private readonly _itemStackControllers: ItemStackController[];

    constructor(size: number) {
        assertIsGreaterThanOrEqual(size, 1);
        // this._itemStackControllers = itemStackControllers;
        // this._size = itemStackControllers.length;

        this._size = size;
        this._itemStackControllers = [];
        for (let i = 0; i < this._size; i++) {
            this._itemStackControllers.push(new ItemStackController());
        }
    }

    addItem(item: Item, count: unsigned): unsigned {
        // assertNotNil(item);
        // assertIsGreaterThanOrEqual(count, 0);

        // if (count === 0) return 0;

        let originCount = count;
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            count = this._itemStackControllers[i].addItem(item, count);
            // this._onChange(index, this._item, this._count);
        }

        if (originCount !== count) {
            debug(DebugNamespaceID.Log)(sprintf('Добавлено предметов "%s" %s из %s.', item.name, originCount - count, originCount));
        }

        //todo: Можно ввести уровень сообщений.
        // debug(DebugNamespaceID.Log)(sprintf('Добавлено предметов "%s" %s из %s.', item.name, originCount - count, originCount));
        // this._updateHandler?.(this._itemStackControllers);
        // for (let i = 0; i < this._handlers.length; i++) {
        //     this._handlers[i].updateSlotHandler();
        // }

        return count;
    }

    moveTo(target: ItemStorageInterface): void {
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            this._itemStackControllers[i].moveTo(target);
        }
    }

    show() {
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            // let str = 'i: {...}';
            this._itemStackControllers[i].show();
        }
    }

    _handlers = [];

    /*
        Вариант: передать сюда 20 (50, 100, ...) методов отслеживания на каждый слот.
     */
    // attach<asd>(ui /*: ItemStorageUI*/) {
    attach(handlers: {
        updateHandler: any,
    }) {
        /*
            render(target)
            render(slots[])
            for (let i = 0; i < this._itemStackControllers.length; i++) {
                //ui.updateSlot(i, this._itemStackControllers[i].item, this._itemStackControllers[i].count); //с геттерами

                this._itemStackControllers[i].attach((item, count) => {
                    ui.updateSlot(i, item, count);
                })
            }
         */
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            let index = i;
            this._itemStackControllers[i].attach({
                updateHandler: (item, count) => {
                    handlers.updateHandler(index, item, count);
                },
            });
        }
    }

    view(viewer: Viewer) {
        let rows: string[] = [];
        // for (let i = 0; i < this._itemStackControllers.length; i++) {
        //     this._itemStackControllers[i].view2((item: Item, count: number) => {
        //         console.log(item, count);
        //         if (item) {
        //             rows.push(sprintf('%s: %s - %s', i, item.name, count));
        //         } else {
        //             rows.push(sprintf('%s: пусто', i));
        //         }
        //     });
        // }
        console.log(rows);
    }

    view2(callback: (data: {
        index: number,
        itemID: string,
        count: number,
    }) => void) {
        let rows: string[] = [];
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            this._itemStackControllers[i].view2((data) => {
                callback({
                    index: i,
                    itemID: data.itemID,
                    count: data.count,
                });
            });
        }
    }

    totalItem(ID: ItemID): number {
        let total = 0;
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            total += this._itemStackControllers[i].totalItem(ID);
        }

        return total;
    }

    removeItem(ID: ItemID, count: number): number {
        let originCount = count;
        for (let i = this._itemStackControllers.length - 1; i >= 0; i--) {
            count -= this._itemStackControllers[i].removeItem(ID, count);
            if (count <= 0) break;
        }
        let removeItemsCount = originCount - count;
        debug(DebugNamespaceID.Log)(sprintf('Удалено предметов "%s": %s из %s.', ID, removeItemsCount, originCount));

        return removeItemsCount;
    }

    containItem(ID: ItemID): number {
        let count = 0;
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            count += this._itemStackControllers[i].containItem(ID);
        }

        return count;
    }

    canAddItem(item: Item, count: number): number {
        let reminder = count;
        for (let i = 0; i < this._itemStackControllers.length; i++) {
            reminder = this._itemStackControllers[i].canAddItem(item, reminder);
        }

        return reminder;
    }
}