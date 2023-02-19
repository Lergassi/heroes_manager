import {level} from 'chalk';
import _ from 'lodash';
import {assert} from '../../../../source/assert.js';
import AppError from '../../../../source/Errors/AppError.js';

export const item_balance_formulas = {
    /**
     * Рассчитывает точное универсальное значение силы атаки. Погрешность, класс учитывать отдельно при необходимости. todo: Или в виде опций сделать?
     * @param values
     */
    attackPowerByRatio: function (values: {
        itemLevel: number,
        ratio: number,
        startItemLevel: number,
        startAttackPower: number,
        attackPowerItemLevel: number,
    }) {
        assert(values.itemLevel >= values.startItemLevel, 'Значение itemLevel должно быть больше startItemLevel (начало рассчетов).');

        let attackPower = (values.startAttackPower + values.attackPowerItemLevel * (values.itemLevel - values.startItemLevel)) * values.ratio;

        return _.round(attackPower);
    },
    characterAttributeToAttackPower: function (characterAttribute: number, ratio: number): number {
        return _.round(characterAttribute * ratio);
    },
    /**
     * Только для разработки.
     * @param attackPower
     * @param ratio
     */
    attackPowerToCharacterAttribute: function (attackPower: number, ratio: number): number {
        return _.round(attackPower / ratio);
    },
    itemLevelToHeroLevel: function (values: {
        itemLevel: number,
        startItemLevel: number,
        itemLevelStep: number,
    }): number {
        throw AppError.indev();

        return 0;
    },
    heroLevelToItemLevel: function (values: {
        heroLevel: number,
        startItemLevel: number,
        itemLevelStep: number,
    }): number {
        return _.round(
            values.startItemLevel + values.itemLevelStep * _.floor(values.heroLevel / values.itemLevelStep)
        );
    },
    // itemLevelsCount: function (values: {
    //     level: number,
    //     level: number,
    // }) {
    //     return this.heroLevelToItemLevel({
    //         heroLevel: 0, itemLevelStep: 0, startItemLevel: 0
    //     });
    // },
    universalCharacterAttributeByRatio: function (values: {
        itemLevel: number,
        ratio: number,
        startItemLevel: number,
        startValue: number,
        valueForItemLevel: number,
    }) {
        // assert(values.itemLevel >= values.startItemLevel, 'Значение itemLevel должно быть больше startItemLevel (начало рассчетов).');

        let value = (values.startValue + values.valueForItemLevel * (values.itemLevel - values.startItemLevel)) * values.ratio;

        return _.round(value);
    },
};