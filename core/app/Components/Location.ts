import debug from 'debug';
import _ from 'lodash';
import {DetailLocationRCEnemyElement, DetailLocationRCHeroElement} from '../../../client/public/RC/DetailLocationRC.js';
import {separate} from '../../debug_functions.js';
import {assertNotNil} from '../../source/assert.js';
import AppError from '../../source/Errors/AppError.js';
import EventSystem from '../../source/EventSystem.js';
import GameObject from '../../source/GameObject.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {LocationTypeID} from '../../types/enums/LocationTypeID.js';
import {Seconds, UI_ItemCount, UI_ItemStorageSlot, UI_VeinItemCount} from '../../types/main.js';
import {ONE_SECOND_IN_MILLISECONDS} from '../consts.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import Item from '../Entities/Item.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import ItemStorageFactory from '../Factories/ItemStorageFactory.js';
import {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import LevelInterface from '../Interfaces/LevelInterface.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import CharacterAttribute from './CharacterAttribute.js';
import Endurance from './Endurance.js';
import Experience from './Experience.js';
import FightController from './FightController.js';
import FightGroupController from './FightGroupController.js';
import Gatherer from './Gatherer.js';
import HealthPointsController from './HealthPointsController.js';
import HealthPoints from './HealthPoints.js';
import HeroActivityStateController, {HeroActivityStateCode} from './HeroActivityStateController.js';
import HeroComponent from './HeroComponent.js';
import ActionStateController from './ActionStateController.js';
import SquadDamageController from './SquadDamageController.js';
import Vein from './Vein.js';
import EnduranceController from "./EnduranceController";

export enum LocationHuntingState {
    Waiting = 'Waiting',
    Hunting = 'Hunting',
}

export enum GatheringPointTypeID {
    Low = 'Low',
    Normal = 'Normal',
    High = 'High',
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

// export enum LocationEventCode {
//     Start = 'Location.Start',
//     Stop = 'Location.Stop',
//     AddHero = 'Location.AddHero',
//     RemoveHero = 'Location.RemoveHero',
//     AddEnemy = 'Location.AddEnemy',
//     RemoveEnemy = 'Location.RemoveEnemy',
//     GatheringItems = 'Location.GatheringItems',
//     GetItems = 'Location.GetItems',
//     Update = 'Location.Update',
// }

export interface LocationRender {
    updateID?(ID: string): void;
    updateName?(name: string): void;
    updateState?(state: string): void;
    updateLevel?(level: number): void;   //todo: Тут наверное нужно все данные которые не изменяются передать и метод назвать set/init.
    updateHeroes?(heroes: DetailLocationRCHeroElement[]): void;
    updateEnemies?(enemies: DetailLocationRCEnemyElement[]): void;
    updateVeins?(veins: UI_VeinItemCount[]): void;
    updateLoot?(loot: UI_ItemCount[]): void;
    updateMoney?(value: number): void;
    updateHeroGroupItems?(items: UI_ItemStorageSlot[]): void;
}

export default class Location {
    private readonly _type: LocationTypeID;
    private readonly _level: number;
    private readonly _veins: Vein[];
    private readonly _itemStackFactory: ItemStackFactory;

    private readonly _heroes: GameObject[];
    private readonly _heroFightGroupController: FightGroupController;

    private readonly _enemies: GameObject[];
    private readonly _enemyFightGroupController: FightGroupController;

    private readonly _heroGroupItemStorage: ItemStorageInterface;

    private readonly _itemStorage: ItemStorageInterface;   //Визуально может никак не быть связанным с сумками.
    private readonly _wallet: WalletInterface;

    private _fightController: FightController;
    private _huntingState: LocationHuntingState;
    private _intervalID: NodeJS.Timer;

    get type(): LocationTypeID {
        return this._type;
    }

    get level(): number {
        return this._level;
    }

    private readonly _options = {
        maxHeroes: 5,
        intervalPeriod: 1,
    };

    constructor(
        type: LocationTypeID,
        levelRange: number,
        itemStackFactory: ItemStackFactory,         //todo: Убрать в генератор лута.
        itemStorageFactory: ItemStorageFactory,
        wallet: WalletInterface,
    ) {
        // assertNotNil(itemStorage);
        // assertNotNil(itemStackFactory);

        this._huntingState = LocationHuntingState.Waiting;

        this._type = type;
        this._level = levelRange;
        this._veins = [];
        this._itemStackFactory = itemStackFactory;

        //todo: Как сделать доступ к героям и там и тут?
        this._heroes = [];
        this._heroFightGroupController = new FightGroupController();

        this._enemies = [];
        this._enemyFightGroupController = new FightGroupController({
            deleteDeadCharacter: true,
        });

        this._fightController = new FightController(this._heroFightGroupController, this._enemyFightGroupController);

        //лут
        this._itemStorage = itemStorageFactory.create(5);    //todo: Убрать. Если нужно передать из вне - логику поменять, а не делать чтото на всякий случай. И кошелек тоже.
        this._heroGroupItemStorage = itemStorageFactory.create(5);
        this._wallet = wallet;

        //dev
        // this._heroGroupItemStorage.addItem(ItemID.HealthPotion01, 4);
    }

    addHero(hero: GameObject): boolean {
        assertNotNil(hero);

        if (this._heroes.length >= this._options.maxHeroes) {
            debug(DebugNamespaceID.Throw)('Кол-во героев в локации достигло максимума.');
            return false;
        }

        if (!this._canAddHero(hero)) {
            debug(DebugNamespaceID.Throw)('Нельзя добавить данного героя.');
            return false;
        }

        if (!this._heroFightGroupController.addCharacter(hero)) return false;
        this._heroes.push(hero);    //todo: Не будет работать после удаления исключений.

        hero.get<HeroActivityStateController>(ComponentID.HeroActivityStateController).setState(HeroActivityStateCode.InLocation);

        return true;
    }

    removeHero(hero: GameObject): boolean {
        assertNotNil(hero);

        if (!this._canRemoveHero()) return false;

        if (!this._heroFightGroupController.removeCharacter(hero)) return false;
        _.pull(this._heroes, hero);
        hero.get<HeroActivityStateController>(ComponentID.HeroActivityStateController).free();

        return true;
    }

    addEnemy(enemy: GameObject): boolean {
        assertNotNil(enemy);

        //todo: Проверка на include.

        if (!this._enemyFightGroupController.addCharacter(enemy)) return false;
        this._enemies.push(enemy);

        return true;
    }

    //todo: Нельзя просто так удалить врага. Тут явно нужно очень много логики делать. Либо вообще не делать.
    // removeEnemy(): boolean {}

    // addVein(): boolean {
    //
    // }

    startHunting(): boolean {
        if (this._huntingState !== LocationHuntingState.Waiting) {
            debug(DebugNamespaceID.Throw)('Охота уже запущена.');
            return false;
        }

        if (this._heroes.length === 0) {
            debug(DebugNamespaceID.Throw)('В группе должен быть хотя бы 1 герой.');
            return false;
        }

        this._huntingState = LocationHuntingState.Hunting;
        let rewardOptions: RewardOptions = {
            wallet: this._wallet,
            itemStorage: this._itemStorage,
        };
        this._intervalID = setInterval(() => {
            for (let i = 0; i < this._heroes.length; i++) {
                this._heroes[i].get<HealthPointsController>(ComponentID.HealthPointsController)?.update(this._heroGroupItemStorage);
                this._heroes[i].get<EnduranceController>(ComponentID.EnduranceController)?.update(this._heroGroupItemStorage);
            }

            this._fightController.fight(rewardOptions);
            separate();

            this._gather();

            //И другие действия...
        }, this._options.intervalPeriod * ONE_SECOND_IN_MILLISECONDS);
        debug(DebugNamespaceID.Log)('Охота запущена.');

        return true;
    }

    stopHunting(): boolean {//todo: Тут тоже stateOwner? Игрок или другая часть программы от которой зависит состояние объекта.
        if (this._huntingState !== LocationHuntingState.Hunting) {
            debug(DebugNamespaceID.Log)('Охота не запущена.');
            return false;
        }

        this._huntingState = LocationHuntingState.Waiting;
        // this._heroGroupComponent.unblock(this);
        clearInterval(this._intervalID);
        debug(DebugNamespaceID.Log)('Охота остановлена.');

        return true;
    }

    toggleState(): void {
        if (this._huntingState === LocationHuntingState.Waiting) {
            this.startHunting();
        } else if (this._huntingState === LocationHuntingState.Hunting) {
            this.stopHunting();
        }
    }

    getReward(rewardOptions: {
        itemStorage?: ItemStorageInterface,
        wallet?: WalletInterface,
    }): void {
        //todo: В настройки.
        // if (!this.canModify()) return;

        if (rewardOptions.itemStorage) this._itemStorage.moveAllItemsTo(rewardOptions.itemStorage);
        if (rewardOptions.wallet) this._wallet.moveAllTo(rewardOptions.wallet);
    }

    canModify(): boolean {
        if (this._huntingState !== LocationHuntingState.Waiting) {
            debug(DebugNamespaceID.Throw)('Нельзя редактировать локацию во время охоты.');
            return false;
        }

        return true;
    }

    canGetRewards(): boolean {
        if (!this.canModify()) {
            debug(DebugNamespaceID.Throw)('Нельзя забрать награду.');
            return false;
        }

        return true;
    }

    canDelete(): boolean {
        if (this._huntingState !== LocationHuntingState.Waiting) {
            debug(DebugNamespaceID.Throw)('Нельзя удалить локацию во время охоты.');
            return false;
        }

        return true;
    }

    addResource(itemID: ItemID, count: number): void {
        this._veins.push(new Vein(
            itemID,
            count,
        ));
    }

    addItem(itemID: ItemID, count: number): number {
        if (!this.canModify()) return 0;

        return this._heroGroupItemStorage.addItem(itemID, count);
    }

    //todo: Если не раскрывать реализацию, но при этом нужно удалить предмет с определенного слота - то как это сделать без копирования интерфейс? Как вариант делать доп интерфейс поверх внутреннего. Например clear(index), а внутри может быть всё что угодно. В том числе через доп объект-геттер. ИДЕЯ: Внутри будет не сумка, а другой объект с интерфейсом как у сумки. А также нужно контролировать возможность управления сумкой во время охоты.
    removeItem(itemID: ItemID, count: number): number {
        if (!this.canModify()) return 0;

        return this._heroGroupItemStorage.removeItem(itemID, count);
    }

    /**
     * @deprecated @hack Решения доступа к предметам, при такой реализации, быстро найти не получилось.
     */
    get heroesItems(): ItemStorageInterface {
        return this._heroGroupItemStorage;
    }

    /**
     * todo: Сборку данных перенести в отдельный класс.
     * @param ui
     */
    renderByRequest(ui: LocationRender): void {
        let heroes: DetailLocationRCHeroElement[] = [];
        for (let i = 0; i < this._heroes.length; i++) {
            let hero: DetailLocationRCHeroElement = {
                ID                 : String(this._heroes[i].ID),
                attackPower        : 0,
                currentHealthPoints: 0,
                heroClassName      : '',
                isDead             : false,
                level              : 0,
                maxHealthPoints    : 0,
                endurance          : 0,
                maxEndurance       : 0,
            };

            //todo: На каждого героя нужно сделать свою функцию в переменной.
            this._heroes[i].get<HeroComponent>(ComponentID.Hero).renderByRequest({
                updateHeroClassName(value: string) {
                    hero.heroClassName = value;
                },
            });
            this._heroes[i].get<Experience>(ComponentID.Experience).renderByRequest({
                updateExp(value: number): void {

                }, updateLevel(value: number): void {
                    hero.level = value;
                }, updateTotalExpToLevelUp(value: number): void {

                },
            });
            this._heroes[i].get<CharacterAttribute>(CharacterAttributeID.AttackPower).renderByRequest({
                updateCharacterAttributeFinalValue(ID: CharacterAttributeID, value: number): void {
                    hero.attackPower = value;
                },
            });
            this._heroes[i].get<HealthPoints>(ComponentID.HealthPoints).renderByRequest({
                updateHealthPoints(currentHealthPoints: number, maxHealthPoints: number): void {
                    hero.currentHealthPoints = currentHealthPoints;
                    hero.maxHealthPoints = maxHealthPoints;
                }, updateDeadState(isDead: boolean): void {
                    hero.isDead = isDead;
                },
            });
            this._heroes[i].get<Endurance>(ComponentID.Endurance).renderByRequest({
                update(endurance: number, max: number) {
                    hero.endurance = endurance;
                    hero.maxEndurance = max;
                },
            });

            heroes.push(hero);
        }

        let enemies: DetailLocationRCEnemyElement[] = [];
        for (let i = 0; i < this._enemies.length; i++) {
            let data: DetailLocationRCEnemyElement = {
                count: 0,
                attackPower: 0,
                currentHealthPoints: 0,
                enemyTypeName: this._enemies[i].get<EnemyTypeID>(ComponentID.EnemyTypeID),
                level: 0,
                maxHealthPoints: 0,
                isDead: false,
            };

            // this._enemies[i].get<Enemy>(ComponentID.Enemy).renderByRequest({
            //     updateType(name: string): void {
            //         data.enemyTypeName = name;
            //     },
            // });
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
                },
                updateDeadState(isDead: boolean): void {
                    data.isDead = isDead;
                },
            });
            this._enemies[i].get<SquadDamageController>(ComponentID.DamageController).renderByRequest({
                updateCount(count: number) {
                    data.count = count;
                },
            });

            enemies.push(data);
        }

        let veinItems: UI_VeinItemCount[] = [];
        for (let i = 0; i < this._veins.length; i++) {
            this._veins[i].renderByRequest({
                update(item: UI_VeinItemCount) {
                    veinItems.push(item);
                },
            });
        }

        let heroGroupItems: UI_ItemStorageSlot[] = [];
        this._heroGroupItemStorage.renderByRequest({
            updateItems(slots: UI_ItemStorageSlot[]) {
                for (let i = 0; i < slots.length; i++) {
                    // if (_.isNil(slots[i].item)) continue;

                    heroGroupItems.push({
                        index: slots[i].index,
                        item: slots[i].item,
                    });
                }
            },
        });

        ui.updateName?.(this._type);
        ui.updateState?.(this._huntingState);
        ui.updateLevel?.(this._level);
        ui.updateHeroes?.(heroes);
        ui.updateEnemies?.(enemies);
        ui.updateVeins?.(veinItems);
        ui.updateHeroGroupItems?.(heroGroupItems);

        this._wallet.renderByRequest({
            updateValue(value: number) {
                ui.updateMoney?.(value);
            }
        });

        this._itemStorage.renderByRequest({
            updateItems(slots: UI_ItemStorageSlot[]) {
                ui.updateLoot?.(_.map(slots, (slot) => {
                    return slot.item;
                }));
            }
        });
    }//end renderByRequest

    private _canAddHero(hero: GameObject): boolean {
        if (!this.canModify()) return false;

        if (_.includes(this._heroes, hero)) {
            debug(DebugNamespaceID.Throw)('Герой уже в локации.');
            return false;
        }

        //todo: Убрать геттер? Так и писать availableLevelForActivity().
        // if (hero.getComponent<Experience>(ComponentID.Experience).level < this._level) {
        //     debug(DebugNamespaceID.Throw)('Уровень героя низкий для данной локации.');
        //     return false;
        // }

        if (!hero.get<HeroActivityStateController>(ComponentID.HeroActivityStateController).isFree()) {
            debug(DebugNamespaceID.Throw)('Персонаж занят.');
            return false;
        }

        if (!hero.get<ActionStateController>(ComponentID.LifeStateController).canAction()) {
            //todo: Нужно передавать объект собирающий ошибки. А в начала или конце списка добавлять заголовок для серии ошибок.
            return false;
        }

        return true;
    }

    private _canRemoveHero(): boolean {
        return this.canModify();
    }

    /**
     * todo: В отдельный класс. За сбор ресурсов будет отвечать другой объект. Т.е. локация тут вообще ничего делать не будет. Gathering
     * @private
     */
    private _gather(): void {
        if (!this._veins.length) return;

        // this._heroFightGroupController.gather(this._gatheringItemPoints, this._itemStorage, this._options.intervalPeriod);
        for (let i = 0; i < this._heroes.length; i++) {
            for (let j = 0; j < this._veins.length; j++) {
                if (this._veins[j].isEmpty()) continue;

                this._heroes[i].get<Gatherer>(ComponentID.Gatherer).gather(this._veins[j], this._itemStorage);
                // if (this._heroes[i].get<Gatherer>(ComponentID.Gatherer).gather3(this._veins[j], this._itemStorage)) {
                // }
                // if (this._veins[j].gather3(this._itemStorage)) {
                //     EventSystem.event(LocationEventCode.GatheringItems, this);
                // }
            }
        }
    }
}