import _ from 'lodash';
import debug from 'debug';
import WalletInterface from '../Interfaces/WalletInterface.js';
import Item from '../Entities/Item.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import ShopBuilder from '../Builders/ShopBuilder.js';
import ShopInterface from '../Interfaces/ShopInterface.js';
import ShopConfigInterface from '../Interfaces/ShopConfigInterface.js';
import ItemPack from './ItemPack.js';
import {
    assert,
    assertIsGreaterThanOrEqual,
    assertIsNumber,
    assertIsPositive,
    assertNotNil
} from '../../source/assert.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';

// type ShopPosition = {
//     item: Item;
//     count: number;
//     price: number;
// };
//
// type ShopPositionConfig = {
//     item: Item;
//     count: number;
//     price: number;
// };

/**
 * Покупки настраиваются на каждую позицию.
 * Продать можно любой предмет. Цена продажи одинаковая.
 */
// export default class Shop implements ShopInterface, ShopConfigInterface {
export default class Shop {
    private readonly _positions: {item: Item, price: number}[];

    constructor() {
        this._positions = [];
    }

    buy(position: number, count: number, wallet: WalletInterface, itemStorage: ItemStorageInterface): void {
        // assertIsPositive(position);
        // assertNotNil(this._positions[position], 'Позиция не найдена.');
        //
        // assertIsGreaterThanOrEqual(count, 1);
        // assert(_.isInteger(count));
        //
        // assertNotNil(wallet);
        // assertNotNil(itemStorage);
        //
        // let totalPrice = this._positions[position].price * count;
        //
        // if (wallet.value < totalPrice) {
        //     debug(DebugNamespaceID.Log)('Недостаточно денег.');
        //     return;
        // }
        //
        // if (itemStorage.canAddItem(this._positions[position].item, count) !== 0) {
        //     debug(DebugNamespaceID.Log)('Недостаточно места.');
        //     return;
        // }
        //
        // wallet.remove(totalPrice);
        // itemStorage._addItem(this._positions[position].item, count);
        // debug(DebugNamespaceID.Log)('Покупка совершена.');
    }

    config(item: Item, price: number): number {
        assertNotNil(price);
        assertIsPositive(price);

        return this._positions.push({item: item, price: price});
    }
}