import Component from '../../source/Component.js';
import Item from '../Entities/Item.js';
import HeroGroupComponent from './HeroGroupComponent.js';
import GameObject from '../../source/GameObject.js';
import ItemStorageComponent from './ItemStorageComponent.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import _ from 'lodash';
import AppError from '../../source/Errors/AppError.js';
import debug from 'debug';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import {ONE_SECOND_IN_MILLISECONDS} from '../consts.js';
import {Seconds, unsigned} from '../../types/types.js';
import {sprintf} from 'sprintf-js';
import EventSystem from '../../source/EventSystem.js';
import ExperienceComponent from './ExperienceComponent.js';
import {assert} from '../../source/assert.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export enum LocationState {
    Waiting = 'Waiting',
    Hunting = 'Hunting',
}

export enum GatheringItemPointID {
    low = 'low',
    normal = 'normal',
    high = 'high',
}

export type GatheringItemPointTypeValues = {
    readonly [key in GatheringItemPointID]: GatheringItemValue;
};

/**
 * Например: 12/час, 200/час. Для игрока период для жил определяется в часах.
 */
export type GatheringItemValue = {  //todo: Только не сбор, а в целом какой-то период с предметом.
    value: number;
    period: Seconds;
}

export type GatheringItemPoint = {
    readonly item: Item;
    readonly count: GatheringItemValue;
    readonly type: GatheringItemPointID;
}

export enum LocationComponentEventCode {
    Start = 'LocationComponent.Start',
    Stop = 'LocationComponent.Stop',
    AddHero = 'LocationComponent.AddHero',
    RemoveHero = 'LocationComponent.RemoveHero',
    ItemsGenerated = 'LocationComponent.ItemsGenerated',
    GetItems = 'LocationComponent.GetItems',
}

export default class LocationComponent extends Component {
    private readonly _created: Date;
    private readonly _level: unsigned;
    private readonly _gatheringItemPoints: GatheringItemPoint[];
    private readonly _heroGroupComponent: HeroGroupComponent;               //Каждый компонент, который использует группу сам решает как его отобразить.
    private readonly _internalItemStorageComponent: ItemStorageComponent;   //Визуально может никак не быть связанным с сумками.

    private readonly _itemStackFactory: ItemStackFactory;

    private _state: LocationState;
    private _intervalID: NodeJS.Timer;
    private readonly _intervalPeriod: Seconds;

    constructor(options: {
        created: Date,
        level: unsigned,
        gatheringItemPoints: GatheringItemPoint[],
        heroGroupComponent: HeroGroupComponent,
        internalItemStorageComponent: ItemStorageComponent,
        itemStackFactory: ItemStackFactory,
    }) {
        super();

        this._intervalPeriod = 1;   //todo: В будущем настраиваемый игрой.
        this._state = LocationState.Waiting;

        this._created = options.created;
        this._level = options.level;
        this._gatheringItemPoints = options.gatheringItemPoints;
        this._heroGroupComponent = options.heroGroupComponent;
        this._internalItemStorageComponent = options.internalItemStorageComponent;
        this._itemStackFactory = options.itemStackFactory;
    }

    start(): void {
        if (this._state !== LocationState.Waiting) {
            throw new AppError('Охота уже запущена.');   //todo: Одна ошибка на подобные действия.
        }

        if (this._heroGroupComponent.heroesCount === 0) {
            throw new AppError('В группе должен быть хотя бы 1 герой.');
        }

        this._state = LocationState.Hunting;
        this._heroGroupComponent.block(this);
        //todo: Тут будет дальше единый механизм на всю игру. С учетом онлайн игры.
        this._intervalID = setInterval(() => {
            this._generateItems();
            //И другие действия...
        }, this._intervalPeriod * ONE_SECOND_IN_MILLISECONDS);
        debug(DebugNamespaceID.Log)('Охота запущена.');
        EventSystem.event(LocationComponentEventCode.Start, this);
    }

