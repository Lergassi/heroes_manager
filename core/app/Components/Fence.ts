import _ from 'lodash';
import debug from 'debug';
import Item from '../Entities/Item.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {assertIsGreaterThanOrEqual, assertIsInteger, assertNotNil} from '../../source/assert.js';

export default class Fence {
    private readonly _items: Partial<{[ID in ItemID]: {price: number}}>;
    // private readonly _buyBackItems: {item: Item, count: number, totalPrice: number}[];
    // private readonly _maxBuyBackItems: number;

    constructor() {
        this._items = {};
        // this._buyBackItems = [];
        // this._maxBuyBackItems = 10;
    }

    config(item: Item, price: number) {
        assertNotNil(item);
        assertIsInteger(price);

        if (!this._items.hasOwnProperty(item.id)) {
            this._items[item.id] = {};
        }

        this._items[<ItemID>item.id].price = price;
    }

    sell(item: Item, count: number, wallet: WalletInterface, itemStorage: ItemStorageInterface): void {
        assertNotNil(item);

        assertIsInteger(count);
        assertIsGreaterThanOrEqual(count, 1);

        assertNotNil(wallet);
        assertNotNil(itemStorage);

        if (!this._items.hasOwnProperty(item.id)) {
            debug(DebugNamespaceID.Log)('Данный предмет нельзя продать скупщику.');
            return;
        }

        if (itemStorage.containItem(<ItemID>item.id) < count) {
            debug(DebugNamespaceID.Log)('Недостаточно предметов.');
            return;
        }

        let totalPrice = count * this._items[item.id].price;
        itemStorage.removeItem(<ItemID>item.id, count);
        wallet.add(totalPrice);
        debug(DebugNamespaceID.Log)('Предмет продан.');
        // this._addToBuyBack(item, count, totalPrice);
    }

    // private _addToBuyBack(item: Item, count: number, totalPrice: number): number {
    //     if (this._buyBackItems.length >= this._maxBuyBackItems) {
    //         this._buyBackItems.shift();
    //     }
    //
    //     return this._buyBackItems.push({item: item, count: count, totalPrice: totalPrice});
    // }
    //
    // buyBack(position: number, wallet: WalletInterface, itemStorage: ItemStorageInterface) {
    //
    // }
}