import debug from 'debug';
import _ from 'lodash';
import {
    DetailLocationRCEnemyElement,
    DetailLocationRCHeroElement,
    DetailLocationRCVeinElement
} from '../../../client/public/Components/DetailLocationRC.js';
import {assertIsGreaterThanOrEqual, assertNotNil} from '../../source/assert.js';
import AppError from '../../source/Errors/AppError.js';
import EventSystem from '../../source/EventSystem.js';
import GameObject from '../../source/GameObject.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {ItemCount, Seconds, UI_ItemCount, UI_VeinItemCount, unsigned} from '../../types/main.js';
import {ONE_SECOND_IN_MILLISECONDS} from '../consts.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import Item from '../Entities/Item.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import LevelInterface from '../Interfaces/LevelInterface.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import CharacterAttribute from './CharacterAttribute.js';
import CharacterFightGroup from './CharacterFightGroup.js';
import Enemy from './Enemy.js';
import Experience from './Experience.js';
import Gatherer from './Gatherer.js';
import GatheringPoint from './GatheringPoint.js';
import HealthPoints from './HealthPoints.js';
import HeroComponent from './HeroComponent.js';
import ItemStorageComponent from './ItemStorageComponent.js';

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

export enum LocationEventCode {
    Start = 'Location.Start',
    Stop = 'Location.Stop',
    AddHero = 'Location.AddHero',
    RemoveHero = 'Location.RemoveHero',
    AddEnemy = 'Location.AddEnemy',
    RemoveEnemy = 'Location.RemoveEnemy',
    GatheringItems = 'Location.GatheringItems',
    GetItems = 'Location.GetItems',
    Update = 'Location.Update',
}

export interface LocationRender {
    updateState(state: string): void;
    updateLevel(level: number): void;   //todo: Тут наверное нужно все данные которые не изменяются передать и метод назвать set/init.
    updateHeroes(heroes: DetailLocationRCHeroElement[]): void;
    updateEnemies(enemies: DetailLocationRCEnemyElement[]): void;
    // updateVeins(veins: DetailLocationRCVeinElement[]): void;
    updateVeins(veins: UI_VeinItemCount[]): void;
    updateLoot(loot: UI_ItemCount[]): void;
    updateMoney(value: number): void;
}

export default class Location {
    private readonly _created: Date;
    private readonly _level: unsigned;
    // private readonly _gatheringItemPoints: GatheringItemPoint[];
    private readonly _gatheringPoints: GatheringPoint[];
    private readonly _itemStackFactory: ItemStackFactory;

    private readonly _heroes: GameObject[];
    private readonly _heroFightGroup: CharacterFightGroup;

    private readonly _enemies: GameObject[];
    private readonly _enemyFightGroup: CharacterFightGroup;

    //лут
    private readonly _itemStorage: ItemStorageInterface;   //Визуально может никак не быть связанным с сумками.
    private readonly _wallet: WalletInterface;
    // private readonly _exp: ;

    private _state: LocationState;
    private _intervalID: NodeJS.Timer;
    private readonly _intervalPeriod: Seconds;

    //todo: Настраиваемые параметры.
    private readonly _options = {
        heroGroupSize: 5,
        intervalPeriod: 1,
    };

    constructor(
        created: Date,
        level: unsigned,
        gatheringPoints: GatheringPoint[],
        itemStackFactory: ItemStackFactory,         //todo: Убрать в генератор лута.
        itemStorage: ItemStorageInterface,
        wallet: WalletInterface,
        // enemies: GameObject[] = [],
    ) {
        assertNotNil(created);
        assertIsGreaterThanOrEqual(level, 1);
        assertNotNil(gatheringPoints);
        assertNotNil(itemStorage);
        assertNotNil(itemStackFactory);

        this._state = LocationState.Waiting;

        this._created = created;
        this._level = level;
        this._gatheringPoints = gatheringPoints;
        this._itemStackFactory = itemStackFactory;

        this._heroes = [];
        this._heroFightGroup = new CharacterFightGroup();

        this._enemies = [];
        this._enemyFightGroup = new CharacterFightGroup();

        //лут
        this._itemStorage = itemStorage;    //todo: Убрать. Если нужно передать из вне - логику поменять, а не делать чтото на всякий случай. И кошелек тоже.
        this._wallet = wallet;

        this._ui = [];
    }

