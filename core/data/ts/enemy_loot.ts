import _ from 'lodash';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import {targetIsNilAndReplacedReport} from '../../functions.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {ItemCount, ItemCountDBType, ItemLoot, RangeType} from '../../types/main.js';

type TSDB_ItemLoot = {
    ID: ItemID,
    count: number,
    chance: number,
}

type TSDB_EnemyLoot = {
    items: TSDB_ItemLoot[],
    exp: number,
    money: number,
}

type TSDB_EnemyLootDB = {
    [ID in EnemyTypeID]?: TSDB_EnemyLoot;
};

let enemy_loot_data: TSDB_EnemyLootDB = {
    [EnemyTypeID.Boar]: {
        exp  : 42,
        items: [
            // {ID: ItemID.Wood, startCount: 2, chance: 1},
            {ID: ItemID.Skin01, count: 4, chance: 1},
            // {ID: ItemID.Leather01, startCount: 1, chance: 1},
        ],
        money: 20,
    },
};

export const enemy_loot = {
    items: function<T> (enemyTypeID: EnemyTypeID, callback: (itemID: ItemID, startCount: number, chance: number) => T): T[] {
        return _.map(enemy_loot_data[enemyTypeID]?.items, (data) => {
            return callback(data.ID, data.count, data.chance);
        });
    },
    exp: function (enemyTypeID: EnemyTypeID): number {
        return enemy_loot_data[enemyTypeID]?.exp ?? 0;
    },
    money: function (enemyTypeID: EnemyTypeID): number {
        return enemy_loot_data[enemyTypeID]?.money ?? 0;
    },
};