    stop() {//todo: Тут тоже stateOwner? Игрок или другая часть программы от которой зависит состояние объекта.
        if (this._state !== LocationState.Hunting) {
            throw new AppError('Охота не запущена.');
        }

        this._state = LocationState.Waiting;
        this._heroGroupComponent.unblock(this);
        clearInterval(this._intervalID);
        debug(DebugNamespaceID.Log)('Охота остановлена.');
        EventSystem.event(LocationComponentEventCode.Stop, this);
    }

    toggleState(): void {
        if (this._state === LocationState.Waiting) {
            this.start();
        } else if (this._state === LocationState.Hunting) {
            this.stop();
        }
    }

    /**
     * Перемещает объекты в сумки. Если слотов не хватает, остатки остаются в локации. Технически: перемещение между сумками.
     * @param itemStorageManager
     */
    // moveItems(itemStorageManager: ItemStorageManager) {
    moveItems(itemStorageManager: ItemStorageManager) {
        this.canModify();

        itemStorageManager.moveFrom(this._internalItemStorageComponent);
        // debug('log')('Предметы перемещены.');
        EventSystem.event(LocationComponentEventCode.GetItems, this)
    }

    /**
     * todo: В отдельный класс. за сбор ресурсов будет отвечать другой объект. Т.е. локация тут вообще ничего делать не будет. Gathering
     * @private
     */
    private _generateItems() {
        let partOfMaxPeriodGathering = this._heroGroupComponent.partOfMaxHeroesCount /*todo: Так чтоли? */;
        for (let i = 0; i < this._gatheringItemPoints.length; i++) {
            let count = _.ceil(this._gatheringItemPoints[i].count.value / this._gatheringItemPoints[i].count.period * this._intervalPeriod * partOfMaxPeriodGathering);
            if (this._internalItemStorageComponent.addItem(this._gatheringItemPoints[i].item, count) !== count) {   //todo: Не удобно.
                debug(DebugNamespaceID.Log)(sprintf('Собран предмет: %s (%s). Эффективность сбора: %s', this._gatheringItemPoints[i].item.name, count, partOfMaxPeriodGathering));
            }
        }
        EventSystem.event(LocationComponentEventCode.ItemsGenerated, this);
    }

    addHero(hero: GameObject) {
        assert(hero instanceof GameObject);

        this._canAddHero(hero);

        this._heroGroupComponent.addHero(hero);
        EventSystem.event(LocationComponentEventCode.AddHero, this);    //todo: Или достаточно события из группы? Может как то связать их? "Цепочка" событыий.
    }

    removeHero(hero: GameObject) {
        assert(!_.isNil(hero));
        assert(hero instanceof GameObject);

        this._canRemoveHero();

        this._heroGroupComponent.removeHero(hero);
        EventSystem.event(LocationComponentEventCode.RemoveHero, this);
    }

    canModify(): void {
        if (this._state !== LocationState.Waiting) {
            throw new AppError('Нельзя редактировать локацию во время охоты.');
        }
    }

    canDelete(): void {
        if (this._state !== LocationState.Waiting) {
            throw new AppError('Нельзя удалить локацию во время охоты.');
        }
    }

    private _canAddHero(hero: GameObject): void {
        this.canModify();

        if (hero.getComponent<ExperienceComponent>(ExperienceComponent.name).level < this._level) {
            throw new AppError('Уровень героя слишком низкий для данной локации.');
        }
    }

    private _canRemoveHero(): void {
        this.canModify();
    }

    render(callback: ({}: Readonly<{
        level: unsigned,
        gatheringItemPoints: GatheringItemPoint[],
        internalItemStorageComponent: ItemStorageComponent,
        heroGroupComponent: HeroGroupComponent,
    }>) => void) {
        callback({
            level: this._level,
            gatheringItemPoints: this._gatheringItemPoints,
            internalItemStorageComponent: this._internalItemStorageComponent,
            heroGroupComponent: this._heroGroupComponent,
        });
    }

    // render2(o) {
    //     let o = <asdasd>o;
    //     o.set({
    //         a: 1,
    //         //...
    //     });
    // }
}