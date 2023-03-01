import {ItemID} from '../../types/enums/ItemID.js';
import Item from '../Entities/Item.js';
import {UI_ItemCount, unsigned} from '../../types/main.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import ItemStack from '../RuntimeObjects/ItemStack.js';
import ItemStorageInterface from './ItemStorageInterface.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';

export interface EquipSlotInterfaceRender {
    updateEquipSlot?(ID: EquipSlotID, item: UI_ItemCount): void;
}

export default interface EquipSlotInterface {
    equip(item: ItemID): boolean;
    // equipFrom(item: ItemID, itemStorage: ItemStorageInterface): boolean;
    // equipFrom(item: Item): boolean;
    clear(): void;
    removeEquipTo(itemStorage: ItemStorageInterface): boolean;
    isFree(): boolean;

    renderByRequest(ui: EquipSlotInterfaceRender): void;

    debug(): void;
}