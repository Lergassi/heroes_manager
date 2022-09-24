import Component from '../../source/Component.js';
import Item from '../Entities/Item.js';
import HeroGroupComponent from './HeroGroupComponent.js';
import GameObject from '../../source/GameObject.js';
import {ItemCountInterface, ItemCountReadonlyInterface} from '../RuntimeObjects/ItemStack.js';
import ItemStorageComponent from './ItemStorageComponent.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import _ from 'lodash';
import {debugItemStorage, debugItemStorages} from '../../debug/debug_functions.js';
import AppError from '../../source/AppError.js';
import LevelComponent, {LevelRange} from './LevelComponent.js';
import debug from 'debug';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import {MILLISECONDS_IN_SECOND} from '../consts.js';
import {Minutes, Seconds} from '../types.js';
import {sprintf} from 'sprintf-js';
import {PlacementControllerInterface, PlacementInterface} from './HeroListComponent.js';

export class AvailableGatherItem {
    private readonly _item: Item;
    private readonly _minCount: number;
    private readonly _maxCount: number;

    get item(): Item {
        return this._item;
    }

    get minCount(): number {
        return this._minCount;
    }

    get maxCount(): number {
        return this._maxCount;
    }

    constructor(item: Item, minCount: number, maxCount: number) {
        this._item = item;
        this._minCount = minCount;
        this._maxCount = maxCount;
    }
}

// class AvailableGatherItemList {
//     private _items: ItemCountInterface[];
//
//     availableItem(item: Item): boolean {
//         for (let i = 0; i < this._items.length; i++) {
//             if (this._items[i].item === item) {
//                 return true;
//             }
//         }
//
//         return false;
//     }
// }

export enum LocationState {
    Waiting = 'Waiting',
    Hunting = 'Hunting',
}

export enum GatheringItemPointType {
    low = 'low',
    normal = 'normal',
    high = 'high',
}

export type GatheringItemPointTypeValues = {
    // readonly [key in GatheringItemPointType]: number;
    readonly [key in GatheringItemPointType]: GatheringItemValue;
};

// type ItemGatheringTypeLiteral = 'low' | 'normal' | 'high';
// let a: ItemGatheringTypeLiteral = ''

// export let ItemGatheringPointTypeValues2: {[key: string]: number} = {
// export let ItemGatheringPointTypeValues2: {[key: ItemGatheringTypeLiteral]: number} = {
// export let ItemGatheringPointTypeValues2: {[key in ItemGatheringTypeLiteral]: number} = {
// export let itemGatheringPointTypeValues: {[key in ItemGatheringPointType]: number} = {
//     low: 42,
//     normal: 42,
//     high: 42,
// };

/**
 * Например: 12/час, 200/час. Для игрока период для жил определяется в часах.
 */
export type GatheringItemValue = {  //todo: Только не сбор, а в целом какой-то период с предметом.
    value: number;
    period: Seconds;
}

export type GatheringItemPoint = {
    readonly item: Item;
    // readonly value: number;
    readonly value: GatheringItemValue;
    readonly type: GatheringItemPointType;
}

// export class ItemGatheringPoint {
//     readonly item: Item;
//     readonly value: number;
//     readonly type: ItemGatheringPointType;
//
//     constructor(item: Item, value: number, type: ItemGatheringPointType) {
//         this.item = item;
//         this.value = value;
//         this.type = type;
//     }
// }

// export default class LocationComponent extends Component implements PlacementInterface {
// export default class LocationComponent extends Component {
export default class LocationComponent extends Component implements PlacementControllerInterface {
    private readonly _created: Date;
    private readonly _level: LevelRange;
    private readonly _gatheringItemPoints: GatheringItemPoint[];
    private readonly _heroGroupComponent: HeroGroupComponent;               //Каждый компонент, который использует группу сам решает как его отобразить.
    private readonly _internalItemStorageComponent: ItemStorageComponent;   //Визуально может никак не быть связанным с сумками.

    private readonly _itemStackFactory: ItemStackFactory;

    private _state: LocationState;
    private _intervalID: NodeJS.Timer;
    private readonly _intervalPeriod: Seconds;

