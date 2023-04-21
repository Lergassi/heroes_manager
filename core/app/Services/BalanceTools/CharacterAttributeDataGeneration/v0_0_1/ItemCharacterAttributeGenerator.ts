import _ from 'lodash';
import {CharacterAttributeID} from '../../../../../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../../../../types/enums/HeroClassID.js';
import {ItemCategoryID} from '../../../../../types/enums/ItemCategoryID.js';
import balance from './item_character_attribute_generation_functions.js';

/**
 * @deprecated
 */
export default class ItemCharacterAttributeGenerator {
    private _config: any;

    constructor() {
        this._configure();
    }

    private _configure(): void {
        this._config = {};

        this._config.maxItemLevel = 500;
        this._config.maxHeroLevel = 100;
        this._config.heroHealthPointsStep = 50;
        this._config.itemLevelStep = 4.5;
        this._config.fightTime = 10;
        this._config.equipSlotsCount = 13;  //Пока без тринкета.
        this._config.enemyHealthPointsRatio = 2;
        this._config.enemyDamageToHeroPart = 0.3;
        this._config.rawDamageRatioFromFullEquip = 0.1;
        this._config.attackPowerByCharacterAttributeRatio = 2;
        this._config.heroAttackSpeed = 2;
        this._config.enemyAttackSpeed = 3;

        this._config.itemCategoryRatios = {
            [ItemCategoryID.Helmets]: {
                [CharacterAttributeID.MaxHealthPoints]: 0.5,
                [CharacterAttributeID.AttackPower]: 0.5
            },  //todo: Добавить другие атрибуты.
            [ItemCategoryID.ShoulderPads]: {
                [CharacterAttributeID.MaxHealthPoints]: 0.3,
                [CharacterAttributeID.AttackPower]: 0.3
            },
            [ItemCategoryID.Breastplates]: {
                [CharacterAttributeID.MaxHealthPoints]: 1,
                [CharacterAttributeID.AttackPower]: 1
            },
            [ItemCategoryID.Bracers]: {
                [CharacterAttributeID.MaxHealthPoints]: 0.2,
                [CharacterAttributeID.AttackPower]: 0.2
            },
            [ItemCategoryID.Gloves]: {
                [CharacterAttributeID.MaxHealthPoints]: 0.3,
                [CharacterAttributeID.AttackPower]: 0.3
            },
            [ItemCategoryID.Belts]: {
                [CharacterAttributeID.MaxHealthPoints]: 0.2,
                [CharacterAttributeID.AttackPower]: 0.2
            },
            [ItemCategoryID.Pants]: {
                [CharacterAttributeID.MaxHealthPoints]: 0.6,
                [CharacterAttributeID.AttackPower]: 0.6
            },
            [ItemCategoryID.Boots]: {
                [CharacterAttributeID.MaxHealthPoints]: 0.4,
                [CharacterAttributeID.AttackPower]: 0.4
            },
            [ItemCategoryID.Amulets]: {
                [CharacterAttributeID.MaxHealthPoints]: 0.6,
                [CharacterAttributeID.AttackPower]: 0.6
            },
            [ItemCategoryID.Rings]: {
                [CharacterAttributeID.MaxHealthPoints]: 0.3,
                [CharacterAttributeID.AttackPower]: 0.3
            },
            [ItemCategoryID.OneHandedSwords]: {
                [CharacterAttributeID.MaxHealthPoints]: 0,
                [CharacterAttributeID.AttackPower]: 2
            },
            [ItemCategoryID.TwoHandedSwords]: {
                [CharacterAttributeID.MaxHealthPoints]: 0,
                [CharacterAttributeID.AttackPower]: 4
            },
            [ItemCategoryID.Daggers]: {
                [CharacterAttributeID.MaxHealthPoints]: 0,
                [CharacterAttributeID.AttackPower]: 4
            },
            [ItemCategoryID.Shields]: {
                [CharacterAttributeID.MaxHealthPoints]: 0,
                [CharacterAttributeID.AttackPower]: 2
            },
        };
        this._config.healthPointsCommonEquipSets = {
            [ItemCategoryID.Helmets]: {count: 1},
            [ItemCategoryID.ShoulderPads]: {count: 1},
            [ItemCategoryID.Breastplates]: {count: 1},
            [ItemCategoryID.Bracers]: {count: 1},
            [ItemCategoryID.Gloves]: {count: 1},
            [ItemCategoryID.Belts]: {count: 1},
            [ItemCategoryID.Pants]: {count: 1},
            [ItemCategoryID.Boots]: {count: 1},
            [ItemCategoryID.Amulets]: {count: 1},
            [ItemCategoryID.Rings]: {count: 2},
        };
        this._config.__itemAttackPowerCommonEquipSets = {
            [ItemCategoryID.Helmets]: {count: 1},
            [ItemCategoryID.ShoulderPads]: {count: 1},
            [ItemCategoryID.Breastplates]: {count: 1},
            [ItemCategoryID.Bracers]: {count: 1},
            [ItemCategoryID.Gloves]: {count: 1},
            [ItemCategoryID.Belts]: {count: 1},
            [ItemCategoryID.Pants]: {count: 1},
            [ItemCategoryID.Boots]: {count: 1},
            [ItemCategoryID.Amulets]: {count: 1},
            [ItemCategoryID.Rings]: {count: 2},
        };
        this._config.itemAttackPowerCommonWeaponSets = {
            [HeroClassID.Warrior]: {
                [ItemCategoryID.OneHandedSwords]: {count: 1},
            },
            [HeroClassID.Rogue]: {
                [ItemCategoryID.Daggers]: {count: 2},
            },
            [HeroClassID.Gunslinger]: {
                [ItemCategoryID.Revolvers]: {count: 2},
            },
            [HeroClassID.FireMage]: {
                [ItemCategoryID.Staffs]: {count: 1},
            },
            [HeroClassID.Support1]: {
                [ItemCategoryID.Staffs]: {count: 1},
            },
        };
        this._config.itemAttackPowerEquipSet = {
            [HeroClassID.Warrior]: _.assign(
                {},
                this._config.itemAttackPowerCommonWeaponSets[HeroClassID.Warrior],
                this._config.__itemAttackPowerCommonEquipSets,
            ),
            [HeroClassID.Rogue]: _.assign(
                {},
                this._config.itemAttackPowerCommonWeaponSets[HeroClassID.Rogue],
                this._config.__itemAttackPowerCommonEquipSets,
            ),
            [HeroClassID.Gunslinger]: _.assign(
                {},
                this._config.itemAttackPowerCommonWeaponSets[HeroClassID.Gunslinger],
                this._config.__itemAttackPowerCommonEquipSets,
            ),
            [HeroClassID.FireMage]: _.assign(
                {},
                this._config.itemAttackPowerCommonWeaponSets[HeroClassID.FireMage],
                this._config.__itemAttackPowerCommonEquipSets,
            ),
            [HeroClassID.Support1]: _.assign(
                {},
                this._config.itemAttackPowerCommonWeaponSets[HeroClassID.Support1],
                this._config.__itemAttackPowerCommonEquipSets,
            ),
        };

        // this._config.equipRatio_legacy = {
        //     [ItemCategoryID.Helmets]: {ratio: 0.5, count: 1},
        //     [ItemCategoryID.ShoulderPads]: {ratio: 0.3, count: 1},
        //     [ItemCategoryID.Breastplates]: {ratio: 1, count: 1},
        //     [ItemCategoryID.Bracelets]: {ratio: 0.2, count: 1},
        //     [ItemCategoryID.Gloves]: {ratio: 0.3, count: 1},
        //     [ItemCategoryID.Belts]: {ratio: 0.2, count: 1},
        //     [ItemCategoryID.Pants]: {ratio: 0.6, count: 1},
        //     [ItemCategoryID.Boots]: {ratio: 0.4, count: 1},
        //
        //     [ItemCategoryID.Amulets]: {ratio: 0.6, count: 1},
        //     [ItemCategoryID.Rings]: {ratio: 0.3, count: 2},
        //
        //     // [ItemCategoryID.Trinkets]: {ratio: 4, count: 1},
        //
        //     [ItemCategoryID.OneHandedSwords]: {ratio: 2, count: 2},
        //     // [ItemCategoryID.TwoHandedSwords]: {ratio: 4, count: 1},
        // };
        // this._config.itemAttackPowerRatio = {
        //     [ItemCategoryID.Helmets]: this._config.equipRatio_legacy[ItemCategoryID.Helmets],
        //     [ItemCategoryID.ShoulderPads]: this._config.equipRatio_legacy[ItemCategoryID.ShoulderPads],
        //     [ItemCategoryID.Breastplates]: this._config.equipRatio_legacy[ItemCategoryID.Breastplates],
        //     [ItemCategoryID.Bracelets]: this._config.equipRatio_legacy[ItemCategoryID.Bracelets],
        //     [ItemCategoryID.Gloves]: this._config.equipRatio_legacy[ItemCategoryID.Gloves],
        //     [ItemCategoryID.Belts]: this._config.equipRatio_legacy[ItemCategoryID.Belts],
        //     [ItemCategoryID.Pants]: this._config.equipRatio_legacy[ItemCategoryID.Pants],
        //     [ItemCategoryID.Boots]: this._config.equipRatio_legacy[ItemCategoryID.Boots],
        //     [ItemCategoryID.Amulets]: this._config.equipRatio_legacy[ItemCategoryID.Amulets],
        //     [ItemCategoryID.Rings]: this._config.equipRatio_legacy[ItemCategoryID.Rings],
        //     [ItemCategoryID.OneHandedSwords]: this._config.equipRatio_legacy[ItemCategoryID.OneHandedSwords],
        // };
        // this._config.itemHealthPointsRatio = {
        //     [ItemCategoryID.Helmets]: this._config.equipRatio_legacy[ItemCategoryID.Helmets],
        //     [ItemCategoryID.ShoulderPads]: this._config.equipRatio_legacy[ItemCategoryID.ShoulderPads],
        //     [ItemCategoryID.Breastplates]: this._config.equipRatio_legacy[ItemCategoryID.Breastplates],
        //     [ItemCategoryID.Bracelets]: this._config.equipRatio_legacy[ItemCategoryID.Bracelets],
        //     [ItemCategoryID.Gloves]: this._config.equipRatio_legacy[ItemCategoryID.Gloves],
        //     [ItemCategoryID.Belts]: this._config.equipRatio_legacy[ItemCategoryID.Belts],
        //     [ItemCategoryID.Pants]: this._config.equipRatio_legacy[ItemCategoryID.Pants],
        //     [ItemCategoryID.Boots]: this._config.equipRatio_legacy[ItemCategoryID.Boots],
        //     [ItemCategoryID.Amulets]: this._config.equipRatio_legacy[ItemCategoryID.Amulets],
        //     [ItemCategoryID.Rings]: this._config.equipRatio_legacy[ItemCategoryID.Rings],
        // };
        //
        // let commonAttackRatio = {
        //     [ItemCategoryID.Helmets]: this._config.equipRatio_legacy[ItemCategoryID.Helmets],
        //     [ItemCategoryID.ShoulderPads]: this._config.equipRatio_legacy[ItemCategoryID.ShoulderPads],
        //     [ItemCategoryID.Breastplates]: this._config.equipRatio_legacy[ItemCategoryID.Breastplates],
        //     [ItemCategoryID.Bracelets]: this._config.equipRatio_legacy[ItemCategoryID.Bracelets],
        //     [ItemCategoryID.Gloves]: this._config.equipRatio_legacy[ItemCategoryID.Gloves],
        //     [ItemCategoryID.Belts]: this._config.equipRatio_legacy[ItemCategoryID.Belts],
        //     [ItemCategoryID.Pants]: this._config.equipRatio_legacy[ItemCategoryID.Pants],
        //     [ItemCategoryID.Boots]: this._config.equipRatio_legacy[ItemCategoryID.Boots],
        //     [ItemCategoryID.Amulets]: this._config.equipRatio_legacy[ItemCategoryID.Amulets],
        //     [ItemCategoryID.Rings]: this._config.equipRatio_legacy[ItemCategoryID.Rings],
        // };
    }

