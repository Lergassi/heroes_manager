import _ from 'lodash';
import {database} from '../../data/ts/database.js';
import Location from '../Components/Location.js';
import EnemyFactory from '../Factories/EnemyFactory.js';

//@indev Далее будет разделение. Пока просто добавляет всех врагов из бд в локацию.
export default class LocationConfiguratorByDB {
    private readonly _enemyFactory: EnemyFactory;

    constructor(enemyFactory: EnemyFactory) {
        this._enemyFactory = enemyFactory;
    }

    configure(location: Location /*strategy или разные LocationConfigurator*/): void {
        //veins
        database.locations.resources.find(location.type, (itemID, count) => {
            location.configResource(itemID, _.random(count.min, count.max));
        });

        //enemies
        let enemies = database.locations.enemies.find(location.type);
        for (let i = 0; i < enemies.length; i++) {
            location.addEnemy(this._enemyFactory.createSquad(enemies[i].enemyTypeID, location.level, _.random(enemies[i].count.min, enemies[i].count.max)));
        }
    }
}