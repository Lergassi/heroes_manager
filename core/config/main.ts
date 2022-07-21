export default {
    // date_format_mysql: 'yyyy-MM-dd hh:mm:ss',
    // date_format_save_filename: 'dd.MM.yyyy_hh:mm:ss',
    // date_format_ru: 'hh:mm:ss dd.MM.yyyy',
    start_hero_values: {
        hero_class_warrior: {
            max_level: 100,
            max_health_points: 120,
            max_magic_points: 100,
            min_attack_power: 30,
            max_attack_power: 40,
            character_attributes: {
                character_attribute_strength: 10,
                character_attribute_agility: 5,
                character_attribute_intelligence: 5,
                character_attribute_stamina: 10,
                character_attribute_critical_strike: 5,
                character_attribute_luck: 0
            }
        },
        hero_class_rogue: {
            max_level: 100,
            max_health_points: 100,
            max_magic_points: 100,
            min_attack_power: 40,
            max_attack_power: 50,
            character_attributes: {
                character_attribute_strength: 5,
                character_attribute_agility: 10,
                character_attribute_intelligence: 5,
                character_attribute_stamina: 7,
                character_attribute_critical_strike: 5,
                character_attribute_luck: 0
            }
        },
        hero_class_mage: {
            max_level: 100,
            max_health_points: 70,
            max_magic_points: 100,
            magic_points: 100,
            min_attack_power: 60,
            max_attack_power: 70,
            character_attributes: {
                character_attribute_strength: 5,
                character_attribute_agility: 5,
                character_attribute_intelligence: 12,
                character_attribute_stamina: 4,
                character_attribute_critical_strike: 5,
                character_attribute_luck: 0
            }
        },
        hero_class_gunslinger: {
            max_level: 100,
            max_health_points: 80,
            max_magic_points: 100,
            min_attack_power: 50,
            max_attack_power: 60,
            character_attributes: {
                character_attribute_strength: 4,
                character_attribute_agility: 10,
                character_attribute_intelligence: 7,
                character_attribute_stamina: 5,
                character_attribute_critical_strike: 5,
                character_attribute_luck: 0
            }
        },
    },
    start_wallet_values: {
        currency_gold: {
            value: 1000
        },
        currency_research_points: {
            value: 10
        }
    }
};