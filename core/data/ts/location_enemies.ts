import _ from 'lodash';
import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import {LocationTypeID} from '../../types/enums/LocationTypeID.js';
import {RangeType} from '../../types/main.js';

type TSDB_LocationEnemy = {
    enemyTypeID: EnemyTypeID,
    count: RangeType,
}

type TSDB_LocationEnemyDB = {
    [ID in LocationTypeID]?: TSDB_LocationEnemy[];
}

// let __ = {
//     type: ['Пустыня', 'Горы', 'Побережье и тд'],
// };

//todo: У локации может быть несколько вариантов.
let enemies_db: TSDB_LocationEnemyDB = {
    [LocationTypeID.Barrens]: [
        {enemyTypeID: EnemyTypeID.Goblin, count: {min: 10, max: 30}},
        {enemyTypeID: EnemyTypeID.Boar, count: {min: 20, max: 40}},
    ],
    [LocationTypeID.Forrest]: [
        {enemyTypeID: EnemyTypeID.Bandit, count: {min: 20, max: 40}},
        {enemyTypeID: EnemyTypeID.Goblin, count: {min: 10, max: 30}},
        {enemyTypeID: EnemyTypeID.Wolf, count: {min: 5, max: 10}},
        {enemyTypeID: EnemyTypeID.Bear, count: {min: 1, max: 4}},   //todo: @bug? Если 0 попадет в отряд будет ошибка.
    ],
};

export const location_enemies = {
    /**
     * @deprecated
     * @param locationTypeID
     * @param callback
     */
    _find: function<T> (locationTypeID: LocationTypeID, callback: (enemyTypeID: EnemyTypeID, count: RangeType) => T): T[] {
        return _.map(enemies_db[locationTypeID], (data) => {
            return callback(data.enemyTypeID, data.count);
        });
    },
    find(locationTypeID: string): TSDB_LocationEnemy[] {
        return _.cloneDeep(enemies_db[locationTypeID] ?? []);
    },
};