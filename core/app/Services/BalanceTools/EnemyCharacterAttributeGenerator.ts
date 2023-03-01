import _ from 'lodash';
import debug from 'debug';
import config from '../../../config/config.js';
import {EnemyTypeID} from '../../../types/enums/EnemyTypeID.js';
import {enemy_character_attributes_formulas} from './formulas/enemy_character_attributes_formulas.js';
import HeroCharacterAttributeGenerator from './HeroCharacterAttributeGenerator.js';

export default class EnemyCharacterAttributeGenerator {
    private readonly _heroCharacterAttributeGenerator: HeroCharacterAttributeGenerator;

    constructor(heroCharacterAttributeGenerator: HeroCharacterAttributeGenerator) {
        this._heroCharacterAttributeGenerator = heroCharacterAttributeGenerator;
    }

    //**********************************
    // enemies.HealthPoints
    //**********************************

    defaultEnemyMaxHealthPoints(level: number /* todo: enemyTypeID ratio */): number {
        return enemy_character_attributes_formulas.maxHealthPoints({
            defaultFinalHeroAttackPower: this._heroCharacterAttributeGenerator.defaultFinalHeroAttackPower(level),
            heroHitRatioToEnemy: config.default_hero_hit_ratio_to_enemy,
        });
    }

    enemyMaxHealthPoints(level: number /* todo: enemyTypeID ratio */): number {
        return enemy_character_attributes_formulas.maxHealthPoints({
            defaultFinalHeroAttackPower: this._heroCharacterAttributeGenerator.defaultFinalHeroAttackPower(level),
            heroHitRatioToEnemy: config.default_hero_hit_ratio_to_enemy,
        });
    }

    //**********************************
    // enemies.AttackPower
    //**********************************

    defaultEnemyAttackPower(level: number): number {
        return enemy_character_attributes_formulas.attackPower({
            heroHealthPoints: this._heroCharacterAttributeGenerator.defaultFinalHeroMaxHealthPoints(level),
            enemyDamageRatioToHero: config.default_enemy_damage_ratio_to_hero,
            heroHitRatioToEnemy: config.default_hero_hit_ratio_to_enemy,
        });
    }

    enemyAttackPower(level: number): number {
        return enemy_character_attributes_formulas.attackPower({
            heroHealthPoints: this._heroCharacterAttributeGenerator.defaultFinalHeroMaxHealthPoints(level),
            heroHitRatioToEnemy: config.default_hero_hit_ratio_to_enemy,
            enemyDamageRatioToHero: config.default_enemy_damage_ratio_to_hero,
        });
    }
}