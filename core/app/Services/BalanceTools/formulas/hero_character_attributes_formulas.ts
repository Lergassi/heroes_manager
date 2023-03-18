import _ from 'lodash';
import AppError from '../../../../source/Errors/AppError';

//Нужна идея для подстановки формул.
// export type BalanceFormula_DefaultBaseHeroAttackPowerType = {
//     level: number,
//     startDefaultHeroAttackPower: number,
//     defaultHeroAttackPowerLevelIncrease: number,
// };

//********************************
// HealthPoints
//********************************

function defaultBaseHeroMaxHealthPoints(values: {
    level: number,
    startDefaultHeroHealthPoints: number,
    defaultHeroHealthPointsLevelIncrease: number,
}) {
    return _.round(values.startDefaultHeroHealthPoints + values.defaultHeroHealthPointsLevelIncrease * (values.level - 1));
}

function baseHeroMaxHealthPoints(values: {
    defaultValue: number,
    ratio: number,
}) {
    return _.round(values.defaultValue * values.ratio);
}

//********************************
// AttackPower
//********************************

function defaultBaseHeroAttackPower(values: {
    level: number,
    startDefaultHeroAttackPower: number,
    defaultHeroAttackPowerLevelIncrease: number,
}) {
    return _.round(values.startDefaultHeroAttackPower + values.defaultHeroAttackPowerLevelIncrease * (values.level - 1));
}

function baseHeroAttackPower(values: {
    defaultValue: number,
    ratio: number,
}) {
    return _.round(values.defaultValue * values.ratio);
}

function itemLevelToHeroLevel(values: {
    itemLevel: number,
    startItemLevel: number,
    itemLevelStep: number,
}): number {
    throw AppError.indev();

    return 0;
}

/**
 * Минимальный средний ilvl героя на определенный уровен.
 * @param values
 */
function heroLevelCorrespondsToItemLevel(values: {
    heroLevel: number,
    ratio: number,
}): number {
    return _.floor(values.heroLevel * values.ratio);
}

export const hero_character_attributes_formulas = {
    itemLevelToHeroLevel: itemLevelToHeroLevel,
    heroLevelCorrespondsToItemLevel: heroLevelCorrespondsToItemLevel,

    defaultBaseHeroMaxHealthPoints: defaultBaseHeroMaxHealthPoints,
    baseHeroMaxHealthPoints: baseHeroMaxHealthPoints,
    defaultBaseHeroAttackPower: defaultBaseHeroAttackPower,
    baseHeroAttackPower: baseHeroAttackPower,
};