import Item from '../Entities/Item.js';
import {unsigned} from '../../types/main.js';
import {ItemID} from '../../types/enums/ItemID.js';

export default interface ItemPackInterface {
    // item: Item | ItemID;
    item: ItemID;
    count: unsigned;
}