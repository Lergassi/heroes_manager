import _ from 'lodash';
import debug from 'debug';
import ItemStorageInterface from '../../Interfaces/ItemStorageInterface.js';
import Item from '../../Entities/Item.js';
import {unsigned} from '../../../types/main.js';
import {assertIsGreaterThanOrEqual, assertNotNil} from '../../../source/assert.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import ItemStackControllerInterface from '../../Interfaces/ItemStackControllerInterface.js';
import AppError from '../../../source/Errors/AppError.js';
import Viewer from '../../../source/Viewer.js';
import {ItemID} from '../../../types/enums/ItemID.js';

// export default class InfinityItemStackController implements ItemStackControllerInterface {
export default class InfinityItemStackController {
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

        if (!this._item) {
            this._item = item;
        }

        this._count += count;

        return 0;
    }

    moveTo(itemStorage: ItemStorageInterface): void {
        throw AppError.notImplements();
    }

    removeItem(ID: ItemID, count: number): number {
        if (!this.containItem(ID)) return 0;
        if (count <= 0) return 0;   //todo: Или исключение?

        let reminder = 0;
        if (this._count >= count) {
            this._count -= count;
            reminder = count;
        } else {
            reminder = this._count;
            this._count = 0;
        }

        return reminder;
    }

    containItem(ID: ItemID): number {
        return !_.isNil(this._item) && this._item.id === ID ? this._count : 0;
    }

    canAddItem(item: Item, count: number): number {
        return count;
    }
}