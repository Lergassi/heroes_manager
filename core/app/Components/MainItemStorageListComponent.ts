import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import AppError from '../../source/Errors/AppError.js';
import _ from 'lodash';
import {unsigned} from '../../types/types.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';
import {
    assertIsArray, assertIsGreaterThanOrEqual,
    assertIsMaxLength,
    assertIsMinLength,
    assertIsNumber,
    assertIsPositive, assertNotNil
} from '../../source/assert.js';
import {sprintf} from 'sprintf-js';

export default class MainItemStorageListComponent {
    private readonly _itemStorages: GameObject[];
    private _max: number;

    /**
     * @indev Этот геттер будет тут навсегда.
     */
    get itemStorages(): GameObject[] {
        return this._itemStorages;
    }

    constructor(
        max: unsigned,
        itemStorages: GameObject[] = [],
    ) {
        assertIsPositive(max);
        assertIsArray(itemStorages);
        assertIsMaxLength(itemStorages, max, sprintf('Количество ItemStorage не может быть больше %d.', max));

        this._max = max;
        this._itemStorages = itemStorages;
    }

    private _canAddItemStorage(): boolean {
        if (this._itemStorages.length + 1 > this._max) {
            throw AppError.playerHasMaxItemStorages();
        }

        return true;
    }

    create(size: unsigned, itemStorageFactory: ItemStorageFactoryInterface): GameObject {
        assertNotNil(itemStorageFactory);

        this._canAddItemStorage();

        let itemStorage = itemStorageFactory.create(size)
        this._itemStorages.push(itemStorage);

        return itemStorage;
    }

    //remove(itemStorage: GameObject)

    //@indev Вместо геттера.
    map(callback: (itemStorage: GameObject, index?: number) => void) {
        _.map(this._itemStorages, callback);
    }
}