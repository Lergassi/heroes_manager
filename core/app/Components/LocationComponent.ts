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
import {Seconds, unsigned} from '../../types/main.js';
import EventSystem from '../../source/EventSystem.js';
import ExperienceComponent from './ExperienceComponent.js';
import {assertIsGreaterThanOrEqual, assertNotNil} from '../../source/assert.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import CharacterFightGroup from '../CharacterFightGroup.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import GatheringPoint from './GatheringPoint.js';
import Gatherer from './Gatherer.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';

export enum LocationState {
    Waiting = 'Waiting',
    Hunting = 'Hunting',
}

export enum GatheringPointTypeID {
    low = 'low',
    normal = 'normal',
    high = 'high',
}

export type GatheringItemPointTypeValues = {
    readonly [key in GatheringPointTypeID]: GatheringItemValue;
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
    readonly type: GatheringPointTypeID;
}

export enum LocationComponentEventCode {
    Start = 'LocationComponent.Start',
    Stop = 'LocationComponent.Stop',
    AddHero = 'LocationComponent.AddHero',
    RemoveHero = 'LocationComponent.RemoveHero',
    GatheringItems = 'LocationComponent.GatheringItems',
    GetItems = 'LocationComponent.GetItems',
    Update = 'LocationComponent.Update',
}

export default class LocationComponent {
    private readonly _created: Date;
    private readonly _level: unsigned;
    // private readonly _gatheringItemPoints: GatheringItemPoint[];
    private readonly _gatheringPoints: GatheringPoint[];
    private readonly _itemStackFactory: ItemStackFactory;

    private readonly _heroes: GameObject[];
    private readonly _heroFightGroup: CharacterFightGroup;
    private readonly _enemyFightGroup: CharacterFightGroup;

    //лут
    private readonly _itemStorage: ItemStorageInterface;   //Визуально может никак не быть связанным с сумками.
    private readonly _wallet: WalletInterface;
    // private readonly _exp: ;

    private _state: LocationState;
    private _intervalID: NodeJS.Timer;
    private readonly _intervalPeriod: Seconds;

    private readonly _options = {
        heroGroupSize: 5,
        intervalPeriod: 1,  //todo: В будущем настраиваемый игрой.
    };

    constructor(
        created: Date,
        level: unsigned,
        // gatheringItemPoints: GatheringItemPoint[],
        gatheringPoints: GatheringPoint[],
        itemStackFactory: ItemStackFactory,         //todo: Убрать в генератор лута.
        // itemStorage: ItemStorageComponent,
        itemStorage: ItemStorageInterface,
        // walletFactory: WalletFactory,
        wallet: WalletInterface,
        enemies: GameObject[] = [],
        // options?: {сумка или фабрика, кошелек или фабрика}
    ) {
        assertNotNil(created);
        assertIsGreaterThanOrEqual(level, 1);
        // assertNotNil(gatheringItemPoints);
        assertNotNil(gatheringPoints);
        assertNotNil(itemStorage);
        assertNotNil(itemStackFactory);

        this._state = LocationState.Waiting;

        this._created = created;
        this._level = level;
        // this._gatheringItemPoints = gatheringItemPoints;
        this._gatheringPoints = gatheringPoints;
        this._itemStackFactory = itemStackFactory;

        this._heroes = [];
        this._heroFightGroup = new CharacterFightGroup(this._options.heroGroupSize);
        this._enemyFightGroup = new CharacterFightGroup(enemies.length);
        for (let i = 0; i < enemies.length; i++) {
            this._enemyFightGroup.addCharacter(enemies[i]);
        }

        //лут
        this._itemStorage = itemStorage;
        // this._wallet = walletFactory.create(CurrencyID.Gold).get<WalletInterface>(WalletComponent.name);    //todo: Убрать GameObject.
        this._wallet = wallet;
    }

    start(options?: {
        // wallet: WalletInterface,
    }): void {
        if (this._state !== LocationState.Waiting) {
            throw new AppError('Охота уже запущена.');   //todo: Одна ошибка на подобные действия.
        }

        // if (this._heroFightGroup.heroesCount === 0) {
        //     throw new AppError('В группе должен быть хотя бы 1 герой.');
        // }

        this._state = LocationState.Hunting;
        // this._heroGroupComponent.block(this);
        let afterTargetDiedOptions: RewardOptions = {
            // wallet: options?.wallet,
            wallet: this._wallet,
            itemStorage: this._itemStorage,
        };
        this._intervalID = setInterval(() => {
            this._gather();

            if (this._heroFightGroup.canAttack() && this._enemyFightGroup.canAttack()) {
                this._heroFightGroup.attackTo(this._enemyFightGroup, afterTargetDiedOptions);
                this._enemyFightGroup.attackTo(this._heroFightGroup);
            }
            //И другие действия...
        }, this._options.intervalPeriod * ONE_SECOND_IN_MILLISECONDS);
        debug(DebugNamespaceID.Log)('Охота запущена.');
        EventSystem.event(LocationComponentEventCode.Start, this);
    }

