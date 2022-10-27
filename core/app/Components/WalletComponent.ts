import Component from '../../source/Component.js';
import Currency from '../Entities/Currency.js';
import {unsigned} from '../../types/main.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import {assertIsGreaterThanOrEqual, assertIsPositive, assertNotNil} from '../../source/assert.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export default class WalletComponent implements WalletInterface {
    private readonly _currency: Currency;
    private _value: unsigned;

    constructor(
        currency: Currency,
        value: unsigned = 0,
    ) {
        assertNotNil(currency);
        assertIsPositive(value);

        this._currency = currency;
        this._value = value;
    }

    /**
     * @param value Остаток.
     */
    add(value: unsigned): unsigned {
        assertIsGreaterThanOrEqual(value, 0);

        this._value += value;
        debug(DebugNamespaceID.Log)(sprintf('Добавлена валюта (%s): %d.', this._currency.name, value));

        return 0;
    }
}