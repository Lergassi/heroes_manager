import WalletInterface from './WalletInterface.js';
import Item from '../Entities/Item.js';
import ItemStorageInterface from './ItemStorageInterface.js';

export default interface ShopInterface {
    buy(position: number, wallet: WalletInterface, itemStorage: ItemStorageInterface);
    // sell(item: Item, count: number, itemStorage: ItemStorageInterface);
    // buyBack(position: number, wallet: WalletInterface, itemStorage: ItemStorageInterface);
}