import Component from '../../source/Component.js';
import Currency from '../Entities/Currency.js';
import {unsigned} from '../types.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';

export default class WalletComponent extends Component {
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

    constructor(options: {
        currency: Currency,
        value: unsigned,
    },) {
        super();
        //todo: validate

        this._currency = options.currency;
        this._value = options.value;
    }

    add(value: unsigned) {
        this._value += value;
        debug('log')(sprintf('Добавлена валюта (%s): %s.', this._currency.name, value));
    }
}