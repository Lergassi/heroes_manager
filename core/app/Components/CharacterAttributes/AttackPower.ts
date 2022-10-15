import CharacterAttributeInterface from '../../Decorators/CharacterAttributeInterface.js';
import {unsigned} from '../../types.js';
import _ from 'lodash'

/**
 * Показатели высчитываются за пределами компонента. В том числе диапазон.
 * todo: Пока значения не будет. Увеличение силы атаки у предмета означает простой сдвиг min и max вправо. Дальше будет доработано.
 */
export default class AttackPower {
    private _left: unsigned;
    private _right: unsigned;

    constructor(options: {
        // value: unsigned,
        left: unsigned,
        right: unsigned,
    }) {
        this._left = options.left;
        this._right = options.right;
    }

    value(): number[] {
        // let min = this._value - _.round(this._range / 2, 0);
        // min = min < 0 ? 0 : min;
        // let max = this._value + _.round(this._range / 2, 0);

        return [
            this._left,
            this._right,
        ];
        // return [
        //     10000,
        //     20000,
        // ];
    }

    // add(value: number) {
    //     this._value += value;
    // }

    shift(value: unsigned): void {
        this._left += value;
        this._right += value;
    }

    // shiftLeft(value: number) {
    //
    // }
    //
    // shiftRight(value: number) {
    //
    // }
}