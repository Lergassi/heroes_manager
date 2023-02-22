import _ from 'lodash';
import debug from 'debug';
import {QualityID} from '../../types/enums/QualityID.js';
import {ItemDatabaseRow} from '../../types/ItemDatabaseRow.js';

export default class ItemDatabaseRowBuilder {
    ID: string;
    ItemCategoryID: string;
    ArmorMaterialID: string;
    QualityID: string;
    StackSize: number;
    ItemLevel: number;
    Strength: number;
    Agility: number;
    Intelligence: number;
    HealthPoints: number;
    DefaultBuyPrice?: number;
    DefaultSellPrice?: number;
    Equipable: boolean;
    TwoHandWeapon: boolean;

    constructor() {
        this.ID = '';
        this.ItemCategoryID = '';
        this.ArmorMaterialID = '';

        this.QualityID = QualityID.Uncommon;
        this.StackSize = 1;
        this.ItemLevel = 1;
        this.Strength = 0;
        this.Agility = 0;
        this.Intelligence = 0;
        this.HealthPoints = 0;
        this.DefaultBuyPrice = 0;
        this.DefaultSellPrice = 0;
        this.Equipable = false;
        this.TwoHandWeapon = false;
    }

    build(): ItemDatabaseRow {
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
        };
    }
}