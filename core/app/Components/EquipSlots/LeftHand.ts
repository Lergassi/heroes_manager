import {ItemID} from '../../../types/enums/ItemID.js';
import EquipSlotInterface, {EquipSlotInterfaceRender,} from '../../Interfaces/EquipSlotInterface.js';
import CharacterAttributeManager from '../CharacterAttributeManager.js';
import DefaultEquipSlot from './DefaultEquipSlot.js';
import {EquipSlotID} from '../../../types/enums/EquipSlotID.js';
import AverageItemLevel from '../AverageItemLevel.js';
import ItemStorageInterface from '../../Interfaces/ItemStorageInterface.js';

export default class LeftHand implements EquipSlotInterface {
    private _equipSlot: EquipSlotInterface
    private _isBlock: boolean

    constructor(averageItemLevel: AverageItemLevel, characterAttributeManager: CharacterAttributeManager) {
        this._equipSlot = new DefaultEquipSlot(EquipSlotID.LeftHand, averageItemLevel, characterAttributeManager);
        this._isBlock = false;
    }

    equip(itemID: ItemID, itemStorage?: ItemStorageInterface): boolean {
        return this._equipSlot.equip(itemID, itemStorage);
    }

    clear(): void {
        this._equipSlot.clear();
    }

    removeEquipTo(itemStorage: ItemStorageInterface): boolean {
        return this._equipSlot.removeEquipTo(itemStorage);
    }

    isFree(): boolean {
        return this._equipSlot.isFree();
    }

    block() {
        this._isBlock = true;
    }

    unblock() {
        this._isBlock = false;
    }

    renderByRequest(ui: EquipSlotInterfaceRender): void {
        this._equipSlot.renderByRequest(ui);
    }

    debug(): void {
        this._equipSlot.debug();
    }
}