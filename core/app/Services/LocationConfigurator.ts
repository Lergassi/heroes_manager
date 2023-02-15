import {Debugger} from 'inspector';
import _ from 'lodash';
import debug from 'debug';
import {database} from '../../data/ts/database.js';
import {LocationTypeID} from '../../types/enums/LocationTypeID.js';
import Location from '../Components/Location.js';
import EnemyFactory from '../Factories/EnemyFactory.js';

//@indev Далее будет разделение. Пока просто добавляет всех врагов из бд в локацию.
export default class LocationConfigurator {
    private readonly _enemyFactory: EnemyFactory;

    constructor(enemyFactory: EnemyFactory) {
        this._enemyFactory = enemyFactory;
    }

    configure(location: Location /*strategy или разные LocationConfigurator*/): void {
        //veins

        //enemies
        database.locations.enemies.find(LocationTypeID.Forrest, (enemyTypeID) => {
            location.addEnemy(this._enemyFactory.create(enemyTypeID, location.level));
        });
    }
}