import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';

export enum HeroState {
    LIFE = 'LIFE',
    DEAD = 'DEAD',
}

export default class HealthPointsComponent extends Component {
    private _currentHealthPoints: number;
    private _maxHealthPoints: number;
    private _state: HeroState;    //Может ли быть живым или мертвым герой без компонента здоровья? А враг?

    get currentHealthPoints(): number {
        return this._currentHealthPoints;
    }

    set currentHealthPoints(value: number) {
        this._currentHealthPoints = value;
    }

    get maxHealthPoints(): number {
        return this._maxHealthPoints;
    }

    set maxHealthPoints(value: number) {
        this._maxHealthPoints = value;
    }

    get state(): HeroState {
        return this._state;
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
        this._state = HeroState.LIFE;
    }
}