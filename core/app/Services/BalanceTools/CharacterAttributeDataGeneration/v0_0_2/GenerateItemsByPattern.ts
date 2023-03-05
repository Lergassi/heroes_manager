import _ from 'lodash';
import config from '../../../../../config/config.js';
import {database} from '../../../../../data/ts/database.js';
import {TSDB_ItemDB} from '../../../../../data/ts/items.js';
import {TSDB_Recipe, TSDB_RecipeDB} from '../../../../../data/ts/recipes.js';
// import {TSDB_Recipe} from '../../../../../data/ts/recipes.js';
import ContainerInterface from '../../../../../source/ContainerInterface.js';
import {ArmorMaterialID} from '../../../../../types/enums/ArmorMaterialID.js';
import {CharacterAttributeID} from '../../../../../types/enums/CharacterAttributeID.js';
import {ItemAttributeID} from '../../../../../types/enums/ItemAttributeID.js';
import {ItemCategoryID} from '../../../../../types/enums/ItemCategoryID.js';
import {ItemID} from '../../../../../types/enums/ItemID.js';
import {QualityID} from '../../../../../types/enums/QualityID.js';
import TSDB_ItemBuilder from '../../../../Builders/TSDB_ItemBuilder.js';
import ItemIDGenerator from '../../../ItemIDGenerator.js';
import HeroCharacterAttributeGenerator from '../../HeroCharacterAttributeGenerator.js';
import ItemAttributeGenerator from './ItemAttributeGenerator.js';

export default class GenerateItemsByPattern {
    //ArmorMaterial проще указать в паттерне чем выдумывать сложную логику. Для оружия нет материала.
    /*
    strategy: броня + материал, ювелирка на каждый сил/лов/инт, оружие на каждую категорию, оружие может быть двуручным.

    * */

    private _armorMaterialIDs = [
        ArmorMaterialID.Plate,
        ArmorMaterialID.Leather,
        ArmorMaterialID.Cloth,
    ];

    private _jewelryStrategies = {
        [CharacterAttributeID.Strength]: {characterAttributeID: CharacterAttributeID.Strength, armorMaterialID: ArmorMaterialID.Plate},
        [CharacterAttributeID.Agility]: {characterAttributeID: CharacterAttributeID.Agility, armorMaterialID: ArmorMaterialID.Leather},
        [CharacterAttributeID.Intelligence]: {characterAttributeID: CharacterAttributeID.Intelligence,armorMaterialID: ArmorMaterialID.Cloth},
    };

    private _patterns: any = [
        {
            level: 2,
            itemCategories: [
                {itemCategoryID: ItemCategoryID.Gloves, strategy: 'armor'},
                {itemCategoryID: ItemCategoryID.Belts, strategy: 'armor'},
            ],
        },
        {
            level: 4,
            itemCategories: [
                {itemCategoryID: ItemCategoryID.OneHandedSwords, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.TwoHandedSwords, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Staffs, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Daggers, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Bows, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Revolvers, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Shields, strategy: 'weapon'},
            ],
        },
        {
            level: 6,
            itemCategories: [
                {itemCategoryID: ItemCategoryID.Breastplates, strategy: 'armor'},
                {itemCategoryID: ItemCategoryID.Boots, strategy: 'armor'},
                {itemCategoryID: ItemCategoryID.Rings, strategy: 'jewelry'},
            ],
        },
        {
            level: 8,
            itemCategories: [
                {itemCategoryID: ItemCategoryID.Helmets, strategy: 'armor'},
                {itemCategoryID: ItemCategoryID.Bracers, strategy: 'armor'},
            ],
        },
        {
            level: 10,
            itemCategories: [
                {itemCategoryID: ItemCategoryID.OneHandedSwords, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.TwoHandedSwords, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Staffs, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Daggers, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Bows, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Revolvers, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Shields, strategy: 'shields'},
            ],
        },
        {
            level: 12,
            itemCategories: [
                {itemCategoryID: ItemCategoryID.ShoulderPads, strategy: 'armor'},
                {itemCategoryID: ItemCategoryID.Amulets, strategy: 'jewelry'},
            ],
        },
        {
            level: 14,
            itemCategories: [
                {itemCategoryID: ItemCategoryID.Pants, strategy: 'armor'},
                {itemCategoryID: ItemCategoryID.Rings, strategy: 'jewelry'},
            ],
        },
    ];

    private readonly _itemAttributeGenerator: ItemAttributeGenerator;
    private readonly _heroCharacterAttributeGenerator: HeroCharacterAttributeGenerator;
    private readonly _container: ContainerInterface;
    private readonly _itemIDGenerator: ItemIDGenerator;

