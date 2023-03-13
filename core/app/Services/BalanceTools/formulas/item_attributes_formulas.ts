import {level} from 'chalk';
import _, {defaultTo} from 'lodash';
import {assert} from '../../../../source/assert.js';
import AppError from '../../../../source/Errors/AppError.js';

function defaultAttackPower(values: {
    itemLevel: number,
    startAttackPower: number,
    attackPowerItemLevel: number,
}): number {
    return _.round(values.startAttackPower + values.attackPowerItemLevel * ( values.itemLevel - 1 ) );
}

/**
 * Рассчитывает точное универсальное значение силы атаки. Погрешность, класс учитывать отдельно при необходимости. todo: Или в виде опций сделать?
 * @param values
 */
function attackPower(values: {
    default: number,
    ratio: number,
}) {
    return _.round(values.default * values.ratio);
}

function defaultHealthPoints(values: {
    itemLevel: number,
    startHealthPoints: number,
    healthPointsItemLevel: number,
}): number {
    return _.round(values.startHealthPoints + values.healthPointsItemLevel * ( values.itemLevel - 1 ) );
}

function healthPoints(values: {
    default: number,
    ratio: number,
}) {
    return _.round(values.default * values.ratio);
}

function characterAttributeToAttackPower(characterAttribute: number, ratio: number): number {
    return _.round(characterAttribute * ratio);
}

function attackPowerToCharacterAttribute_revers(attackPower: number, ratio: number): number {
    return _.round(attackPower / ratio);
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

// itemLevelsCount: function (values: {
//     level: number,
//     level: number,
// }) {
//     return this.heroLevelCorrespondsToItemLevel({
//         heroLevel: 0, itemLevelStep: 0, startItemLevel: 0
//     });
// }

function universalCharacterAttributeByRatio(values: {
    itemLevel: number,
    ratio: number,
    startItemLevel: number,
    startValue: number,
    valueForItemLevel: number,
}) {
    let value = (values.startValue + values.valueForItemLevel * (values.itemLevel - values.startItemLevel)) * values.ratio;

    return _.round(value);
}

function productionCost(values: {
    itemLevel: number,
    startValue: number,
    valueForItemLevel: number,
}) {
    return _.round((values.startValue + values.valueForItemLevel * (values.itemLevel - 1)));
}

export const item_attributes_formulas = {
    defaultAttackPower: defaultAttackPower,
    attackPower: attackPower,

    defaultHealthPoints: defaultHealthPoints,
    healthPoints: healthPoints,

    characterAttributeToAttackPower: characterAttributeToAttackPower,
    attackPowerToCharacterAttribute_revers: attackPowerToCharacterAttribute_revers,
    itemLevelToHeroLevel: itemLevelToHeroLevel,
    heroLevelCorrespondsToItemLevel: heroLevelCorrespondsToItemLevel,
    universalCharacterAttributeByRatio: universalCharacterAttributeByRatio,

    productionCost: productionCost,
};