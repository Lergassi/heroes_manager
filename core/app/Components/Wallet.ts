import Component from '../../source/Component.js';
import Currency from '../Entities/Currency.js';
import {unsigned} from '../../types/main.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import {assertIsGreaterThanOrEqual, assertIsPositive, assertNotNil} from '../../source/assert.js';
import WalletInterface, {WalletInterfaceRender} from '../Interfaces/WalletInterface.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import EventSystem from '../../source/EventSystem.js';
import {EventCode} from '../../types/enums/EventCode.js';
import EventSystem2 from '../../source/EventSystem2.js';
import useCustomHook from '../../../client/public/_React/Test/test.js';
import Func = jest.Func;

export interface WalletComponentRenderOptions {
    value: number,
    currency: Currency,
}

export default class Wallet implements WalletInterface {
    private _value: number;

    get value(): number {
        return this._value;
    }

    constructor(value: number = 0) {
        assertIsPositive(value);

        this._value = value;
    }

    add(value: number): number {
        assertIsPositive(value);

        if (value <= 0) return 0;

        this._value += value;
        debug(DebugNamespaceID.Log)(sprintf('Добавлена валюта: %s. Остаток: %s', value, this._value));

        return value;
    }

    /**
     *
     * @param value
     * @return Удаленное кол-во.
     */
    remove(value: number): number {
        assertIsPositive(value);

        if (value <= 0) return 0;

        let removedValue;
        if (this._value >= value) {
            this._value -= value;
            removedValue = value;
        } else {
            removedValue = this._value;
            this._value = 0;
        }
        debug(DebugNamespaceID.Log)(sprintf('Удалена валюта: %s. Остаток: %s.', value, this._value));

        return removedValue;
    }

    /**
     *
     * @param target
     * @return Кол-во перемещенных денег.
     */
    moveAllTo(target: WalletInterface): number {
        if (this._value <= 0) {
            return 0;
        }

        return this.remove(target.add(this._value));
    }

    has(value: number): boolean {
        return this._value >= value;
    }

    renderByRequest(ui: WalletInterfaceRender): void {
        ui.updateValue?.(this._value);
    }
}