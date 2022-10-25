import {unsigned} from '../types.js';

export default interface WalletInterface {
    /**
     * @param value Остаток.
     */
    add(value: unsigned): unsigned;
    //todo:
    // remove(value: unsigned): unsigned;
    // has(value: unsigned): boolean;
}