    healthPoints(itemLevel: number, itemCategoryID: ItemCategoryID): number {
        let heroLevel = balance.heroLevelByItemLevel(itemLevel, this._config.itemLevelStep);
        let heroHealthPoints = balance.heroHealthPointsByLevel(heroLevel, this._config.heroHealthPointsStep);

        let breastplateHealthPointsValue = balance.breastplateHealthPoints(heroHealthPoints, _.round(_.sum(_.map(this._config.healthPointsCommonEquipSets, (item, innerItemCategoryID) => {
            return this._getItemCategoryRatio(innerItemCategoryID as ItemCategoryID, CharacterAttributeID.MaxHealthPoints) * item.count;
        })), 2));

        let characterAttributeValue = balance.itemHealthPointsByBreastplate(breastplateHealthPointsValue, this._getItemCategoryRatio(itemCategoryID, CharacterAttributeID.MaxHealthPoints));

        return characterAttributeValue;
    }

    characterAttribute(itemLevel: number, heroClassID: HeroClassID, itemCategoryID: ItemCategoryID): number {
        let debugValues: any = {};

        let heroLevel = balance.heroLevelByItemLevel(itemLevel, this._config.itemLevelStep);
        debugValues.heroLevel = heroLevel;

        let heroHealthPoints = balance.heroHealthPointsByLevel(heroLevel, this._config.heroHealthPointsStep);
        let enemyHealthPoints = balance.enemyHealthPoints(heroHealthPoints, this._config.enemyHealthPointsRatio);
        debugValues.heroHealthPoints = heroHealthPoints;
        debugValues.enemyHealthPoints = enemyHealthPoints;

        let heroDPS = balance.dpsByDamage(enemyHealthPoints, this._config.fightTime);
        debugValues.heroDPS = heroDPS;

        let heroAttackPower = balance.attackPowerByDPS(heroDPS, this._config.heroAttackSpeed);
        let rawHeroAttackPower = balance.rawDamageFromFullEquip(heroAttackPower, this._config.rawDamageRatioFromFullEquip);
        let heroAttackPowerWithOnlyEquip = heroAttackPower - rawHeroAttackPower;
        debugValues.heroAttackPower = heroAttackPower;

        let breastplateAttackPower = balance.breastplateAttackPower(heroAttackPowerWithOnlyEquip, this._getAttackPowerSumByEquipSet(heroClassID));
        debugValues.breastplateAttackPower = breastplateAttackPower;

        let itemAttackPowerByRatio = balance.itemAttackPowerByBreastplate(breastplateAttackPower, this._getItemCategoryRatio(itemCategoryID, CharacterAttributeID.AttackPower));
        debugValues.itemAttackPowerByRatio = itemAttackPowerByRatio;

        let itemCharacterAttributesByAttackPower = balance.itemCharacterAttributeByAttackPower(itemAttackPowerByRatio, this._config.attackPowerByCharacterAttributeRatio);
        debugValues.itemCharacterAttributesByAttackPower = itemCharacterAttributesByAttackPower;

        // console.log('debugValues', debugValues);

        return itemCharacterAttributesByAttackPower;
    }

    private _getItemCategoryRatio(itemCategoryID: ItemCategoryID, characterAttributeID: CharacterAttributeID): number {
        return this._config.itemCategoryRatios[itemCategoryID]?.[characterAttributeID] ?? 0;
    }

    // private _getItemCategoryCountInEquipSet(heroClassID: HeroClassID, itemCategoryID: ItemCategoryID): number {
    //     return this._config.itemAttackPowerEquipSet[heroClassID]?.[itemCategoryID] ?? 0;
    // }

    private _getAttackPowerSumByEquipSet(heroClassID: HeroClassID): number {
        return _.round(_.sum(_.map(this._config.itemAttackPowerEquipSet[heroClassID] ?? {}, (data, itemCategoryID) => {
            return this._getItemCategoryRatio(itemCategoryID as ItemCategoryID, CharacterAttributeID.AttackPower) * data.count;
        })), 2);
    }
}