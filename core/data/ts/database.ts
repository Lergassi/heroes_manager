import {enemy_loot} from './enemy_loot.js';
import {hero_character_attributes} from './hero_character_attributes.js';
import {hero_equip_sets} from './hero_equip_sets.js';
import {item_category_ratios} from './item_category_ratios.js';
import {location_enemies} from './location_enemies.js';
import {metadata} from './metadata.js';

export const database = {
    metadata: metadata,
    item_categories: {
        ratios: item_category_ratios,
    },
    items: {
        // data: {},
    },
    heroes: {
        character_attributes: hero_character_attributes,
        equip_sets: hero_equip_sets,
    },
    enemies: {
        loot: enemy_loot,
    },
    locations: {
        // data: {},    Не data, а через метод.
        enemies: location_enemies,
    },
};