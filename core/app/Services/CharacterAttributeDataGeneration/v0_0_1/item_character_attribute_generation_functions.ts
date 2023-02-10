import _ from 'lodash';

/**
 * Округляются до целого только целевые значения: атрибут, хп.
 * todo: Формулы надо переделать. Чтобы в аргументах были только данные, а константы уже были внутри. Формулы можно представить в виде классов, в которых будут в том числе обратные формулы.
 */

function enemyDamageToHero(heroHealthPoints: number, ratio: number, fightTime: number): number {
    // return _.round(heroHealthPoints * ratio / fightTime, 2);
    return _.round(heroHealthPoints * ratio, 2);
}

function dpsByDamage(damage: number, fightTime: number): number {
    return _.round(damage / fightTime, 2);
}

function attackPowerByDPS(dps: number, attackSpeed: number): number {
    return _.round(dps * attackSpeed, 2);
}

function breastplateHealthPoints(heroHealthPoints: number, equipSlotsRatioSum: number): number {
    return _.round(heroHealthPoints / equipSlotsRatioSum, 2);
}

function itemHealthPointsByBreastplate(breastplateHealthPoints: number, ratio: number): number {
    return _.round(breastplateHealthPoints * ratio);
}

function breastplateAttackPower(heroAttackPower: number, equipSlotsRatioSum: number): number {
    return _.round(heroAttackPower / equipSlotsRatioSum,2);
}

function itemAttackPowerByBreastplate(breastplateAttackPower: number, ratio: number): number {
    return _.round(breastplateAttackPower * ratio, 2);
}

/**
 * Обратная формула: attackPowerByCharacterAttribute
 * @param attackPower
 * @param ratio
 */
function itemCharacterAttributeByAttackPower(attackPower: number, ratio: number): number {
    return _.round(attackPower / ratio);
}

/**
 * Обратная формула: itemCharacterAttributeByAttackPower
 * @param characterAttribute
 * @param ratio
 */
function attackPowerByCharacterAttribute(characterAttribute: number, ratio: number): number {
    return _.round(characterAttribute * ratio);
}

function heroHealthPointsByLevel(level: number, healthPointsStep: number): number {
    return _.round(level * healthPointsStep, 2);
}



function heroHealthPoints(heroLevel: number, healthPointsStep: number): number {
    return _.round(heroLevel * healthPointsStep, 2);
}

function enemyHealthPoints(heroHealthPoints: number, ratio: number): number {
    return _.round(heroHealthPoints * ratio);
}

function heroItemLevel(level: number, itemLevelStep: number): number {
    // return _.round(itemLevelStep * level, 2);
    return _.round(itemLevelStep * level);
}

function heroLevelByItemLevel(itemLevel: number, itemLevelStep: number): number {
    return _.round(itemLevel / itemLevelStep, 2);
}

function rawDamageFromFullEquip(heroAttackPower: number, rawDamageRatioFromFullEquip: number): number {
    return heroAttackPower * rawDamageRatioFromFullEquip;
}

export default {
    enemyDamageToHero: enemyDamageToHero,
    dpsByDamage: dpsByDamage,
    attackPowerByDPS: attackPowerByDPS,
    breastplateHealthPoints: breastplateHealthPoints,
    itemHealthPointsByBreastplate: itemHealthPointsByBreastplate,
    breastplateAttackPower: breastplateAttackPower,
    itemAttackPowerByBreastplate: itemAttackPowerByBreastplate,
    itemCharacterAttributeByAttackPower: itemCharacterAttributeByAttackPower,
    heroLevelByItemLevel: heroLevelByItemLevel,
    heroHealthPointsByLevel: heroHealthPointsByLevel,
    attackPowerByCharacterAttribute: attackPowerByCharacterAttribute,
    heroHealthPoints: heroHealthPoints,
    enemyHealthPoints: enemyHealthPoints,
    itemLevel: heroItemLevel,
    rawDamageFromFullEquip: rawDamageFromFullEquip,
};