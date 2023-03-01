import {sprintf} from 'sprintf-js';
import {database} from '../../../data/ts/database.js';
import {ItemID} from '../../../types/enums/ItemID.js';
import EquipSlotInterface, {
    EquipSlotInterfaceRender,
} from '../../Interfaces/EquipSlotInterface.js';
import Item from '../../Entities/Item.js';
import {unsigned} from '../../../types/main.js';
import ItemStackFactory from '../../Factories/ItemStackFactory.js';
import EquipSlotRuleInterface from '../../Interfaces/EquipSlotRuleInterface.js';
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
    private _itemID: ItemID;
    private readonly _averageItemLevel: AverageItemLevel;
    private readonly _itemAttributeCollectionComponent: ItemCharacterAttributeCollector;
    private readonly _rules: EquipSlotRuleInterface[];

    constructor(
        ID: EquipSlotID,
        averageItemLevel: AverageItemLevel,
        itemAttributeCollectionComponent: ItemCharacterAttributeCollector,
        rules: EquipSlotRuleInterface[] = [],
    ) {
        this._ID = ID;
        this._itemID = null;
        this._averageItemLevel = averageItemLevel;
        this._itemAttributeCollectionComponent = itemAttributeCollectionComponent;
        this._rules = rules;
    }

    equip(itemID: ItemID): boolean {
        if (!this.canEquip(itemID)) return false;

        this._itemID = itemID;
        this._averageItemLevel.addItem(itemID);
        this._itemAttributeCollectionComponent.addItem(itemID);
        debug(DebugNamespaceID.Log)(sprintf('В слот "%s" экипирован предмет "%s".', this._ID, itemID));

        return true;
    }

    equipFrom(itemID: ItemID, itemStorage: ItemStorageInterface): boolean {
        if (!this.canEquip(itemID)) return false;

        if (itemStorage.removeItem(itemID, 1) !== 1) {
            debug(DebugNamespaceID.Log)(sprintf('Предмет "%s" не найден в ItemStorage.', itemID));
            return false;
        }

        return this.equip(itemID);
    }

    clear(): void {
        if (this.isFree()) return;

        this._averageItemLevel.removeItem(this._itemID);
        this._itemAttributeCollectionComponent.removeItem(this._itemID);
        this._itemID = null;
        EventSystem.event(EquipSlotComponentEventCode.DestroyItemStack, this);
        debug(DebugNamespaceID.Log)(sprintf('Слот экипировки "%s" очищен.', this._ID));
    }

    removeEquipTo(itemStorage: ItemStorageInterface): boolean {
        if (itemStorage.addItem(this._itemID, 1) === 0) {
            return false;
        }

        this.clear();

        return true;
    }

    isFree(): boolean {
        return _.isNil(this._itemID);
    }

    canEquip(itemID: ItemID): boolean {
        if (!database.items.data.equipable(itemID)) {
            debug(DebugNamespaceID.Throw)(sprintf('Предмет "%s" нельзя экипировать в слот "%s".', itemID, this._ID));
            return false;
        }

        // if (!_.every(_.map(this._rules, (rule) => {
        //     return rule.canEquip(this._ID, itemID);
        // }))) return false;
        for (let i = 0; i < this._rules.length; i++) {
            if (!this._rules[i].canEquip(this._ID, itemID)) return false;
        }

        return true;
    }

    // canClear(): boolean {
    //     if (this.isFree()) {
    //         // debug(DebugNamespaceID.Throw)('Слот пустой.');
    //         // return false;
    //     }
    //
    //     return true;
    // }

    renderByRequest(ui: EquipSlotInterfaceRender): void {
        ui.updateEquipSlot?.(this._ID, this._itemID ? {itemID: this._itemID, count: 1} : {itemID: null, count: null});
    }

    debug(): void {
        debug(DebugNamespaceID.Debug)(DebugFormatterID.Json, {
            ID: this._ID,
            itemID: this.isFree() ? null : this._itemID,
        });
    }
}