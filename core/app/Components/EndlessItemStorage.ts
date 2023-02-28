import _ from 'lodash';
import debug from 'debug';
import ItemStorageInterface, {ItemStorageInterfaceRender} from '../Interfaces/ItemStorageInterface.js';
import Item from '../Entities/Item.js';
import {unsigned} from '../../types/main.js';
import {ItemID} from '../../types/enums/ItemID.js';
import AppError from '../../source/Errors/AppError.js';
import {assertIsGreaterThanOrEqual} from '../../source/assert.js';

/**
 * @deprecated Неудачное решение.
 */
export default class EndlessItemStorage implements ItemStorageInterface {
    _addItem(item: Item | ItemID, count: unsigned): unsigned {
        assertIsGreaterThanOrEqual(count, 0);

        return 0;
    }

    moveAllItemsTo(itemStorage: ItemStorageInterface): void {
        throw AppError.notImplements();
    }

    removeItem(ID: ItemID, count: number): number {
        assertIsGreaterThanOrEqual(count, 0);

        return count;
    }

    containItem(ID: ItemID): number {
        return 2147483647;
    }

    canAddItem(itemID: ItemID, count: number): number {
        return count;
    }

    renderByRequest(ui: ItemStorageInterfaceRender): void {
        throw AppError.notImplements();
    }

    clear(index: number): void {
    }

    clearAllItems(): void {
    }

    hasItem(itemID: ItemID, count): boolean {
        return true;
    }

    debug(): void {
        throw AppError.notImplements();
    }

    isEmpty(): boolean {
        return false;
    }

    addItem(item: Item | ItemID, count: number): number {
        return 0;
    }
}