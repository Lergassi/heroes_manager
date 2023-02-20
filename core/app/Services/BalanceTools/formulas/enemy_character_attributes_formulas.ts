//********************************
// Enemy.AttackPower
//********************************

import _ from 'lodash';

/**
 * Каждый удар героя наносит hitRatio урона врагу.
 * @param values
 */
function maxHealthPoints(values: {
    defaultFinalHeroAttackPower: number,
    heroHitRatioToEnemy: number,
}) {
    return _.round(values.defaultFinalHeroAttackPower / values.heroHitRatioToEnemy);
}

//********************************
// Enemy.HealthPoints
//********************************

/**
 * Враг наносит герою ratioDamageToHeroHealthPoints урона. hitRatio - кол-во урона за удар нужное для ratioDamageToHeroHealthPoints.
 * @param values
 */
function attackPower(values: {
    heroHealthPoints: number,
    enemyDamageRatioToHero: number,
    heroHitRatioToEnemy: number,
}) {
    return _.round(
        values.heroHealthPoints * values.enemyDamageRatioToHero * values.heroHitRatioToEnemy
    );
}

export const enemy_character_attributes_formulas = {
    maxHealthPoints: maxHealthPoints,
    attackPower: attackPower,
};
