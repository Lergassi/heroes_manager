import Item from '../Entities/Item.js';

export default interface ShopConfigInterface {
    addPosition(item: Item, count: number, price: number);
    // removePosition(index: number);
}