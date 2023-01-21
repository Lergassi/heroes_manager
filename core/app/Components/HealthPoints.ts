import debug from 'debug';
import EventSystem from '../../source/EventSystem.js';
import {unsigned} from '../../types/main.js';
import AppError from '../../source/Errors/AppError.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {assertNotNil, assertIsPositive, assert, assertAction} from '../../source/assert.js';
import ArmorDecorator from './CharacterAttributes/ArmorDecorator.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import CharacterIsDeadError from '../../source/Errors/CharacterIsDeadError.js';
import CharacterStateController, {CharacterStateCode} from './CharacterStateController.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';
import {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';

export enum HealthPointsComponentEventCode {
    TakeDamage = 'HealthPointsComponent.TakeDamage',
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
    private readonly _stateController: CharacterStateController;
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
        stateController: CharacterStateController,
        afterDiedCallback?: Function,
    ) {
        assertNotNil(maxHealthPoints);
        assertNotNil(stateController);

        // this._maxHealthPoints = maxHealthPoints;
        // this._currentHealthPoints = maxHealthPoints;
        this._maxHealthPoints = maxHealthPoints;
        this._currentHealthPoints = maxHealthPoints.finalValue;
        this._isDead = false;
        this._stateController = stateController;
        this._afterDiedCallback = afterDiedCallback;
    }

    takeDamage(damage: unsigned, enemyRewardOptions?: RewardOptions): void {
        assertIsPositive(damage);
        damage = _.floor(damage, 0);
        //todo: Округление. Выбрать место.

        if (this._stateController.hasState(CharacterStateCode.Dead)) {
            debug(DebugNamespaceID.Throw)('Нельзя нанести урон.');
            return;
        }

        let healthPoints = this._currentHealthPoints - damage;
        this._currentHealthPoints = healthPoints <= 0 ? 0 : healthPoints;
        debug(DebugNamespaceID.Log)(sprintf('Получено урона: %s (%s/%s)', damage, this._currentHealthPoints, this._maxHealthPoints.finalValue));
        EventSystem.event(HealthPointsComponentEventCode.TakeDamage, this);
        if (this._currentHealthPoints <= 0) {
            this.kill(enemyRewardOptions);
        }
    }

    // add(value: unsigned): void {
    //     this._canModify();
    //
    //     let healthPoints = this._currentHealthPoints + value;
    //     this._currentHealthPoints = healthPoints >= this._maxHealthPoints ? this._maxHealthPoints : healthPoints;
    // }

    kill(enemyRewardOptions?: RewardOptions): void {
        if (!this.canKill()) {
            debug(DebugNamespaceID.Throw)('Персонаж не может получить урон.');
            return;
        }

        this._currentHealthPoints = 0;
        this._isDead = true;
        debug(DebugNamespaceID.Log)('Персонаж умер.'); //todo: Не персонаж, а тот кому принадлежит объект.
        // this._stateController.state('Dead', 'State message: Персонаж мертвый.');
        this._stateController.addState(CharacterStateCode.Dead);
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
        return !this._stateController.hasState(CharacterStateCode.Dead);
    }

    canHeal(): boolean {
        return !this._stateController.hasState(CharacterStateCode.Dead);
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
        // assertAction(this._stateController.hasState(CharacterStateCode.Dead));
        if (this._stateController.hasState(CharacterStateCode.Dead)) {
            debug(DebugNamespaceID.Throw)('Персонаж мертвый.');
            return false;
        }

        this._currentHealthPoints = this._maxHealthPoints.finalValue;
        this._isDead = false;
        this._stateController.removeState(CharacterStateCode.Dead);
        debug(DebugNamespaceID.Log)('Персонаж воскрес.');
        EventSystem.event(HealthPointsComponentEventCode.Resurrect, this);

        return true;
    }

    canTakeDamage(): boolean {
        return !this._stateController.hasState(CharacterStateCode.Dead);
    }

    renderByRequest(ui: HealthPointsRender): void {
        ui.updateHealthPoints(this._currentHealthPoints, this._maxHealthPoints.finalValue);
        ui.updateDeadState(this.isDead);
    }

    private _canModify(): void {
        // if (this._isDead) {
        //     // throw AppError.isDead();
        //     throw new CharacterIsDeadError();
        // }
        assertAction(!this._stateController.hasState(CharacterStateCode.Dead));
    }
}