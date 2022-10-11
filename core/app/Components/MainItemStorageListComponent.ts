import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import AppError from '../../source/Errors/AppError.js';
import _ from 'lodash';
import {unsigned} from '../types.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';

export default class MainItemStorageListComponent extends Component {
    private readonly _itemStorages: GameObject[];
    private _min: number;
    private _max: number;

    /**
     * @deprecated
     */
    get itemStorages(): GameObject[] {
        return this._itemStorages;
    }

    /**
     * @deprecated
     */
    get min(): number {
        return this._min;
    }

    /**
     * @deprecated
     */
    get max(): number {
        return this._max;
    }

    constructor(
        min: unsigned,
        max: unsigned,
        itemStorages: GameObject[],
    ) {
        super();
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

    /**
     * @deprecated
     * @param itemStorage
     */
    add(itemStorage: GameObject): void {
        this.canAddItemStorage();

        if (!_.includes(this._itemStorages, itemStorage)) {
            this._itemStorages.push(itemStorage);
        }

        this.update();
    }

    create(size: unsigned, itemStorageFactory: ItemStorageFactoryInterface): GameObject {
        this.canAddItemStorage();

        let itemStorage = itemStorageFactory.create(size)
        this.add(itemStorage);

        return itemStorage;
    }

    //remove(itemStorage: GameObject)
}