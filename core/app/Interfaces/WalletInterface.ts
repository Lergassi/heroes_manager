import {unsigned} from '../../types/main.js';

export default interface WalletInterface {
    /**
     * @param value
     * @return Остаток.
     */
    add(value: unsigned): unsigned;

    /**
     *
     * @param target
     * @return Остаток в кошельке.
     */
    moveTo(target: WalletInterface): number;
    //todo:
    // remove(value: unsigned): unsigned;
    // has(value: unsigned): boolean;
}