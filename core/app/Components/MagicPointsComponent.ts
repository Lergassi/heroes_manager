import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import {unsigned} from '../../types/main.js';
import {assertNotNil} from '../../source/assert.js';

export default class MagicPointsComponent {
    private _currentMagicPoints: unsigned;
    private _maxMagicPoints: CharacterAttributeInterface;

    constructor(
        maxMagicPoints: CharacterAttributeInterface,
    ) {
        assertNotNil(maxMagicPoints);

        this._maxMagicPoints = maxMagicPoints;
        this._currentMagicPoints = maxMagicPoints.finalValue;
    }
}