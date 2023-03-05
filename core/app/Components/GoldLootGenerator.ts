import {RangeType, unsigned} from '../../types/main.js';
import _ from 'lodash';
import Wallet from './Wallet.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export default class GoldLootGenerator {
    private readonly _value: number;

    constructor(value: number) {
        this._value = value;
    }

    transfer(wallet: WalletInterface) {
        wallet.add(this._value);
        debug(DebugNamespaceID.Log)('Генерация золота в луте: ' + this._value);
    }
}