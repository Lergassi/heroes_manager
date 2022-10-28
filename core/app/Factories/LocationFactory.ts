import HeroGroupComponent from '../Components/HeroGroupComponent.js';
import LocationComponent, {
    GatheringItemPoint,
    GatheringItemPointID,
    GatheringItemPointTypeValues
} from '../Components/LocationComponent.js';
import GameObjectFactory from './GameObjectFactory.js';
import GameObject from '../../source/GameObject.js';
import ItemStackFactory from './ItemStackFactory.js';
import ItemDatabase from '../../source/ItemDatabase.js';
import Random from '../Services/Random.js';
import ItemCategory from '../Entities/ItemCategory.js';
import {unsigned} from '../../types/main.js';
import {ONE_HOUR_IN_SECONDS} from '../consts.js';
import AppError from '../../source/Errors/AppError.js';
import ItemStorageFactory from './ItemStorageFactory.js';
import WalletComponent from '../Components/WalletComponent.js';
import Currency from '../Entities/Currency.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import {CurrencyID} from '../../types/enums/CurrencyID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import {EntityID} from '../../types/enums/EntityID.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export type LocationFactoryCreateOptions = {
    level: unsigned;
    internalItemStorageSize?: unsigned;
    heroGroupSize?: unsigned;
}

export type GatheringItemPointPattern = {
    [GatheringItemPointID.low]: number;
    [GatheringItemPointID.normal]: number;
    [GatheringItemPointID.high]: number;
}

export default class LocationFactory {
    private readonly _gameObjectFactory: GameObjectFactory;
    private readonly _itemStackFactory: ItemStackFactory;
    private readonly _entityManager: EntityManagerInterface;
    private readonly _itemDatabase: ItemDatabase;
    private readonly _itemStorageFactory: ItemStorageFactory;

    private readonly _maxGatheringItemPointsCount: number;

    private readonly _defaultOptions: Partial<LocationFactoryCreateOptions> = {
        internalItemStorageSize: 5,
        heroGroupSize: 5,
    };

    constructor(
        gameObjectFactory: GameObjectFactory,
        itemStackFactory: ItemStackFactory,
        entityManager: EntityManagerInterface,
        itemDatabase: ItemDatabase,
        itemStorageFactory: ItemStorageFactory,
    ) {
        this._maxGatheringItemPointsCount = 3;

        this._gameObjectFactory = gameObjectFactory;
        this._itemStackFactory = itemStackFactory;
        this._entityManager = entityManager;
        this._itemDatabase = itemDatabase;
        this._itemStorageFactory = itemStorageFactory;
    }

    create(
        level: unsigned,
        internalItemStorageSize?: unsigned,
        heroGroupSize?: unsigned,
    ): GameObject {
        internalItemStorageSize = internalItemStorageSize ?? this._defaultOptions.internalItemStorageSize;
        heroGroupSize = heroGroupSize ?? this._defaultOptions.heroGroupSize;

        let location = this._gameObjectFactory.create();

        //todo: Доступ к кошельку нужно сделать удобнее, а не по ID валюты из контейнера.
        location.set<WalletComponent>(CurrencyID.Gold, new WalletComponent(
            this._entityManager.get<Currency>(EntityID.Currency, CurrencyID.Gold),
            0,
        ));
        let heroGroupComponent = location.set<HeroGroupComponent>('heroGroupComponent', new HeroGroupComponent({
            size: 5,
        }));

        let itemStorageComponent = location.set('internalItemStorageComponent', this._itemStorageFactory.createIn(internalItemStorageSize, location));

        //todo: Переделать всё что с жилами. Разделить, сделать удобнее. Не понятно что тут происходит.
        //todo: В периоде нет смысла если он используется только при выводе для игрока.
        let gatheringItemPointTypeValues: Readonly<GatheringItemPointTypeValues> = {
            [GatheringItemPointID.low]: {value: 2 * 3600, period: ONE_HOUR_IN_SECONDS},
            [GatheringItemPointID.normal]: {value: 4 * 3600, period: ONE_HOUR_IN_SECONDS},
            [GatheringItemPointID.high]: {value: 8 * 3600, period: ONE_HOUR_IN_SECONDS},
        };
        let gatheringItemPointPatterns: GatheringItemPointPattern[] = [
            {[GatheringItemPointID.low]: 0, [GatheringItemPointID.normal]: 3, [GatheringItemPointID.high]: 0},
            {[GatheringItemPointID.low]: 0, [GatheringItemPointID.normal]: 2, [GatheringItemPointID.high]: 1},
            {[GatheringItemPointID.low]: 1, [GatheringItemPointID.normal]: 2, [GatheringItemPointID.high]: 0},
        ];

        //todo: Предметы должны устаналиваться более строго. А вдруг в бд не будет предметов категории? Надо чтобы items всегда был в рабочем состоянии.
        // let items = this._itemDatabase.filter({
        let items = this._itemDatabase.getByItemCategory(this._entityManager.get<ItemCategory>(EntityID.ItemCategory, ItemCategoryID.Resources));
        if (items.length < this._maxGatheringItemPointsCount) {
            debug(DebugNamespaceID.Warning)('Предметов не достаточно для создании локации.');
            // throw new AppError('indev: Предметов не достаточно для создании локации.');
        }
        items = Random.some(items, this._maxGatheringItemPointsCount, {unique: true});
        let selectedGatheringItemPointPattern = Random.one(gatheringItemPointPatterns);

        let index = 0;
        let gatheringItemPoints: GatheringItemPoint[] = [];
        for (const selectedGatheringItemPointPatternKey in selectedGatheringItemPointPattern) {
            let i = 0;
            while (i < selectedGatheringItemPointPattern[selectedGatheringItemPointPatternKey]) {
                if (items[index]) {
                    gatheringItemPoints.push({
                        item: items[index],
                        count: gatheringItemPointTypeValues[selectedGatheringItemPointPatternKey],
                        type: <GatheringItemPointID>selectedGatheringItemPointPatternKey,
                    });
                }
                ++i;
                ++index;
            }
        }

        let locationComponent = location.set<LocationComponent>(LocationComponent.name, new LocationComponent({
            created: new Date(),
            gatheringItemPoints: gatheringItemPoints,
            heroGroupComponent: heroGroupComponent,
            internalItemStorageComponent: itemStorageComponent,
            itemStackFactory: this._itemStackFactory,
            level: level,
        }));

        return location;
    }
}