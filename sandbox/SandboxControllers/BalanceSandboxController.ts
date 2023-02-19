import _ from 'lodash'; _.isNil(undefined);
import debug from 'debug';
import Balance from '../../core/app/Services/Balance.js';
import {balance_formulas} from '../../core/app/Services/balance_formulas.js';
import {
    item_balance_formulas
} from '../../core/app/Services/CharacterAttributeDataGeneration/v0_0_2/item_balance_formulas.js';
import config from '../../core/config/config.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import AbstractSandboxController from './AbstractSandboxController.js';

export default class BalanceSandboxController extends AbstractSandboxController {
    run(): void {
        // this._devTools();
        // this._devBalance();
        // this._tests();
        // this._devFormulas();
    }

    private _devBalance() {
        let balance = new Balance();

        // let heroClassID = HeroClassID.Warrior;
        let heroClassID = HeroClassID.Barbarian;
        let ratio = 0.8;
        // let maxLevel
        let levels = _.range(1, 101);
        // let levels = [1, 100];
        _.forEach(levels, (level) => {
            let values: any = {};

            // let defaultAP = balance_formulas.defaultBaseHeroAttackPower({
            //     level: level,
            //     defaultHeroAttackPowerLevelIncrease: config.default_hero_attack_power_level_increase,
            //     startDefaultHeroAttackPower: config.start_default_hero_attack_power,
            // });
            // let baseAP = balance_formulas.baseHeroAttackPower({
            //     defaultValue: defaultAP,
            //     ratio: ratio,
            // });

            // let defaultAP = balance.defaultBaseHeroAttackPower(level);
            // let baseAP = balance.baseHeroAttackPower(level, heroClassID);
            // console.log(level, defaultAP, baseAP);

            // let defaultFinalAP = balance.defaultFinalHeroAttackPower(level);
            // console.log(level, defaultFinalAP);

            // balance.finalHeroAttackPower();
            // let equipAP = balance.equipHeroAttackPower(level, heroClassID);
            // console.log(level, equipAP);

            // values.defaultBaseAP = balance.defaultBaseHeroAttackPower(level);
            // // //Экипировки нету. Она не нужна отдельно для default.
            // values.defaultFinalAP = balance.defaultFinalHeroAttackPower(level);
            // //
            // values.baseAP = balance.baseHeroAttackPower(level, heroClassID);
            // values.equipAP = balance.equipHeroAttackPower(level, heroClassID);
            values.finalHeroAP = balance.finalHeroAttackPower(level, heroClassID);

            // values.defaultBaseHeroHP = balance.defaultBaseHeroHealthPoints(level);
            // values.defaultFinalHeroHP = balance.defaultFinalHeroHealthPoints(level);
            //
            // values.baseHeroHP = balance.baseHeroHealthPoints(level, heroClassID);
            // values.equipHeroHP = balance.equipHeroHealthPoints(level, heroClassID);
            values.finalHeroHP = balance.finalHeroMaxHealthPoints(level, heroClassID);
            // console.log(level, values);

            // values.defaultFinalHeroAP = balance.defaultFinalHeroAttackPower(level);
            values.enemyHP = balance.defaultEnemyMaxHealthPoints(level);
            values.enemyAP = balance.defaultEnemyAttackPower(level);
            console.log(level, values);
        });

        // _.forEach(_.range(0, 101), (level) => {
        //     console.log(level, balance_formulas.defaultBaseHeroAttackPower({
        //         level: level,
        //         defaultHeroAttackPowerLevelIncrease: config.default_hero_attack_power_level_increase,
        //         startDefaultHeroAttackPower: config.start_default_hero_attack_power,
        //     }));
        // });
    }

    private _tests() {
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

    private _devTools() {
        let balance = new Balance();

        // console.log(balance.summaryRatio(HeroClassID.Barbarian));
        // console.log(balance.summaryRatio(HeroClassID.Warrior));
        // console.log(balance.summaryRatio(HeroClassID.Rogue));
        // console.log(balance.summaryRatio(HeroClassID.Gunslinger));
        // console.log(balance.summaryRatio(HeroClassID.FireMage));
        // console.log(balance.summaryRatio(HeroClassID.Support1));
    }

    private _devFormulas() {
        _.forEach(_.range(1, 101), (level) => {
            console.log(level, item_balance_formulas.heroLevelToItemLevel({
                heroLevel: level,
                itemLevelStep: 5,
                startItemLevel: 25,
            }));
        });
    }
}