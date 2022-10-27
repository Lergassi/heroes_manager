import Component from '../../source/Component.js';
import debug from 'debug';
import EventSystem from '../../source/EventSystem.js';
import {unsigned} from '../../types/main.js';
import AppError from '../../source/Errors/AppError.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {assertNotNil, assertIsPositive} from '../../source/assert.js';
import ArmorDecorator from './CharacterAttributes/ArmorDecorator.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import CharacterIsDeadError from '../../source/Errors/CharacterIsDeadError.js';
import StateController from './StateController.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export enum HealthPointsComponentEventCode {
    TakeDamage = 'HealthPointsComponent.TakeDamage',
    Died = 'HealthPointsComponent.Died',
    Resurrect = 'HealthPointsComponent.Resurrect',
}

export default class HealthPointsComponent implements DamageControllerInterface {
    private _currentHealthPoints: unsigned;
    // private _maxHealthPoints: unsigned;
    private readonly _maxHealthPoints: CharacterAttributeInterface;
    private _isDead: boolean;    //todo: Может ли герой или враг быть живым или мертвым без компонента здоровья?
    private readonly _stateController: StateController;

    constructor(
        maxHealthPoints: CharacterAttributeInterface,
        stateController: StateController,
    ) {
        assertNotNil(maxHealthPoints);
        assertNotNil(stateController);

        // this._maxHealthPoints = maxHealthPoints;
        // this._currentHealthPoints = maxHealthPoints;
        this._maxHealthPoints = maxHealthPoints;
        this._currentHealthPoints = maxHealthPoints.value();
        this._isDead = false;
        this._stateController = stateController;
    }

    damage(damage: unsigned): void {
        assertIsPositive(damage);

        this._canModify();

        debug(DebugNamespaceID.Log)('Персонаж получил урон: ' + damage);
        EventSystem.event(HealthPointsComponentEventCode.TakeDamage, this);

        let healthPoints = this._currentHealthPoints - damage;
        if (healthPoints <= 0) {
            this.kill();
        } else {
            this._currentHealthPoints = healthPoints;
        }
    }

    // add(value: unsigned): void {
    //     this._canModify();
    //
    //     let healthPoints = this._currentHealthPoints + value;
    //     this._currentHealthPoints = healthPoints >= this._maxHealthPoints ? this._maxHealthPoints : healthPoints;
    // }

    kill(): void {
        this._canModify();
        this._stateController.assertAnyAction();

        this._currentHealthPoints = 0;
        this._isDead = true;
        debug(DebugNamespaceID.Log)('Персонаж умер.'); //todo: Не персонаж, а тот кому принадлежит объект.
        this._stateController.state('Dead', 'Персонаж мертвый.');
        EventSystem.event(HealthPointsComponentEventCode.Died, this);
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

    resurrect(): void {
        if (!this._isDead) {
            throw AppError.isNotDead();
        }

        this._currentHealthPoints = this._maxHealthPoints.value();
        this._isDead = false;
        this._stateController.removeState();
        debug(DebugNamespaceID.Log)('Персонаж воскрес.');
        EventSystem.event(HealthPointsComponentEventCode.Resurrect, this);
    }

    private _canModify(): void {
        // if (this._isDead) {
        //     // throw AppError.isDead();
        //     throw new CharacterIsDeadError();
        // }
        this._stateController.assertAnyAction();
    }
}