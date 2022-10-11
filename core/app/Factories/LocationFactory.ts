import HeroGroupComponent from '../Components/HeroGroupComponent.js';
import LocationComponent, {
    GatheringItemPoint,
    GatheringItemPointType,
    GatheringItemPointTypeValues
} from '../Components/LocationComponent.js';
import EntityManager from '../../source/EntityManager.js';
import GameObjectFactory from './GameObjectFactory.js';
import GameObject from '../../source/GameObject.js';
import ItemStackFactory from './ItemStackFactory.js';
import ItemDatabase from '../ItemDatabase.js';
import Random from '../Services/Random.js';
import ItemCategory from '../Entities/ItemCategory.js';
import {CurrencyAlias, CurrencyWalletAlias, ItemCategoryAlias, unsigned} from '../types.js';
import {ONE_HOUR_IN_SECONDS} from '../consts.js';
import AppError from '../../source/Errors/AppError.js';
import ItemStorageFactory from './ItemStorageFactory.js';
import WalletComponent from '../Components/WalletComponent.js';
import Currency from '../Entities/Currency.js';

export type LocationFactoryCreateOptions = {
    // level: LevelRange;
    level: unsigned;
    internalItemStorageSize?: unsigned;
    heroGroupSize?: unsigned;
}

// interface HeroGroupComponentFactoryInterface {
//     create: (options: {
//         location: GameObject;
//         size: number;
//     }) => HeroGroupComponent;
// }
//
// class HeroGroupComponentFactory implements HeroGroupComponentFactoryInterface {
//     create(options: { location: GameObject; size: number }): HeroGroupComponent {
//         return new HeroGroupComponent(
//             42,
//             options.size,
//         );
//     }
// }

export type GatheringItemPointPattern = {
    [GatheringItemPointType.low]: number;
    [GatheringItemPointType.normal]: number;
    [GatheringItemPointType.high]: number;
}

export default class LocationFactory {
    private readonly _gameObjectFactory: GameObjectFactory;
    private readonly _itemStackFactory: ItemStackFactory;
    private readonly _entityManager: EntityManager;
    private readonly _itemDatabase: ItemDatabase;
    private readonly _itemStorageFactory: ItemStorageFactory;

    private readonly _gatheringItemPointsCount: number;

    private readonly _defaultOptions: Partial<LocationFactoryCreateOptions> = {
        internalItemStorageSize: 5,
        heroGroupSize: 5,
    };

    constructor(options: {
        gameObjectFactory: GameObjectFactory;
        itemStackFactory: ItemStackFactory;
        entityManager: EntityManager;
        itemDatabase: ItemDatabase;
        itemStorageFactory: ItemStorageFactory;
    }) {
        this._gameObjectFactory = options.gameObjectFactory;
        this._itemStackFactory = options.itemStackFactory;
        this._entityManager = options.entityManager;
        this._itemDatabase = options.itemDatabase;
        this._itemStorageFactory = options.itemStorageFactory;

        this._gatheringItemPointsCount = 3;
    }

    create(options: LocationFactoryCreateOptions): GameObject {
        let internalItemStorageSize = options.internalItemStorageSize ?? this._defaultOptions.internalItemStorageSize;
        let heroGroupSize = options.heroGroupSize ?? this._defaultOptions.heroGroupSize;

        let location = this._gameObjectFactory.create();

        location.set<WalletComponent>(CurrencyWalletAlias.Gold, new WalletComponent({
            currency: this._entityManager.get<Currency>(Currency, CurrencyAlias.Gold),
            value: 0,
        }));
        let heroGroupComponent = location.set<HeroGroupComponent>('heroGroupComponent', new HeroGroupComponent({
            size: 5,
        }));

        let itemStorageComponent = location.set('internalItemStorageComponent', this._itemStorageFactory.createIn(internalItemStorageSize, location));

        let gatheringItemPointTypeValues: Readonly<GatheringItemPointTypeValues> = {
            [GatheringItemPointType.low]: {value: 2 * 3600, period: ONE_HOUR_IN_SECONDS},
            [GatheringItemPointType.normal]: {value: 4 * 3600, period: ONE_HOUR_IN_SECONDS},
            [GatheringItemPointType.high]: {value: 8 * 3600, period: ONE_HOUR_IN_SECONDS},
        };
        let gatheringItemPointPatterns: GatheringItemPointPattern[] = [
            {[GatheringItemPointType.low]: 0, [GatheringItemPointType.normal]: 3, [GatheringItemPointType.high]: 0},
            {[GatheringItemPointType.low]: 0, [GatheringItemPointType.normal]: 2, [GatheringItemPointType.high]: 1},
            {[GatheringItemPointType.low]: 1, [GatheringItemPointType.normal]: 2, [GatheringItemPointType.high]: 0},
        ];

        //todo: Предметы должны устаналиваться более строго. А вдруг в бд не будет предметов категории? Надо чтобы items всегда был в рабочем состоянии.
        let items = this._itemDatabase.filter({
            itemCategory: [
                this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryAlias.Resources),
            ],
        });
        if (items.length < this._gatheringItemPointsCount) {
            throw new AppError('indev: Предметов не достаточно для создании локации.');
        }
        items = Random.some(items, this._gatheringItemPointsCount, {unique: true});
        let selectedGatheringItemPointPattern = Random.one(gatheringItemPointPatterns);

        let gatheringItemPoints: GatheringItemPoint[] = [];
        let index = 0;
        for (const selectedGatheringItemPointPatternKey in selectedGatheringItemPointPattern) {
            let i = 0;
            while (i < selectedGatheringItemPointPattern[selectedGatheringItemPointPatternKey]) {
                gatheringItemPoints.push({
                    item: items[index],
                    value: gatheringItemPointTypeValues[selectedGatheringItemPointPatternKey],
                    type: <GatheringItemPointType>selectedGatheringItemPointPatternKey,
                });
                ++i;
                ++index;
            }
        }

        let locationComponent = location.set<LocationComponent>('locationComponent', new LocationComponent({
            created: new Date(),
            gatheringItemPoints: gatheringItemPoints,
            heroGroupComponent: heroGroupComponent,
            internalItemStorageComponent: itemStorageComponent,
            itemStackFactory: this._itemStackFactory,
            level: options.level,
        }));

        return location;
    }
}