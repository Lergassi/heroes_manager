import {HeroClassID} from '../../types/enums/HeroClassID.js';
import _ from 'lodash';

//Нужна идея для подстановки формул.
// export type BalanceFormula_DefaultBaseHeroAttackPowerType = {
//     level: number,
//     startDefaultHeroAttackPower: number,
//     defaultHeroAttackPowerLevelIncrease: number,
// };

export const balance_formulas = {
    /* Hero.HealthPoints */

    defaultBaseHeroMaxHealthPoints: function (values: {
        level: number,
        startDefaultHeroHealthPoints: number,
        defaultHeroHealthPointsLevelIncrease: number,
    }) {
        return values.startDefaultHeroHealthPoints + values.defaultHeroHealthPointsLevelIncrease * (values.level - 1);
    },
    baseHeroMaxHealthPoints: function (values: {
        defaultValue: number,
        ratio: number,
    }) {
        return _.round(values.defaultValue * values.ratio);
    },

    /* Hero.AttackPower */

    defaultBaseHeroAttackPower: function (values: {
        level: number,
        startDefaultHeroAttackPower: number,
        defaultHeroAttackPowerLevelIncrease: number,
    }) {
        return values.startDefaultHeroAttackPower + values.defaultHeroAttackPowerLevelIncrease * (values.level - 1);
    },
    baseHeroAttackPower: function (values: {
        defaultValue: number,
        ratio: number,
    }) {
        return _.round(values.defaultValue * values.ratio);
    },

    /* Enemy.AttackPower */

    /**
     * Каждый удар героя наносит hitRatio урона врагу.
     * @param values
     */
    enemyMaxHealthPoints: function (values: {
        finalHeroAttackPower: number,
        heroHitRatioToEnemy: number,
    }) {
        return _.round(
            values.finalHeroAttackPower / values.heroHitRatioToEnemy,
        );
    },

    /* Enemy.HealthPoints */

    /**
     * Враг наносит герою ratioDamageToHeroHealthPoints урона. hitRatio - кол-во урона за удар нужное для ratioDamageToHeroHealthPoints.
     * @param values
     */
    enemyAttackPower: function (values: {
        heroHealthPoints: number,
        enemyDamageRatioToHero: number,
        heroHitRatioToEnemy: number,
    }) {
        return _.round(
            values.heroHealthPoints * values.enemyDamageRatioToHero * values.heroHitRatioToEnemy
        );
    },
};