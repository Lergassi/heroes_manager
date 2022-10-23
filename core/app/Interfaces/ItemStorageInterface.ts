import Item from '../Entities/Item.js';
import {unsigned} from '../types.js';

export default interface ItemStorageInterface {
    /**
     *
     * @param item
     * @param count Остаток.
     */
    addItem(item: Item, count: unsigned): unsigned;

    /**
     *
     * @param item
     * @param count Кол-во удаленных предметов.
     */
    removeItem(item: Item, count: unsigned): unsigned;

    /**
     * В том числе не stackable.
     * @param item
     */
    // totalItemCount(item: Item): boolean;
    // containsItem(item: Item): boolean;
    // containsItemCount(item: Item, count: unsigned): boolean;
    // takeItem(item: Item, count: unsigned): boolean;
    // hasFreeSlot(): boolean;
}