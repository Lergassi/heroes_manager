import {Debugger} from 'inspector';
import _ from 'lodash';
import debug from 'debug';
import {database} from '../../data/ts/database.js';
import {LocationTypeID} from '../../types/enums/LocationTypeID.js';
import Location from '../Components/Location.js';
import EnemyFactory from '../Factories/EnemyFactory.js';

//@indev Далее будет разделение. Пока просто добавляет всех врагов из бд в локацию.
export default class LocationDatabaseConfigurator {
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
        database.locations.enemies.find(location.type, (enemyTypeID, count) => {
            location.addEnemy(this._enemyFactory.createSquad(enemyTypeID, location.level, _.random(count.min, count.max)));
        });
    }
}