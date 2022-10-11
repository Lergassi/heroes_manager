import Component from '../../source/Component.js';
import debug from 'debug';
import EventSystem from '../../source/EventSystem.js';
import {unsigned} from '../types.js';

export enum HealthPointsComponentEventCode {
    Died = 'HealthPointsComponent.Died',
    Resurrect = 'HealthPointsComponent.Resurrect',
    TakeDamage = 'HealthPointsComponent.TakeDamage',
}

export default class HealthPointsComponent extends Component {
    private _currentHealthPoints: number;
    private _maxHealthPoints: number;
    private _isDead: boolean;    //todo: Может ли герой или враг быть живым или мертвым без компонента здоровья?

    /**
     * @deprecated
     */
    get currentHealthPoints(): number {
        return this._currentHealthPoints;
    }

    /**
     * @deprecated
     */
    set currentHealthPoints(value: number) {
        this._currentHealthPoints = value;
    }

    /**
     * @deprecated
     */
    get maxHealthPoints(): number { //todo: final? Сделать отдельный класс для показателей, которые могут иметь базовое значение и усиления.
        return this._maxHealthPoints;
    }

    /**
     * @deprecated
     */
    set maxHealthPoints(value: number) {
        this._maxHealthPoints = value;
    }

    /**
     * @deprecated
     */
    get isDead(): boolean {
        return this._isDead;
    }

    constructor(
        currentHealthPoints: number,
        maxHealthPoints: number,
    ) {
        super();
        this._currentHealthPoints = currentHealthPoints;
        this._maxHealthPoints = maxHealthPoints;
        this._isDead = false;
    }

    kill(): void {
        if (this._isDead) {
            return;
        }

        this._currentHealthPoints = 0;
        this._isDead = true;
        debug('log')('Персонаж умер.');
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
            return;
        }

        this._currentHealthPoints = this._maxHealthPoints;
        this._isDead = false;
        debug('log')('Персонаж воскрес.');
        EventSystem.event(HealthPointsComponentEventCode.Resurrect, this);
    }

    damage(value: unsigned): void {
        if (this._isDead) {
            return;
        }

        debug('log')('Персонаж получил урон: ' + value);
        EventSystem.event(HealthPointsComponentEventCode.TakeDamage, this);

        let healthPoints = this._currentHealthPoints - value;
        if (healthPoints <= 0) {
            this.kill();
        } else {
            this._currentHealthPoints = healthPoints;
        }
    }
}