import {ItemID} from '../../../types/enums/ItemID.js';
import EquipSlotInterface, {EquipSlotInterfaceRender,} from '../../Interfaces/EquipSlotInterface.js';
import CharacterAttributeManager from '../CharacterAttributeManager.js';
import LeftHand from './LeftHand.js';
import DefaultEquipSlot from './DefaultEquipSlot.js';
import {assertNotNil} from '../../../source/assert.js';
import {EquipSlotID} from '../../../types/enums/EquipSlotID.js';
import AverageItemLevel from '../AverageItemLevel.js';
import ItemStorageInterface from '../../Interfaces/ItemStorageInterface.js';

export default class RightHand implements EquipSlotInterface {
    private readonly _equipSlot: EquipSlotInterface;
    private readonly _leftHand: LeftHand;

    constructor(leftHand: LeftHand, averageItemLevel: AverageItemLevel, characterAttributeManager: CharacterAttributeManager) {
        assertNotNil(leftHand);

        this._leftHand = leftHand;
        this._equipSlot = new DefaultEquipSlot(EquipSlotID.RightHand, averageItemLevel, characterAttributeManager);
    }

    equip(itemID: ItemID, itemStorage?: ItemStorageInterface): boolean {
        return this._equipSlot.equip(itemID, itemStorage);
    }

    clear(): void {
        this._leftHand.unblock();

        this._equipSlot.clear();
    }

    removeEquipTo(itemStorage: ItemStorageInterface): boolean {
        if (!this._equipSlot.removeEquipTo(itemStorage)) return false;

        this.clear();

        return true;
    }

    isFree(): boolean {
        return this._equipSlot.isFree();
    }

    renderByRequest(ui: EquipSlotInterfaceRender): void {
        this._equipSlot.renderByRequest(ui);
    }

    debug(): void {
        this._equipSlot.debug();
    }
}