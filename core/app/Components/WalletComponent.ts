import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import Currency from '../Entities/Currency.js';

export default class WalletComponent extends Component {
    private readonly _currency: Currency;
    private _value: number;

    get currency(): Currency {
        return this._currency;
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }

    constructor(
        id: number,
        gameObject: GameObject,
        currency: Currency,
        value: number = 0,
    ) {
        super(id, gameObject);

        //todo: validate

        this._currency = currency;
        this._value = value;
    }
}