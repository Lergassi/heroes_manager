import _ from 'lodash';
import debug from 'debug';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import Item from '../Entities/Item.js';
import {unsigned} from '../../types/main.js';
import {assertIsGreaterThanOrEqual, assertNotNil} from '../../source/assert.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ItemStackControllerInterface, {
    ItemStackControllerInterfaceRender
} from '../Interfaces/ItemStackControllerInterface.js';
import AppError from '../../source/Errors/AppError.js';
import Viewer from '../../source/Viewer.js';
import {ItemID} from '../../types/enums/ItemID.js';

export default class ItemStackController implements ItemStackControllerInterface {
    private _item: Item;
    /**
     * Если значение равно нулю, на рендер отдается null.
     * @private
     */
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

    moveTo(target: ItemStorageInterface): void {
        if (this.isFree()) return;

        let reminder = this._count - target.addItem(this._item, this._count);
        this.removeItem(<ItemID>this._item.id, reminder);
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

    totalItem(ID: ItemID): number {
        return (this._item && !_.isNil(ID) && this._item.id === ID) ? this._count : 0;
    }

    removeItem(ID: ItemID, count: number): number {
        if (!this.totalItem(ID)) return 0;
        if (count <= 0) return 0;   //todo: Или исключение?

        let reminder = count;
        if (this._count >= count) {
            this._count -= count;

            reminder = count;
        } else {
            reminder = this._count;
            this._count = null; //Или ноль?
        }

        if (this._count <= 0) {
            this._item = null;
        }

        return reminder;
    }

    containItem(ID: ItemID): number {
        return !_.isNil(this._item) && this._item.id === ID ? this._count : 0;
    }

    isFree(): boolean {
        return _.isNil(this._item);
    }

    canAddItem(item: Item, count: number): number {
        if (!this._item) return item.stackSize >= count ? 0 : count - item.stackSize;
        if (this._item && this._item !== item) return count;

        let reminder = this._item.stackSize - this._count;

        return reminder >= count ? 0 : count - reminder;
    }

    renderByRequest(ui: ItemStackControllerInterfaceRender): void {
        ui.updateItem(this._item ? this._item.id : undefined, this._count > 0 ? this._count : null);
    }
}