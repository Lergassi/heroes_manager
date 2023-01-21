import EquipSlotInterface, {
    EquipSlotInterfaceRender,
    EquipSlotInterfaceRenderCallback
} from '../../Interfaces/EquipSlotInterface.js';
import ItemCharacterAttributeCollector from '../ItemCharacterAttributeCollector.js';
import Item from '../../Entities/Item.js';
import {unsigned} from '../../../types/main.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import ItemStack from '../../RuntimeObjects/ItemStack.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import debug from 'debug';
import ItemStorageInterface from '../../Interfaces/ItemStorageInterface.js';

export default class EquipSlotWithItemCollectorDecorator implements EquipSlotInterface {
    private readonly _equipSlot: EquipSlotInterface;
    private readonly _itemAttributeCollectionComponent: ItemCharacterAttributeCollector;
    private _item: Item;

    constructor(equipSlot: EquipSlotInterface, itemAttributeCollectionComponent: ItemCharacterAttributeCollector) {
        this._equipSlot = equipSlot;
        this._itemAttributeCollectionComponent = itemAttributeCollectionComponent;
        this._item = null;
    }

    equip(item: Item): boolean {
        this._itemAttributeCollectionComponent.addItem(item);
        this._item = item;

        return this._equipSlot.equip(item);
    }

    clear(): boolean {
        if (!this._equipSlot.clear()) return false;

        this._itemAttributeCollectionComponent.removeItem(this._item);
        this._item = null;

        return true;
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