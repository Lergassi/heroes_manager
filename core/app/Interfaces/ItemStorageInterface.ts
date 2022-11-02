import Item from '../Entities/Item.js';
import {unsigned} from '../../types/main.js';

/**
 * Для сумки и коллекции сумок.
 */
export default interface ItemStorageInterface {
    /**
     *
     * @param item
     * @param count
     * @return Остаток.
     */
    addItem(item: Item, count: unsigned): unsigned;

    // /**
    //  *
    //  * @param item
    //  * @param count Кол-во не удаленных предметов.
    //  */
    // removeItem(item: Item, count: unsigned): unsigned;

    // totalItemCount(item: Item): boolean;
    // containsItem(item: Item): boolean;
    // containsItemCount(item: Item, count: unsigned): boolean;
    // takeItem(item: Item, count: unsigned): boolean;
    // hasFreeSlot(): boolean;
    // moveTo(itemStorage: ItemStorageInterface);
}