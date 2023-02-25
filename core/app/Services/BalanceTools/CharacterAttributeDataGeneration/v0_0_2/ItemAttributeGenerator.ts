import config from '../../../../../config/config.js';
import {database} from '../../../../../data/ts/database.js';
import {HeroClassID} from '../../../../../types/enums/HeroClassID.js';
import {ItemAttributeID} from '../../../../../types/enums/ItemAttributeID.js';
import {ItemCategoryID} from '../../../../../types/enums/ItemCategoryID.js';
import {item_attributes_formulas} from '../../formulas/item_attributes_formulas.js';

/**
 * Важно! По умолчанию данный алгоритм генерирует ТОЧНЫЕ значения, а НЕ случайные. Это нужно для удобства и контроля правильности работы алгоритма. todo: Разделить на части: базовое значение и рейты для класса + погрешность и случайные величины, и/или добавить сюда контроль точных значений. А также случайные значения не нужны в случае с онлайн игрой - все герои должны быть одинаковые. Над случайными значениями нужно больше контроля.
 */
export default class ItemAttributeGenerator {
    defaultHealthPoints(itemLevel: number): number {
        return item_attributes_formulas.defaultHealthPoints({
            itemLevel: itemLevel,
            startHealthPoints: config.start_item_level_health_points,
            healthPointsItemLevel: config.item_level_increase_health_points,
        });
    }

    healthPoints(itemLevel: number, itemCategoryID: ItemCategoryID, heroClassID?: HeroClassID): number {
        // item_attributes_formulas.universalCharacterAttributeByRatio({
        //     itemLevel: itemLevel,
        //     ratio: database.item_categories.ratios.ratio(itemCategoryID, CharacterAttributeID.AttackPower),
        //     startValue: this._config.startHealthPoints,
        //     startItemLevel: this._config.startItemLevel,
        //     valueForItemLevel: this._config.healthPointsForItemLevel,
        // });
        //
        return item_attributes_formulas.healthPoints({
            default: this.defaultHealthPoints(itemLevel),
            ratio: database.item_categories.ratios.ratioByItemAttribute(itemCategoryID, ItemAttributeID.Agility),
        });
    }

    defaultAttackPower(itemLevel: number): number {
        return item_attributes_formulas.defaultAttackPower({
            itemLevel: itemLevel,
            startAttackPower: config.start_item_level_attack_power,
            attackPowerItemLevel: config.item_level_increase_attack_power,
        });
    }

    //todo: Вообще attackPower у предметов быть не должно. Значение нужно переводить в сил/лов/инт. В генерации атрибутов предмета этого метода быть не должно. Переделать вместе с разделением CharacterAttribute на атрибуты героев и атрибуты предметов.
    attackPower(itemLevel: number, itemCategoryID: ItemCategoryID, heroClassID?: HeroClassID): number {
        // item_attributes_formulas.attackPower({
        //     startAttackPower: _.random(this._config.startAttackPower - this._config.baseItemConstantDispersion, this._config.startAttackPower + this._config.baseItemConstantDispersion),
        //     ratio: database.item_categories.ratios.ratio(itemCategoryID, CharacterAttributeID.AttackPower),
        //     itemLevel: itemLevel,
        //     attackPowerItemLevel: _.random(this._config.itemLevelAttackPower - this._config.itemLevelAttackPowerDispersion, this._config.itemLevelAttackPower + this._config.itemLevelAttackPowerDispersion),
        //     startItemLevel: this._config.startItemLevel,
        // });

        return item_attributes_formulas.attackPower({
            default: this.defaultAttackPower(itemLevel),
            ratio: database.item_categories.ratios.ratioByItemAttribute(itemCategoryID, ItemAttributeID.AttackPower),
        });
    }

    characterAttributeFromAttackPower_reverse(itemLevel: number, itemCategoryID: ItemCategoryID, heroClassID?: HeroClassID): number {
        return item_attributes_formulas.attackPowerToCharacterAttribute_revers(this.attackPower(itemLevel, itemCategoryID, heroClassID), config.default_character_attribute_to_attack_power_ratio);
    }
}