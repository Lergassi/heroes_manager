import _ from 'lodash';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import balance from '../../core/app/Services/Balance/balance.js';
import ItemCharacterAttributeGenerator from '../../core/app/Services/Balance/ItemCharacterAttributeGenerator.js';
import {EquipSlotID} from '../../core/types/enums/EquipSlotID.js';
import {ItemCategoryID} from '../../core/types/enums/ItemCategoryID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import AbstractSandboxController from './AbstractSandboxController.js';

export default class GenerateItemsSandboxController extends AbstractSandboxController {
    private readonly _entityManager = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);

    run(): void {
        // this._getStarted();
        // this._devStartValues();
        // this._averageItemLevel();
        // this._massAverageItemLevel();
        // this._devAPI();
        this._testAPI();
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
        // constValues.attackPowerByCharacterAttributeRatio = 2;
        constValues.attackPowerByCharacterAttributeRatio = 0.5;

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
            [ItemCategoryID.Bracelets]: {ratio: 0.2, count: 1},
            [ItemCategoryID.Gloves]: {ratio: 0.3, count: 1},
            [ItemCategoryID.Belts]: {ratio: 0.2, count: 1},
            [ItemCategoryID.Pants]: {ratio: 0.6, count: 1},
            [ItemCategoryID.Boots]: {ratio: 0.4, count: 1},

            [ItemCategoryID.Amulets]: {ratio: 0.6, count: 1},
            [ItemCategoryID.Rings]: {ratio: 0.3, count: 2},

            // [ItemCategoryID.Trinkets]: {ratio: 4, count: 1},

            [ItemCategoryID.OneHandedSwords]: {ratio: 2, count: 2},
            // [ItemCategoryID.TwoHandedSwords]: {ratio: 4, count: 1},
        };

        let itemAttackPowerRatio: any = {
            [ItemCategoryID.Helmets]: equipRatio[ItemCategoryID.Helmets],
            [ItemCategoryID.ShoulderPads]: equipRatio[ItemCategoryID.ShoulderPads],
            [ItemCategoryID.Breastplates]: equipRatio[ItemCategoryID.Breastplates],
            [ItemCategoryID.Bracelets]: equipRatio[ItemCategoryID.Bracelets],
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
            [ItemCategoryID.Bracelets]: equipRatio[ItemCategoryID.Bracelets],
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

        // let heroHealthPoints = itemCharacterAttributeGenerator.healthPoints(110, ItemCategoryID.Helmets);
        // console.log('heroHealthPoints', heroHealthPoints);

        // let itemLevels = _.range(0, 501, 10);
        // _.map(itemLevels, (itemLevel) => {
        //     console.log(itemCharacterAttributeGenerator.healthPoints(itemLevel, ItemCategoryID.Rings));
        // });

        console.log(itemCharacterAttributeGenerator.characterAttribute(100, ItemCategoryID.Helmets));
        console.log(itemCharacterAttributeGenerator.characterAttribute(100, ItemCategoryID.Breastplates));
        console.log(itemCharacterAttributeGenerator.characterAttribute(100, ItemCategoryID.Rings));
        // _.map(itemLevels, (itemLevel) => {
        //     // console.log(itemCharacterAttributeGenerator.characterAttribute(itemLevel, ItemCategoryID.Rings));
        //     itemCharacterAttributeGenerator.characterAttribute(itemLevel, ItemCategoryID.Rings);
        // });
    }

    private _testAPI() {
        let itemCharacterAttributeGenerator = new ItemCharacterAttributeGenerator();

        let itemLevel = 225;
        let itemCategoryID = ItemCategoryID.Breastplates;
        console.log({
            healthPoints: itemCharacterAttributeGenerator.healthPoints(itemLevel, itemCategoryID),
            strength: itemCharacterAttributeGenerator.characterAttribute(itemLevel, itemCategoryID),
        });
    }
}

interface ItemCharacterAttributeGeneratorInterface {
    healthPoints(itemLevel: number): number;
    // attackPower(itemLevel: number): number;
    characterAttribute(itemLevel: number): number;

    // heroLevel(itemLevel): number;
    // heroHealthPoints(level: number): number;
    // heroAttackPower(characterAttribute: number): number;

    // enemyHealthPoints(heroHealthPoints: number): number;
}