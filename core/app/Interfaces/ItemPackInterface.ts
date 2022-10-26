import Item from '../Entities/Item.js';
import {unsigned} from '../../types/types.js';

export default interface ItemPackInterface {
    item: Item;
    count: unsigned;
}