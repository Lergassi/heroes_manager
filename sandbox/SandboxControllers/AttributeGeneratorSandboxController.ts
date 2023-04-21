import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import EnemyCharacterAttributeGenerator from '../../core/app/Services/BalanceTools/EnemyCharacterAttributeGenerator.js';
import HeroCharacterAttributeGenerator from '../../core/app/Services/BalanceTools/HeroCharacterAttributeGenerator.js';
import ItemAttributeGenerator
    from '../../core/app/Services/BalanceTools/CharacterAttributeDataGeneration/v0_0_2/ItemAttributeGenerator.js';
import {item_attributes_formulas} from '../../core/app/Services/BalanceTools/formulas/item_attributes_formulas.js';
import config from '../../core/config/config.js';
import {database} from '../../core/data/ts/database.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import AbstractSandboxController from './AbstractSandboxController.js';

_.isNil(undefined);

export default class AttributeGeneratorSandboxController extends AbstractSandboxController {
    run(): void {
        // this._devTools();
        // this._devBalance();
        // this._tests();
        // this._devFormulas();
        this._devItems();
        // this._devSummary();
    }

    private _devBalance() {
        // let balance = new HeroCharacterAttributeGenerator();
        //
        // // let heroClassID = HeroClassID.Warrior;
        // let heroClassID = HeroClassID.Barbarian;
        // let ratio = 0.8;
        // // let maxLevel
        // let levels = _.range(1, 101);
        // // let levels = [1, 100];
        // _.forEach(levels, (level) => {
        //     let values: any = {};
        //
        //     // let defaultAP = balance_formulas.defaultBaseHeroAttackPower({
        //     //     level: level,
        //     //     defaultHeroAttackPowerLevelIncrease: config.default_hero_attack_power_level_increase,
        //     //     startDefaultHeroAttackPower: config.start_default_hero_attack_power,
        //     // });
        //     // let baseAP = balance_formulas.baseHeroAttackPower({
        //     //     defaultValue: defaultAP,
        //     //     ratio: ratio,
        //     // });
        //
        //     // let defaultAP = balance.defaultBaseHeroAttackPower(level);
        //     // let baseAP = balance.baseHeroAttackPower(level, heroClassID);
        //     // console.log(level, defaultAP, baseAP);
        //
        //     // let defaultFinalAP = balance.defaultFinalHeroAttackPower(level);
        //     // console.log(level, defaultFinalAP);
        //
        //     // balance.finalHeroAttackPower();
        //     // let equipAP = balance.equipHeroAttackPower(level, heroClassID);
        //     // console.log(level, equipAP);
        //
        //     // values.defaultBaseAP = balance.defaultBaseHeroAttackPower(level);
        //     // // //Экипировки нету. Она не нужна отдельно для default.
        //     // values.defaultFinalAP = balance.defaultFinalHeroAttackPower(level);
        //     // //
        //     // values.baseAP = balance.baseHeroAttackPower(level, heroClassID);
        //     // values.equipAP = balance.equipHeroAttackPower(level, heroClassID);
        //     values.finalHeroAP = balance.finalHeroAttackPower(level, heroClassID);
        //
        //     // values.defaultBaseHeroHP = balance.defaultBaseHeroHealthPoints(level);
        //     // values.defaultFinalHeroHP = balance.defaultFinalHeroHealthPoints(level);
        //     //
        //     // values.baseHeroHP = balance.baseHeroHealthPoints(level, heroClassID);
        //     // values.equipHeroHP = balance.equipHeroHealthPoints(level, heroClassID);
        //     values.finalHeroHP = balance.finalHeroMaxHealthPoints(level, heroClassID);
        //     // console.log(level, values);
        //
        //     // values.defaultFinalHeroAP = balance.defaultFinalHeroAttackPower(level);
        //     values.enemyHP = balance.defaultEnemyMaxHealthPoints(level);
        //     values.enemyAP = balance.defaultEnemyAttackPower(level);
        //     console.log(level, values);
        // });
        //
        // // _.forEach(_.range(0, 101), (level) => {
        // //     console.log(level, balance_formulas.defaultBaseHeroAttackPower({
        // //         level: level,
        // //         defaultHeroAttackPowerLevelIncrease: config.default_hero_attack_power_level_increase,
        // //         startDefaultHeroAttackPower: config.start_default_hero_attack_power,
        // //     }));
        // // });
    }

