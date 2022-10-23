import Item from '../Entities/Item.js';
import {unsigned} from '../types.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';

export default interface EquipSlotInterface {
    /**
     * @deprecated Пока не понятно от куда будет экипировка, так как сумки будут переделаны. Очищать источник экипировки вручную.
     * @param itemStack
     */
    equip(itemStack: ItemStack): void;
    createItemStack(item: Item, count: unsigned, itemStackFactory: ItemStackFactory): void;
    clear(): void;
    isFree(): boolean;
    render(callback: (values: {item: Item}) => void);
    // moveTo(target: ItemSlotInterface): void;
}