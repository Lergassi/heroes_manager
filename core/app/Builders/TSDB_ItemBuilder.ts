import _ from 'lodash';
import debug from 'debug';
import {TSDB_Item} from '../../data/ts/items.js';
import {ArmorMaterialID} from '../../types/enums/ArmorMaterialID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {QualityID} from '../../types/enums/QualityID.js';
import {IconID} from '../../types/enums/IconID.js';

export default class TSDB_ItemBuilder {
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
    IconId: string;
    ProductionId?: string;

    constructor(values: {
        ID: ItemID,
        itemCategoryID: ItemCategoryID,
    }) {
        this.ID = values.ID;
        this.ItemCategoryID = values.itemCategoryID;

        this.ArmorMaterialID = null;
        this.QualityID = QualityID.Common;
        this.StackSize = 1;
        this.ItemLevel = 1;
        this.Strength = 0;
        this.Agility = 0;
        this.Intelligence = 0;
        this.AttackPower = 0;
        this.HealthPoints = 0;
        this.DefaultBuyPrice = 0;
        this.DefaultSellPrice = 0;
        this.Equipable = false;
        this.TwoHandWeapon = false;
        this.IconId = IconID.Question02;
        this.ProductionId = null;
    }

    build(): TSDB_Item {
        return {
            Agility: this.Agility,
            ArmorMaterialID: this.ArmorMaterialID,
            DefaultBuyPrice: this.DefaultBuyPrice,
            DefaultSellPrice: this.DefaultSellPrice,
            Equipable: this.Equipable,
            HealthPoints: this.HealthPoints,
            ID: this.ID,
            Intelligence: this.Intelligence,
            ItemCategoryID: this.ItemCategoryID,
            ItemLevel: this.ItemLevel,
            QualityID: this.QualityID,
            StackSize: this.StackSize,
            Strength: this.Strength,
            TwoHandWeapon: this.TwoHandWeapon,
            AttackPower: this.AttackPower,
            IconID: this.IconId,
            ProductionId: this.ProductionId,
        };
    }
}