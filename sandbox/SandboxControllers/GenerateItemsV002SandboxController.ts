import _ from 'lodash';
import CharacterAttributeTransfer
    from '../../core/app/Services/BalanceTools/CharacterAttributeDataGeneration/v0_0_2/CharacterAttributeTransfer.js';
import GenerateItemsByPattern
    from '../../core/app/Services/BalanceTools/CharacterAttributeDataGeneration/v0_0_2/GenerateItemsByPattern.js';
import {item_attributes_formulas} from '../../core/app/Services/BalanceTools/formulas/item_attributes_formulas.js';
import GenerateItems from '../../core/app/Services/BalanceTools/CharacterAttributeDataGeneration/v0_0_2/GenerateItems.js';
import ItemAttributeGenerator
    from '../../core/app/Services/BalanceTools/CharacterAttributeDataGeneration/v0_0_2/ItemAttributeGenerator.js';
import HeroCharacterAttributeGenerator from '../../core/app/Services/BalanceTools/HeroCharacterAttributeGenerator.js';
import {database} from '../../core/data/ts/database.js';
import {TSDB_Item, TSDB_ItemDB} from '../../core/data/ts/items.js';
import {TSDB_RecipeDB} from '../../core/data/ts/recipes.js';
import {CharacterAttributeID} from '../../core/types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import {ItemCategoryID} from '../../core/types/enums/ItemCategoryID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import AbstractSandboxController from './AbstractSandboxController.js';
import {ProductionValueGenerator} from '../../core/app/Services/BalanceTools/ProductionValueGenerator';

export default class GenerateItemsV002SandboxController extends AbstractSandboxController {
    run(): void {
        // this._gevAlgorithm();
        // this._gevClass();
        // this._gevGenerateItems();

        this._gevGenerateItemsByPatterns();

        // this._testSumGetStarted();
        // this._testSumGetStarted();
        // this._testSumWithBlur();

        // this._use();
    }

    private readonly _itemCategoryRatios = {
        [ItemCategoryID.Helmets]: {[CharacterAttributeID.MaxHealthPoints]: 0.5, [CharacterAttributeID.AttackPower]: 0.5},  //todo: Добавить другие атрибуты.
        [ItemCategoryID.ShoulderPads]: {[CharacterAttributeID.MaxHealthPoints]: 0.3, [CharacterAttributeID.AttackPower]: 0.3},
        [ItemCategoryID.Breastplates]: {[CharacterAttributeID.MaxHealthPoints]: 1, [CharacterAttributeID.AttackPower]: 1},
        [ItemCategoryID.Bracers]: {[CharacterAttributeID.MaxHealthPoints]: 0.2, [CharacterAttributeID.AttackPower]: 0.2},
        [ItemCategoryID.Gloves]: {[CharacterAttributeID.MaxHealthPoints]: 0.3, [CharacterAttributeID.AttackPower]: 0.3},
        [ItemCategoryID.Belts]: {[CharacterAttributeID.MaxHealthPoints]: 0.2, [CharacterAttributeID.AttackPower]: 0.2},
        [ItemCategoryID.Pants]: {[CharacterAttributeID.MaxHealthPoints]: 0.6, [CharacterAttributeID.AttackPower]: 0.6},
        [ItemCategoryID.Boots]: {[CharacterAttributeID.MaxHealthPoints]: 0.4, [CharacterAttributeID.AttackPower]: 0.4},
        [ItemCategoryID.Amulets]: {[CharacterAttributeID.MaxHealthPoints]: 0.6, [CharacterAttributeID.AttackPower]: 0.6},
        [ItemCategoryID.Rings]: {[CharacterAttributeID.MaxHealthPoints]: 0.3, [CharacterAttributeID.AttackPower]: 0.3},
        [ItemCategoryID.OneHandedSwords]: {[CharacterAttributeID.MaxHealthPoints]: 0, [CharacterAttributeID.AttackPower]: 2},
        [ItemCategoryID.TwoHandedSwords]: {[CharacterAttributeID.MaxHealthPoints]: 0, [CharacterAttributeID.AttackPower]: 4},
        [ItemCategoryID.Daggers]: {[CharacterAttributeID.MaxHealthPoints]: 0, [CharacterAttributeID.AttackPower]: 4},
        [ItemCategoryID.Shields]: {[CharacterAttributeID.MaxHealthPoints]: 0, [CharacterAttributeID.AttackPower]: 0.2},
    };

