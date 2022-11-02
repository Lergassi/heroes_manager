import Item from '../Entities/Item.js';
import {unsigned} from '../../types/main.js';
import {ItemID} from '../../types/enums/ItemID.js';

export default interface GathererInterface {
    // gather(gatheringPoint): void;
    add(item: Item, count: unsigned): unsigned;
}