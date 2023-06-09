import {ArmorMaterialID} from '../../types/enums/ArmorMaterialID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {QualityID} from '../../types/enums/QualityID.js';
import _manual_created_items_data from '../json/items.json';
import {
    auto_generated_equip_db_data as _auto_generated_equip_db_data
} from '../../../client/data/autogenerated_code/auto_generated_equip.js';
import _ from 'lodash';
import DebugApp from '../../app/Services/DebugApp.js';

//todo: Переделать в cameCase. И csv файл тоже.
export type TSDB_Item = {
    ID: ItemID;
    ItemCategoryID: ItemCategoryID;
    ArmorMaterialID: ArmorMaterialID;
    QualityID: QualityID;
    StackSize: number;
    ItemLevel: number;
    Strength: number;
    Agility: number;
    Intelligence: number;
    AttackPower: number;
    HealthPoints: number;
    DefaultBuyPrice?: number;
    DefaultSellPrice?: number;
    Equipable: boolean;
    TwoHandWeapon: boolean;
    IconID: string;
    ProductionId?: string;
}

export type TSDB_ItemDB = {
    [ID: string]: TSDB_Item;
};

let manual_created_items_data = _manual_created_items_data as TSDB_ItemDB;
let auto_generated_equip_db_data = _auto_generated_equip_db_data as TSDB_ItemDB;

let items_db: TSDB_ItemDB = _.assign(
    {},
    manual_created_items_data,
    auto_generated_equip_db_data,
);

export const items = {
    findAll(): TSDB_Item[] {
        return _.cloneDeep(_.map(items_db, (value, key) => {
            return value;
        }));
    },
    find(id: string): TSDB_Item | null {
        return _.cloneDeep(items_db[id] ?? null);
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    hasItem: function (ID: ItemID): boolean {
        return items_db.hasOwnProperty(ID);
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    itemCategory: function (ID: ItemID): ItemCategoryID {
        return items_db[ID]?.ItemCategoryID;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    armorMaterial: function (ID: ItemID): ArmorMaterialID {
        console.log(ID, items_db[ID]);
        return items_db[ID]?.ArmorMaterialID ?? null;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    qualityID: function (ID: ItemID): QualityID {
        return items_db[ID]?.QualityID;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    stackSize: function (ID: ItemID): number {
        return items_db[ID]?.StackSize;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    itemLevel: function (ID: ItemID): number {
        return items_db[ID]?.ItemLevel;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    strength: function (ID: ItemID): number {
        return items_db[ID]?.Strength;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    agility: function (ID: ItemID): number {
        return items_db[ID]?.Agility;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    intelligence: function (ID: ItemID): number {
        return items_db[ID]?.Intelligence;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    attackPower: function (ID: ItemID): number {
        return items_db[ID]?.AttackPower;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    healthPoints: function (ID: ItemID): number {
        return items_db[ID]?.HealthPoints;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    defaultBuyPrice: function (ID: ItemID): number {
        return items_db[ID]?.DefaultBuyPrice;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    defaultSellPrice: function (ID: ItemID): number {
        return items_db[ID]?.DefaultSellPrice;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    equipable: function (ID: ItemID): boolean {
        return items_db[ID]?.Equipable;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    twoHandWeapon: function (ID: ItemID): Boolean {
        return items_db[ID]?.TwoHandWeapon;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param ID
     */
    iconId: function (ID: ItemID): string {
        return items_db[ID]?.IconID;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     * @param id
     */
    productionId: function (id: ItemID): string | null {
        return items_db[id]?.ProductionId ?? null;
    },
    /**
     * @deprecated Далее работать как с классической бд через методы find, findBy и тд. Позже будет добавлена "настоящая" бд.
     */
    debug: function () {
        DebugApp.debug(DebugNamespaceID.Debug)(items_db);
    },
};

//или
let _export = {
    find: function (ID: ItemID) {
        /*
        return _items[ID];
        где Item - один объект на всю систему. Или как обычная бд (не EntityManager) - возвращаются копии данных (запись sql).
        */
    }
};