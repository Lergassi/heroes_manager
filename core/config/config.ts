export default {
    max_player_level: 100,
    // start_hero_values: {
    //     [HeroClassID.Warrior]: {
    //         max_level: 100,
    //         [CharacterAttributeID.MaxHealthPoints]: 120,
    //         [CharacterAttributeID.MaxMagicPoints]: 100,
    //         min_attack_power: 30,
    //         max_attack_power: 40,
    //         character_attributes: {
    //             [CharacterAttributeID.Strength]: 10,
    //             [CharacterAttributeID.Agility]: 5,
    //             [CharacterAttributeID.Intelligence]: 5,
    //         }
    //     },
    //     [HeroClassID.Paladin]: {
    //         max_level: 100,
    //         [CharacterAttributeID.MaxHealthPoints]: 100,
    //         [CharacterAttributeID.MaxMagicPoints]: 200,
    //         min_attack_power: 30,
    //         max_attack_power: 40,
    //         character_attributes: {
    //             [CharacterAttributeID.Strength]: 10,
    //             [CharacterAttributeID.Agility]: 5,
    //             [CharacterAttributeID.Intelligence]: 10,
    //         }
    //     },
    //     [HeroClassID.Rogue]: {
    //         max_level: 100,
    //         [CharacterAttributeID.MaxHealthPoints]: 100,
    //         [CharacterAttributeID.MaxMagicPoints]: 100,
    //         min_attack_power: 40,
    //         max_attack_power: 50,
    //         character_attributes: {
    //             [CharacterAttributeID.Strength]: 5,
    //             [CharacterAttributeID.Agility]: 10,
    //             [CharacterAttributeID.Intelligence]: 5,
    //         }
    //     },
    //     [HeroClassID.FireMage]: {
    //         max_level: 100,
    //         [CharacterAttributeID.MaxHealthPoints]: 70,
    //         [CharacterAttributeID.MaxMagicPoints]: 200,
    //         magic_points: 100,
    //         min_attack_power: 60,
    //         max_attack_power: 70,
    //         character_attributes: {
    //             [CharacterAttributeID.Strength]: 5,
    //             [CharacterAttributeID.Agility]: 5,
    //             [CharacterAttributeID.Intelligence]: 12,
    //         }
    //     },
    //     [HeroClassID.Gunslinger]: {
    //         max_level: 100,
    //         [CharacterAttributeID.MaxHealthPoints]: 80,
    //         [CharacterAttributeID.MaxMagicPoints]: 130,
    //         min_attack_power: 50,
    //         max_attack_power: 60,
    //         character_attributes: {
    //             [CharacterAttributeID.Strength]: 4,
    //             [CharacterAttributeID.Agility]: 10,
    //             [CharacterAttributeID.Intelligence]: 7,
    //         }
    //     },
    // },
    // start_wallet_values: {
    //     [CurrencyID.Gold]: {
    //         value: 1000
    //     },
    //     [CurrencyID.ResearchPoints]: {
    //         value: 10
    //     }
    // },
    // max_item_level: 500,
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

    //items                                             //todo: а также перенести в бд.
    start_item_level_attack_power: 2,                   //зависит от материала или сделать default
    item_level_increase_attack_power: 2,                //зависит от материала или сделать default

    start_item_level_health_points: 20,                 //зависит от материала или сделать default
    item_level_increase_health_points: 10,              //зависит от материала или сделать default

    start_default_hero_health_points: 100,
    default_hero_health_points_level_increase: 20,

    start_default_hero_attack_power: 20,
    default_hero_attack_power_level_increase: 8,

    //enemies
    default_hero_hit_ratio_to_enemy: 0.15,
    default_enemy_damage_ratio_to_hero: 0.3,
};