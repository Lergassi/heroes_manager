import {unsigned} from '../../types/main.js';

export interface WalletInterfaceRender {
    updateValue(value: number): void;
}

export default interface WalletInterface {
    get value(): number;

    /**
     * @param value
     * @return Остаток.
     */
    add(value: number): number;

    /**
     *
     * @param value
     * @return Кол-во удаленных единиц валюты.
     */
    remove(value: number): number;
    /**
     *
     * @param target
     * @return Остаток в кошельке.
     */
    moveTo(target: WalletInterface): number;
    // has(value: unsigned): boolean;
    // render(callb);
    // addListener();
    renderByRequest(ui: WalletInterfaceRender): void;
}