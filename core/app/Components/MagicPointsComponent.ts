import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';

export default class MagicPointsComponent extends Component {
    private _currentMagicPoints: number;
    private _maxMagicPoints: number;

    get currentMagicPoints(): number {
        return this._currentMagicPoints;
    }

    get maxMagicPoints(): number {
        return this._maxMagicPoints;
    }

    constructor(
        id: number,
        gameObject: GameObject,
        currentMagicPoints: number,
        maxMagicPoints: number
    ) {
        super(id, gameObject);
        this._currentMagicPoints = currentMagicPoints;
        this._maxMagicPoints = maxMagicPoints;
    }
}