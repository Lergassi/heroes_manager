import _ from 'lodash';
import debug from 'debug';
import {ArmorMaterialID} from '../../types/enums/ArmorMaterialID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {QualityID} from '../../types/enums/QualityID.js';
import {TSDB_Item} from '../../types/TSDB_Item.js';

export default class TSDB_ItemBuilder {
    ID: ItemID | string;
    ItemCategoryID: ItemCategoryID | string;
    ArmorMaterialID: ArmorMaterialID | string;
    QualityID: QualityID | string;
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

    constructor(values: {
        ID: ItemID | string,
        itemCategoryID: ItemCategoryID,
    }) {
        this.ID = values.ID;
        this.ItemCategoryID = values.itemCategoryID;

        this.ArmorMaterialID = '';
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
        };
    }
}