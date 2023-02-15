import EquipSlotInterface, {
    EquipSlotInterfaceRender,
    EquipSlotInterfaceRenderCallback
} from '../../Interfaces/EquipSlotInterface.js';
import Item from '../../Entities/Item.js';
import LeftHand from './LeftHand.js';
import DefaultEquipSlot from './DefaultEquipSlot.js';
import {assertNotNil} from '../../../source/assert.js';
import {EquipSlotID} from '../../../types/enums/EquipSlotID.js';
import AverageItemLevel from '../AverageItemLevel.js';
import ItemStorageInterface from '../../Interfaces/ItemStorageInterface.js';
import ItemCharacterAttributeCollector from '../ItemCharacterAttributeCollector.js';

export default class RightHand implements EquipSlotInterface {
    private readonly _equipSlot: EquipSlotInterface;
    private readonly _leftHand: LeftHand;

    constructor(leftHand: LeftHand, averageItemLevel: AverageItemLevel, itemCharacterAttributeCollector: ItemCharacterAttributeCollector) {
        assertNotNil(leftHand);

        this._leftHand = leftHand;
        this._equipSlot = new DefaultEquipSlot(EquipSlotID.RightHand, averageItemLevel, itemCharacterAttributeCollector);
    }

    equip(item: Item): boolean {
        return this._equipSlot.equip(item);
    }

    clear(): void {
        this._leftHand.unblock();

        this._equipSlot.clear();
    }

    moveTo(itemStorage: ItemStorageInterface): boolean {
        if (!this._equipSlot.moveTo(itemStorage)) return false;

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