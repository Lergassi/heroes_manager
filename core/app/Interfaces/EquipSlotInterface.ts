import {ItemID} from '../../types/enums/ItemID.js';
import {UI_ItemCount} from '../../types/main.js';
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