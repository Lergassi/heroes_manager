import Component from '../../source/Component.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import {unsigned} from '../types.js';
import {assertNotNil} from '../../source/assert.js';

export default class MagicPointsComponent extends Component {
    private _currentMagicPoints: unsigned;
    private _maxMagicPoints: CharacterAttributeInterface;

    constructor(
        maxMagicPoints: CharacterAttributeInterface,
    ) {
        super();
        assertNotNil(maxMagicPoints);

        this._maxMagicPoints = maxMagicPoints;
        this._currentMagicPoints = maxMagicPoints.value();
    }
}