import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';

export default class LevelComponent extends Component {
    private _level: number;
    private readonly _maxLevel: number;
    private _exp: number;

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }

    get maxLevel(): number {
        return this._maxLevel;
    }

    get exp(): number {
        return this._exp;
    }

    set exp(value: number) {
        this._exp = value;
    }

    constructor(
        id: number,
        gameObject: GameObject,
        level: number,
        maxLevel: number,
        exp: number = 0,
    ) {
        super(id, gameObject);

        //todo: validate

        this._level = level;
        this._maxLevel = maxLevel;
        this._exp = exp;
    }
}