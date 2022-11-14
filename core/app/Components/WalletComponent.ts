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
import useCustomHook from '../../../client/public/_React/Test/test.js';
import Func = jest.Func;

export interface WalletComponentRenderOptions {
    value: number,
    currency: Currency,
}

//todo: Проблема: если не знать что внутри - будет не удобно. add(currency, value)?
export default class WalletComponent implements WalletInterface, RenderInterface<WalletComponentRenderOptions> {
// export default class WalletComponent implements WalletInterface, RenderInterface {
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

        this._callbacks = [];
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
        // this._setValue(this._value);
        // console.log('add', this._target);
        // this._target?.updateValue(this, this._value);
        for (let i = 0; i < this._callbacks.length; i++) {
            this._callbacks[i](this._value);
        }

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

    // render(callback: (options: WalletComponentRenderOptions) => void): void {
    //     callback({
    //         value: this._value,
    //         currency: this._currency,
    //     });
    // }
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

    // private _targets: any;
    private _callbacks: any;
    /*
        target - Это окно. Точнее не окно, а интерфейс взаимодействия.
     */
    // attach(target /*: WalletUI updateValue()*/): void {
    attach(callback): void {
        // let attachFactory: any;
        // // this._target = attachFactory.attach(this);
        // this._attachFactory = attachFactory.attach(this);

        // console.log('attach', target);
        // console.log('attach this', this);
        // this._target = target;
        // this._target.attach(this);  //Так точно нельзя делать. 1. Нужно будет каждый раз вспоминать что нунжно написать. 2. А потом нужно будет вызвать несколько методов и тд. 3. Изменять всё это в каждом методе не удобно будет.
        // target?.updateValue(this, this._value);
        this._callbacks.push(callback);
        callback(this._value);
    }

    detach(): void {
        // this._target = null;
        // this._callbacks = null;
        // target.detach(this);
        //Должно происходить закрытие окна.
    }
}