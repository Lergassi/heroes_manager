import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';

export default class HealthPointsComponent extends Component {
    private _currentHealthPoints: number;
    private _maxHealthPoints: number;
    private _isDead: boolean;    //todo: Может ли герой быть живым или мертвым без компонента здоровья? А враг?

    get currentHealthPoints(): number {
        return this._currentHealthPoints;
    }

    set currentHealthPoints(value: number) {
        this._currentHealthPoints = value;
    }

    get maxHealthPoints(): number { //todo: final? Сделать отдельный класс для показателей, которые могут иметь базовое значение и усиления.
        return this._maxHealthPoints;
    }

    set maxHealthPoints(value: number) {
        this._maxHealthPoints = value;
    }

    get isDead(): boolean {
        return this._isDead;
    }

    constructor(
        id: number,
        gameObject: GameObject,
        currentHealthPoints: number,
        maxHealthPoints: number,
    ) {
        super(id, gameObject);
        this._currentHealthPoints = currentHealthPoints;
        this._maxHealthPoints = maxHealthPoints;
        this._isDead = false;
    }
}