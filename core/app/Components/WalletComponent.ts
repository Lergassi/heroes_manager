import Component from '../../source/Component.js';
import Currency from '../Entities/Currency.js';
import {unsigned} from '../../types/main.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import {assertIsGreaterThanOrEqual, assertIsPositive, assertNotNil} from '../../source/assert.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import EventSystem from '../../source/EventSystem.js';

export enum WalletComponentEventCode {
    Add = 'WalletComponent.Add',
}

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

    add(value: unsigned): unsigned {
        assertIsPositive(value);

        if (value <= 0) {
            return 0;
        }

        this._value += value;
        debug(DebugNamespaceID.Log)(sprintf('Добавлена валюта (%s): %s. Итого: %s', this._currency.name, value, this._value));
        EventSystem.event(WalletComponentEventCode.Add, this);

        return 0;
    }

    moveTo(target: WalletInterface): number {
        if (this._value <= 0) {
            return 0;
        }
        // if (this._value < value) {
        //     debug(DebugNamespaceID.Throw)('В кошельке недостаточно валюты.');
        //     return value;
        // }

        // this._value -= value;
        // let remainder = target.add(value);
        // let remainder = target.add(this._value);

        this._value = target.add(this._value);

        // return remainder;
        return this._value;
    }
}