    //todo: Не многовато зависимостей?
    constructor(
        id: number,
        created: Date,
        level: LevelRange,
        gatheringItemPoints: GatheringItemPoint[],
        heroGroupComponent: HeroGroupComponent,
        internalItemStorageComponent: ItemStorageComponent,
        itemStackFactory: ItemStackFactory,
    ) {
        super(id);
        this._created = created;
        this._level = level;
        this._gatheringItemPoints = gatheringItemPoints;
        this._heroGroupComponent = heroGroupComponent;
        this._internalItemStorageComponent = internalItemStorageComponent;
        this._itemStackFactory = itemStackFactory;

        this._state = LocationState.Waiting;
        // this._intervalPeriod = 60;
        this._intervalPeriod = 1;
    }

    //Дублирование интерфейса? Если объект будет в GameObject, то им можно управлять из вне. Сделать закрытыми? Или пометку у компонента, что он не доступен из вне.
    // setHero() {}
    // addHero() {}
    // clearPosition(position: number) {}

    //Надо подумать как редактировать группу. В этот момент происходит добыча ресурсов или нет?
    start(): void {
        if (this._state !== LocationState.Waiting) {
            return;
        }

        if (this._heroGroupComponent.heroesCount === 0) {
            throw new AppError('В группе должен быть хотя бы 1 герой.');
        }

        this._state = LocationState.Hunting;
        this._heroGroupComponent.block(this);
        //todo: Тут будет дальше единый механизм на всю игру. С учетом онлайн игры.
        this._intervalID = setInterval(() => {
            this.generateItems();
            //И другие действия...
        }, this._intervalPeriod * MILLISECONDS_IN_SECOND);
        debug('log')('Охота запущена.');
    }

    stop() {//todo: Тут тоже stateOwner? Игрок или другая часть программы от которой зависит состояние объекта.
        if (this._state !== LocationState.Hunting) {
            return;
        }

        this._state = LocationState.Waiting;
        this._heroGroupComponent.unblock(this);
        clearInterval(this._intervalID);
        debug('log')('Охота остановлена.');
    }

    // private _timeIsOver(): boolean {
    //     return new Date() >= (new Date(this._created).setSeconds(this._created.getSeconds() + 5));
    // }
    // end() {} //Охота начинается сразу при добавлении героя. При удалении героев охота не происходит.

    //Перемещает объекты в сумки. Если слотов не хватает, остатки остаются в локации. Технически: перемещение между сумками.
    takeItems(itemStorageManager: ItemStorageManager) {
        itemStorageManager.moveFrom(this._internalItemStorageComponent);
        debug('log')('Предметы собраны.');
        debugItemStorage(this.gameObject);
        debugItemStorages(itemStorageManager.itemStorages);
    }

    generateItems() {
        // debug('log')('Сбор предметов.');
        // let partOfMaxPeriodGathering = this._heroGroupComponent.heroesCount / this._heroGroupComponent.size /*todo: И как это без геттера слелать? */;
        let partOfMaxPeriodGathering = this._heroGroupComponent.partOfMaxHeroesCount /*todo: так чтоли? */;
        for (let i = 0; i < this._gatheringItemPoints.length; i++) {
            let count = _.ceil(this._gatheringItemPoints[i].value.value / this._gatheringItemPoints[i].value.period * this._intervalPeriod * partOfMaxPeriodGathering);
            if (this._internalItemStorageComponent.addItem(this._gatheringItemPoints[i].item, count) !== count) {   //todo: Не удобно.
                debug('log')(sprintf('Собран предмет: %s (%s). Эффективность сбора: %s', this._gatheringItemPoints[i].item.name, count, partOfMaxPeriodGathering));
            }
        }
        debugItemStorage(this._internalItemStorageComponent);
    }

    addHero(hero: GameObject) {
        this._canAddHero(hero);

        this._heroGroupComponent.addHero(hero);
    }

    removeHero(hero: GameObject) {

    }

    _canAddHero(hero: GameObject): void {
        if (this._state !== LocationState.Waiting) {
            throw new AppError('Нельзя редактировать локацию во время охоты.');
        }

        if (this._level.lessMin(hero.getComponent<LevelComponent>(LevelComponent).level, {strong: true})) {
            throw new AppError('Уровень героя слишком низкий для данной локации.');
        }
    }

    render(callback) {
        callback({
            level: this._level,
            gatheringItemPoints: this._gatheringItemPoints,
            internalItemStorageComponent: this._internalItemStorageComponent,
            heroGroupComponent: this._heroGroupComponent,
        });
    }

    attach(rComponent) {
        // rComponent
    }
}