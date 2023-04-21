import _ from 'lodash';
import {database} from '../../../../../data/ts/database.js';
import {TSDB_ItemDB} from '../../../../../data/ts/items.js';
import {TSDB_Recipe, TSDB_RecipeDB} from '../../../../../data/ts/recipes.js';
// import {TSDB_Recipe} from '../../../../../data/ts/recipes.js';
import {ArmorMaterialID} from '../../../../../types/enums/ArmorMaterialID.js';
import {CharacterAttributeID} from '../../../../../types/enums/CharacterAttributeID.js';
import {ItemCategoryID} from '../../../../../types/enums/ItemCategoryID.js';
import {ItemID} from '../../../../../types/enums/ItemID.js';
import {QualityID} from '../../../../../types/enums/QualityID.js';
import TSDB_ItemBuilder from '../../../../Builders/TSDB_ItemBuilder.js';
import ItemIDGenerator from '../../../ItemIDGenerator.js';
import HeroCharacterAttributeGenerator from '../../HeroCharacterAttributeGenerator.js';
import ItemAttributeGenerator from './ItemAttributeGenerator.js';
import {ItemCount} from '../../../../../types/main';
import {ProductionValueGenerator} from '../../ProductionValueGenerator';
import {ProductionID} from '../../../../../types/enums/ProductionID';

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
        // [CharacterAttributeID.Strength]: {characterAttributeID: CharacterAttributeID.Strength},
        // [CharacterAttributeID.Agility]: {characterAttributeID: CharacterAttributeID.Agility},
        // [CharacterAttributeID.Intelligence]: {characterAttributeID: CharacterAttributeID.Intelligence},
        StrengthTank: {
            //todo: Отдельные рейты на каждый атрибут.
            mainCharacterAttributeIDs: [
                {characterAttributeID: CharacterAttributeID.Strength, ratio: 1},
            ],
        },
        MagicTank: {
            mainCharacterAttributeIDs: [
                {characterAttributeID: CharacterAttributeID.Strength, ratio: 0.5},
                {characterAttributeID: CharacterAttributeID.Intelligence, ratio: 0.5},
            ],
        },
        AgilityDamageDealer: {
            mainCharacterAttributeIDs: [
                {characterAttributeID: CharacterAttributeID.Agility, ratio: 1},
            ],
        },
        MagicAgilityDamageDealer: {
            mainCharacterAttributeIDs: [
                {characterAttributeID: CharacterAttributeID.Agility, ratio: 0.7},
                {characterAttributeID: CharacterAttributeID.Intelligence, ratio: 0.3},
            ],
        },
        IntelligenceDamageDealer: {
            mainCharacterAttributeIDs: [
                {characterAttributeID: CharacterAttributeID.Intelligence, ratio: 1},
            ],
        },
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
                {itemCategoryID: ItemCategoryID.Shields, strategy: 'shields'},
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
    private readonly _itemIDGenerator: ItemIDGenerator;
    private readonly _productionValueGenerator: ProductionValueGenerator;

    constructor(
        itemAttributeGenerator: ItemAttributeGenerator,
        heroCharacterAttributeGenerator: HeroCharacterAttributeGenerator,
        productionValueGenerator: ProductionValueGenerator,
    ) {
        this._itemAttributeGenerator = itemAttributeGenerator;
        this._heroCharacterAttributeGenerator = heroCharacterAttributeGenerator;
        this._productionValueGenerator = productionValueGenerator;
        this._itemIDGenerator = new ItemIDGenerator();
    }

    run(items: TSDB_ItemDB, recipes: TSDB_RecipeDB): void {
        let rangeLength = 14;
        let rangeStart = 2;
        let rangeEnd = 100;
        let rangeIndex = 0;
        while (rangeStart + (rangeIndex * rangeLength) <= rangeEnd) {
            for (let i = 0; i < this._patterns.length; i++) {
                let heroLevel = this._patterns[i].level + (rangeIndex * rangeLength)
                let itemLevel = this._heroCharacterAttributeGenerator.heroLevelCorrespondsToItemLevel(heroLevel);   //todo: Убрать зависимость генерации атрибутов предметов от генерации атрибутов героев.

                for (let j = 0; j < this._patterns[i].itemCategories.length; j++) {
                    // console.log('ITEM_CATEGORY', this._patterns[i].itemCategories[j].itemCategoryID, heroLevel, itemLevel);
                    switch (this._patterns[i].itemCategories[j].strategy) {
                        case 'armor':
                            // console.log(heroLevel, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                            for (let k = 0; k < this._armorMaterialIDs.length; k++) {
                                // console.log(heroLevel, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID, this._armorMaterialIDs[k]);
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
                                tsdb_itemBuilder.IconId = database.metadata.items.iconId(this._patterns[i].itemCategories[j].itemCategoryID);

                                let characterAttributeValue = this._itemAttributeGenerator.characterAttributeFromAttackPower_reverse(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                                let requireItems: ItemCount[] = [];
                                switch (this._armorMaterialIDs[k]) {
                                    case ArmorMaterialID.Plate:
                                        requireItems.push(
                                            {
                                                itemID: ItemID.IronIngot,
                                                count: this._productionValueGenerator.requireItemsCount(ProductionID.Blacksmith, itemLevel, ItemID.IronIngot, this._patterns[i].itemCategories[j].itemCategoryID),
                                            },
                                        );
                                        tsdb_itemBuilder.Strength = characterAttributeValue;
                                        tsdb_itemBuilder.ProductionId = ProductionID.Blacksmith;
                                        break;
                                    case ArmorMaterialID.Leather:
                                        requireItems.push(
                                            {
                                                itemID: ItemID.Leather01,
                                                count: this._productionValueGenerator.requireItemsCount(ProductionID.LeatherWorking, itemLevel, ItemID.Leather01, this._patterns[i].itemCategories[j].itemCategoryID),
                                            },
                                        );
                                        tsdb_itemBuilder.Agility = characterAttributeValue;
                                        tsdb_itemBuilder.ProductionId = ProductionID.LeatherWorking;
                                        break;
                                    case ArmorMaterialID.Cloth:
                                        requireItems.push(
                                            {
                                                itemID: ItemID.CottonCloth,
                                                count: this._productionValueGenerator.requireItemsCount(ProductionID.Tailoring, itemLevel, ItemID.CottonCloth, this._patterns[i].itemCategories[j].itemCategoryID),
                                            },
                                        );
                                        tsdb_itemBuilder.Intelligence = characterAttributeValue;
                                        tsdb_itemBuilder.ProductionId = ProductionID.Tailoring;
                                        break;
                                }

                                //todo: Надо придумать как не экспортировать все типы нужные только внутри бд.
                                let recipe: TSDB_Recipe = {
                                    ID: ID as ItemID,
                                    requireItems: requireItems,
                                    resultItemCount: 1,
                                    productionCost: this._productionValueGenerator.productionCost(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID),
                                };

                                let tsdb_item = tsdb_itemBuilder.build();
                                // console.log(ID, tsdb_item);
                                items[ID] = tsdb_item;
                                recipes[ID] = recipe;
                            }

                            break;
                        case 'shields':
                            // console.log('SHIELDS', this._patterns[i].itemCategories[j].itemCategoryID, heroLevel, itemLevel);
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
                            tsdb_itemBuilder.IconId = database.metadata.items.iconId(this._patterns[i].itemCategories[j].itemCategoryID);
                            tsdb_itemBuilder.ProductionId = ProductionID.Blacksmith;

                            let recipe: TSDB_Recipe = {
                                ID: ID as ItemID,
                                requireItems: [
                                    {
                                        itemID: ItemID.IronIngot,
                                        count: this._productionValueGenerator.requireItemsCount(ProductionID.Blacksmith, itemLevel, ItemID.IronIngot, this._patterns[i].itemCategories[j].itemCategoryID),
                                    },
                                    // {
                                    //     itemID: ItemID.CopperIngot,
                                    //     count: this._productionValueGenerator.requireItemsCount(ProductionID.Blacksmith, itemLevel, ItemID.CopperIngot, this._patterns[i].itemCategories[j].itemCategoryID),
                                    // },
                                ],
                                resultItemCount: 1,
                                productionCost: this._productionValueGenerator.productionCost(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID),
                            };

                            let tsdb_item = tsdb_itemBuilder.build();
                            // console.log(ID, tsdb_item, tsdb_itemBuilder.Strength);
                            items[ID] = tsdb_item;
                            recipes[ID] = recipe;
                        }

                            break;
                        case 'weapon':
                            // console.log(heroLevel, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
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
                            tsdb_itemBuilder.IconId = database.metadata.items.iconId(this._patterns[i].itemCategories[j].itemCategoryID);
                            tsdb_itemBuilder.ProductionId = ProductionID.Blacksmith;

                            let recipe: TSDB_Recipe = {
                                ID: ID as ItemID,
                                requireItems: [
                                    {
                                        itemID: ItemID.IronIngot,
                                        count: this._productionValueGenerator.requireItemsCount(ProductionID.Blacksmith, itemLevel, ItemID.IronIngot, this._patterns[i].itemCategories[j].itemCategoryID),
                                    },
                                    // {
                                    //     itemID: ItemID.CopperIngot,
                                    //     count: this._productionValueGenerator.requireItemsCount(ProductionID.Blacksmith, itemLevel, ItemID.CopperIngot, this._patterns[i].itemCategories[j].itemCategoryID),
                                    // },
                                ],
                                resultItemCount: 1,
                                productionCost: this._productionValueGenerator.productionCost(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID),
                            };

                            let tsdb_item = tsdb_itemBuilder.build();
                            items[ID] = tsdb_item;
                            recipes[ID] = recipe;

                            break;
                        case 'jewelry':
                            // console.log(heroLevel, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                            for (const jewelryStrategiesKey in this._jewelryStrategies) {
                                // console.log(heroLevel, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID, this._jewelryStrategies[jewelryStrategiesKey].characterAttributeID);
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
                                tsdb_itemBuilder.IconId = database.metadata.items.iconId(this._patterns[i].itemCategories[j].itemCategoryID);
                                tsdb_itemBuilder.ProductionId = ProductionID.Jewelry;

                                let characterAttributeValue = this._itemAttributeGenerator.characterAttributeFromAttackPower_reverse(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                                for (let k = 0; k < this._jewelryStrategies[jewelryStrategiesKey].mainCharacterAttributeIDs.length; k++) {
                                    tsdb_itemBuilder[this._jewelryStrategies[jewelryStrategiesKey].mainCharacterAttributeIDs[k].characterAttributeID] = _.round(characterAttributeValue * this._jewelryStrategies[jewelryStrategiesKey].mainCharacterAttributeIDs[k].ratio);
                                }

                                let recipe: TSDB_Recipe = {
                                    ID: ID as ItemID,
                                    requireItems: [
                                        {
                                            itemID: ItemID.GoldIngot,
                                            count: this._productionValueGenerator.requireItemsCount(ProductionID.Jewelry, itemLevel, ItemID.GoldIngot, this._patterns[i].itemCategories[j].itemCategoryID),
                                        },
                                    ],
                                    resultItemCount: 1,
                                    productionCost: this._productionValueGenerator.productionCost(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID),
                                };

                                let tsdb_item = tsdb_itemBuilder.build();
                                // console.log(ID, tsdb_item);
                                items[ID] = tsdb_item;
                                recipes[ID] = recipe;
                            }//end fori

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