    stop() {//todo: Тут тоже stateOwner? Игрок или другая часть программы от которой зависит состояние объекта.
        if (this._state !== LocationState.Hunting) {
            throw new AppError('Охота не запущена.');
        }

        this._state = LocationState.Waiting;
        // this._heroGroupComponent.unblock(this);
        clearInterval(this._intervalID);
        debug(DebugNamespaceID.Log)('Охота остановлена.');
        EventSystem.event(LocationComponentEventCode.Stop, this);
    }

    toggleState(options?: {
        wallet?: WalletInterface,
    }): void {
        if (this._state === LocationState.Waiting) {
            this.start({
                wallet: options?.wallet,
            });
        } else if (this._state === LocationState.Hunting) {
            this.stop();
        }
    }

    // /**
    //  * Перемещает объекты в сумки. Если слотов не хватает, остатки остаются в локации. Технически: перемещение между сумками.
    //  * @param itemStorageManager
    //  */
    // moveItems(itemStorageManager: ItemStorageManager) {
    //     this.canModify();
    //
    //     itemStorageManager.moveFrom(this._itemStorage);
    //     // debug('log')('Предметы перемещены.');
    //     // EventSystem.event(LocationComponentEventCode.GetItems, this)
    //     EventSystem.event(LocationComponentEventCode.Update, this);
    // }

    getReward(rewardOptions: {
        // itemStorage?: ItemStorageManager,
        itemStorage?: ItemStorageInterface,
        wallet?: WalletInterface,
        //Опыт для игрока если будет. Пока только для героев.
    }): void {
        if (!this._canModify()) return;

        // if (rewardOptions.itemStorage) rewardOptions.itemStorage.moveFrom(this._itemStorage);
        if (rewardOptions.itemStorage) this._itemStorage.moveTo(rewardOptions.itemStorage);
        if (rewardOptions.wallet) this._wallet.moveTo(rewardOptions.wallet);
        EventSystem.event(LocationComponentEventCode.Update, this);
    }

    /**
     * todo: В отдельный класс. За сбор ресурсов будет отвечать другой объект. Т.е. локация тут вообще ничего делать не будет. Gathering
     * @private
     */
    private _gather(): void {
        if (!this._gatheringPoints.length) return;

        // this._heroFightGroup.gather(this._gatheringItemPoints, this._itemStorage, this._options.intervalPeriod);
        for (let i = 0; i < this._heroes.length; i++) {
            for (let j = 0; j < this._gatheringPoints.length; j++) {
                if (this._gatheringPoints[j].isEmpty()) continue;

                this._heroes[i].get<Gatherer>(ComponentID.Gatherer).gather3(this._gatheringPoints[j], this._itemStorage);
                // if (this._heroes[i].get<Gatherer>(ComponentID.Gatherer).gather3(this._gatheringPoints[j], this._itemStorage)) {
                    EventSystem.event(LocationComponentEventCode.GatheringItems, this);
                // }
                // if (this._gatheringPoints[j].gather3(this._itemStorage)) {
                //     EventSystem.event(LocationComponentEventCode.GatheringItems, this);
                // }
            }
        }
    }

    addHero(hero: GameObject) {
        // assert(hero instanceof GameObject);
        assertNotNil(hero);

        this._canAddHero(hero);

        // this._heroGroupComponent.addHero(hero);
        this._heroFightGroup.addCharacter(hero);
        this._heroes.push(hero);    //todo: Не будет работать после удаления исключений.
        EventSystem.event(LocationComponentEventCode.AddHero, this);    //todo: Или достаточно события из группы? Может как то связать их? "Цепочка" событыий.
    }

    removeHero(hero: GameObject) {
        assertNotNil(hero);
        // assert(hero instanceof GameObject);

        this._canRemoveHero();

        // this._heroGroupComponent.removeHero(hero);
        this._heroFightGroup.removeCharacter(hero);
        _.pull(this._heroes, hero);
        EventSystem.event(LocationComponentEventCode.RemoveHero, this);
    }

    canModify(): void {
        if (this._state !== LocationState.Waiting) {
            throw new AppError('Нельзя редактировать локацию во время охоты.');
        }
    }

    private _canModify(): boolean {
        if (this._state !== LocationState.Waiting) {
            debug(DebugNamespaceID.Throw)('Нельзя редактировать локацию во время охоты.');
            return false;
        }

        return true;
    }

    canDelete(): void {
        if (this._state !== LocationState.Waiting) {
            throw new AppError('Нельзя удалить локацию во время охоты.');
        }
    }

    private _canAddHero(hero: GameObject): void {
        this.canModify();

        if (hero.getComponent<ExperienceComponent>(ComponentID.Experience).level < this._level) {
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
            gatheringItemPoints: [],
            internalItemStorageComponent: undefined,
            heroGroupComponent: undefined,
        });
    }
}