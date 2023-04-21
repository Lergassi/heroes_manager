import {ItemID} from '../types/enums/ItemID';
import {ProductionID} from '../types/enums/ProductionID';

export default {
    max_player_level: 100,
    max_hero_level: 100,
    // hero_health_points_step: 50,
    // item_level_step_by_hero_level: 4.5,
    // fight_time: 10,
    // equip_slots_count: 13,  //Пока без тринкета,
    // enemy_health_points_ratio: 2,
    // enemy_damage_to_hero_part: 0.3,
    // raw_damage_ratio_from_full_equip: 0.1,
    // attack_power_by_character_attribute_ratio: 2,
    // hero_attack_speed: 2,
    // enemy_attack_speed: 3,

    //itemLevel
    start_item_level: 25,
    item_level_step: 5,
    hero_level_corresponds_to_item_level_ratio: 1.6,

    //character attributes
    // start_default_hero_health_points: 100,
    // start_default_hero_health_points: 120,
    // start_default_hero_health_points: 140,
    start_default_hero_health_points: 200,
    default_hero_health_points_level_increase: 20,

    start_default_hero_attack_power: 20,
    // start_default_hero_attack_power: 30,
    default_hero_attack_power_level_increase: 8,

    //items
    start_equip_production_cost: 80,
    equip_item_level_increase_production_cost: 10,

    start_item_level_attack_power: 2,                   //зависит от материала или сделать default
    item_level_increase_attack_power: 2,                //зависит от материала или сделать default

    start_item_level_health_points: 20,                 //зависит от материала или сделать default
    item_level_increase_health_points: 10,              //зависит от материала или сделать default

    default_character_attribute_to_attack_power_ratio: 2,   //атрибут => сила атаки = 10 силы * 2 = 20 АП
    // strength_to_attack_power_ratio: 2,
    // agility_to_attack_power_ratio: 2,
    // intelligence_to_attack_power_ratio: 2,

    //enemies
    // default_enemy_damage_ratio_to_hero: 0.9,
    // default_enemy_damage_ratio_to_hero: 0.2,            //кол-во урона от врага за бой
    // default_enemy_damage_ratio_to_hero: 0.15,
    default_enemy_damage_ratio_to_hero: 0.10,
    // default_enemy_damage_ratio_to_hero: 0.08,
    // default_enemy_damage_ratio_to_hero: 0.05,
    // default_enemy_hit_ratio_to_enemy: 0.2,
    // default_enemy_hit_ratio_to_enemy: 0.10,
    default_enemy_hit_ratio_to_enemy: 0.05,
    // default_enemy_hit_ratio_to_enemy: 0.1,
    // default_enemy_damage_ratio_to_hero: 0.15,
    // default_enemy_damage_ratio_to_hero: 0.1,
    // default_hero_hit_ratio_to_enemy: 0.2,
    default_hero_hit_ratio_to_enemy: 0.2,               //кол-во урона за удар от общего урона. Одно значение для героя и врага так как скорость атаки одинаковая и привязана к setInterval.


    //craft
    //Далее будет ресурс1, ресурс2, но пока для удобства используются названия предметов.
    production_start_item_level: {
        [ProductionID.Blacksmith]: {
            [ItemID.IronIngot]: 10,
            // [ItemID.CopperIngot]: 10,
        },
        [ProductionID.LeatherWorking]: {
            [ItemID.Leather01]: 20,
        },
        [ProductionID.Tailoring]: {
            [ItemID.CottonCloth]: 30,
        },
        [ProductionID.Jewelry]: {
            [ItemID.GoldIngot]: 30,
        },
    },
    // blacksmith_start_item_level_iron_ingot: 10,
    // blacksmith_start_item_level_copper_ingot: 2,

    production_increase_item_level: {
        [ProductionID.Blacksmith]: {
            [ItemID.IronIngot]: 2,
            // [ItemID.CopperIngot]: 5,
        },
        [ProductionID.LeatherWorking]: {
            [ItemID.Leather01]: 4,
        },
        [ProductionID.Tailoring]: {
            [ItemID.CottonCloth]: 6,
        },
        [ProductionID.Jewelry]: {
            [ItemID.GoldIngot]: 10,
        },
    },
    // blacksmith_increase_item_level_iron_ingot: 4,
    // blacksmith_increase_item_level_copper_ingot: 2,


    // leather_working_start_item_level_leather01: 20,
    // leather_working_start_item_level_cotton_thread01: 5,
    //
    // leather_working_increase_item_level_leather01: 8,
    //
    //
    // tailoring_start_item_level_cloth01: 30,
    // tailoring_start_item_level_cotton_thead01: 10,
    //
    // tailoring_increase_item_level_cloth01: 12,
    // tailoring_increase_item_level_cotton_thread01: 4,
    //
    //
    // jewelry_start_item_level_iron_ingot: 20,
    //
    // jewelry_increase_item_level_iron_ingot: 12,
};