    private _tests1() {
        //formulas
        // console.log(balance_formulas.defaultBaseHeroAttackPower({
        //     level: 100,
        //     defaultHeroAttackPowerLevelIncrease: config.default_hero_attack_power_level_increase,
        //     startDefaultHeroAttackPower: config.start_default_hero_attack_power,
        // }) === 812);

        //object
        // let defaultAP = balance.defaultBaseHeroAttackPower(level);
        // let baseAP = balance.baseHeroAttackPower(heroClassID, level);
        // console.log(level, defaultAP, baseAP);
    }

    private _tests() {
        // let balance = new HeroCharacterAttributeGenerator();
        //
        // let heroClassID = HeroClassID.Warrior;
        // // let heroClassID = HeroClassID.Barbarian;
        // // let maxLevel
        // // let levels = _.range(1, 101);
        // let levels = [1, 100];
        // _.forEach(levels, (level) => {
        //     let valuesHeroes: any = {};
        //     let valuesEnemies: any = {};
        //
        //     // let defaultAP = balance_formulas.defaultBaseHeroAttackPower({
        //     //     level: level,
        //     //     defaultHeroAttackPowerLevelIncrease: config.default_hero_attack_power_level_increase,
        //     //     startDefaultHeroAttackPower: config.start_default_hero_attack_power,
        //     // });
        //     // let baseAP = balance_formulas.baseHeroAttackPower({
        //     //     defaultValue: defaultAP,
        //     //     ratio: ratio,
        //     // });
        //
        //     // let defaultAP = balance.defaultBaseHeroAttackPower(level);
        //     // let baseAP = balance.baseHeroAttackPower(level, heroClassID);
        //     // console.log(level, defaultAP, baseAP);
        //
        //     // let defaultFinalAP = balance.defaultFinalHeroAttackPower(level);
        //     // console.log(level, defaultFinalAP);
        //
        //     // balance.finalHeroAttackPower();
        //     // let equipAP = balance.equipHeroAttackPower(level, heroClassID);
        //     // console.log(level, equipAP);
        //
        //     valuesHeroes.defaultBaseAP = balance.defaultBaseHeroAttackPower(level);
        //     // //Экипировки нету. Она не нужна отдельно для default.
        //     valuesHeroes.defaultFinalAP = balance.defaultFinalHeroAttackPower(level);
        //     //
        //     valuesHeroes.baseAP = balance.baseHeroAttackPower(level, heroClassID);
        //     valuesHeroes.equipAP = balance.equipHeroAttackPower(level, heroClassID);
        //     valuesHeroes.finalHeroAP = balance.finalHeroAttackPower(level, heroClassID);
        //
        //     // values.defaultBaseHeroHP = balance.defaultBaseHeroHealthPoints(level);
        //     // values.defaultFinalHeroHP = balance.defaultFinalHeroHealthPoints(level);
        //     //
        //     // values.baseHeroHP = balance.baseHeroHealthPoints(level, heroClassID);
        //     // values.equipHeroHP = balance.equipHeroHealthPoints(level, heroClassID);
        //     // valuesHeroes.finalHeroHP = balance.finalHeroMaxHealthPoints(level, heroClassID);
        //     // console.log(level, values);
        //
        //     // values.defaultFinalHeroAP = balance.defaultFinalHeroAttackPower(level);
        //     valuesEnemies.enemyHP = balance.defaultEnemyMaxHealthPoints(level);
        //     valuesEnemies.enemyAP = balance.defaultEnemyAttackPower(level);
        //     console.log('heroes', level, valuesHeroes);
        //     // console.log('enemies', level, valuesEnemies);
        // });
    }

    private _devFormulas() {
        _.forEach(_.range(1, 101), (level) => {
            console.log(level, item_attributes_formulas.heroLevelCorrespondsToItemLevel({
                heroLevel: level,
                ratio: config.hero_level_corresponds_to_item_level_ratio,
            }));
        });
    }

