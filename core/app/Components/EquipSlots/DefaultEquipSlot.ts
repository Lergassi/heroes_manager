import EquipSlotInterface, {
    EquipSlotInterfaceRender,
    EquipSlotInterfaceRenderCallback
} from '../../Interfaces/EquipSlotInterface.js';
import Item from '../../Entities/Item.js';
import {unsigned} from '../../../types/main.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import ItemStack from '../../RuntimeObjects/ItemStack.js';
import _ from 'lodash';
import EventSystem from '../../../source/EventSystem.js';
import {EquipSlotComponentEventCode} from '../EquipSlotComponent.js';
import AppError from '../../../source/Errors/AppError.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {DebugFormatterID} from '../../../types/enums/DebugFormatterID.js';
import {EquipSlotID} from '../../../types/enums/EquipSlotID.js';
import AverageItemLevel from '../AverageItemLevel.js';
import ItemStorageInterface from '../../Interfaces/ItemStorageInterface.js';
import ItemCharacterAttributeCollector from '../ItemCharacterAttributeCollector.js';

export default class DefaultEquipSlot implements EquipSlotInterface {
    private readonly _ID: EquipSlotID;
    private _item: Item;
    private readonly _averageItemLevel: AverageItemLevel;
    private readonly _itemAttributeCollectionComponent: ItemCharacterAttributeCollector;

    constructor(ID: EquipSlotID, averageItemLevel: AverageItemLevel, itemAttributeCollectionComponent: ItemCharacterAttributeCollector) {
        this._ID = ID;
        this._item = null;
        this._averageItemLevel = averageItemLevel;
        this._itemAttributeCollectionComponent = itemAttributeCollectionComponent;
    }

    equip(item: Item): boolean {
        if (!this.canEquip(item)) return false;

        this._item = item;
        this._averageItemLevel.addItem(item);
        this._itemAttributeCollectionComponent.addItem(item);
        debug(DebugNamespaceID.Log)('Предмет экипирован.');

        return true;
    }

    clear(): boolean {
        if (!this.canClear()) return false;

        this._averageItemLevel.removeItem(this._item);
        this._itemAttributeCollectionComponent.removeItem(this._item);
        this._item = null;
        EventSystem.event(EquipSlotComponentEventCode.DestroyItemStack, this);
        debug(DebugNamespaceID.Log)('Слот экипировки очищен.');

        return true;
    }

    moveTo(itemStorage: ItemStorageInterface): boolean {
        if (itemStorage.addItem(this._item, 1) !== 0) {
            return false;
        }

        return this.clear();
    }

    isFree(): boolean {
        return _.isNil(this._item);
    }

    canEquip(item: Item): boolean {
        if (!item.properties.equipable) {
            debug(DebugNamespaceID.Throw)('Предмет нельзя экипировать.');
            return false;
        }

        return true;
    }

    canClear(): boolean {
        if (this.isFree()) {
            debug(DebugNamespaceID.Throw)('Слот пустой.');
            return false;
        }

        return true;
    }

    renderByRequest(ui: EquipSlotInterfaceRender): void {
        ui.updateEquipSlot?.(this._ID, this._item ? {itemName: this._item.id, count: 1} : {itemName: undefined, count: undefined});
    }
}