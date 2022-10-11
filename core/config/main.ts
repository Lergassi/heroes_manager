export default {
    // date_format_mysql: 'yyyy-MM-dd hh:mm:ss',
    // date_format_save_filename: 'dd.MM.yyyy_hh:mm:ss',
    // date_format_ru: 'hh:mm:ss dd.MM.yyyy',
    max_player_level: 100,
    start_hero_values: {
        Warrior: {
            max_level: 100,
            max_health_points: 120,
            max_magic_points: 100,
            min_attack_power: 30,
            max_attack_power: 40,
            character_attributes: {
                strength: 10,
                agility: 5,
                intelligence: 5,
                stamina: 10,
                critical_strike: 5,
                luck: 0
            }
        },
        Rogue: {
            max_level: 100,
            max_health_points: 100,
            max_magic_points: 100,
            min_attack_power: 40,
            max_attack_power: 50,
            character_attributes: {
                strength: 5,
                agility: 10,
                intelligence: 5,
                stamina: 7,
                critical_strike: 5,
                luck: 0
            }
        },
        Mage: {
            max_level: 100,
            max_health_points: 70,
            max_magic_points: 100,
            magic_points: 100,
            min_attack_power: 60,
            max_attack_power: 70,
            character_attributes: {
                strength: 5,
                agility: 5,
                intelligence: 12,
                stamina: 4,
                critical_strike: 5,
                luck: 0
            }
        },
        Gunslinger: {
            max_level: 100,
            max_health_points: 80,
            max_magic_points: 100,
            min_attack_power: 50,
            max_attack_power: 60,
            character_attributes: {
                strength: 4,
                agility: 10,
                intelligence: 7,
                stamina: 5,
                critical_strike: 5,
                luck: 0
            }
        },
    },
    start_wallet_values: {
        gold_currency: {
            value: 1000
        },
        research_points: {
            value: 10
        }
    }
};