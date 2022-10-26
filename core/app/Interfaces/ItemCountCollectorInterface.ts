import Item from '../Entities/Item.js';
import {unsigned} from '../../types/types.js';

//todo: Заготовка.
export default interface ItemCountCollectorInterface {
    addItem(item: Item, count: unsigned): unsigned;
    removeItem(item: Item, count: unsigned): unsigned;
    itemCount(item: Item): unsigned;
    hasItem(item: Item): boolean;
    hasItemCount(item: Item, count: unsigned): boolean;
}