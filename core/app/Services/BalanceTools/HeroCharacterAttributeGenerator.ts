// import _ from 'lodash';
import config from '../../../config/config.js';
import {database} from '../../../data/ts/database.js';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../../types/enums/HeroClassID.js';
import {ItemAttributeID} from '../../../types/enums/ItemAttributeID.js';
import {hero_character_attributes_formulas} from './formulas/hero_character_attributes_formulas.js';

import {item_attributes_formulas} from './formulas/item_attributes_formulas.js';

/**
 * Базовый инструмент для генерации всех атрибутов на основе уровня героя и уровне врага. Всё что скрыто будет меняться, но генерация всегда будет на основе уровней.
 */
export default class HeroCharacterAttributeGenerator {
    //**********************************
    // default.HealthPoints
    //**********************************

    defaultBaseHeroMaxHealthPoints(level: number): number {
        return hero_character_attributes_formulas.defaultBaseHeroMaxHealthPoints({
            level: level,
            startDefaultHeroHealthPoints: config.start_default_hero_health_points,
            defaultHeroHealthPointsLevelIncrease: config.default_hero_health_points_level_increase,
        });
    }

    //В будущем варвар будет замен на универсальное значение.
    defaultFinalHeroMaxHealthPoints(level: number): number {
        return this.finalHeroMaxHealthPoints(level, HeroClassID.Barbarian);
    }

    //**********************************
    // heroes.HealthPoints
    //**********************************

    baseHeroMaxHealthPoints(level: number, heroClassID: HeroClassID): number {
        return hero_character_attributes_formulas.baseHeroMaxHealthPoints({
            defaultValue: this.defaultBaseHeroMaxHealthPoints(level),
            ratio: database.heroes.character_attributes.ratio(heroClassID, CharacterAttributeID.MaxHealthPoints),
        });
    }

    equipHeroMaxHealthPoints(level: number, heroClassID: HeroClassID): number {
        let summaryRatio = this._summaryRatio(heroClassID, ItemAttributeID.HealthPoints);
        let itemLevel = this.itemLevelsCount(level);

        return _.round(
            ( config.start_item_level_health_points + config.item_level_increase_health_points * ( itemLevel - 1) ) * summaryRatio
        );
    }

    finalHeroMaxHealthPoints(level: number, heroClassID): number {
        return this.baseHeroMaxHealthPoints(level, heroClassID) + this.equipHeroMaxHealthPoints(level, heroClassID);
    }

    //**********************************
    // default.AttackPower
    //**********************************

    defaultBaseHeroAttackPower(level: number): number {
        return hero_character_attributes_formulas.defaultBaseHeroAttackPower({
            defaultHeroAttackPowerLevelIncrease: config.default_hero_attack_power_level_increase,
            level: level,
            startDefaultHeroAttackPower: config.start_default_hero_attack_power,
        });
    }

    defaultEquipHeroAttackPower(level: number): number {
        return this.equipHeroAttackPower(level, HeroClassID.Barbarian);
    }

    /**
     * Используется для расчетов силы атаки врагов.
     * ВАЖНО:
     * Сейчас за стандартное значение берутся значения варвара. Средние значение не подходят - мало данных.
     * Дальше алгоритм изменится.
     * @param level
     */
    defaultFinalHeroAttackPower(level: number): number {
        return this.finalHeroAttackPower(level, HeroClassID.Barbarian);
    }

    //**********************************
    // heroes.AttackPower
    //**********************************

    /**
     * Значение силы атаки героя, которое будет у героя при стандартном алгоритме прокачки на указаном уровне. Может быть больше при дополнительной прокачки.
     * @param level
     * @param heroClassID
     */
    baseHeroAttackPower(level: number, heroClassID: HeroClassID): number {
        return hero_character_attributes_formulas.baseHeroAttackPower({
            defaultValue: this.defaultBaseHeroAttackPower(level),
            ratio: database.heroes.character_attributes.ratio(heroClassID, CharacterAttributeID.AttackPower),
        });
    }

    equipHeroAttackPower(level: number, heroClassID: HeroClassID): number {
        let values: any = {};
        values.itemLevel = this.itemLevelsCount(level);
        values.summaryRatio = this._summaryRatio(heroClassID, ItemAttributeID.AttackPower);

        return _.round(
            ( config.start_item_level_attack_power + config.item_level_increase_attack_power * ( values.itemLevel - 1 ) ) *
            values.summaryRatio
        );
    }

    /**
     * Значение силы атаки героя, которое будет у героя при стандартном алгоритме прокачки на указаном уровне. Может быть больше при дополнительной прокачки.
     * @param level
     * @param heroClassID
     */
    finalHeroAttackPower(level: number, heroClassID): number {
        return this.baseHeroAttackPower(level, heroClassID) + this.equipHeroAttackPower(level, heroClassID);
    }

    //**********************************
    //region tools todo: Убрать в другое место.
    //**********************************

    /**
     * Значение нужное для формулы после её упрощения (выноса за скобки). Пока тут.
     * @param heroClassID
     * @param itemAttributeID
     * @private
     */
    private _summaryRatio(heroClassID: HeroClassID, itemAttributeID: ItemAttributeID): number {
        let summaryRatio = 0;
        database.heroes.equip_sets.equipSet(heroClassID, (itemCategoryID, count) => {
            summaryRatio += _.round(database.item_categories.ratios.ratioByItemAttribute(itemCategoryID, itemAttributeID) * count, 2);
        });

        return _.round(summaryRatio, 2);
    }

    itemLevelsCount(level: number): number {
        return item_attributes_formulas.heroLevelCorrespondsToItemLevel({
            heroLevel: level,
            ratio: config.hero_level_corresponds_to_item_level_ratio,
        });
    }

    itemLevelCorrespondsToItemLevel(level: number): number {
        return item_attributes_formulas.heroLevelCorrespondsToItemLevel({
            heroLevel: level,
            ratio: config.hero_level_corresponds_to_item_level_ratio,
        });
    }
}