import {enemy_loot} from './enemy_loot.js';
import {location_enemies} from './location_enemies.js';

export let database = {
    items: {
        // data: {},
    },
    locations: {
        // data: {},    Не data, а через метод.
        enemies: location_enemies,
    },
    enemies: {
        loot: enemy_loot,
    },
};