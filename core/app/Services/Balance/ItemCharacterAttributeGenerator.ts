import _ from 'lodash';
import debug from 'debug';
import {EquipSlotID} from '../../../types/enums/EquipSlotID.js';
import {ItemCategoryID} from '../../../types/enums/ItemCategoryID.js';
import {ItemID} from '../../../types/enums/ItemID.js';
import balance from './balance.js';

export default class ItemCharacterAttributeGenerator {
    private _config: any;

    constructor() {
        this._configure();
    }

    private _configure(): void {
        this._config = {};

        // heroHealthPoints: 100,
        // enemyHealthPoints: enemyHealthPoints(constValues.heroHP, constValues.enemyHealthPointsRatio),
        this._config.maxItemLevel = 500;
        this._config.maxHeroLevel = 100;
        this._config.heroHealthPointsStep = 50;
        this._config.itemLevelStep = 4.5;
        this._config.fightTime = 10;
        this._config.equipSlotsCount = 13;  //Пока без тринкета.
        this._config.enemyHealthPointsRatio = 2;
        this._config.enemyDamageToHeroPart = 0.3;
        this._config.rawDamageRatioFromFullEquip = 0.1;
        this._config.attackPowerByCharacterAttributeRatio = 0.5;
        this._config.heroAttackSpeed = 2;
        this._config.enemyAttackSpeed = 3;
        this._config.equipRatio = {
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
        this._config.itemAttackPowerRatio = {
            [ItemCategoryID.Helmets]: this._config.equipRatio[ItemCategoryID.Helmets],
            [ItemCategoryID.ShoulderPads]: this._config.equipRatio[ItemCategoryID.ShoulderPads],
            [ItemCategoryID.Breastplates]: this._config.equipRatio[ItemCategoryID.Breastplates],
            [ItemCategoryID.Bracelets]: this._config.equipRatio[ItemCategoryID.Bracelets],
            [ItemCategoryID.Gloves]: this._config.equipRatio[ItemCategoryID.Gloves],
            [ItemCategoryID.Belts]: this._config.equipRatio[ItemCategoryID.Belts],
            [ItemCategoryID.Pants]: this._config.equipRatio[ItemCategoryID.Pants],
            [ItemCategoryID.Boots]: this._config.equipRatio[ItemCategoryID.Boots],
            [ItemCategoryID.Amulets]: this._config.equipRatio[ItemCategoryID.Amulets],
            [ItemCategoryID.Rings]: this._config.equipRatio[ItemCategoryID.Rings],
            [ItemCategoryID.OneHandedSwords]: this._config.equipRatio[ItemCategoryID.OneHandedSwords],
        };
        this._config.itemHealthPointsRatio = {
            [ItemCategoryID.Helmets]: this._config.equipRatio[ItemCategoryID.Helmets],
            [ItemCategoryID.ShoulderPads]: this._config.equipRatio[ItemCategoryID.ShoulderPads],
            [ItemCategoryID.Breastplates]: this._config.equipRatio[ItemCategoryID.Breastplates],
            [ItemCategoryID.Bracelets]: this._config.equipRatio[ItemCategoryID.Bracelets],
            [ItemCategoryID.Gloves]: this._config.equipRatio[ItemCategoryID.Gloves],
            [ItemCategoryID.Belts]: this._config.equipRatio[ItemCategoryID.Belts],
            [ItemCategoryID.Pants]: this._config.equipRatio[ItemCategoryID.Pants],
            [ItemCategoryID.Boots]: this._config.equipRatio[ItemCategoryID.Boots],
            [ItemCategoryID.Amulets]: this._config.equipRatio[ItemCategoryID.Amulets],
            [ItemCategoryID.Rings]: this._config.equipRatio[ItemCategoryID.Rings],
        };
    }

    healthPoints(itemLevel: number, itemCategoryID: ItemCategoryID): number {
        let heroLevel = balance.heroLevelByItemLevel(itemLevel, this._config.itemLevelStep);
        let heroHealthPoints = balance.heroHealthPointsByLevel(heroLevel, this._config.heroHealthPointsStep);

        let breastplateHealthPointsValue = balance.breastplateHealthPoints(heroHealthPoints, _.sum(_.map(this._config.itemHealthPointsRatio, (item) => {
            return item.ratio * item.count;
        })));

        let characterAttributeValue = balance.itemHealthPointsByBreastplate(breastplateHealthPointsValue, this._config.equipRatio[itemCategoryID].ratio);

        return characterAttributeValue;
    }

    characterAttribute(itemLevel: number, itemCategoryID: ItemCategoryID): number {
        let heroLevel = balance.heroLevelByItemLevel(itemLevel, this._config.itemLevelStep);

        let heroHealthPoints = balance.heroHealthPointsByLevel(heroLevel, this._config.heroHealthPointsStep);
        let enemyHealthPointsValue = balance.enemyHealthPoints(heroHealthPoints, this._config.enemyHealthPointsRatio);

        let heroDPS = balance.dpsByDamage(enemyHealthPointsValue, this._config.fightTime);

        let heroAttackPower = balance.attackPowerByDPS(heroDPS, this._config.heroAttackSpeed);
        let rawHeroAttackPower = balance.rawDamageFromFullEquip(heroAttackPower, this._config.rawDamageRatioFromFullEquip);
        let heroAttackPowerWithOnlyEquip = heroAttackPower - rawHeroAttackPower;

        let breastplateAttackPower = balance.breastplateAttackPower(heroAttackPowerWithOnlyEquip, _.sum(_.map(this._config.itemAttackPowerRatio, (item) => {
            return item.ratio * item.count;
        })));

        let itemAttackPowerByRatio = balance.itemAttackPowerByBreastplate(breastplateAttackPower, this._config.equipRatio[itemCategoryID].ratio);

        let itemCharacterAttributesByAttackPower = balance.itemCharacterAttributeByAttackPower(itemAttackPowerByRatio, this._config.attackPowerByCharacterAttributeRatio);

        return itemCharacterAttributesByAttackPower;
    }
}