import {unsigned} from '../types.js';
import Item from './Item.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';

export default class ItemKit {
    constructor(items: [{item: Item, count: unsigned}]) {

    }

    // create(itemStackFactory: ItemStackFactory, itemStorageManager: ItemStorageManager) {
    //     itemStorageManager.addItem()
    // }
}