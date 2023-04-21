import _ from 'lodash';

import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import {ItemID} from '../../types/enums/ItemID.js';

type TSDB_ItemLoot = {
    ID: ItemID,
    count: number,
    /**
     * Шанс 0..1
     * @indev Пока не работает.
     */
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
    [EnemyTypeID.Goblin]: {
        exp: 60,
        items: [
            {ID: ItemID.CottonCloth, count: 5, chance: 1},
        ],
        money: 20,
    },
    [EnemyTypeID.Bandit]: {
        exp: 60,
        items: [
            {ID: ItemID.CottonCloth, count: 5, chance: 1},
        ],
        money: 20,
    },
    [EnemyTypeID.Boar]: {
        exp: 40,
        items: [
            {ID: ItemID.Skin01, count: 2, chance: 1},
        ],
        money: 10,
    },
    [EnemyTypeID.Skeleton]: {
        exp: 40,
        items: [
            {ID: ItemID.MagicResource01, count: 1, chance: 1},
        ],
        money: 20,
    },
    [EnemyTypeID.Bear]: {
        exp: 80,
        items: [
            {ID: ItemID.Skin01, count: 10, chance: 1},
        ],
        money: 40,
    },
    [EnemyTypeID.Wolf]: {
        exp: 60,
        items: [
            {ID: ItemID.Skin01, count: 4, chance: 1},
        ],
        money: 20,
    },
    [EnemyTypeID.Golem]: {
        exp: 60,
        items: [
            {ID: ItemID.IronOre, count: 5, chance: 10},
        ],
        money: 50,
    },
    [EnemyTypeID.FireElemental]: {
        exp: 60,
        items: [
            {ID: ItemID.MagicResource01, count: 2, chance: 2},
        ],
        money: 50,
    },
};

export const enemy_loot = {
    items: function <T>(enemyTypeID: EnemyTypeID, callback: (itemID: ItemID, startCount: number, chance: number) => T): T[] {
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