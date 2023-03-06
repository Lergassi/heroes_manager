import debug from 'debug';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import {assertAction, assertIsGreaterThanOrEqual, assertIsPositive, assertNotNil} from '../../source/assert.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import {HeroActivityStateCode} from './HeroActivityStateController.js';
import ActionStateController, {CharacterActionStateCode} from './ActionStateController.js';

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
    private _currentHealthPoints: number;
    private readonly _maxHealthPoints: CharacterAttributeInterface;
    private _isDead: boolean;    //todo: Может ли герой или враг быть живым или мертвым без компонента здоровья?
    private readonly _actionStateController: ActionStateController;
    private readonly _afterDiedCallback: Function;

    get currentHealthPoints(): number {
        return this._currentHealthPoints;
    }

    /**
     * @deprecated Если нужно, то возвращать число.
     */
    get maxHealthPoints(): CharacterAttributeInterface {
        return this._maxHealthPoints;
    }

    get currentHealPointsToMaxRatio(): number {
        return _.round(this._currentHealthPoints / this._maxHealthPoints.value, 2);
    }

    get isDead(): boolean {
        return this._isDead;
    }

    get flawHealthPoints(): number {
        let flawHealthPoints = this._maxHealthPoints.value - this.currentHealthPoints;

        return flawHealthPoints >= 0 ? flawHealthPoints : 0;
    }

    constructor(
        maxHealthPoints: CharacterAttributeInterface,
        actionStateController: ActionStateController,
        afterDiedCallback?: Function,
    ) {
        assertNotNil(maxHealthPoints);
        assertNotNil(actionStateController);

        this._maxHealthPoints = maxHealthPoints;
        this._currentHealthPoints = maxHealthPoints.finalValue;
        this._isDead = false;
        this._actionStateController = actionStateController;
        this._afterDiedCallback = afterDiedCallback; //todo: Скрыть - логика передачи лута будет всегда. Позже в виде отдельного класса.
    }

    //todo: Убрать enemyRewardOptions.
    //todo: Сделать обычные add/remove, возможно даже без проверки на смерть. Нанесение урона - отдельная логика.
    damage(damage: number, enemyRewardOptions?: RewardOptions): number {
        assertIsGreaterThanOrEqual(damage, 0);

        // if (!this._actionStateController.canAction()) {
        if (!this.canDamage()) {
            debug(DebugNamespaceID.Throw)('Персонаж не может получить урон.');
            return 0;   //todo: @ts_bug Было return при объявлении возвращаемого значения у функции как number. ts не выдавал ошибку и была ошибка в логике NaN при подсчете урона.
        }

        damage = _.floor(damage, 0);    //todo: Округление. Выбрать место. Для damage сделть отдельный класс.

        let resultDamage = this._currentHealthPoints >= damage ? damage : this._currentHealthPoints;

        this._currentHealthPoints -= resultDamage;
        debug(DebugNamespaceID.Log)(sprintf('Получено урона (остаток/макс): %s (%s/%s)', resultDamage, this._currentHealthPoints, this._maxHealthPoints.finalValue));
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
            debug(DebugNamespaceID.Throw)('Персонаж не может умереть.');
            return;
        }

        this._currentHealthPoints = 0;
        this._isDead = true;
        debug(DebugNamespaceID.Log)('Персонаж умер.'); //todo: Не персонаж, а тот кому принадлежит объект.
        // this._actionStateController.state('Dead', 'State message: Персонаж мертвый.');
        this._actionStateController.addState(CharacterActionStateCode.Dead);
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
        // if (this._actionStateController.canAction()) {//todo: Явно так нельзя делать. Внутри сейчас, в том числе, выдается сообщение что персонаж мерт.
        if (!this.canResurrect()) {//todo: Явно так нельзя делать. Внутри сейчас, в том числе, выдается сообщение что персонаж мерт.
            debug(DebugNamespaceID.Throw)('Персонаж не может быть воскрешен.');   //todo: Или универсальное сообщение, например "Нельзя совершить подобное действие."
            return false;
        }

        this._currentHealthPoints = this._maxHealthPoints.value;
        this._isDead = false;
        this._actionStateController.removeState(CharacterActionStateCode.Dead);
        debug(DebugNamespaceID.Log)('Персонаж воскрешен.');

        return true;
    }

    resetHealthPoints(): void {
        if (!this._actionStateController.canAction()) return;

        this._currentHealthPoints = this._maxHealthPoints.value;
    }

    canDamage(): boolean {
        return this._actionStateController.canAction();
    }

    canKill(): boolean {
        return this._actionStateController.canAction();
    }

    canHeal(): boolean {
        return this._actionStateController.canAction();
    }

    canResurrect(): boolean {
        // return !this._actionStateController.canAction();
        return true;    //Воксресить героя ничего не должно мешать.
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
}