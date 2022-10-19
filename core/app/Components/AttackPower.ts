import AttackPowerInterface from '../Interfaces/AttackPowerInterface.js';
import _ from 'lodash';

export default class AttackPower implements AttackPowerInterface {
    private _left: number;
    private _right: number;

    constructor(left: number, right: number) {
        this._left = left;
        this._right = right;
    }

    generateValue(): number {
        return _.random(this._left, this._right);
    }
}