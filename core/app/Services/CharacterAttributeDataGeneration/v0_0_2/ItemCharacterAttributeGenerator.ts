import _ from 'lodash';
import debug from 'debug';
import {database} from '../../../../data/ts/database.js';
import {CharacterAttributeID} from '../../../../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../../../types/enums/HeroClassID.js';
import {ItemCategoryID} from '../../../../types/enums/ItemCategoryID.js';
import {item_balance_formulas} from './item_balance_formulas.js';

/**
 * Важно! По умолчанию данный алгоритм генерирует НЕ случайные значения. Это нужно для контроля правильности работы алгоритма. todo: Разделить на части: базовое значение и рейты для класса + погрешность и случайные величины, и/или добавить сюда контроль точных значений.
 */
export default class ItemCharacterAttributeGenerator {
    /**
     * Не пупать начальное значение и прибавку за 1 илвл. Начальное baseItemConstant это просто условное значение для формулы.
     * @private
     */
    private readonly _config = {
        startAttackPower: 2,
        // baseItemConstantDispersion: 2,
        baseItemConstantDispersion: 0,
        // baseItemConstantDispersion: 1,
        itemLevelAttackPower: 2,
        // itemLevelAttackPowerDispersion: 2,
        itemLevelAttackPowerDispersion: 0,
        // itemLevelAttackPowerDispersion: 1,
        startItemLevel: 25,
        attackPowerByCharacterAttributeRatio: 2,

        startHealthPoints: 8,
        healthPointsForItemLevel: 4,
    };

    healthPoints(itemLevel: number, itemCategoryID: ItemCategoryID, heroClassID?: HeroClassID): number {
        return item_balance_formulas.universalCharacterAttributeByRatio({
            itemLevel: itemLevel,
            ratio: database.item_categories.ratios.ratio(itemCategoryID, CharacterAttributeID.AttackPower),
            startValue: this._config.startHealthPoints,
            startItemLevel: this._config.startItemLevel,
            valueForItemLevel: this._config.healthPointsForItemLevel,
        });
    }

    attackPower(itemLevel: number, itemCategoryID: ItemCategoryID, heroClassID?: HeroClassID): number {
        return item_balance_formulas.attackPowerByRatio({
            startAttackPower: _.random(this._config.startAttackPower - this._config.baseItemConstantDispersion, this._config.startAttackPower + this._config.baseItemConstantDispersion),
            ratio: database.item_categories.ratios.ratio(itemCategoryID, CharacterAttributeID.AttackPower),
            itemLevel: itemLevel,
            attackPowerItemLevel: _.random(this._config.itemLevelAttackPower - this._config.itemLevelAttackPowerDispersion, this._config.itemLevelAttackPower + this._config.itemLevelAttackPowerDispersion),
            startItemLevel: this._config.startItemLevel,
        });
    }

    characterAttribute(itemLevel: number, itemCategoryID: ItemCategoryID, heroClassID?: HeroClassID): number {
        return item_balance_formulas.attackPowerToCharacterAttribute(this.attackPower(itemLevel, itemCategoryID, heroClassID), this._config.attackPowerByCharacterAttributeRatio);
    }
}