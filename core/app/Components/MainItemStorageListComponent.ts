import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import AppError from '../../source/Errors/AppError.js';
import _ from 'lodash';
import {unsigned} from '../../types/main.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';
import {
    assertIsArray, assertIsGreaterThanOrEqual,
    assertIsMaxLength,
    assertIsMinLength,
    assertIsNumber,
    assertIsPositive, assertNotNil
} from '../../source/assert.js';
import {sprintf} from 'sprintf-js';
import EventSystem from '../../source/EventSystem.js';
import ItemStorageFactory from '../Factories/ItemStorageFactory.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';

export enum MainItemStorageListComponentEventCode {
    Update = 'MainItemStorageListComponent.Update',
}

export default class MainItemStorageListComponent {
    private readonly _itemStorages: GameObject[];
    private _max: number;

    /**
     * @deprecated
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

    create(size: unsigned, itemStorageFactory: ItemStorageFactory): GameObject {
        assertNotNil(itemStorageFactory);

        this._canAddItemStorage();

        let itemStorage = itemStorageFactory.create(size)
        this._itemStorages.push(itemStorage);

        EventSystem.event(MainItemStorageListComponentEventCode.Update, this);

        return itemStorage;
    }

    //remove(itemStorage: GameObject)

    //@indev Вместо геттера.
    map(callback: (itemStorage: GameObject, index?: number) => void) {
        _.map(this._itemStorages, callback);
    }
}