import {level} from 'chalk';
import _ from 'lodash';
import {assert} from '../../../../source/assert.js';

/**
 * Рассчитывает точное универсальное значение силы атаки. Погрешность, класс учитывать выше. todo: Или в виде опций сделать?
 * @param values
 */
function attackPowerByRatio(values: {
    itemLevel: number,
    ratio: number,
    startItemLevel: number,
    startAttackPower: number,
    attackPowerItemLevel: number,
}) {
    assert(values.itemLevel >= values.startItemLevel, 'Значение itemLevel должно быть больше startItemLevel (начало рассчетов).');

    let attackPower = (values.startAttackPower + values.attackPowerItemLevel * (values.itemLevel - values.startItemLevel)) * values.ratio;

    return _.round(attackPower);
}

function characterAttributeToAttackPower(characterAttribute: number, ratio: number): number {
    return _.round(characterAttribute * ratio);
}

/**
 * Только для разработки.
 * @param attackPower
 * @param ratio
 */
function attackPowerToCharacterAttribute(attackPower: number, ratio: number): number {
    return _.round(attackPower / ratio);
}

function itemLevelToHeroLevel(values: {
    itemLevel: number,
    startHeroLevel: number,
    startItemLevel: number,
    itemLevelStep: number,
}): number {
    return 0;
}

function heroLevelToItemLevel(values: {
    heroLevel: number,
    startHeroLevel: number,
    startItemLevel: number,
    itemLevelStep: number,
}): number {
    // return (values.startItemLevel + values.itemLevelStep * _.ceil(values.heroLevel / values.itemLevelStep));
    return (values.startItemLevel + values.itemLevelStep * (_.ceil(values.heroLevel / values.itemLevelStep) - 1));
}

function universalCharacterAttributeByRatio(values: {
    itemLevel: number,
    ratio: number,
    startItemLevel: number,
    startValue: number,
    valueForItemLevel: number,
}) {
    assert(values.itemLevel >= values.startItemLevel, 'Значение itemLevel должно быть больше startItemLevel (начало рассчетов).');

    let value = (values.startValue + values.valueForItemLevel * (values.itemLevel - values.startItemLevel)) * values.ratio;

    return _.round(value);
}

export const formulas = {
    attackPowerByRatio: attackPowerByRatio,
    characterAttributeToAttackPower: characterAttributeToAttackPower,
    attackPowerToCharacterAttribute: attackPowerToCharacterAttribute,
    itemLevelToHeroLevel: itemLevelToHeroLevel,
    heroLevelToItemLevel: heroLevelToItemLevel,
    universalCharacterAttributeByRatio: universalCharacterAttributeByRatio,
};