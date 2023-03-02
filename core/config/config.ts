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

    //items                                             //todo: а также перенести в бд.
    start_item_level_attack_power: 2,                   //зависит от материала или сделать default
    item_level_increase_attack_power: 2,                //зависит от материала или сделать default

    start_item_level_health_points: 20,                 //зависит от материала или сделать default
    item_level_increase_health_points: 10,              //зависит от материала или сделать default

    start_default_hero_health_points: 100,
    default_hero_health_points_level_increase: 20,

    start_default_hero_attack_power: 20,
    default_hero_attack_power_level_increase: 8,

    default_character_attribute_to_attack_power_ratio: 2,
    // strength_to_attack_power_ratio: 2,
    // agility_to_attack_power_ratio: 2,
    // intelligence_to_attack_power_ratio: 2,

    //enemies
    // default_enemy_damage_ratio_to_hero: 0.3,
    default_enemy_damage_ratio_to_hero: 0.2,
    default_hero_hit_ratio_to_enemy: 0.15,

    //craft
    //Далее будет ресурс1, ресурс2, но пока для удобства используются названия предметов.
    start_item_level_blacksmith_iron_ingot: 10,
    start_item_level_leather_working_leather01: 20,
    start_item_level_tailoring_cloth01: 30,
    start_item_level_jewelry_iron_ingot: 20,
    increase_item_level_blacksmith_iron_ingot: 4,
    increase_item_level_leather_working_iron_ingot: 8,
    increase_item_level_tailoring_iron_ingot: 12,
    increase_item_level_jewelry_iron_ingot: 12,
};