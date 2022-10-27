import {unsigned} from '../../types/main.js';
import Item from '../Entities/Item.js';

export default interface AddItemInterface {
    /**
     * @param item
     * @param count Остаток.
     */
    addItem(item: Item, count: unsigned): unsigned;
    moveItemsTo(target: AddItemInterface): void;
}