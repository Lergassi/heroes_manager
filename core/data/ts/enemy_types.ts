import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';

export type EnemyDatabaseRow = {
    ID: EnemyTypeID;
};

let data: {[ID in EnemyTypeID]?: EnemyDatabaseRow} = {};

export let enemy_types = {
    find: (ID: EnemyTypeID): EnemyDatabaseRow => {
        return data[ID];
    },
};