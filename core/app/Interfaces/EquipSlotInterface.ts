import Item from '../Entities/Item.js';
import {UI_ItemCount, unsigned} from '../../types/main.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import ItemStorageInterface from './ItemStorageInterface.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';

export type EquipSlotInterfaceRenderCallback = (ID: EquipSlotID, item: Item | undefined) => void;

export interface EquipSlotInterfaceRender {
    /**
     * item будет в виде стека. Чтобы не делать отдельной логики.
     * @param ID
     * @param item
     */
    updateEquipSlot?(ID: EquipSlotID, item: UI_ItemCount): void;
}

// export type EquipSlotInterfaceRender = {
//     /**
//      * item будет в виде стека. Чтобы не делать отдельной логики.
//      * @param ID
//      * @param item
//      */
//     updateSlot?: (ID: EquipSlotID, item: UI_ItemCount) => void;
// }

export default interface EquipSlotInterface {
    // equip(itemStack: ItemStack): void;
    equip(item: Item): boolean; /*todo: Добавить ItemID.*/
    // equipFrom(item: Item): boolean; /*todo: Добавить ItemID.*/

    // /**
    //  * @deprecated
    //  * @param item
    //  * @param count
    //  * @param itemStackFactory
    //  */
    // createItemStack(item: Item, count: unsigned, itemStackFactory: ItemStackFactory): void;
    clear(): void;
    moveTo(itemStorage: ItemStorageInterface): boolean;
    isFree(): boolean;
    // // moveTo(target: ItemSlotInterface): void;
    renderByRequest(ui: EquipSlotInterfaceRender): void;
}