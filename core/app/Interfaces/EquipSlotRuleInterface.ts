import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import {ItemID} from '../../types/enums/ItemID.js';

export default interface EquipSlotRuleInterface {
    canEquip(ID: EquipSlotID, itemID: ItemID): boolean;
}