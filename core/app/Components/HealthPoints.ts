import debug from 'debug';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import {assertAction, assertIsPositive, assertNotNil} from '../../source/assert.js';
import EventSystem from '../../source/EventSystem.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {unsigned} from '../../types/main.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import {HeroActivityStateCode} from './HeroActivityStateController.js';
import LifeStateController, {CharacterLifeStateCode} from './LifeStateController.js';

export enum HealthPointsComponentEventCode {
    Damage = 'HealthPointsComponent.Damage',
    Died = 'HealthPointsComponent.Died',
    Resurrect = 'HealthPointsComponent.Resurrect',
}

export interface HealthPointsRender {
    updateHealthPoints?(currentHealthPoints: number, maxHealthPoints: number): void;
    updateDeadState?(isDead: boolean): void;
}

export default class HealthPoints implements DamageControllerInterface {
    private _currentHealthPoints: unsigned;
    private readonly _maxHealthPoints: CharacterAttributeInterface;
    private _isDead: boolean;    //todo: Может ли герой или враг быть живым или мертвым без компонента здоровья?
    private readonly _lifeStateController: LifeStateController;
    private readonly _afterDiedCallback: Function;

    get currentHealthPoints(): unsigned {
        return this._currentHealthPoints;
    }

    get maxHealthPoints(): CharacterAttributeInterface {
        return this._maxHealthPoints;
    }

    get isDead(): boolean {
        return this._isDead;
    }

    get flawHealthPoints(): number {
        let flawHealthPoints = this._maxHealthPoints.finalValue - this.currentHealthPoints;

        return flawHealthPoints >= 0 ? flawHealthPoints : 0;
    }

    constructor(
        maxHealthPoints: CharacterAttributeInterface,
        lifeStateController: LifeStateController,
        afterDiedCallback?: Function,
    ) {
        assertNotNil(maxHealthPoints);
        assertNotNil(lifeStateController);

        this._maxHealthPoints = maxHealthPoints;
        this._currentHealthPoints = maxHealthPoints.finalValue;
        this._isDead = false;
        this._lifeStateController = lifeStateController;
        this._afterDiedCallback = afterDiedCallback; //todo: Скрыть - логика передачи лута будет всегда. Позже в виде отдельного класса.
    }

    //todo: Убрать enemyRewardOptions.
    //todo: Сделать обычные add/remove, возможно даже без проверки на смерть. Нанесение урона - отдельная логика.
    damage(damage: number, enemyRewardOptions?: RewardOptions): number {
        assertIsPositive(damage);
        damage = _.floor(damage, 0);    //todo: Округление. Выбрать место. Для damage сделть отдельный класс.

        if (!this._lifeStateController.canAction()) {
            debug(DebugNamespaceID.Throw)('Персонаж не может получить урон.');
            return;
        }

        let resultDamage = this._currentHealthPoints >= damage ? damage : this._currentHealthPoints;

        this._currentHealthPoints -= resultDamage;
        debug(DebugNamespaceID.Log)(sprintf('Получено урона (остаток/макс): %s (%s/%s)', resultDamage, this._currentHealthPoints, this._maxHealthPoints.finalValue));
        EventSystem.event(HealthPointsComponentEventCode.Damage, this);
        if (this._currentHealthPoints <= 0) {
            this.dead(enemyRewardOptions);
        }

        return resultDamage;
    }

    dead(enemyRewardOptions?: RewardOptions): boolean {
        this.kill(enemyRewardOptions);

        return true;
    }

    kill(enemyRewardOptions?: RewardOptions): void {
        if (!this.canKill()) {
            debug(DebugNamespaceID.Throw)('Персонаж не может получить урон.');
            return;
        }

        this._currentHealthPoints = 0;
        this._isDead = true;
        debug(DebugNamespaceID.Log)('Персонаж умер.'); //todo: Не персонаж, а тот кому принадлежит объект.
        // this._lifeStateController.state('Dead', 'State message: Персонаж мертвый.');
        this._lifeStateController.setState(CharacterLifeStateCode.Dead);
        EventSystem.event(HealthPointsComponentEventCode.Died, this);
        if (this._afterDiedCallback && enemyRewardOptions) {
            this._afterDiedCallback(enemyRewardOptions);
        }
        /*
            В вов:
                Опыт добавляется игрокам.
                    Если не группа: первый кто атаковал врага; если группа: всей группе. Как распределяется опыт и куда должен определять другой класс target.expController.addExp(value) Где target персонаж или группа.
                    Или по другому: опыт добавляется игроку. Если игрок в группе опыт распределяется.
                Создается труп с лутом и золотом.
                    Труп имеет владельца: первый атаковавший если не в группе, по #локага_распределения_лута# если в группе.
                Прочие события: баффы на персонажа, вызов другого врага...
         */
    }

    canKill(): boolean {
        return this._lifeStateController.canAction();
    }

    canHeal(): boolean {
        return this._lifeStateController.canAction();
    }

    /**
     *
     * @param value
     * @return Кол-во восстановленного здоровья.
     */
    heal(value: number): number {
        if (!this.canHeal()) {
            debug(DebugNamespaceID.Throw)('Персонаж не может получить лечение.');
            return 0;
        }

        let flawHealthPoints = this.flawHealthPoints;
        let recoveryHealthPoints;
        if (value <= flawHealthPoints) {
            this._currentHealthPoints += value;
            recoveryHealthPoints = value;
        } else {
            this._currentHealthPoints = this._maxHealthPoints.finalValue;
            recoveryHealthPoints = flawHealthPoints
        }
        debug(DebugNamespaceID.Log)(sprintf('Персонаж получил лечение %s.', recoveryHealthPoints));

        return recoveryHealthPoints;
    }

    resurrect(): boolean {
        // if (!this._isDead) {
        //     throw AppError.isNotDead();
        // }
        if (this._lifeStateController.canAction()) {
            debug(DebugNamespaceID.Throw)('Персонаж живой.');   //todo: Или универсальное сообщение, например "Нельзя совершить подобное действие."
            return false;
        }

        this._currentHealthPoints = this._maxHealthPoints.finalValue;
        this._isDead = false;
        this._lifeStateController.setState(CharacterLifeStateCode.Life);
        debug(DebugNamespaceID.Log)('Персонаж воскрес.');
        EventSystem.event(HealthPointsComponentEventCode.Resurrect, this);

        return true;
    }

    canDamage(): boolean {
        return this._lifeStateController.canAction();
    }

    renderByRequest(ui: HealthPointsRender): void {
        ui.updateHealthPoints?.(this._currentHealthPoints, this._maxHealthPoints.finalValue);
        ui.updateDeadState?.(this.isDead);
    }

    debug(): void {
        debug(DebugNamespaceID.Debug)(DebugFormatterID.Json, {
            healthPoints: this._currentHealthPoints,
            maxHealthPoints: this._maxHealthPoints.finalValue,
            isDead: this._isDead,
        });
    }

    // private _canModify(): void {
    //     // if (this._isDead) {
    //     //     // throw AppError.isDead();
    //     //     throw new CharacterIsDeadError();
    //     // }
    //     assertAction(this._lifeStateController.canAction());
    // }
}