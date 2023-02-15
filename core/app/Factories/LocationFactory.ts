import {location_enemies} from '../../data/ts/location_enemies.js';
import GameObject from '../../source/GameObject.js';
import ItemDatabase from '../../source/ItemDatabase.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {LocationTypeID} from '../../types/enums/LocationTypeID.js';
import Location, {GatheringPointTypeID} from '../Components/Location.js';
import Wallet from '../Components/Wallet.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import LocationConfigurator from '../Services/LocationConfigurator.js';
import EnemyFactory from './EnemyFactory.js';
import GameObjectFactory from './GameObjectFactory.js';
import ItemStackFactory from './ItemStackFactory.js';
import ItemStorageFactory from './ItemStorageFactory.js';
import WalletFactory from './WalletFactory.js';

export type GatheringItemPointPattern = {
    [GatheringPointTypeID.Low]: number;
    [GatheringPointTypeID.Normal]: number;
    [GatheringPointTypeID.High]: number;
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
    private readonly _enemyFactory: EnemyFactory;
    private readonly _locationConfigurator: LocationConfigurator;

    constructor(
        gameObjectFactory: GameObjectFactory,
        itemStackFactory: ItemStackFactory,
        entityManager: EntityManagerInterface,
        itemDatabase: ItemDatabase,
        itemStorageFactory: ItemStorageFactory,
        walletFactory: WalletFactory,
        enemyFactory: EnemyFactory,
        locationConfigurator: LocationConfigurator,
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
        this._locationConfigurator = locationConfigurator;
    }

    create(
        type: LocationTypeID,
        level: number,
        options?: {
            configureStrategy: string,
        }
    ): GameObject {
        let locationGO = this._gameObjectFactory.create();

        let wallet = new Wallet(0);
        let itemStorage = this._itemStorageFactory.create(this._internalItemStorageSize).get<ItemStorageInterface>(ComponentID.ItemStorage);

        //todo: Предметы должны устаналиваться более строго. А вдруг в бд не будет предметов категории? Надо чтобы items всегда был в рабочем состоянии.
        // let items = this._itemDatabase.findByItemCategory(this._entityManager.get<ItemCategory>(EntityID.ItemCategory, ItemCategoryID.Resources));
        // if (items.length < this._maxGatheringItemPointsCount) {
        //     debug(DebugNamespaceID.Warning)('Предметов не достаточно для создании локации.');
        // }
        // items = Random.some(items, this._maxGatheringItemPointsCount, {unique: true});

        // let gatheringItemPoints = [
        //     new Vein(this._itemDatabase.get(ItemID.Wood), 32),
        //     new Vein(this._itemDatabase.get(ItemID.Cotton), 32),
        //     new Vein(this._itemDatabase.get(ItemID.IronOre), 32),
        // ];

        let location = locationGO.set<Location>(ComponentID.Location, new Location(
            type,
            level,
            this._itemStackFactory,
            itemStorage,
            wallet,
        ));

        if (options?.configureStrategy) {
            switch (options.configureStrategy) {
                case 'default':
                    this._locationConfigurator.configure(location);
                    break;
                default:
                    break
            }
        }

        return locationGO;
    }
}