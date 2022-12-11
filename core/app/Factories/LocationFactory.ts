import HeroGroup from '../Components/HeroGroup.js';
import LocationComponent, {
    GatheringItemPoint,
    GatheringItemPointTypeValues,
    GatheringPointTypeID
} from '../Components/LocationComponent.js';
import GameObjectFactory from './GameObjectFactory.js';
import GameObject from '../../source/GameObject.js';
import ItemStackFactory from './ItemStackFactory.js';
import ItemDatabase from '../../source/ItemDatabase.js';
import Random from '../Services/Random.js';
import ItemCategory from '../Entities/ItemCategory.js';
import {unsigned} from '../../types/main.js';
import {ONE_HOUR_IN_SECONDS} from '../consts.js';
import ItemStorageFactory from './ItemStorageFactory.js';
import Wallet from '../Components/Wallet.js';
import Currency from '../Entities/Currency.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import {CurrencyID} from '../../types/enums/CurrencyID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import {EntityID} from '../../types/enums/EntityID.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import EnemyFactory from './EnemyFactory.js';
import {EnemyID} from '../../types/enums/EnemyID.js';
import WalletFactory from './WalletFactory.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import GatheringPoint from '../Components/GatheringPoint.js';
import {ItemID} from '../../types/enums/ItemID.js';
import _ from 'lodash';
import {ComponentID} from '../../types/enums/ComponentID.js';

export type LocationFactoryCreateOptions = {
    level: unsigned;
    internalItemStorageSize?: unsigned;
    heroGroupSize?: unsigned;
}

export type GatheringItemPointPattern = {
    [GatheringPointTypeID.low]: number;
    [GatheringPointTypeID.normal]: number;
    [GatheringPointTypeID.high]: number;
}

export default class LocationFactory {
    private readonly _maxGatheringItemPointsCount: number;
    private readonly _internalItemStorageSize: number;
    private readonly _heroGroupSize: number;
    private readonly _enemyGroupSize: number[];

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
        this._enemyGroupSize = [1, 5];

        this._gameObjectFactory = gameObjectFactory;
        this._itemStackFactory = itemStackFactory;
        this._entityManager = entityManager;
        this._itemDatabase = itemDatabase;
        this._enemyFactory = enemyFactory;

        this._itemStorageFactory = itemStorageFactory;
        this._walletFactory = walletFactory;
    }

    create(
        level: unsigned,
        // internalItemStorageSize?: unsigned,
        // heroGroupSize?: unsigned,
    ): GameObject {
        //internalItemStorageSize = internalItemStorageSize ?? this._defaultOptions.internalItemStorageSize;
        //heroGroupSize = heroGroupSize ?? this._defaultOptions.heroGroupSize;
        // let internalItemStorageSize = this._defaultOptions.internalItemStorageSize;
        // let heroGroupSize = this._defaultOptions.heroGroupSize;

        let location = this._gameObjectFactory.create();

        //todo: Доступ к кошельку нужно сделать удобнее, а не по ID валюты из контейнера.
        location.set<Wallet>(CurrencyID.Gold, new Wallet(
            0,
        ));
        let heroGroupComponent = location.set<HeroGroup>('heroGroupComponent', new HeroGroup(
            5,
        ));

        let itemStorageComponent = location.set('internalItemStorageComponent', this._itemStorageFactory.createIn(this._internalItemStorageSize, location));

        //todo: В периоде нет смысла если он используется только при выводе для игрока.
        // let gatheringItemPointTypeValues: Readonly<GatheringItemPointTypeValues> = {
        //     [GatheringPointTypeID.low]: {value: 2 * 3600, period: ONE_HOUR_IN_SECONDS},
        //     [GatheringPointTypeID.normal]: {value: 4 * 3600, period: ONE_HOUR_IN_SECONDS},
        //     [GatheringPointTypeID.high]: {value: 8 * 3600, period: ONE_HOUR_IN_SECONDS},
        // };
        // let gatheringItemPointPatterns: GatheringItemPointPattern[] = [
        //     {[GatheringPointTypeID.low]: 0, [GatheringPointTypeID.normal]: 3, [GatheringPointTypeID.high]: 0},
        //     {[GatheringPointTypeID.low]: 0, [GatheringPointTypeID.normal]: 2, [GatheringPointTypeID.high]: 1},
        //     {[GatheringPointTypeID.low]: 1, [GatheringPointTypeID.normal]: 2, [GatheringPointTypeID.high]: 0},
        // ];

        //todo: Предметы должны устаналиваться более строго. А вдруг в бд не будет предметов категории? Надо чтобы items всегда был в рабочем состоянии.
        let items = this._itemDatabase.getByItemCategory(this._entityManager.get<ItemCategory>(EntityID.ItemCategory, ItemCategoryID.Resources));
        if (items.length < this._maxGatheringItemPointsCount) {
            debug(DebugNamespaceID.Warning)('Предметов не достаточно для создании локации.');
        }
        items = Random.some(items, this._maxGatheringItemPointsCount, {unique: true});
        // let selectedGatheringItemPointPattern = Random.one(gatheringItemPointPatterns);

        // let index = 0;
        // let gatheringItemPoints: GatheringItemPoint[] = [];
        // for (const selectedGatheringItemPointPatternKey in selectedGatheringItemPointPattern) {
        //     let i = 0;
        //     while (i < selectedGatheringItemPointPattern[selectedGatheringItemPointPatternKey]) {
        //         if (items[index]) {
        //             gatheringItemPoints.push({
        //                 item: items[index],
        //                 count: gatheringItemPointTypeValues[selectedGatheringItemPointPatternKey],
        //                 type: <GatheringPointTypeID>selectedGatheringItemPointPatternKey,
        //             });
        //         }
        //         ++i;
        //         ++index;
        //     }
        // }

        let types = [
            GatheringPointTypeID.low,
            GatheringPointTypeID.normal,
            GatheringPointTypeID.high,
        ];
        let gatheringTypeValues = {
            [GatheringPointTypeID.low]: 16,
            [GatheringPointTypeID.normal]: 32,
            [GatheringPointTypeID.high]: 64,
        };

        let locationComponent = location.set<LocationComponent>(ComponentID.Location, new LocationComponent(
            new Date(),
            level,
            // gatheringItemPoints,
            [
                new GatheringPoint(GatheringPointTypeID.normal, this._itemDatabase.get(ItemID.Wood), 32),
                new GatheringPoint(GatheringPointTypeID.normal, this._itemDatabase.get(ItemID.Cotton), 32),
                new GatheringPoint(GatheringPointTypeID.normal, this._itemDatabase.get(ItemID.IronOre), 32),
            ],
            // _.map(items, (item) => {
            //     let type = Random.one(types);
            //     // return new GatheringPoint(GatheringPointTypeID.normal, item, 32);
            //     return new GatheringPoint(type, item, gatheringTypeValues[type]);
            // }),
            this._itemStackFactory,
            itemStorageComponent,
            this._walletFactory.create().get<WalletInterface>(ComponentID.Wallet), //Можно передать любой кошелек.
            //@test
            [
                this._enemyFactory.create(EnemyID.Bear, 1),
                // this._enemyFactory.create(EnemyID.Bear, 1),
                // this._enemyFactory.create(EnemyID.Bear, 1),
                // this._enemyFactory.create(EnemyID.Bear, 1),
                // this._enemyFactory.create(EnemyID.Bear, 1),
            ],
        ));

        return location;
    }
}