    constructor(
        container: ContainerInterface,
        itemAttributeGenerator: ItemAttributeGenerator,
        heroCharacterAttributeGenerator: HeroCharacterAttributeGenerator,
    ) {
        this._container = container;
        this._itemAttributeGenerator = itemAttributeGenerator;
        this._heroCharacterAttributeGenerator = heroCharacterAttributeGenerator;
        this._itemIDGenerator = new ItemIDGenerator();
    }

    // run(items: TSDB_Item[], recipes: TSDB_Recipe[]): void {
    run(items: TSDB_ItemDB, recipes: TSDB_RecipeDB): void {
        let rangeLength = 14;
        let rangeStart = 2;
        let rangeEnd = 100;
        let rangeIndex = 0;
        while (rangeStart + (rangeIndex * rangeLength) <= rangeEnd) {
            for (let i = 0; i < this._patterns.length; i++) {
                let level = this._patterns[i].level + (rangeIndex * rangeLength)
                let itemLevel = this._heroCharacterAttributeGenerator.itemLevelCorrespondsToItemLevel(level);   //todo: Убрать зависимость генерации атрибутов предметов от генерации атрибутов героев.

                for (let j = 0; j < this._patterns[i].itemCategories.length; j++) {
                    switch (this._patterns[i].itemCategories[j].strategy) {
                        case 'armor':
                            // console.log(level, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                            for (let k = 0; k < this._armorMaterialIDs.length; k++) {
                                // console.log(level, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID, this._armorMaterialIDs[k]);
                                let ID = this._itemIDGenerator.generate(
                                    this._patterns[i].itemCategories[j].itemCategoryID,
                                    itemLevel,
                                    QualityID.Uncommon,
                                    {
                                        armorMaterialID: this._armorMaterialIDs[k],
                                    },
                                );

                                let tsdb_itemBuilder = new TSDB_ItemBuilder({
                                    ID: ID as ItemID,
                                    itemCategoryID: this._patterns[i].itemCategories[j].itemCategoryID as ItemCategoryID,
                                });

                                tsdb_itemBuilder.ItemLevel = itemLevel;
                                tsdb_itemBuilder.QualityID = QualityID.Uncommon;
                                tsdb_itemBuilder.Equipable = true;
                                tsdb_itemBuilder.ArmorMaterialID = this._armorMaterialIDs[k];
                                tsdb_itemBuilder.HealthPoints = this._itemAttributeGenerator.healthPoints(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);

                                let characterAttributeValue = this._itemAttributeGenerator.characterAttributeFromAttackPower_reverse(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                                let mainResource: ItemID = undefined;
                                switch (this._armorMaterialIDs[k]) {
                                    case ArmorMaterialID.Plate:
                                        mainResource = ItemID.IronIngot;
                                        tsdb_itemBuilder.Strength = characterAttributeValue;
                                        break;
                                    case ArmorMaterialID.Leather:
                                        mainResource = ItemID.Leather01;
                                        tsdb_itemBuilder.Agility = characterAttributeValue;
                                        break;
                                    case ArmorMaterialID.Cloth:
                                        mainResource = ItemID.CottonCloth;
                                        tsdb_itemBuilder.Intelligence = characterAttributeValue;
                                        break;
                                }

                                //todo: Надо придумать как не экспортировать все типы нужные только внутри бд.
                                let recipe: TSDB_Recipe = {
                                    ID: ID as ItemID,
                                    requireItems: [
                                        {
                                            ID: mainResource,
                                            count: _.round((config.start_item_level_blacksmith_iron_ingot + config.increase_item_level_blacksmith_iron_ingot * (itemLevel - 1)) * database.item_categories.ratios.ratioByItemAttribute(this._patterns[i].itemCategories[j].itemCategoryID, ItemAttributeID.CraftRatio)),
                                        },
                                    ],
                                    resultItemCount: 1,
                                    cost: 0,
                                };

                                let tsdb_item = tsdb_itemBuilder.build();
                                items[ID] = tsdb_item;
                                recipes[ID] = recipe;
                            }

                            break;
                        case 'weapon':
                            // console.log(level, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                            let ID = this._itemIDGenerator.generate(
                                this._patterns[i].itemCategories[j].itemCategoryID,
                                itemLevel,
                                QualityID.Uncommon,
                            ) as ItemID;

                            let tsdb_itemBuilder = new TSDB_ItemBuilder({
                                ID: ID,
                                itemCategoryID: this._patterns[i].itemCategories[j].itemCategoryID as ItemCategoryID,
                            });

                            tsdb_itemBuilder.ItemLevel = itemLevel;
                            tsdb_itemBuilder.QualityID = QualityID.Uncommon;
                            tsdb_itemBuilder.Equipable = true;
                            tsdb_itemBuilder.HealthPoints = this._itemAttributeGenerator.healthPoints(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                            tsdb_itemBuilder.AttackPower = this._itemAttributeGenerator.characterAttributeFromAttackPower_reverse(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                            if (database.metadata.items.twoHandWeapon(this._patterns[i].itemCategories[j].itemCategoryID)) tsdb_itemBuilder.TwoHandWeapon = true;

                            let recipe: TSDB_Recipe = {
                                ID: ID as ItemID,
                                requireItems: [
                                    {
                                        ID: ItemID.IronIngot,   //todo: Будет отдельная логика.
                                        count: _.round((config.start_item_level_blacksmith_iron_ingot + config.increase_item_level_blacksmith_iron_ingot * (itemLevel - 1)) * database.item_categories.ratios.ratioByItemAttribute(this._patterns[i].itemCategories[j].itemCategoryID, ItemAttributeID.CraftRatio)),
                                    },
                                ],
                                resultItemCount: 1,
                                cost: 0,
                            };

                            let tsdb_item = tsdb_itemBuilder.build();
                            items[ID] = tsdb_item;
                            recipes[ID] = recipe;

                            break;
                        case 'shields':
                            // console.log(level, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                            {//А так можно было?
                                let ID = this._itemIDGenerator.generate(
                                    this._patterns[i].itemCategories[j].itemCategoryID,
                                    itemLevel,
                                    QualityID.Uncommon,
                                );

                                let tsdb_itemBuilder = new TSDB_ItemBuilder({
                                    ID: ID as ItemID,
                                    itemCategoryID: this._patterns[i].itemCategories[j].itemCategoryID as ItemCategoryID,
                                });

                                tsdb_itemBuilder.ItemLevel = itemLevel;
                                tsdb_itemBuilder.QualityID = QualityID.Uncommon;
                                tsdb_itemBuilder.Equipable = true;
                                tsdb_itemBuilder.HealthPoints = this._itemAttributeGenerator.healthPoints(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                                tsdb_itemBuilder.Strength = this._itemAttributeGenerator.characterAttributeFromAttackPower_reverse(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);

                                let recipe: TSDB_Recipe = {
                                    ID: ID as ItemID,
                                    requireItems: [
                                        {
                                            ID: ItemID.IronIngot,   //todo: Будет отдельная логика.
                                            count: _.round((config.start_item_level_blacksmith_iron_ingot + config.increase_item_level_blacksmith_iron_ingot * (itemLevel - 1)) * database.item_categories.ratios.ratioByItemAttribute(this._patterns[i].itemCategories[j].itemCategoryID, ItemAttributeID.CraftRatio)),
                                        },
                                    ],
                                    resultItemCount: 1,
                                    cost: 0,
                                };

                                let tsdb_item = tsdb_itemBuilder.build();
                                items[ID] = tsdb_item;
                                recipes[ID] = recipe;
                            }

                            break;
                        case 'jewelry':
                            // console.log(level, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                            for (const key in this._jewelryStrategies) {
                                // console.log(level, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID, this._jewelryStrategies[key].characterAttributeID);
                                let ID = this._itemIDGenerator.generate(
                                    this._patterns[i].itemCategories[j].itemCategoryID,
                                    itemLevel,
                                    QualityID.Uncommon,
                                );

                                let tsdb_itemBuilder = new TSDB_ItemBuilder({
                                    ID: ID as ItemID,
                                    itemCategoryID: this._patterns[i].itemCategories[j].itemCategoryID as ItemCategoryID,
                                });

                                tsdb_itemBuilder.ItemLevel = itemLevel;
                                tsdb_itemBuilder.QualityID = QualityID.Uncommon;
                                tsdb_itemBuilder.Equipable = true;
                                tsdb_itemBuilder.HealthPoints = this._itemAttributeGenerator.healthPoints(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                                //todo: jw

                                let recipe: TSDB_Recipe = {
                                    ID: ID as ItemID,
                                    requireItems: [
                                        {
                                            ID: ItemID.IronIngot,   //todo: Будет отдельная логика.
                                            count: _.round((config.start_item_level_jewelry_iron_ingot + config.increase_item_level_jewelry_iron_ingot * (itemLevel - 1)) * database.item_categories.ratios.ratioByItemAttribute(this._patterns[i].itemCategories[j].itemCategoryID, ItemAttributeID.CraftRatio)),
                                        },
                                    ],
                                    resultItemCount: 1,
                                    cost: 0,
                                };

                                let tsdb_item = tsdb_itemBuilder.build();
                                items[ID] = tsdb_item;
                                recipes[ID] = recipe;
                            }

                            break;
                    }//end switch
                }//end for itemCategories
            }//end this._patterns
            
            rangeIndex++;
        }//end range
    }//end run

    private _mainCharacterAttributeForArmorMaterial(armorMaterialID: ArmorMaterialID): CharacterAttributeID | undefined {
        for (const key in this._jewelryStrategies) {
            if (this._jewelryStrategies[key].armorMaterialID === armorMaterialID) return this._jewelryStrategies[key].characterAttributeID;
        }

        return undefined;
    }
}