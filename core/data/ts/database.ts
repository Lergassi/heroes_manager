import {enemy_loot} from './enemy_loot.js';
import {hero_class_character_attributes} from './hero_class_character_attributes.js';
import {hero_classes} from './hero_classes.js';
import {hero_equip_sets} from './hero_equip_sets.js';
import {item_category_ratios} from './item_category_ratios.js';
import {location_enemies} from './location_enemies.js';
import {location_resources} from './location_resources.js';
import {metadata} from './metadata.js';
import {recipes} from './recipes.js';
import {test} from './test.js';

export const database = {
    metadata: metadata,
    item_categories: {
        ratios: item_category_ratios,
    },
    items: {
        // data: {},
    },
    recipes: {
        data: recipes,
    },
    hero_classes: {
        data: hero_classes,
        character_attributes: hero_class_character_attributes,
        equip_sets: hero_equip_sets,
    },
    locations: {
        // data: locations_resources,
        resources: location_resources,
        enemies: location_enemies,
    },
    enemies: {
        rewards: enemy_loot,
    },
    test: test,
};