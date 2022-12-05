import _ from 'lodash';
import debug from 'debug';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import ItemStackController from './ItemStackController.js';
import InfinityItemStackController from './InfinityItemStackController.js';
import Item from '../Entities/Item.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {unsigned} from '../../types/main.js';
import AppError from '../../source/Errors/AppError.js';

/**
 * Не стекуемые предметы тоже объединяются. Пока на них нету баффов и других эффектов.
 */
export default class InfinityItemStorage implements ItemStorageInterface {
    private _items: Partial<{[ID in ItemID]: InfinityItemStackController}>;

    constructor() {
        this._items = {};
    }

    addItem(item: Item, count: unsigned): unsigned {
        if (!this.containItem(<ItemID>item.id, 1)) {
            this._items[<ItemID>item.id] = new InfinityItemStackController();
        }

        this._items[<ItemID>item.id].addItem(item, count);

        return 0;
    }

    containItem(ID: ItemID, count: number): boolean {
        return this._items.hasOwnProperty(ID) && this._items[ID].containItem(ID, count);
    }

    moveTo(itemStorage: ItemStorageInterface): void {
        throw AppError.notImplements();
    }

    removeItem(ID: ItemID, count: number): number {
        if (!this.containItem(ID, count)) return 0;

        let originCount = count;
        count -= this._items[ID].removeItem(ID, count);
        if (!this._items[ID].containItem(ID, 1)) {
            delete this._items[ID];
        }

        return originCount - count;
    }
}