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
import {Seconds, unsigned} from '../../types/main.js';
import {sprintf} from 'sprintf-js';
import EventSystem from '../../source/EventSystem.js';
import ExperienceComponent from './ExperienceComponent.js';
import {assert, assertIsGreaterThanOrEqual, assertNotNil} from '../../source/assert.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import FightControllerInterface, {EnemyRewardOptions} from '../Interfaces/FightControllerInterface.js';
import AttackGroupController from './AttackGroupController.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import DamageGroupController from './DamageGroupController.js';
import FightController from './FightController.js';
import CharacterFightGroup from '../CharacterFightGroup.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import WalletFactory from '../Factories/WalletFactory.js';
import {CurrencyID} from '../../types/enums/CurrencyID.js';
import WalletComponent from './WalletComponent.js';
import ExperienceDistributorInterface from '../Interfaces/ExperienceDistributorInterface.js';

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
    Update = 'LocationComponent.Update',
}

export default class LocationComponent {
    private readonly _created: Date;
    private readonly _level: unsigned;
    private readonly _gatheringItemPoints: GatheringItemPoint[];
    private readonly _heroGroupComponent: HeroGroupComponent;               //Каждый компонент, который использует группу сам решает как его отобразить.
    private readonly _itemStackFactory: ItemStackFactory;

    private readonly _heroFightGroup: CharacterFightGroup;
    private readonly _enemyFightGroup: CharacterFightGroup;

    //лут
    private readonly _itemStorage: ItemStorageComponent;   //Визуально может никак не быть связанным с сумками.
    private readonly _wallet: WalletInterface;
    // private readonly _exp: ;

    private _state: LocationState;
    private _intervalID: NodeJS.Timer;
    private readonly _intervalPeriod: Seconds;

    private readonly _options = {
        heroGroupSize: 5,
        enemiesMax: 5,      //todo: Пока враги используют один компоненты с героями HeroGroup. Далее групп у врагов не будет.
        intervalPeriod: 1,  //todo: В будущем настраиваемый игрой.
    };

    constructor(
        created: Date,
        level: unsigned,
        gatheringItemPoints: GatheringItemPoint[],
        // heroGroupComponent: HeroGroupComponent,
        itemStackFactory: ItemStackFactory,         //todo: Убрать в генератор лута.
        itemStorage: ItemStorageComponent,
        // walletFactory: WalletFactory,
        wallet: WalletInterface,
        enemies: GameObject[] = [],
    ) {
        assertNotNil(created);
        assertIsGreaterThanOrEqual(level, 1);
        assertNotNil(gatheringItemPoints);
        assertNotNil(itemStorage);
        assertNotNil(itemStackFactory);

        this._state = LocationState.Waiting;

        this._created = created;
        this._level = level;
        this._gatheringItemPoints = gatheringItemPoints;
        // this._heroGroupComponent = heroGroupComponent;
        this._itemStackFactory = itemStackFactory;
        // this._enemyGroup = enemyGroup;

        // this._attackGroupController = new AttackGroupController();
        // this._damageGroupController = new DamageGroupController();
        // this._fightController = new FightController(this._attackGroupController, this._damageGroupController);
        this._heroGroupComponent = new HeroGroupComponent(this._options.heroGroupSize);
        this._heroFightGroup = new CharacterFightGroup(this._options.heroGroupSize);
        this._enemyFightGroup = new CharacterFightGroup(this._options.enemiesMax);
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

        // if (this._heroGroupComponent.heroesCount === 0) {
        //     throw new AppError('В группе должен быть хотя бы 1 герой.');
        // }

        this._state = LocationState.Hunting;
        this._heroGroupComponent.block(this);
        //todo: Тут будет дальше единый механизм на всю игру. С учетом онлайн игры.
        let callback = () => {
            console.log('CALLBACK FOR ENEMY DIE');
        }
        let afterTargetDiedOptions: EnemyRewardOptions = {
            // wallet: options?.wallet,
            wallet: this._wallet,
            itemStorage: this._itemStorage,
        };
        this._intervalID = setInterval(() => {
            this._generateItems();

            if (this._heroFightGroup.canAttack() && this._enemyFightGroup.canAttack()) {
                // this._heroFightGroup.attackTo(this._enemyFightGroup);
                this._heroFightGroup.attackTo(this._enemyFightGroup, afterTargetDiedOptions);
                // this._heroFightGroup.attackTo(this._enemyFightGroup, callback);
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
        this._heroGroupComponent.unblock(this);
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

    /**
     * Перемещает объекты в сумки. Если слотов не хватает, остатки остаются в локации. Технически: перемещение между сумками.
     * @param itemStorageManager
     */
    moveItems(itemStorageManager: ItemStorageManager) {
        this.canModify();

        itemStorageManager.moveFrom(this._itemStorage);
        // debug('log')('Предметы перемещены.');
        // EventSystem.event(LocationComponentEventCode.GetItems, this)
        EventSystem.event(LocationComponentEventCode.Update, this);
    }

    getReward(rewardOptions: {
        itemStorage?: ItemStorageManager,
        wallet?: WalletInterface,
        //Опыт для игрока если будет. Пока только для героев.
    }): void {
        if (rewardOptions.itemStorage) rewardOptions.itemStorage.moveFrom(this._itemStorage);
        if (rewardOptions.wallet) this._wallet.moveTo(rewardOptions.wallet);
        EventSystem.event(LocationComponentEventCode.Update, this);
    }

    /**
     * todo: В отдельный класс. За сбор ресурсов будет отвечать другой объект. Т.е. локация тут вообще ничего делать не будет. Gathering
     * @private
     */
    private _generateItems() {
        this._heroFightGroup.gather(this._gatheringItemPoints, this._itemStorage, this._options.intervalPeriod);
        EventSystem.event(LocationComponentEventCode.ItemsGenerated, this);
    }

    addHero(hero: GameObject) {
        // assert(hero instanceof GameObject);
        assertNotNil(hero);

        this._canAddHero(hero);

        // this._heroGroupComponent.addHero(hero);
        this._heroFightGroup.addCharacter(hero);
        EventSystem.event(LocationComponentEventCode.AddHero, this);    //todo: Или достаточно события из группы? Может как то связать их? "Цепочка" событыий.
    }

    removeHero(hero: GameObject) {
        assertNotNil(hero);
        // assert(hero instanceof GameObject);

        this._canRemoveHero();

        // this._heroGroupComponent.removeHero(hero);
        this._heroFightGroup.removeCharacter(hero);
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
            internalItemStorageComponent: this._itemStorage,
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