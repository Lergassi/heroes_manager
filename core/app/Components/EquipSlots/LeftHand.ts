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

    clear(): void {
        this._equipSlot.clear();
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

    renderByRequest(ui: EquipSlotInterfaceRender): void {
        this._equipSlot.renderByRequest(ui);
    }

    debug(): void {
        this._equipSlot.debug();
    }
}