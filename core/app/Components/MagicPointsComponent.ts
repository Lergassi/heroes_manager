import Component from '../../source/Component.js';

export default class MagicPointsComponent extends Component {
    private _currentMagicPoints: number;
    private _maxMagicPoints: number;

    /**
     * @deprecated
     */
    get currentMagicPoints(): number {
        return this._currentMagicPoints;
    }

    /**
     * @deprecated
     */
    get maxMagicPoints(): number {
        return this._maxMagicPoints;
    }

    constructor(
        // id: number,
        // gameObject: GameObject,
        currentMagicPoints: number,
        maxMagicPoints: number
    ) {
        // super(id, gameObject);
        super();
        this._currentMagicPoints = currentMagicPoints;
        this._maxMagicPoints = maxMagicPoints;
    }
}