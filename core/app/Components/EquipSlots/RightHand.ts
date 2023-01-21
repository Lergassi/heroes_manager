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

    clear(): boolean {
        this._leftHand.unblock();

        return this._equipSlot.clear();
    }

    moveTo(itemStorage: ItemStorageInterface): boolean {
        if (!this._equipSlot.moveTo(itemStorage)) return false;

        return this.clear();
    }

    isFree(): boolean {
        return this._equipSlot.isFree();
    }

    view(logger) {
        this._equipSlot.view(logger);
    }

    render(callback: EquipSlotInterfaceRenderCallback): void {
        this._equipSlot.render(callback);
    }

    removeRender(callback: EquipSlotInterfaceRenderCallback): void {
        this._equipSlot.removeRender(callback);
    }

    updateUI(): void {
        this._equipSlot.updateUI();
    }

    renderByRequest(ui: EquipSlotInterfaceRender): void {
        this._equipSlot.renderByRequest(ui);
    }
}