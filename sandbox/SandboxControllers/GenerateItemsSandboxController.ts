import _ from 'lodash';
import {Simulate} from 'react-dom/test-utils';
import {sprintf} from 'sprintf-js';
import HeroClass from '../../core/app/Entities/HeroClass.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import item_character_attribute_generation_functions
    from '../../core/app/Services/ItemGeneration/item_character_attribute_generation_functions.js';
import balance from '../../core/app/Services/ItemGeneration/item_character_attribute_generation_functions.js';
import ItemCharacterAttributeGenerator from '../../core/app/Services/ItemGeneration/ItemCharacterAttributeGenerator.js';
import config from '../../core/config/config.js';
import GenerateItems from '../../core/scripts/GenerateItems.js';
import {ArmorMaterialID} from '../../core/types/enums/ArmorMaterialID.js';
import {CharacterAttributeID} from '../../core/types/enums/CharacterAttributeID.js';
import {EquipSlotID} from '../../core/types/enums/EquipSlotID.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import {ItemCategoryID} from '../../core/types/enums/ItemCategoryID.js';
import {QualityID} from '../../core/types/enums/QualityID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import {ItemDatabaseRow} from '../../core/types/ItemDatabaseRow.js';
import AbstractSandboxController from './AbstractSandboxController.js';
import copy = Simulate.copy;

