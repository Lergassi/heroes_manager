import Item from '../Entities/Item.js';
import {unsigned} from '../types.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';

export default interface EquipSlotInterface {
    // equip(itemStack: ItemStack): boolean;  //todo: Пока не понятно от куда будет экипировка, так как сумки будут переделаны.
    // createItemStack(item: Item, count: unsigned, itemStackFactory: ItemStackFactory): boolean;
    // destroyItemStack(): boolean;
    // // removeItemStack(itemStorage): void;
    // isFree(): boolean;
    /**
     * @deprecated
     * @param itemStack
     */
    equip(itemStack: ItemStack): void;  //todo: Пока не понятно от куда будет экипировка, так как сумки будут переделаны.
    createItemStack(item: Item, count: unsigned, itemStackFactory: ItemStackFactory): void;
    destroyItemStack(): void;
    // removeItemStack(itemStorage): void;
    isFree(): boolean;

    render(callback: (values: {item: Item}) => void);
}