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

    private readonly _callbacks;

    constructor(ID: EquipSlotID, averageItemLevel: AverageItemLevel, itemAttributeCollectionComponent: ItemCharacterAttributeCollector) {
        this._ID = ID;
        this._item = null;
        this._averageItemLevel = averageItemLevel;
        this._itemAttributeCollectionComponent = itemAttributeCollectionComponent;

        this._callbacks = [];
    }

    equip(item: Item): boolean {
        if (!this.canEquip(item)) return false;

        this._item = item;
        this._averageItemLevel.addItem(item);
        this._itemAttributeCollectionComponent.addItem(item);
        debug(DebugNamespaceID.Log)('Предмет экипирован.');

        this.updateUI();

        return true;
    }

    clear(): boolean {
        if (!this.canClear()) return false;

        this._averageItemLevel.removeItem(this._item);
        this._itemAttributeCollectionComponent.removeItem(this._item);
        this._item = null;
        EventSystem.event(EquipSlotComponentEventCode.DestroyItemStack, this);
        debug(DebugNamespaceID.Log)('Слот экипировки очищен.');

        this.updateUI();

        return true;
    }

    moveTo(itemStorage: ItemStorageInterface): boolean {
        if (itemStorage.addItem(this._item, 1) !== 0) {
            return false;
        }

        this.clear();

        this.updateUI();

        return true;
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

    view(logger) {
        logger(DebugNamespaceID.Info)(DebugFormatterID.Json, {
            ID: this._ID,
            item: _.isNil(this._item) ? null : this._item.id,
        });
    }

    render(callback: EquipSlotInterfaceRenderCallback): void {
        if (!_.includes(this._callbacks, callback)) {
            this._callbacks.push(callback);
        }
        this.updateUI();
    }

    removeRender(callback: EquipSlotInterfaceRenderCallback): void {
        _.pull(this._callbacks, callback);
    }

    updateUI() {
        for (let i = 0; i < this._callbacks.length; i++) {
            this._callbacks[i](this._ID, this._item);
        }
    }

    renderByRequest(ui: EquipSlotInterfaceRender): void {
        ui.updateEquipSlot?.(this._ID, this._item ? {itemName: this._item.id, count: 1} : {itemName: undefined, count: undefined});
    }
}