    private _devSummary() {
        // let balanceTool = new HeroCharacterAttributeGenerator();
        let heroCharacterAttributeGenerator = this.container.get<HeroCharacterAttributeGenerator>(ServiceID.HeroCharacterAttributeGenerator);
        let enemyCharacterAttributeGenerator = this.container.get<EnemyCharacterAttributeGenerator>(ServiceID.EnemyCharacterAttributeGenerator);

        console.log('defaultBaseHeroHP 1 level', heroCharacterAttributeGenerator.defaultBaseHeroMaxHealthPoints(1));
        console.log('defaultBaseHeroHP 100 level', heroCharacterAttributeGenerator.defaultBaseHeroMaxHealthPoints(100));
        console.log('defaultFinalHeroHP 1 level', heroCharacterAttributeGenerator.defaultFinalHeroMaxHealthPoints(1));
        console.log('defaultFinalHeroHP 100 level', heroCharacterAttributeGenerator.defaultFinalHeroMaxHealthPoints(100));

        console.log('defaultBaseHeroAP 1 level', heroCharacterAttributeGenerator.defaultBaseHeroAttackPower(1));
        console.log('defaultBaseHeroAP 100 level', heroCharacterAttributeGenerator.defaultBaseHeroAttackPower(100));
        console.log('defaultFinalHeroAP 1 level', heroCharacterAttributeGenerator.defaultFinalHeroAttackPower(1));
        console.log('defaultFinalHeroAP 100 level', heroCharacterAttributeGenerator.defaultFinalHeroAttackPower(100));

        let heroClassID = HeroClassID.Warrior;

        console.log('heroes');
        console.log(heroClassID);

        console.log('heroBaseHP 1 level', heroCharacterAttributeGenerator.baseHeroMaxHealthPoints(1, heroClassID));
        console.log('heroBaseHP 100 level', heroCharacterAttributeGenerator.baseHeroMaxHealthPoints(100, heroClassID));
        console.log('heroEquipHP 1 level', heroCharacterAttributeGenerator.equipHeroMaxHealthPoints(1, heroClassID));
        console.log('heroEquipHP 100 level', heroCharacterAttributeGenerator.equipHeroMaxHealthPoints(100, heroClassID));
        console.log('heroFinalHP 1 level', heroCharacterAttributeGenerator.finalHeroMaxHealthPoints(1, heroClassID));
        console.log('heroFinalHP 100 level', heroCharacterAttributeGenerator.finalHeroMaxHealthPoints(100, heroClassID));

        console.log('heroBaseAP 1 level', heroCharacterAttributeGenerator.baseHeroAttackPower(1, heroClassID));
        console.log('heroBaseAP 100 level', heroCharacterAttributeGenerator.baseHeroAttackPower(100, heroClassID));
        console.log('heroEquipAP 1 level', heroCharacterAttributeGenerator.equipHeroAttackPower(1, heroClassID));
        console.log('heroEquipAP 100 level', heroCharacterAttributeGenerator.equipHeroAttackPower(100, heroClassID));
        console.log('heroFinalAP 1 level', heroCharacterAttributeGenerator.finalHeroAttackPower(1, heroClassID));
        console.log('heroFinalAP 100 level', heroCharacterAttributeGenerator.finalHeroAttackPower(100, heroClassID));

        console.log('enemies');

        console.log('enemyHP 1 level', enemyCharacterAttributeGenerator.maxHealthPoints(1));
        console.log('enemyHP 100 level', enemyCharacterAttributeGenerator.maxHealthPoints(100));
        console.log('enemyAP 1 level', enemyCharacterAttributeGenerator.attackPower(1));
        console.log('enemyAP 100 level', enemyCharacterAttributeGenerator.attackPower(100));
    }

    private _devItems() {
        let itemAttributeGenerator = new ItemAttributeGenerator();

        let heroClassID = HeroClassID.Warrior;
        let itemLevels = [1, 160];
        _.forEach(itemLevels, (itemLevel) => {
            let values: any = {};

            values.itemLevel = itemLevel;
            // values.defaultAP = item_attributes_formulas.defaultHealthPoints({
            //     itemLevel: itemLevel,
            //     startHealthPoints: config.start_item_level_health_points,
            //     healthPointsItemLevel: config.item_level_increase_health_points,
            // });
            // values.AP = item_attributes_formulas.healthPoints({
            //     default: values.defaultAP,
            //     ratio: database.item_categories.ratios.ratio(ItemCategoryID.Helmets, CharacterAttributeID.MaxHealthPoints),
            // });

            values.defaultHP = itemAttributeGenerator.defaultHealthPoints(itemLevel);
            // values[] = itemAttributeGenerator.healthPoints(itemLevel, ItemCategoryID.Helmets);
            database.hero_classes.equip_sets.equipSet(heroClassID, (itemCategoryID, count) => {
                values[sprintf('%sHP', itemCategoryID)] = itemAttributeGenerator.healthPoints(itemLevel, itemCategoryID);
            });

            values.defaultAP = itemAttributeGenerator.defaultAttackPower(itemLevel);
            database.hero_classes.equip_sets.equipSet(heroClassID, (itemCategoryID, count) => {
                values[sprintf('%sAP', itemCategoryID)] = itemAttributeGenerator.attackPower(itemLevel, itemCategoryID);
            });

            console.log(values);
        });
        // console.log(itemAttributeGenerator.defailt(160, ItemCategoryID.Breastplates));
        // console.log(itemAttributeGenerator.attackPower(160, ItemCategoryID.Breastplates));
    }
}