import _ from 'lodash';
import debug from 'debug';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import Item from '../Entities/Item.js';
import {unsigned} from '../../types/main.js';
import {assertIsGreaterThanOrEqual, assertNotNil} from '../../source/assert.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ItemStackControllerInterface from '../Interfaces/ItemStackControllerInterface.js';
import AppError from '../../source/Errors/AppError.js';

// export default class ItemStackController implements ItemStorageInterface {
export default class ItemStackController implements ItemStackControllerInterface {
    private _item: Item;
    private _count: unsigned;

    private _callbacks;

    constructor() {
        this._item = null;  //todo: Далее тут может быть ItemStack без ограничений через композицию.
        this._count = null;

        this._callbacks = [];
    }

    addItem(item: Item, count: unsigned): unsigned {
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

        for (let i = 0; i < this._callbacks.length; i++) {
            this._callbacks[i]();
        }

        return count;
    }

    moveTo(itemStorage: ItemStorageInterface): void {
        throw AppError.notImplements();
    }

    show() {
        // debug(DebugNamespaceID.Debug)('%j', {item: this._item?.id ?? '', count: this._count});
        //todo: Группировка явно лишняя в браузере.
        debug(DebugNamespaceID.Debug)('%j', this._item ? {item: this._item.id, count: this._count} : 'пусто');
    }

    attach(callback: any) {
        this._callbacks.push(callback);
    }
}