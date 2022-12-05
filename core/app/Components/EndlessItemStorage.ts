import _ from 'lodash';
import debug from 'debug';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import Item from '../Entities/Item.js';
import {unsigned} from '../../types/main.js';
import {ItemID} from '../../types/enums/ItemID.js';
import AppError from '../../source/Errors/AppError.js';
import {assertIsGreaterThanOrEqual} from '../../source/assert.js';

export default class EndlessItemStorage implements ItemStorageInterface {
    addItem(item: Item, count: unsigned): unsigned {
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

    containItem(ID: ItemID, count: number): boolean {
        assertIsGreaterThanOrEqual(count, 0);
        if (count <= 0) return false;

        return true;
    }
}