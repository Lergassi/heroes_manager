import {sprintf} from 'sprintf-js';
import {database} from '../../../data/ts/database.js';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';
import {ItemID} from '../../../types/enums/ItemID.js';
import EquipSlotInterface, {EquipSlotInterfaceRender,} from '../../Interfaces/EquipSlotInterface.js';
import EquipSlotRuleInterface from '../../Interfaces/EquipSlotRuleInterface.js';
import _ from 'lodash';
import CharacterAttributeManager from '../CharacterAttributeManager.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {DebugFormatterID} from '../../../types/enums/DebugFormatterID.js';
import {EquipSlotID} from '../../../types/enums/EquipSlotID.js';
import AverageItemLevel from '../AverageItemLevel.js';
import ItemStorageInterface from '../../Interfaces/ItemStorageInterface.js';
import DebugApp from '../../Services/DebugApp.js';

export default class DefaultEquipSlot implements EquipSlotInterface {
    private readonly _ID: EquipSlotID;
    private _itemID: ItemID;
    private readonly _averageItemLevel: AverageItemLevel;
    private readonly _characterAttributeManager: CharacterAttributeManager;
    private readonly _rules: EquipSlotRuleInterface[];

    constructor(
        ID: EquipSlotID,
        averageItemLevel: AverageItemLevel,
        characterAttributeManager: CharacterAttributeManager,
        rules: EquipSlotRuleInterface[] = [],
    ) {
        this._ID = ID;
        this._itemID = null;
        this._averageItemLevel = averageItemLevel;
        this._characterAttributeManager = characterAttributeManager;
        this._rules = rules;
    }

    equip(itemID: ItemID): boolean {
        if (!this.canEquip(itemID)) {
            DebugApp.debug(DebugNamespaceID.Throw)(sprintf('Ошибка экипировки.'));
            return false;
        }

        this._itemID = itemID;
        this._averageItemLevel.addItem(itemID);
        DebugApp.debug(DebugNamespaceID.Log)(sprintf('В слот "%s" экипирован предмет "%s".', this._ID, itemID));

        /**
         * todo: Варианты оптмизации:
         * - Если значение равно нулю - не вызывать метод.
         * - Перенести в одно место. Сущность Item? Интерфейс: increase(target) - при добавлении/удалении атрибутов всё происходит в одном месте. Или посредник между бд и логикой.
         */
        this._characterAttributeManager.increase(CharacterAttributeID.Strength, database.items.data.strength(itemID));
        this._characterAttributeManager.increase(CharacterAttributeID.Agility, database.items.data.agility(itemID));
        this._characterAttributeManager.increase(CharacterAttributeID.Intelligence, database.items.data.intelligence(itemID));
        this._characterAttributeManager.increase(CharacterAttributeID.AttackPower, database.items.data.attackPower(itemID));
        this._characterAttributeManager.increase(CharacterAttributeID.MaxHealthPoints, database.items.data.healthPoints(itemID)); //тут не соответствие атрибут_предмет = атрибут_героя нарушается. Возможно так будет со всеми атрибутами.

        return true;
    }

    equipFrom(itemID: ItemID, itemStorage: ItemStorageInterface): boolean {
        if (!this.canEquip(itemID)) return false;

        if (itemStorage.removeItem(itemID, 1) !== 1) {
            DebugApp.debug(DebugNamespaceID.Log)(sprintf('Предмет "%s" не найден в ItemStorage.', itemID));
            return false;
        }

        return this.equip(itemID);
    }

    clear(): boolean {
        if (!this.canRemoveEquip()) {
            DebugApp.debug(DebugNamespaceID.Throw)(sprintf('Ошибка удаления экипировки из слота.'));
            return false;
        }

        let _itemID = this._itemID;

        this._averageItemLevel.removeItem(_itemID);
        this._itemID = null;
        DebugApp.debug(DebugNamespaceID.Log)(sprintf('Слот экипировки "%s" очищен.', this._ID));

        this._characterAttributeManager.decrease(CharacterAttributeID.Strength, database.items.data.strength(_itemID));
        this._characterAttributeManager.decrease(CharacterAttributeID.Agility, database.items.data.agility(_itemID));
        this._characterAttributeManager.decrease(CharacterAttributeID.Intelligence, database.items.data.intelligence(_itemID));
        this._characterAttributeManager.decrease(CharacterAttributeID.AttackPower, database.items.data.attackPower(_itemID));
        this._characterAttributeManager.decrease(CharacterAttributeID.MaxHealthPoints, database.items.data.healthPoints(_itemID));

        return true;
    }

    removeEquipTo(itemStorage: ItemStorageInterface): boolean {
        if (!this.canRemoveEquip()) {
            DebugApp.debug(DebugNamespaceID.Throw)(sprintf('Ошибка удаления экипировки из слота.'));
            return false;
        }

        if (itemStorage.addItem(this._itemID, 1) === 0) {
            DebugApp.debug(DebugNamespaceID.Throw)(sprintf('Нет места в ItemStorage.'));
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
            DebugApp.debug(DebugNamespaceID.Throw)(sprintf('Предмет "%s" нельзя экипировать в слот "%s".', itemID, this._ID));
            return false;
        }

        for (let i = 0; i < this._rules.length; i++) {
            if (!this._rules[i].canEquip(this._ID, itemID)) return false;
        }

        return true;
    }

    canRemoveEquip(): boolean {
        if (this.isFree()) {
            DebugApp.debug(DebugNamespaceID.Throw)(sprintf('Слот экипировки пустой.'));
            return false;
        }

        return true;
    }

    renderByRequest(ui: EquipSlotInterfaceRender): void {
        ui.updateEquipSlot?.(this._ID, this._itemID ? {itemID: this._itemID, count: 1} : {itemID: null, count: null});
    }

    debug(): void {
        DebugApp.debug(DebugNamespaceID.Debug)(DebugFormatterID.Json, {
            ID: this._ID,
            itemID: this.isFree() ? null : this._itemID,
        });
    }
}