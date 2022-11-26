import _ from 'lodash';
import debug from 'debug';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import Item from '../Entities/Item.js';
import {unsigned} from '../../types/main.js';
import {assertIsGreaterThanOrEqual, assertNotNil} from '../../source/assert.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ItemStackControllerInterface from '../Interfaces/ItemStackControllerInterface.js';
import AppError from '../../source/Errors/AppError.js';
import Viewer from '../../source/Viewer.js';

export default class ItemStackController implements ItemStackControllerInterface {
    private _item: Item;
    private _count: unsigned;

    constructor() {
        this._item = null;  //todo: Далее тут может быть ItemStack без ограничений через композицию.
        this._count = null;
    }

    addItem(item: Item, count: unsigned, updateHandler?: any): unsigned {
        assertNotNil(item);
        assertIsGreaterThanOrEqual(count, 0);

        if (this._item && item !== this._item) {
            //@note: Возможно не надо возвращать ошибок. Метод называется addItem(), а не replace. Нужно заменить, поместить с заменой - это другая логика. Хотя для разработки можно оставить, а для игрока отключить.
            // debug(DebugNamespaceID.Throw)('ItemStackController занят другим предметом.');
            return count;
        }

        let flaw = 0;
        if (!this._item) {
            flaw = item.stackSize;
        } else {
            flaw = item.stackSize - this._count;
        }

        if (count <= flaw) {
            this._count += count;
            count = 0;
        } else {
            this._count += flaw;
            count -= flaw;
        }

        if (this._count > 0) {
            this._item = item;
        }

        /*
            this._updateHandlers(this._item, this._count);

            addCallback((item, count) => {
                    this.updateSlot(index, item, count);
            });
            removeCallback();
         */

        for (let i = 0; i < this._handlers.length; i++) {
            this._handlers[i].updateHandler(this._item, this._count);
        }

        return count;
    }

    _onChange;

    onChange(callback) {
        this._onChange = callback;
    }

    moveTo(itemStorage: ItemStorageInterface): void {
        throw AppError.notImplements();
    }

    show() {
        // debug(DebugNamespaceID.Debug)('%j', {item: this._item?.id ?? '', count: this._count});
        //todo: Группировка явно лишняя в браузере.
        debug(DebugNamespaceID.Debug)('%j', this._item ? {item: this._item.id, count: this._count} : 'пусто');
    }

    _handlers = [];

    attach(handlers: {
        updateHandler: Function,
    }) {
        this._handlers.push(handlers);
        // console.log(handlers);
        handlers.updateHandler(this._item, this._count);
    }

    detach() {}

    view(viewer: Viewer) {

    }

    view2(callback: (data: {
        itemID: string,
        count: number,
    }) => void) {
        if (this._item) {
            callback({
                itemID: this._item.id,
                count: this._count,
            });
        } else {
            callback({
                itemID: null,
                count: null,
            });
        }
    }
}