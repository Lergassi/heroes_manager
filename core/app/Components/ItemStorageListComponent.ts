import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import AppError from '../../source/AppError.js';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import RComponentBridge, {RComponentUpdateInterface} from '../../../client/source/RComponentBridge.js';

export default class ItemStorageListComponent extends Component {
    private readonly _itemStorages: GameObject[];
    private _min: number;
    private _max: number;

    get itemStorages(): GameObject[] {
        return this._itemStorages;
    }

    get min(): number {
        return this._min;
    }

    get max(): number {
        return this._max;
    }

    constructor(id: number, gameObject: GameObject, min: number, max: number, itemStorages: GameObject[]) {
        super(id, gameObject);
        this._min = min;
        this._max = max;
        this._itemStorages = itemStorages;

        //todo: validate
        if (this._itemStorages.length < this._min || this._itemStorages.length > this._max) {
            throw AppError.itemStorageRangeOverflow(this._min, this._max);
        }
    }

    canAddItemStorage(): boolean {
        //todo: validate
        if (this._itemStorages.length + 1 > this._max) {
            throw AppError.itemStorageRangeOverflow(this._min, this._max);
        }

        return true;
    }

    add(itemStorage: GameObject) {
        this.canAddItemStorage();

        if (!_.includes(this._itemStorages, itemStorage)) {
            this._itemStorages.push(itemStorage);
        }

        this.update();
    }
}