import debug from 'debug';
import {database} from '../../data/ts/database.js';
import {location_enemies} from '../../data/ts/location_enemies.js';
import GameObject from '../../source/GameObject.js';
import ItemDatabase from '../../source/ItemDatabase.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {CurrencyID} from '../../types/enums/CurrencyID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import {EntityID} from '../../types/enums/EntityID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {LevelRange} from '../../types/main.js';
import GatheringPoint from '../Components/GatheringPoint.js';
import Location, {GatheringPointTypeID} from '../Components/Location.js';
import Wallet from '../Components/Wallet.js';
import ItemCategory from '../Entities/ItemCategory.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import Random from '../Services/Random.js';
import EnemyFactory from './EnemyFactory.js';
import GameObjectFactory from './GameObjectFactory.js';
import ItemStackFactory from './ItemStackFactory.js';
import ItemStorageFactory from './ItemStorageFactory.js';
import WalletFactory from './WalletFactory.js';

export type GatheringItemPointPattern = {
    [GatheringPointTypeID.low]: number;
    [GatheringPointTypeID.normal]: number;
    [GatheringPointTypeID.high]: number;
}

// let types = [
//     GatheringPointTypeID.low,
//     GatheringPointTypeID.normal,
//     GatheringPointTypeID.high,
// ];
// let gatheringTypeValues = {
//     [GatheringPointTypeID.low]: 16,
//     [GatheringPointTypeID.normal]: 32,
//     [GatheringPointTypeID.high]: 64,
// };

export default class LocationFactory {
    private readonly _maxGatheringItemPointsCount: number;
    private readonly _internalItemStorageSize: number;
    private readonly _heroGroupSize: number;

    private readonly _gameObjectFactory: GameObjectFactory;
    private readonly _itemStackFactory: ItemStackFactory;
    private readonly _entityManager: EntityManagerInterface;
    private readonly _itemDatabase: ItemDatabase;

    private readonly _itemStorageFactory: ItemStorageFactory;
    private readonly _walletFactory: WalletFactory;

    // private readonly _defaultOptions: Partial<LocationFactoryCreateOptions> = {
    //     internalItemStorageSize: 5,
    //     heroGroupSize: 5,
    // };
    private _enemyFactory: EnemyFactory;

    private readonly _location_enemies = location_enemies;

    constructor(
        gameObjectFactory: GameObjectFactory,
        itemStackFactory: ItemStackFactory,
        entityManager: EntityManagerInterface,
        itemDatabase: ItemDatabase,
        itemStorageFactory: ItemStorageFactory,
        walletFactory: WalletFactory,
        enemyFactory: EnemyFactory,
    ) {
        this._maxGatheringItemPointsCount = 3;
        this._internalItemStorageSize = 5;
        this._heroGroupSize = 5;

        this._gameObjectFactory = gameObjectFactory;
        this._itemStackFactory = itemStackFactory;
        this._entityManager = entityManager;
        this._itemDatabase = itemDatabase;
        this._enemyFactory = enemyFactory;

        this._itemStorageFactory = itemStorageFactory;
        this._walletFactory = walletFactory;
    }

    create(
        level: number,
    ): GameObject {
        let location = this._gameObjectFactory.create();

        //todo: Доступ к кошельку нужно сделать удобнее, а не по ID валюты из контейнера.
        let wallet = new Wallet(
            0,
        );
        // let itemStorage = location.set('internalItemStorageComponent', this._itemStorageFactory.createIn(this._internalItemStorageSize, location));
        let itemStorage = this._itemStorageFactory.create(this._internalItemStorageSize).get<ItemStorageInterface>(ComponentID.ItemStorage);

        //todo: Предметы должны устаналиваться более строго. А вдруг в бд не будет предметов категории? Надо чтобы items всегда был в рабочем состоянии.
        let items = this._itemDatabase.findByItemCategory(this._entityManager.get<ItemCategory>(EntityID.ItemCategory, ItemCategoryID.Resources));
        if (items.length < this._maxGatheringItemPointsCount) {
            debug(DebugNamespaceID.Warning)('Предметов не достаточно для создании локации.');
        }
        items = Random.some(items, this._maxGatheringItemPointsCount, {unique: true});

        let gatheringItemPoints = [
            new GatheringPoint(GatheringPointTypeID.normal, this._itemDatabase.get(ItemID.Wood), 32),
            new GatheringPoint(GatheringPointTypeID.normal, this._itemDatabase.get(ItemID.Cotton), 32),
            new GatheringPoint(GatheringPointTypeID.normal, this._itemDatabase.get(ItemID.IronOre), 32),
        ]

        let locationComponent = location.set<Location>(ComponentID.Location, new Location(
            level,
            gatheringItemPoints,
            // _.map(items, (item) => {
            //     let type = Random.one(types);
            //     // return new GatheringPoint(GatheringPointTypeID.normal, item, 32);
            //     return new GatheringPoint(type, item, gatheringTypeValues[type]);
            // }),
            this._itemStackFactory,
            itemStorage,
            wallet,
            // enemies,
        ));

        let locationEnemies = database.locations.enemies.find(level);
        for (let i = 0; i < locationEnemies.length; i++) {
            locationComponent.addEnemy(this._enemyFactory.create(locationEnemies[i].enemy, level));
        }

        return location;
    }
}