    private _testSumGetStarted() {
        // let apSum =
        const baseItemConst = 10;
        const startItemLevel = 25;
        const apStepItemLevel = 8;
        const rangeItemLevel = 5;
        const apSlotFunction = (itemLevel: number, ratio: number): number => {
            return _.round((baseItemConst + apStepItemLevel * (itemLevel - startItemLevel) / rangeItemLevel) * ratio, 2);
        }

        // let itemLevel = 100;
        let itemLevel = 110;
        console.log(ItemCategoryID.Helmets, apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Helmets][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.ShoulderPads, apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.ShoulderPads][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Breastplates, apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Breastplates][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Bracers, apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Bracers][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Gloves, apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Gloves][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Belts, apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Belts][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Pants, apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Pants][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Boots, apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Boots][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Amulets, apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Amulets][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Rings, apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Rings][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Rings, apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Rings][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.OneHandedSwords, apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.OneHandedSwords][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Shields, apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Shields][CharacterAttributeID.AttackPower]));
        let apSumWithOneItemLevel = _.round(_.sum([
            apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Helmets][CharacterAttributeID.AttackPower]),
            apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.ShoulderPads][CharacterAttributeID.AttackPower]),
            apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Breastplates][CharacterAttributeID.AttackPower]),
            apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Bracers][CharacterAttributeID.AttackPower]),
            apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Gloves][CharacterAttributeID.AttackPower]),
            apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Belts][CharacterAttributeID.AttackPower]),
            apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Pants][CharacterAttributeID.AttackPower]),
            apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Boots][CharacterAttributeID.AttackPower]),
            apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Amulets][CharacterAttributeID.AttackPower]),
            apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Rings][CharacterAttributeID.AttackPower]),
            apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Rings][CharacterAttributeID.AttackPower]),
            apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.OneHandedSwords][CharacterAttributeID.AttackPower]),
            apSlotFunction(itemLevel, this._itemCategoryRatios[ItemCategoryID.Shields][CharacterAttributeID.AttackPower]),
        ]), 2);
        console.log({
            itemLevel: itemLevel,
            sum: apSumWithOneItemLevel,
        });

        console.log('-'.repeat(64));

        let differentItemLevels = [
            50,
            60,
            70,
            80,
            90, //5
            100,
            110,
            120,
            130,
            140,    //10
            150,
            160,
            170,    //13
        ];
        let averageItemLevel = _.round(_.sum(differentItemLevels) / differentItemLevels.length, 2);
        console.log(ItemCategoryID.Helmets, apSlotFunction(50, this._itemCategoryRatios[ItemCategoryID.Helmets][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.ShoulderPads, apSlotFunction(60, this._itemCategoryRatios[ItemCategoryID.ShoulderPads][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Breastplates, apSlotFunction(70, this._itemCategoryRatios[ItemCategoryID.Breastplates][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Bracers, apSlotFunction(80, this._itemCategoryRatios[ItemCategoryID.Bracers][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Gloves, apSlotFunction(90, this._itemCategoryRatios[ItemCategoryID.Gloves][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Belts, apSlotFunction(100, this._itemCategoryRatios[ItemCategoryID.Belts][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Pants, apSlotFunction(110, this._itemCategoryRatios[ItemCategoryID.Pants][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Boots, apSlotFunction(120, this._itemCategoryRatios[ItemCategoryID.Boots][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Amulets, apSlotFunction(130, this._itemCategoryRatios[ItemCategoryID.Amulets][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Rings, apSlotFunction(140, this._itemCategoryRatios[ItemCategoryID.Rings][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Rings, apSlotFunction(150, this._itemCategoryRatios[ItemCategoryID.Rings][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.OneHandedSwords, apSlotFunction(160, this._itemCategoryRatios[ItemCategoryID.OneHandedSwords][CharacterAttributeID.AttackPower]));
        console.log(ItemCategoryID.Shields, apSlotFunction(170, this._itemCategoryRatios[ItemCategoryID.Shields][CharacterAttributeID.AttackPower]));
        let apSumWithDifferentItemLevel = _.round(_.sum([
            apSlotFunction(50, this._itemCategoryRatios[ItemCategoryID.Helmets][CharacterAttributeID.AttackPower]),
            apSlotFunction(60, this._itemCategoryRatios[ItemCategoryID.ShoulderPads][CharacterAttributeID.AttackPower]),
            apSlotFunction(70, this._itemCategoryRatios[ItemCategoryID.Breastplates][CharacterAttributeID.AttackPower]),
            apSlotFunction(80, this._itemCategoryRatios[ItemCategoryID.Bracers][CharacterAttributeID.AttackPower]),
            apSlotFunction(90, this._itemCategoryRatios[ItemCategoryID.Gloves][CharacterAttributeID.AttackPower]),
            apSlotFunction(100, this._itemCategoryRatios[ItemCategoryID.Belts][CharacterAttributeID.AttackPower]),
            apSlotFunction(110, this._itemCategoryRatios[ItemCategoryID.Pants][CharacterAttributeID.AttackPower]),
            apSlotFunction(120, this._itemCategoryRatios[ItemCategoryID.Boots][CharacterAttributeID.AttackPower]),
            apSlotFunction(130, this._itemCategoryRatios[ItemCategoryID.Amulets][CharacterAttributeID.AttackPower]),
            apSlotFunction(140, this._itemCategoryRatios[ItemCategoryID.Rings][CharacterAttributeID.AttackPower]),
            apSlotFunction(150, this._itemCategoryRatios[ItemCategoryID.Rings][CharacterAttributeID.AttackPower]),
            apSlotFunction(160, this._itemCategoryRatios[ItemCategoryID.OneHandedSwords][CharacterAttributeID.AttackPower]),
            apSlotFunction(170, this._itemCategoryRatios[ItemCategoryID.Shields][CharacterAttributeID.AttackPower]),
        ]), 2);
        console.log({
            averageItemLevel: averageItemLevel,
            apSumWithDifferentItemLevel: apSumWithDifferentItemLevel,
        });

        let error = 2;
        console.log(130 / 1 * 0.3 + 290 / 2 * 0.5);
        console.log(210 / 1 * 0.3 + 210 / 2 * 0.5);
    }

    private _gevAlgorithm() {
        // console.log(database.item_categories.ratios.getRatio(ItemCategoryID.Breastplates, CharacterAttributeID.AttackPower));
        // console.log(database.item_categories.ratios.getRatio(ItemCategoryID.Helmets, CharacterAttributeID.AttackPower));
        // console.log(database.item_categories.ratios.getRatio(ItemCategoryID.Armor, CharacterAttributeID.AttackPower));
        // database.heroes.equip_sets.getItemCategories(HeroClassID.Warrior, (itemCategoryID, count) => {
        //     console.log(itemCategoryID, count);
        // });

        let constValues: any = {
            baseItemConstant: 4,
            baseItemConstantBlur: 1,
            itemLevelAttackPower: 4,
            itemLevelAttackPowerBlur: 1,
            startItemLevel: 25,
        };
        let calcValues: any = {};

        constValues.itemLevel = 25;
        constValues.heroClassID = HeroClassID.Warrior;
        calcValues.attackPowerSum = 0;
        database.hero_classes.equip_sets.equipSet(HeroClassID.Warrior, (itemCategoryID, count) => {
            // console.log(itemCategoryID, count);
            for (let i = 0; i < count; i++) {
                let attackPower = 0;
                // let attackPower = item_attributes_formulas.attackPower({
                //     startAttackPower: _.random(constValues.baseItemConstant - constValues.baseItemConstantBlur, constValues.baseItemConstant + constValues.baseItemConstantBlur),
                //     ratio: database.item_categories.ratios.ratio(itemCategoryID, CharacterAttributeID.AttackPower),
                //     itemLevel: constValues.itemLevel,
                //     // itemLevelAttackPower: constValues.itemLevelRangeAttackPower,
                //     attackPowerItemLevel: _.random(constValues.itemLevelAttackPower - constValues.itemLevelAttackPowerBlur, constValues.itemLevelAttackPower + constValues.itemLevelAttackPowerBlur),
                //     startItemLevel: constValues.startItemLevel,
                // });
                console.log(itemCategoryID, attackPower);
                calcValues.attackPowerSum = _.round(calcValues.attackPowerSum + attackPower, 2);
            }
        });
        console.log('constValues', constValues);
        console.log('calcValues', calcValues);

        // _.map(_.range(25, 101, 1), (itemLevel) => {
        //     let attackPower = formulas.attackPowerByRatio({
        //         baseAttackPowerConstant: constValues.baseItemConstant,
        //         ratio: database.item_categories.ratios.getRatio(ItemCategoryID.Breastplates, CharacterAttributeID.AttackPower),
        //         itemLevel: itemLevel,
        //         itemLevelAttackPower: constValues.itemLevelAttackPower,
        //         startItemLevel: constValues.startItemLevel,
        //     });
        //     console.log(itemLevel, attackPower);
        // });
    }

    private _gevClass() {
        let itemCharacterAttributeGenerator = new ItemAttributeGenerator();
        let characterAttributeTransfer = new CharacterAttributeTransfer();

        let constValues: any = {
            // itemLevel: 25,
            // itemLevel: 50,
            itemLevel: 125,
            heroClassID: HeroClassID.Barbarian,
        };
        let calcValues: any = {};

        calcValues.attackPowerSum = 0;
        calcValues.characterAttributeSum = 0;
        calcValues.healthPointsSum = 0;
        database.hero_classes.equip_sets.equipSet(constValues.heroClassID, (itemCategoryID, count) => {
            for (let i = 0; i < count; i++) {
                let healthPoints = itemCharacterAttributeGenerator.healthPoints(constValues.itemLevel, itemCategoryID, constValues.heroClassID);
                let attackPower = itemCharacterAttributeGenerator.attackPower(constValues.itemLevel, itemCategoryID, constValues.heroClassID);
                // let characterAttribute = itemCharacterAttributeGenerator.characterAttribute(constValues.itemLevel, itemCategoryID, constValues.heroClassID);
                // let characterAttribute = formulas.attackPowerToCharacterAttribute_reverse(attackPower, 2);
                let characterAttribute = characterAttributeTransfer.attackPowerToCharacterAttribute_reverse(attackPower);

                calcValues.healthPointsSum = _.round(calcValues.healthPointsSum + healthPoints);
                calcValues.characterAttributeSum = _.round(calcValues.characterAttributeSum + characterAttribute);
                calcValues.attackPowerSum = _.round(calcValues.attackPowerSum + attackPower);
                // console.log(constValues.heroClassID, itemCategoryID, attackPower, characterAttribute);
                console.log(constValues.heroClassID, itemCategoryID, {healthPoints: healthPoints, attackPower: attackPower});
            }
        });
        console.log(calcValues);
    }

    private _testSumWithBlur() {
        let constValues: any = {
            itemLevel: 250,
            heroClassID: HeroClassID.Warrior,
        };
        let calcValues: any = {};

        let itemCharacterAttributeGenerator = new ItemAttributeGenerator();

        let maxIteration = 100;
        let sums = {};
        for (let i = 0; i < maxIteration; i++) {
            calcValues.attackPowerSum = 0;
            database.hero_classes.equip_sets.equipSet(HeroClassID.Warrior, (itemCategoryID, count) => {
                for (let i = 0; i < count; i++) {
                    let attackPower = itemCharacterAttributeGenerator.attackPower(constValues.itemLevel, itemCategoryID, constValues.heroClassID);

                    calcValues.attackPowerSum = _.round(calcValues.attackPowerSum + attackPower);
                }
            });
            sums.hasOwnProperty(calcValues.attackPowerSum) ? sums[calcValues.attackPowerSum]++ : sums[calcValues.attackPowerSum] = 1;
            console.log(calcValues.attackPowerSum);
        }
        console.log(sums);
    }

    private _gevGenerateItems() {
        let items: TSDB_Item[] = [];
        let generateItems = new GenerateItems(this.container);
        generateItems.run(items);
        console.log('items', items);
    }

    private _use() {
        let itemCharacterAttributeGenerator = new ItemAttributeGenerator();

        let constValues: any = {
            // itemLevel: 25,
            // itemLevel: 50,
            // itemLevel: 125,
            heroClassID: HeroClassID.Barbarian,
        };
        let calcValues: any = {};

        let startItemLevel = 25;
        let itemLevel = 25;
        let itemLevelStep = 5;
        calcValues.attackPowerSum = 0;
        _.forEach(_.range(1, 101), (level) => {
            itemLevel = startItemLevel + _.floor(level / itemLevelStep) * itemLevelStep;
            // console.log(level, itemLevel);
            // console.log(itemLevel);

            database.hero_classes.equip_sets.equipSet(constValues.heroClassID, (itemCategoryID, count) => {
                for (let i = 0; i < count; i++) {
                    // let healthPoints = itemCharacterAttributeGenerator.healthPoints(constValues.itemLevel, itemCategoryID, constValues.heroClassID);
                    let attackPower = itemCharacterAttributeGenerator.attackPower(itemLevel, itemCategoryID, constValues.heroClassID);
                    // let characterAttribute = itemCharacterAttributeGenerator.characterAttribute(constValues.itemLevel, itemCategoryID, constValues.heroClassID);
                    // let characterAttribute = formulas.attackPowerToCharacterAttribute_reverse(attackPower, 2);
                    // let characterAttribute = characterAttributeTransfer.attackPowerToCharacterAttribute_reverse(attackPower);

                    // calcValues.healthPointsSum = _.round(calcValues.healthPointsSum + healthPoints);
                    // calcValues.characterAttributeSum = _.round(calcValues.characterAttributeSum + characterAttribute);
                    calcValues.attackPowerSum = _.round(calcValues.attackPowerSum + attackPower);
                    // console.log(constValues.heroClassID, itemCategoryID, attackPower, characterAttribute);
                    // console.log(constValues.heroClassID, itemCategoryID, {healthPoints: healthPoints, attackPower: attackPower});
                }
            });//end database
            console.log(level, itemLevel, calcValues.attackPowerSum);
            calcValues.attackPowerSum = 0;
        });
        // console.log(calcValues);

        // calcValues.attackPowerSum = 0;
        // calcValues.characterAttributeSum = 0;
        // calcValues.healthPointsSum = 0;
        // database.heroes.equip_sets.equipSet(constValues.heroClassID, (itemCategoryID, count) => {
        //     for (let i = 0; i < count; i++) {
        //         let healthPoints = itemCharacterAttributeGenerator.healthPoints(constValues.itemLevel, itemCategoryID, constValues.heroClassID);
        //         let attackPower = itemCharacterAttributeGenerator.attackPower(constValues.itemLevel, itemCategoryID, constValues.heroClassID);
        //         // let characterAttribute = itemCharacterAttributeGenerator.characterAttribute(constValues.itemLevel, itemCategoryID, constValues.heroClassID);
        //         // let characterAttribute = formulas.attackPowerToCharacterAttribute_reverse(attackPower, 2);
        //         let characterAttribute = characterAttributeTransfer.attackPowerToCharacterAttribute_reverse(attackPower);
        //
        //         calcValues.healthPointsSum = _.round(calcValues.healthPointsSum + healthPoints);
        //         calcValues.characterAttributeSum = _.round(calcValues.characterAttributeSum + characterAttribute);
        //         calcValues.attackPowerSum = _.round(calcValues.attackPowerSum + attackPower);
        //         // console.log(constValues.heroClassID, itemCategoryID, attackPower, characterAttribute);
        //         console.log(constValues.heroClassID, itemCategoryID, {healthPoints: healthPoints, attackPower: attackPower});
        //     }
        // });
        // console.log(calcValues);
    }

    private _gevGenerateItemsByPatterns() {
        let generateItemsByPattern = new GenerateItemsByPattern(
            this.container.get<ItemAttributeGenerator>(ServiceID.ItemAttributeGenerator),
            this.container.get<HeroCharacterAttributeGenerator>(ServiceID.HeroCharacterAttributeGenerator),
            this.container.get<ProductionValueGenerator>(ServiceID.ProductionValueGenerator),
        );

        let items: TSDB_ItemDB = {};
        let recipes: TSDB_RecipeDB = {};
        generateItemsByPattern.run(items, recipes);
        // console.log(items);
        // console.log(recipes);
    }
}