    start(options?: {
        // wallet: WalletInterface,
    }): boolean {
        if (this._state !== LocationState.Waiting) {
            debug(DebugNamespaceID.Throw)('Охота уже запущена.');
            return false;
        }

        if (this._heroes.length === 0) {
            debug(DebugNamespaceID.Throw)('В группе должен быть хотя бы 1 герой.');
            return false;
        }

        this._state = LocationState.Hunting;
        let afterTargetDiedOptions: RewardOptions = {
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
        EventSystem.event(LocationEventCode.Start, this);

        return true;
    }

    stop() {//todo: Тут тоже stateOwner? Игрок или другая часть программы от которой зависит состояние объекта.
        if (this._state !== LocationState.Hunting) {
            throw new AppError('Охота не запущена.');
        }

        this._state = LocationState.Waiting;
        // this._heroGroupComponent.unblock(this);
        clearInterval(this._intervalID);
        debug(DebugNamespaceID.Log)('Охота остановлена.');
        EventSystem.event(LocationEventCode.Stop, this);
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

    getReward(rewardOptions: {
        itemStorage?: ItemStorageInterface,
        wallet?: WalletInterface,
    }): void {
        if (!this._canModify()) return;

        if (rewardOptions.itemStorage) this._itemStorage.moveTo(rewardOptions.itemStorage);
        if (rewardOptions.wallet) this._wallet.moveTo(rewardOptions.wallet);
        EventSystem.event(LocationEventCode.Update, this);
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
                    EventSystem.event(LocationEventCode.GatheringItems, this);
                // }
                // if (this._gatheringPoints[j].gather3(this._itemStorage)) {
                //     EventSystem.event(LocationEventCode.GatheringItems, this);
                // }
            }
        }
    }

    addHero(hero: GameObject) {
        assertNotNil(hero);

        this._canAddHero(hero);

        this._heroFightGroup.addCharacter(hero);
        this._heroes.push(hero);    //todo: Не будет работать после удаления исключений.
        EventSystem.event(LocationEventCode.AddHero, this);    //todo: Или достаточно события из группы? Может как то связать их? "Цепочка" событыий.
    }

