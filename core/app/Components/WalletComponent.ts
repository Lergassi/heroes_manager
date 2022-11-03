import Component from '../../source/Component.js';
import Currency from '../Entities/Currency.js';
import {unsigned} from '../../types/main.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import {assertIsGreaterThanOrEqual, assertIsPositive, assertNotNil} from '../../source/assert.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import EventSystem from '../../source/EventSystem.js';
import {EventCode} from '../../types/enums/EventCode.js';
import RenderInterface from '../Interfaces/RenderInterface.js';
import EventSystem2 from '../../source/EventSystem2.js';

export interface WalletComponentRenderOptions {
    value: number,
    currency: Currency,
}

//todo: Проблема: если не знать что внутри - будет не удобно. add(currency, value)?
export default class WalletComponent implements WalletInterface, RenderInterface<WalletComponentRenderOptions> {
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
        EventSystem.event(EventCode.Wallet_AddCurrency, this);
        // this.update();

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
        EventSystem.event(EventCode.Wallet_RemoveCurrency, this);

        return this._value;
    }

    // render(callback: (options: ) => void): void {
    render(callback: (options: WalletComponentRenderOptions) => void): void {
        callback({
            value: this._value,
            currency: this._currency,
        });
    }

    render2(callback: (options) => void): void {
        callback({
            value: () => {
                return this._value;
            },
            currency: this._currency,
        });
    }
}