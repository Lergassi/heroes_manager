import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import AppError from '../../source/Errors/AppError.js';
import _ from 'lodash';
import {unsigned} from '../types.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';
import {
    assertIsArray,
    assertIsMaxLength,
    assertIsMinLength,
    assertIsNumber,
    assertIsPositive
} from '../../source/assert.js';
import {sprintf} from 'sprintf-js';

export default class MainItemStorageListComponent extends Component {
    private readonly _itemStorages: GameObject[];
    private _max: number;

    constructor(
        max: unsigned,
        itemStorages: GameObject[],
    ) {
        super();
        assertIsPositive(max);
        assertIsArray(itemStorages);
        assertIsMaxLength(itemStorages, max, sprintf('Количество ItemStorage не может быть больше %d.', max));

        this._max = max;
        this._itemStorages = itemStorages;
    }

    canAddItemStorage(): boolean {
        if (this._itemStorages.length + 1 > this._max) {
            throw AppError.playerHasMaxItemStorages();
        }

        return true;
    }

    /**
     * @deprecated Использовать метод create().
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