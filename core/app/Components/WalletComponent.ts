import Component from '../../source/Component.js';
import Currency from '../Entities/Currency.js';
import {unsigned} from '../types.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import {assertIsGreaterThanOrEqual, assertNotNil} from '../../source/assert.js';
import WalletInterface from '../Interfaces/WalletInterface.js';

export default class WalletComponent implements WalletInterface {
    private readonly _currency: Currency;
    private _value: number;

    /**
     * @deprecated
     */
    get currency(): Currency {
        return this._currency;
    }

    /**
     * @deprecated
     */
    get value(): number {
        return this._value;
    }

    /**
     * @deprecated
     */
    set value(value: number) {
        this._value = value;
    }

    constructor(
        currency: Currency,
        value: unsigned,
    ) {
        assertNotNil(currency);
        assertIsGreaterThanOrEqual(value, 0);

        this._currency = currency;
        this._value = value;
    }

    /**
     *
     * @param value Остаток.
     */
    add(value: unsigned): unsigned {
        assertIsGreaterThanOrEqual(value, 0);

        this._value += value;
        debug('log')(sprintf('Добавлена валюта (%s): %d.', this._currency['_name'], value));    //todo: Доступ.

        return 0;
    }
}