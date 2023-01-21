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
    addItem(item: Item | ItemID, count: unsigned): unsigned {
        assertIsGreaterThanOrEqual(count, 0);

        return 0;
    }

    moveTo(itemStorage: ItemStorageInterface): void {
        throw AppError.notImplements();
    }

    removeItem(ID: ItemID, count: number): number {
        assertIsGreaterThanOrEqual(count, 0);

        return count;
    }

    containItem(ID: ItemID): number {
        return 2147483647;
    }

    canAddItem(item: Item, count: number): number {
        return count;
    }

    renderByRequest(ui: ItemStorageInterfaceRender): void {
        throw AppError.notImplements();
    }
}