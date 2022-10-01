import HeroGroupComponent from '../Components/HeroGroupComponent.js';
import ItemStorageComponent from '../Components/ItemStorageComponent.js';
import LocationComponent, {
    GatheringItemPoint,
    GatheringItemPointType,
    GatheringItemPointTypeValues
} from '../Components/LocationComponent.js';
import EntityManager from '../../source/EntityManager.js';
import Item from '../Entities/Item.js';
import GameObjectFactory from './GameObjectFactory.js';
import GameObject from '../../source/GameObject.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';
import ItemStackFactory from './ItemStackFactory.js';
import {LevelRange} from '../Components/LevelComponent.js';
import ItemDatabase from '../ItemDatabase.js';
import Random from '../Services/Random.js';
import ItemCategory from '../Entities/ItemCategory.js';
import _ from 'lodash';
import {Seconds} from '../types.js';
import {ONE_HOUR_IN_SECONDS} from '../consts.js';
import AppError from '../../source/AppError.js';
import {debugItemList} from '../../debug/debug_functions.js';
import ItemStorageFactory from './ItemStorageFactory.js';
import EventSystem from '../../source/EventSystem.js';

export type LocationFactoryOptions = {
    level: LevelRange;
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
    private readonly _IDGenerator: IDGeneratorInterface;
    private readonly _gameObjectFactory: GameObjectFactory;
    private readonly _itemStackFactory: ItemStackFactory;
    private readonly _entityManager: EntityManager;
    private readonly _itemDatabase: ItemDatabase;
    private readonly _random: Random;
    private readonly _itemStorageFactory: ItemStorageFactory;

    private readonly _gatheringItemTypesCount: number;
    private readonly _eventSystem: EventSystem;

    constructor(options: {
        IDGenerator: IDGeneratorInterface;
        gameObjectFactory: GameObjectFactory;
        itemStackFactory: ItemStackFactory;
        entityManager: EntityManager;
        itemDatabase: ItemDatabase;
        random: Random;
        itemStorageFactory: ItemStorageFactory;
        eventSystem: EventSystem;
        // options: Partial<LocationFactoryOptions>;
    }) {
        this._IDGenerator = options.IDGenerator;
        this._gameObjectFactory = options.gameObjectFactory;
        this._itemStackFactory = options.itemStackFactory;
        this._entityManager = options.entityManager;
        this._itemDatabase = options.itemDatabase;
        this._random = options.random;
        this._itemStorageFactory = options.itemStorageFactory;
        this._eventSystem = options.eventSystem;

        this._gatheringItemTypesCount = 3;
    }

    create(options: LocationFactoryOptions): GameObject {
        let locationPeriodInMinutes = 1;
        let location = this._gameObjectFactory.create();

        let heroGroupComponent = location.set<HeroGroupComponent>('heroGroupComponent', new HeroGroupComponent(
            // this._IDGenerator.generateID(),
            5,
        ));
        location.addComponent<HeroGroupComponent>(heroGroupComponent);

        let itemStorageSize = 10;
        // let itemStorageSize = 5;
        // let itemStorageComponent = location.set<ItemStorageComponent>('internalItemStorageComponent', new ItemStorageComponent(
        //     this._IDGenerator.generateID(),
        //     location,
        //     itemStorageSize,
        //     this._IDGenerator,
        //     this._itemStackFactory,
        // ));
        let itemStorageComponent = this._itemStorageFactory.createIn(itemStorageSize, location);

        let gatheringItemPointCount = 3;
        // let gatheringItemPointTypeValues: GatheringItemPointTypeValues = {
        //     [GatheringItemPointType.low]: {value: 16, period: ONE_HOUR},
        //     [GatheringItemPointType.normal]: {value: 32, period: ONE_HOUR},
        //     [GatheringItemPointType.high]: {value: 64, period: ONE_HOUR},
        // };
        // let gatheringItemPointTypeValues: Readonly<GatheringItemPointTypeValues> = {
        //     [GatheringItemPointType.low]: {value: 3600 /*todo: Можно указать период и логику определения ед/период переложить на класс.*/, period: ONE_HOUR},
        //     [GatheringItemPointType.normal]: {value: 3600, period: ONE_HOUR},
        //     [GatheringItemPointType.high]: {value: 3600, period: ONE_HOUR},
        // };
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

        //todo: Предметы должны устаналиваться более строго. А вдруг в бд не будет предметов категории? Надо чтобы items всегда был в рабочев состоянии.
        let items = this._itemDatabase.filter({
            itemCategory: [
                this._entityManager.get<ItemCategory>(ItemCategory, 'resources'),
            ],
        });
        if (items.length < this._gatheringItemTypesCount) {
            throw new AppError('indev: Предметов не достаточно для создании локации.');
        }
        items = this._random.some(items, gatheringItemPointCount, {unique: true});
        let selectedGatheringItemPointPattern = this._random.one(gatheringItemPointPatterns);
        // let selectedGatheringItemPointPattern = gatheringItemPointPatterns[0];
        // console.log(selectedGatheringItemPointPattern);
        let sum = _.sum([
            selectedGatheringItemPointPattern['low'],
            selectedGatheringItemPointPattern['normal'],
            selectedGatheringItemPointPattern['high'],
        ]);
        // console.log('sum', sum);
        let _sum = 0;
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
                ++_sum;
                ++i;
                ++index;
            }
        }
        // console.log('_sum', _sum);
        // console.log('sum === sum', sum === _sum);
        // console.log(gatheringItemPoints);

        let locationComponent = location.set<LocationComponent>('locationComponent', new LocationComponent({
            created: new Date(),
            eventSystem: this._eventSystem,
            gatheringItemPoints: gatheringItemPoints,
            heroGroupComponent: heroGroupComponent,
            internalItemStorageComponent: itemStorageComponent,
            itemStackFactory: this._itemStackFactory,
            levelRange: options.level,
        }));

        return location;
    }
}