import {unsigned} from '../../types/main.js';
import Item from '../Entities/Item.js';

/**
 * Может быть не обязательно только у сумок.
 */
export default interface AddItemInterface {
    /**
     * @param item
     * @param count Остаток.
     */
    addItem(item: Item, count: unsigned): unsigned;
    moveItemsTo(target: AddItemInterface): void;
}