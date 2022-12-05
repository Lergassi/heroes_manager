import Item from '../Entities/Item.js';
import {unsigned} from '../../types/main.js';
import {ItemID} from '../../types/enums/ItemID.js';

export default interface ItemStackBlankInterface {
    item: ItemID;
    count: number;
}