export default class GenerateItemsSandboxController extends AbstractSandboxController {
    private readonly _entityManager = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);

    run(): void {
        // this._getStarted();
        // this._devStartValues();
        // this._averageItemLevel();
        // this._massAverageItemLevel();
        // this._devAPI();
        // this._testAPI();
        // this._devGenerateItems();
        this._devItemGenerator();
    }

    private _getStarted() {
        let allEquipSlotIDs = [
            EquipSlotID.Head,
            EquipSlotID.Shoulders,
            EquipSlotID.Chest,
            EquipSlotID.Wrist,
            EquipSlotID.Hands,
            EquipSlotID.Waist,
            EquipSlotID.Legs,
            EquipSlotID.Foots,
            EquipSlotID.Neck,
            EquipSlotID.Finger01,
            EquipSlotID.Finger02,
            EquipSlotID.RightHand,
            EquipSlotID.LeftHand,
        ];

        let heroHP = 100;
        let enemyHP = 200;
        let heroDamageToEnemy = enemyHP;
        let heroDamageToEnemyError = 0.05;
        let heroDamageToEnemyErrorRange = [
            _.round(heroDamageToEnemy - heroDamageToEnemy * heroDamageToEnemyError, 2),
            _.round(heroDamageToEnemy + heroDamageToEnemy * heroDamageToEnemyError, 2),
        ];
        let enemyDamageToHeroPart = 0.3;
        let enemyDamageToHeroPartError = 0.03;
        let heroDamageFromEnemyPartRange = [
            _.round(enemyDamageToHeroPart - enemyDamageToHeroPartError, 2),
            _.round(enemyDamageToHeroPart + enemyDamageToHeroPartError, 2)
        ];
        let heroAttackPower = 40;
        let enemyAttackPower = 9
        let heroAttackSpeed = 2;
        let enemyAttackSpeed = 3;
        // let heroDPS = 10;
        let heroDPS = _.round(heroAttackPower / heroAttackSpeed);
        let enemyDPS = _.round(enemyAttackPower / enemyAttackSpeed);

        let fightTime = 10;

        let heroDamage = heroDPS * fightTime;
        console.log(_.inRange(heroDamage, heroDamageToEnemyErrorRange[0], heroDamageToEnemyErrorRange[1]), 'Урон героя равен хп врага.', heroDamage, enemyHP);
        let enemyDamage = enemyDPS * fightTime;
        console.log(_.inRange(_.round(enemyDamage / heroHP,2), heroDamageFromEnemyPartRange[0], heroDamageFromEnemyPartRange[1]), 'Урон врага по герою составляет 30% от хп героя.', enemyDamage, heroHP);
    }

    private _devStartValues(input?: any) {
        let constValues: any = {};
        let calcValues: any = {};
        let testValues: any = {};

        /**
         * Начальные данные для определения всех остальных показателей. Значения взяты из стандартной ситуации из вова бфа-шл, когда сражение рогой с обычным врагом длиться примерно 10 секунд и противник наносит герою примерно 30% хп (на самом деле не 30, но уже не помню сколько точно).
         */
        constValues.fightTime = 10;
        constValues.equipSlotsCount = 13;   //Пока без тринкета.

        constValues.enemyHealthPointsRatio = 2;
        // constValues.heroHP = 100;
        constValues.heroHP = 1111;
        // constValues.enemyHP = input?.enemyHealthPoints ?? 2444;
        // constValues.enemyHP = 100;
        constValues.enemyHP = balance.enemyHealthPoints(constValues.heroHP, constValues.enemyHealthPointsRatio);
        // constValues.enemyHP = 1000;
        // constValues.enemyHP = 1000;
        // constValues.enemyHP = 2000;
        // constValues.enemyHP = 10000;
        // constValues.enemyHP = 20000;
        // constValues.enemyHP = 200000;
        // constValues.heroHP = _.round(constValues.enemyHP * constValues.enemyHealthPointsRatio);   //calc
        constValues.enemyDamageToHeroPart = 0.3;

        constValues.rawDamageRatioFromFullEquip = 0.1;
        constValues.attackPowerByCharacterAttributeRatio = 2;
        // constValues.attackPowerByCharacterAttributeRatio = 0.5;

        constValues.heroHealthPointsStep = 50;
        constValues.itemLevelStep = 4.5;
        constValues.maxItemLevel = 500;
        constValues.maxHeroLevel = 100;

        constValues.heroAttackSpeed = 2;
        constValues.enemyAttackSpeed = 3;

        calcValues.heroDPS = balance.dpsByDamage(constValues.enemyHP, constValues.fightTime);
        calcValues.enemyDPS = balance.dpsByDamage(balance.enemyDamageToHero(constValues.heroHP, constValues.enemyDamageToHeroPart, constValues.fightTime), constValues.fightTime);

        calcValues.heroAttackPower = balance.attackPowerByDPS(calcValues.heroDPS, constValues.heroAttackSpeed);
        calcValues.rawHeroAttackPower = calcValues.heroAttackPower * constValues.rawDamageRatioFromFullEquip;
        calcValues.heroAttackPowerWithOnlyEquip = calcValues.heroAttackPower - calcValues.rawHeroAttackPower;
        calcValues.enemyAttackPower = _.round(calcValues.enemyDPS * constValues.enemyAttackSpeed, 2);

        // console.log(constValues);
        // console.log(calcValues);

        let equipRatio: any = {
            [ItemCategoryID.Helmets]: {ratio: 0.5, count: 1},
            [ItemCategoryID.ShoulderPads]: {ratio: 0.3, count: 1},
            [ItemCategoryID.Breastplates]: {ratio: 1, count: 1},
            [ItemCategoryID.Bracers]: {ratio: 0.2, count: 1},
            [ItemCategoryID.Gloves]: {ratio: 0.3, count: 1},
            [ItemCategoryID.Belts]: {ratio: 0.2, count: 1},
            [ItemCategoryID.Pants]: {ratio: 0.6, count: 1},
            [ItemCategoryID.Boots]: {ratio: 0.4, count: 1},

            [ItemCategoryID.Amulets]: {ratio: 0.6, count: 1},   //9
            [ItemCategoryID.Rings]: {ratio: 0.3, count: 2},     //10,11

            // [ItemCategoryID.Trinkets]: {ratio: 4, count: 1},

            // [ItemCategoryID.OneHandedSwords]: {ratio: 2, count: 2}, //12
            [ItemCategoryID.OneHandedSwords]: {ratio: 2, count: 1}, //12
            // [ItemCategoryID.Shields]: {ratio: 8, count: 1}, //12
            // [ItemCategoryID.TwoHandedSwords]: {ratio: 4, count: 1},
        };

        let itemAttackPowerRatio: any = {
            [ItemCategoryID.Helmets]: equipRatio[ItemCategoryID.Helmets],
            [ItemCategoryID.ShoulderPads]: equipRatio[ItemCategoryID.ShoulderPads],
            [ItemCategoryID.Breastplates]: equipRatio[ItemCategoryID.Breastplates],
            [ItemCategoryID.Bracers]: equipRatio[ItemCategoryID.Bracers],
            [ItemCategoryID.Gloves]: equipRatio[ItemCategoryID.Gloves],
            [ItemCategoryID.Belts]: equipRatio[ItemCategoryID.Belts],
            [ItemCategoryID.Pants]: equipRatio[ItemCategoryID.Pants],
            [ItemCategoryID.Boots]: equipRatio[ItemCategoryID.Boots],
            [ItemCategoryID.Amulets]: equipRatio[ItemCategoryID.Amulets],
            [ItemCategoryID.Rings]: equipRatio[ItemCategoryID.Rings],
            [ItemCategoryID.OneHandedSwords]: equipRatio[ItemCategoryID.OneHandedSwords],
        };

        let itemHealthPointsRatio: any = {
            [ItemCategoryID.Helmets]: equipRatio[ItemCategoryID.Helmets],
            [ItemCategoryID.ShoulderPads]: equipRatio[ItemCategoryID.ShoulderPads],
            [ItemCategoryID.Breastplates]: equipRatio[ItemCategoryID.Breastplates],
            [ItemCategoryID.Bracers]: equipRatio[ItemCategoryID.Bracers],
            [ItemCategoryID.Gloves]: equipRatio[ItemCategoryID.Gloves],
            [ItemCategoryID.Belts]: equipRatio[ItemCategoryID.Belts],
            [ItemCategoryID.Pants]: equipRatio[ItemCategoryID.Pants],
            [ItemCategoryID.Boots]: equipRatio[ItemCategoryID.Boots],
            [ItemCategoryID.Amulets]: equipRatio[ItemCategoryID.Amulets],
            [ItemCategoryID.Rings]: equipRatio[ItemCategoryID.Rings],
        };

        console.log('constValues', constValues);
        console.log('calcValues', calcValues);
        console.log('-'.repeat(64));

        /*
            HealthPoints
         */

        calcValues.breastplateHealthPoints = balance.breastplateHealthPoints(constValues.heroHP, _.sum(_.map(itemHealthPointsRatio, (item) => {
            return item.ratio * item.count;
        })));

        let equipHealthPointsByRatio: any = {};
        for (const key in itemHealthPointsRatio) {
            equipHealthPointsByRatio[key] = balance.itemHealthPointsByBreastplate(calcValues.breastplateHealthPoints, equipRatio[key].ratio);
        }
        console.log('equipHealthPointsByRatio', equipHealthPointsByRatio);
        console.log('-'.repeat(64));

        /*
            AttackPower
         */

        calcValues.breastplateAttackPower = balance.breastplateAttackPower(calcValues.heroAttackPowerWithOnlyEquip, _.sum(_.map(itemAttackPowerRatio, (item) => {
            return item.ratio * item.count;
        })));

        let itemAttackPowerByRatio: any = {};
        for (const key in equipRatio) {
            itemAttackPowerByRatio[key] = balance.itemAttackPowerByBreastplate(calcValues.breastplateAttackPower, equipRatio[key].ratio);
        }
        console.log('itemAttackPowerByRatio', itemAttackPowerByRatio);

        let itemCharacterAttributesByAttackPower: any = {};
        calcValues.itemCharacterAttributesSum = 0;
        for (const key in itemAttackPowerByRatio) {
            itemCharacterAttributesByAttackPower[key] = balance.itemCharacterAttributeByAttackPower(itemAttackPowerByRatio[key], constValues.attackPowerByCharacterAttributeRatio);
            calcValues.itemCharacterAttributesSum = _.round(calcValues.itemCharacterAttributesSum + itemCharacterAttributesByAttackPower[key] * equipRatio[key].count);
        }
        console.log('itemCharacterAttributesByAttackPower', itemCharacterAttributesByAttackPower);
        // console.log(ItemCategoryID.Helmets, itemCharacterAttributesByAttackPower[ItemCategoryID.Helmets]);
        // console.log(ItemCategoryID.Breastplates, itemCharacterAttributesByAttackPower[ItemCategoryID.Breastplates]);
        // console.log(ItemCategoryID.Rings, itemCharacterAttributesByAttackPower[ItemCategoryID.Rings]);

        /*
            Востановление и проверки.
         */

        let attackPowerByCharacterAttributes: any = {};
        for (const key in itemCharacterAttributesByAttackPower) {
            attackPowerByCharacterAttributes[key] = balance.attackPowerByCharacterAttribute(itemCharacterAttributesByAttackPower[key], constValues.attackPowerByCharacterAttributeRatio);
        }
        console.log('attackPowerByCharacterAttributes', attackPowerByCharacterAttributes);

        testValues.resultHeroAttackPowerWithEquip = 0;
        for (const key in equipRatio) {
            testValues.resultHeroAttackPowerWithEquip += _.round(attackPowerByCharacterAttributes[key] * equipRatio[key].count, 2);
        }
        testValues.resultHeroAttackPowerWithEquip = _.round(testValues.resultHeroAttackPowerWithEquip, 2);
        // testValues.resultHeroAttackPowerWithEquipByAgilitySum = this._heroAttackPowerByAgility(calcValues.agilitySum);
        testValues.resultHeroAttack = testValues.resultHeroAttackPowerWithEquip + calcValues.rawHeroAttackPower;
        console.log('testValues', testValues);
    }

    private _averageItemLevel() {
        let itemLevelRange = 13;
        let itemLevel = 110;
        let itemLevels = _.map(_.range(0, itemLevelRange), () => {
            return itemLevel;
        });

        let constValues: any = {};
        let calcValues: any = {};

        constValues.itemLevelStep = 4.5;
        constValues.heroHealthPointsStep = 50;

        calcValues.averageItemLevel = _.round(_.sum(itemLevels) / itemLevels.length, 2);
        calcValues.heroLevel = this._heroLevel(calcValues.averageItemLevel, constValues.itemLevelStep);
        calcValues.heroHealthPoints = this._heroHealthPoints(calcValues.heroLevel, constValues.heroHealthPointsStep);
        calcValues.enemyHealthPoints = this._enemyHealthPoints(calcValues.heroHealthPoints);

        console.log(constValues);
        console.log(calcValues);
        console.log('-'.repeat(64));
        console.log('-'.repeat(64));

        this._devStartValues({
            enemyHealthPoints: calcValues.enemyHealthPoints,
        });
    }

    private _massAverageItemLevel() {
        let constValues: any = {};

        constValues.itemLevelStep = 4.5;
        constValues.heroHealthPointsStep = 50;

        let startItemLevel = 50;
        // let startItemLevel = 500;
        let itemLevelRange = 13;
        let endItemLevel = startItemLevel + (10 * itemLevelRange - 10);
        while (startItemLevel <= endItemLevel) {
            let calcValues: any = {};

            calcValues.averageItemLevel = _.round(startItemLevel, 2);
            calcValues.heroLevel = this._heroLevel(calcValues.averageItemLevel, constValues.itemLevelStep);
            calcValues.heroHealthPoints = this._heroHealthPoints(calcValues.heroLevel, constValues.heroHealthPointsStep);
            calcValues.enemyHealthPoints = this._enemyHealthPoints(calcValues.heroHealthPoints);

            console.log(calcValues);
            console.log('-'.repeat(64));

            this._devStartValues({
                enemyHealthPoints: calcValues.enemyHealthPoints,
            });

            console.log('-'.repeat(64));

            startItemLevel += 10;
        }

        // calcValues.averageItemLevel = _.round(_.sum(itemLevels) / itemLevels.length, 2);
        // calcValues.heroLevel = this._heroLevel(calcValues.averageItemLevel, constValues.itemLevelStep);
        // calcValues.heroHealthPoints = this._heroHealthPoints(calcValues.heroLevel, constValues.heroHealthPointsStep);
        // calcValues.enemyHealthPoints = this._enemyHealthPoints(calcValues.heroHealthPoints);
        //
        // console.log(calcValues);
        // console.log('-'.repeat(64));
        //
        // this._devStartValues({
        //     enemyHealthPoints: calcValues.enemyHealthPoints,
        // });
    }

    private _heroLevel(itemLevelHero: number, itemLevelStep: number): number {
        // return _.round(itemLevelHero / itemLevelStep, 2);
        return _.round(itemLevelHero / itemLevelStep);
    }

    private _heroHealthPoints(heroLevel: number, healthPointsLevelStep: number): number {
        return _.round(heroLevel * healthPointsLevelStep, 2);
    }

    private _heroAttackPowerByAgility(agility: number): number {
        return _.round(agility / 2, 2);
    }

    private _enemyHealthPoints(heroHealthPoints: number): number {
        return _.round(heroHealthPoints * 2, 2);
    }

    private _heroAgilityByAttackPower(attackPower: number, ratio: number): number {
        return _.round(attackPower * ratio);
        // return _.round(attackPower * ratio, 2);
    }

    private _devAPI() {
        let itemCharacterAttributeGenerator = new ItemCharacterAttributeGenerator();

        // let heroHealthPoints = itemCharacterAttributeGeneratorCharacterAttributeID.HealthPoints(110, ItemCategoryID.Helmets);
        // console.log('heroHealthPoints', heroHealthPoints);

        // let itemLevels = _.range(0, 501, 10);
        // _.map(itemLevels, (itemLevel) => {
        //     console.log(itemCharacterAttributeGeneratorCharacterAttributeID.HealthPoints(itemLevel, ItemCategoryID.Rings));
        // });

        console.log(itemCharacterAttributeGenerator.characterAttribute(100, HeroClassID.Warrior, ItemCategoryID.Helmets));
        console.log(itemCharacterAttributeGenerator.characterAttribute(100, HeroClassID.Warrior, ItemCategoryID.Breastplates));
        console.log(itemCharacterAttributeGenerator.characterAttribute(100, HeroClassID.Warrior, ItemCategoryID.Rings));
        // _.map(itemLevels, (itemLevel) => {
        //     // console.log(itemCharacterAttributeGenerator.characterAttribute(itemLevel, ItemCategoryID.Rings));
        //     itemCharacterAttributeGenerator.characterAttribute(itemLevel, ItemCategoryID.Rings);
        // });
    }

    private _testAPI() {
        console.log('---');
        let itemCharacterAttributeGenerator = new ItemCharacterAttributeGenerator();

        // let itemLevel = 10;
        let itemLevel = 100;
        // let heroClassID = HeroClassID.Warrior;
        let heroClassID = HeroClassID.Rogue;
        let itemCategoryID = ItemCategoryID.Breastplates;
        console.log({
            healthPoints: itemCharacterAttributeGenerator.healthPoints(itemLevel, itemCategoryID),
            strength: itemCharacterAttributeGenerator.characterAttribute(itemLevel, HeroClassID.Warrior, itemCategoryID),
        });

        // let armorSet = this.container.get(ServiceID.Data_CommonArmorSet);
        // let weaponSets = this.container.get(ServiceID.Data_WeaponSet);
        let healthPointsSum = 0;
        let characterAttributeSum = 0;
        // let commonArmorSet = this.container.get(ServiceID.Data_CommonArmorSet) as any;/* Без as {} выдает ошибку. Ниже если с получением по ключу ошибки нету. */
        let warriorEquipSet = this.container.get(ServiceID.Data_EquipSet)[heroClassID];
        // console.log('commonArmorSet', commonArmorSet);
        // console.log('warriorEquipSet', warriorEquipSet);
        // _.map(commonArmorSet, (data: any, itemCategoryID) => {
        _.map(warriorEquipSet, (data: any, itemCategoryID) => {
            _.map(_.range(0, data.count), (index) => {
                let healthPoints = itemCharacterAttributeGenerator.healthPoints(itemLevel, itemCategoryID as ItemCategoryID);
                let characterAttribute = itemCharacterAttributeGenerator.characterAttribute(itemLevel, heroClassID, itemCategoryID as ItemCategoryID);
                healthPointsSum += healthPoints;
                characterAttributeSum += characterAttribute;
                console.log({
                    itemCategoryID: itemCategoryID,
                    healthPoints: healthPoints,
                    characterAttribute: characterAttribute,
                });
            });
        });
        console.log('---');
        // _.map(warriorEquipSet, (data: any, itemCategoryID) => {
        //     _.map(_.range(0, data.count), (index) => {
        //         let characterAttribute = itemCharacterAttributeGenerator.characterAttribute(itemLevel, heroClassID, itemCategoryID as ItemCategoryID);
        //         characterAttributeSum += characterAttribute;
        //         console.log({
        //             itemCategoryID: itemCategoryID,
        //             characterAttribute: characterAttribute,
        //         });
        //     });
        // });
        // console.log(ItemCategoryID.Helmets, itemCharacterAttributeGenerator.characterAttribute(itemLevel, heroClassID, ItemCategoryID.Helmets));
        // console.log(ItemCategoryID.Breastplates, itemCharacterAttributeGenerator.characterAttribute(itemLevel, heroClassID, ItemCategoryID.Breastplates));
        // console.log(ItemCategoryID.Gloves, itemCharacterAttributeGenerator.characterAttribute(itemLevel, heroClassID, ItemCategoryID.Gloves));
        // console.log(ItemCategoryID.Rings, itemCharacterAttributeGenerator.characterAttribute(itemLevel, heroClassID, ItemCategoryID.Rings));
        // console.log(ItemCategoryID.OneHandedSwords, itemCharacterAttributeGenerator.characterAttribute(itemLevel, heroClassID, ItemCategoryID.OneHandedSwords));

        let enemyDPS = balance.dpsByDamage(balance.enemyDamageToHero(healthPointsSum, 0.3, 10), 10);
        let enemyAttackPower = _.round(enemyDPS * 3, 2);

        console.log({
            healthPointsSum: healthPointsSum,
            characterAttributeSum: characterAttributeSum,
            attackPower: balance.attackPowerByCharacterAttribute(characterAttributeSum, 2),
            // attackPower: balance.attackPowerByCharacterAttribute(characterAttributeSum, 0.5),
            enemyHealthPoints: balance.enemyHealthPoints(healthPointsSum, 2),
            enemyDamageToHero: balance.enemyDamageToHero(healthPointsSum, 0.3, 10),
            enemyDPS: enemyDPS,
            enemyAttackPower: enemyAttackPower,
        });
    }

    private _devGenerateItems() {
        let constValues = {
            slotsCount: 13,
            firstLevelUpdate: 2,
            maxLevel: 100,
            updateRange: 15,
        };
        console.log('constValues', constValues);

        let preparePositions = {
            1: {
                [ItemCategoryID.OneHandedSwords]: [constValues.firstLevelUpdate + 1],
                [ItemCategoryID.Shields]: [constValues.firstLevelUpdate + 2],
                [ItemCategoryID.Amulets]: [constValues.updateRange + constValues.firstLevelUpdate - 2],
                [ItemCategoryID.Rings]: [constValues.firstLevelUpdate + 5, constValues.updateRange + constValues.firstLevelUpdate],
            },
        };
        // console.log(preparePositions);

        let positions = {};
        for (let i = 1; i <= constValues.maxLevel; i++) {
            positions[i] = [];
        }

        for (const sampleNumber in preparePositions) {
            for (const itemCategoryID in preparePositions[sampleNumber]) {
                for (let i = 0; i < preparePositions[sampleNumber][itemCategoryID].length; i++) {
                    positions[preparePositions[sampleNumber][itemCategoryID][i]].push(itemCategoryID);
                }
            }
        }

        let calcValues: any = {};
        let itemCategories = this._createPrepareItemCategorySet(1);
        calcValues.currentSample = 1;
        calcValues.rangeStepError = 1;
        calcValues.rangeStep = _.round(constValues.updateRange / itemCategories.length);
        calcValues.currentLevelUpdate = constValues.firstLevelUpdate + _.random(0, calcValues.rangeStep + calcValues.rangeStepError);
        calcValues.currentMaxLevelRange = _.round(calcValues.currentLevelUpdate + constValues.updateRange * calcValues.currentSample);
        while (calcValues.currentLevelUpdate <= constValues.maxLevel) {
            for (let i = 0; i < itemCategories.length; i++) {
                positions[calcValues.currentLevelUpdate].push(itemCategories[i]);
                calcValues.currentLevelUpdate += calcValues.rangeStep +_.random(0, calcValues.rangeStepError);

                if (calcValues.currentLevelUpdate >= constValues.maxLevel) break;
            }

            calcValues.currentSample++;
            itemCategories = this._createPrepareItemCategorySet(calcValues.currentSample);
        }

        let heroClassID = HeroClassID.Warrior;
        let armorMaterialID = ArmorMaterialID.Plate;
        let qualityID = QualityID.Uncommon;
        let itemCharacterAttributeGenerator = new ItemCharacterAttributeGenerator();
        for (const level in positions) {
            for (let itemCategoryIndex = 0; itemCategoryIndex < positions[level].length; itemCategoryIndex++) {
                let itemLevel = item_character_attribute_generation_functions.itemLevel(Number(level), config.item_level_step);
                let itemAttributes: ItemDatabaseRow = {
                    ID: sprintf('%s_%s_%s_%s_%s', armorMaterialID, this._getMetadata(positions[level][itemCategoryIndex]).name, qualityID, itemLevel, '01'),
                    ItemCategoryID: positions[level][itemCategoryIndex],
                    ItemLevel: itemLevel,
                    QualityID: qualityID,
                    StackSize: 1,
                    Strength: 0,
                    Agility: 0,
                    Intelligence: 0,
                    Equipable: true,
                    TwoHandWeapon: false,
                };

                if (this._getMetadata(positions[level][itemCategoryIndex]).requireArmorMaterial) itemAttributes.ArmorMaterialID = armorMaterialID;
                if (this._getMetadata(positions[level][itemCategoryIndex]).twoHandWeapon) itemAttributes.TwoHandWeapon = true;

                itemAttributes[CharacterAttributeID.HealthPoints] = itemCharacterAttributeGenerator.healthPoints(itemLevel, positions[level][itemCategoryIndex]);
                itemAttributes[CharacterAttributeID.Strength] = itemCharacterAttributeGenerator.characterAttribute(itemLevel, heroClassID, positions[level][itemCategoryIndex]);
                console.log(itemAttributes);
            }
        }//end for
    }

    private _randomPosition(positions: []): number {
        if (!positions.length) return -1;

        return positions[_.random(0, positions.length - 1)];
    }

    private _defaultItemCategorySet = [
        ItemCategoryID.Helmets,
        ItemCategoryID.ShoulderPads,
        ItemCategoryID.Breastplates,
        ItemCategoryID.Bracers,
        ItemCategoryID.Gloves,
        ItemCategoryID.Belts,
        ItemCategoryID.Pants,
        ItemCategoryID.Boots,
        ItemCategoryID.Amulets,
        ItemCategoryID.Rings,
        ItemCategoryID.Rings,
        ItemCategoryID.OneHandedSwords,
        ItemCategoryID.Shields,
    ];

    private _prepareItemCategorySets = {
        1: [
            ItemCategoryID.Helmets,
            ItemCategoryID.ShoulderPads,
            ItemCategoryID.Breastplates,
            ItemCategoryID.Bracers,
            ItemCategoryID.Gloves,
            ItemCategoryID.Belts,
            ItemCategoryID.Pants,
            ItemCategoryID.Boots,
        ],
    }

    private _createPrepareItemCategorySet(sampleNumber: number) {
        if (!this._prepareItemCategorySets.hasOwnProperty(sampleNumber)) return _.shuffle([...this._defaultItemCategorySet]);

        return _.shuffle([...this._prepareItemCategorySets[sampleNumber]]);
    }

    private _itemMetadataByItemCategory = {
        [ItemCategoryID.Helmets]: {
            name: 'Helmet',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Helmets]: {
            name: 'Helmet',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.ShoulderPads]: {
            name: 'ShoulderPads',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Breastplates]: {
            name: 'Breastplate',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Gloves]: {
            name: 'Gloves',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Bracers]: {
            name: 'Bracelet',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Belts]: {
            name: 'Belt',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Pants]: {
            name: 'Pants',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Boots]: {
            name: 'Boots',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Shields]: {
            name: 'Shield',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Amulets]: {
            name: 'Amulet',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Rings]: {
            name: 'Ring',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
        [ItemCategoryID.OneHandedSwords]: {
            name: 'OneHandedSword',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
        [ItemCategoryID.TwoHandedSwords]: {
            name: 'TwoHandedSword',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: true,
        },
        [ItemCategoryID.OneHandedAxes]: {
            name: 'OneHandedAxe',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
        [ItemCategoryID.TwoHandedAxes]: {
            name: 'TwoHandedAxe',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: true,
        },
        [ItemCategoryID.Daggers]: {
            name: 'Dagger',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Bows]: {
            name: 'Bow',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: true,
        },
        [ItemCategoryID.Crossbows]: {
            name: 'Crossbow',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: true,
        },
        [ItemCategoryID.Revolvers]: {
            name: 'Revolver',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Staffs]: {
            name: 'Staff',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: true,
        },
        [ItemCategoryID.Wands]: {
            name: 'Wand',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
    };

    private _getMetadata(itemCategoryID: ItemCategoryID) {
        return this._itemMetadataByItemCategory[itemCategoryID];
    }

    private _devItemGenerator() {
        let items = [];
        let generateItems = new GenerateItems(this.container);
        generateItems.run(items);
    }
}