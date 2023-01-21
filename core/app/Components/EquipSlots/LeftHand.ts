import EquipSlotInterface, {
    EquipSlotInterfaceRender,
    EquipSlotInterfaceRenderCallback
} from '../../Interfaces/EquipSlotInterface.js';
import Item from '../../Entities/Item.js';
import DefaultEquipSlot from './DefaultEquipSlot.js';
import {EquipSlotID} from '../../../types/enums/EquipSlotID.js';
import AverageItemLevel from '../AverageItemLevel.js';
import ItemStorageInterface from '../../Interfaces/ItemStorageInterface.js';
import ItemCharacterAttributeCollector from '../ItemCharacterAttributeCollector.js';

export default class LeftHand implements EquipSlotInterface {
    private _equipSlot: EquipSlotInterface
    private _isBlock: boolean

    constructor(averageItemLevel: AverageItemLevel, itemCharacterAttributeCollector: ItemCharacterAttributeCollector) {
        this._equipSlot = new DefaultEquipSlot(EquipSlotID.LeftHand, averageItemLevel, itemCharacterAttributeCollector);
        this._isBlock = false;
    }

    equip(item: Item): boolean {
        return this._equipSlot.equip(item);
    }

    clear(): boolean {
        return this._equipSlot.clear();
    }

    moveTo(itemStorage: ItemStorageInterface): boolean {
        return this._equipSlot.moveTo(itemStorage);
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