    removeHero(hero: GameObject) {
        assertNotNil(hero);
        // assert(hero instanceof GameObject);

        this._canRemoveHero();

        // this._heroGroupComponent.removeHero(hero);
        this._heroFightGroup.removeCharacter(hero);
        _.pull(this._heroes, hero);
        EventSystem.event(LocationEventCode.RemoveHero, this);
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

    canDelete(): boolean {
        if (this._state !== LocationState.Waiting) {
            debug(DebugNamespaceID.Throw)('Нельзя удалить локацию во время охоты.');
            return false;
        }

        return true;
    }

    private _canAddHero(hero: GameObject): void {
        this.canModify();

        if (hero.getComponent<Experience>(ComponentID.Experience).level < this._level) {
            throw new AppError('Уровень героя слишком низкий для данной локации.');
        }
    }

    private _canRemoveHero(): void {
        this.canModify();
    }

    // render(callback: ({}: Readonly<{
    //     level: unsigned,
    //     gatheringItemPoints: GatheringItemPoint[],
    //     internalItemStorageComponent: ItemStorageComponent,
    //     heroGroupComponent: HeroGroup,
    // }>) => void) {
    //     callback({
    //         level: this._level,
    //         gatheringItemPoints: [],
    //         internalItemStorageComponent: undefined,
    //         heroGroupComponent: undefined,
    //     });
    // }

    private _ui: LocationRender[];

    /*
        Детальное отображение.
        Список.
        У локации есть информация доступная для интерфейса.
     */
    render(ui: LocationRender) {
        if (!_.includes(this._ui, ui)) {
            this._ui.push(ui);
        }
        this.updateUI();
        // console.log('render');
    }

    removeRender(ui: LocationRender): void {

    }

    updateUI(): void {
        // this._

        // this._heroFightGroup.render();

        for (let i = 0; i < this._ui.length; i++) {
            this._ui[i].updateLevel(this._level);
            // this._ui[i].updateHeroes();
        }
    }

    _updateHeroClassName = function (value: string) {

    }

    renderByRequest(ui: LocationRender): void {
        ui.updateState(this._state);
        ui.updateLevel(this._level);

        let heroes: DetailLocationRCHeroElement[] = [];
        for (let i = 0; i < this._heroes.length; i++) {
            let data: DetailLocationRCHeroElement = {
                attackPower: 0,
                currentHealthPoints: 0,
                heroClassName: '',
                isDead: false,
                level: 0,
                maxHealthPoints: 0,
            };

            //todo: На каждого героя нужно сделать свою функцию в переменной.
            this._heroes[i].get<HeroComponent>(ComponentID.Hero).renderByRequest({
                updateHeroClassName(value: string) {
                    data.heroClassName = value;
                },
            });
            this._heroes[i].get<Experience>(ComponentID.Experience).renderByRequest({
                updateExp(value: number): void {

                }, updateLevel(value: number): void {
                    data.level = value;
                }, updateTotalExpToLevelUp(value: number): void {

                },
            });
            this._heroes[i].get<CharacterAttribute>(CharacterAttributeID.AttackPower).renderByRequest({
                updateCharacterAttributeFinalValue(ID: CharacterAttributeID, value: number): void {
                    data.attackPower = value;
                },
            });
            this._heroes[i].get<HealthPoints>(ComponentID.HealthPoints).renderByRequest({
                updateHealthPoints(currentHealthPoints: number, maxHealthPoints: number): void {
                    data.currentHealthPoints = currentHealthPoints;
                    data.maxHealthPoints = maxHealthPoints;
                }, updateDeadState(isDead: boolean): void {
                    data.isDead = isDead;
                },
            });

            heroes.push(data);
        }
        ui.updateHeroes(heroes);

        let enemies: DetailLocationRCEnemyElement[] = [];
        for (let i = 0; i < this._enemies.length; i++) {
            let data: DetailLocationRCEnemyElement = {
                attackPower: 0,
                currentHealthPoints: 0,
                enemyTypeName: '',
                level: 0,
                maxHealthPoints: 0,
                isDead: false,
            };

            this._enemies[i].get<Enemy>(ComponentID.Enemy).renderByRequest({
                updateType(name: string): void {
                    data.enemyTypeName = name;
                },
            });
            this._enemies[i].get<CharacterAttributeInterface>(CharacterAttributeID.AttackPower).renderByRequest({
                updateCharacterAttributeFinalValue(ID: CharacterAttributeID, value: number): void {
                    data.attackPower = value;
                },
            });
            this._enemies[i].get<LevelInterface>(ComponentID.Level).renderByRequest({
                updateLevel(value: number): void {
                    data.level = value;
                },
            });
            this._enemies[i].get<HealthPoints>(ComponentID.HealthPoints).renderByRequest({
                updateHealthPoints(currentHealthPoints: number, maxHealthPoints: number): void {
                    data.currentHealthPoints = currentHealthPoints;
                    data.maxHealthPoints = maxHealthPoints;
                }, updateDeadState(isDead: boolean): void {
                    data.isDead = isDead;
                },
            });

            enemies.push(data);
        }

        ui.updateEnemies(enemies);

        let items: UI_VeinItemCount[] = [];
        for (let i = 0; i < this._gatheringPoints.length; i++) {
            this._gatheringPoints[i].renderByRequest({
                update(item: UI_VeinItemCount) {
                    items.push(item);
                },
            });
        }
        ui.updateVeins(items);

        this._wallet.renderByRequest({
            updateValue(value: number) {
                ui.updateMoney(value);
            }
        });

        this._itemStorage.renderByRequest({
            updateItems(items: UI_ItemCount[]) {
                ui.updateLoot(items);
            }
        });
    }

    addEnemy(enemy: GameObject): boolean {
        if (_.includes(this._enemies, enemy)) return false;

        this._enemies.push(enemy);
        this._enemyFightGroup.addCharacter(enemy);

        return true;
    }

    //todo: Нельзя просто так удалить врага. Тут явно нужно очень много логики делать.
    // removeEnemy(): boolean {
    //     return true;
    // }
}