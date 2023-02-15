import {RangeType, unsigned} from '../../types/main.js';
import _ from 'lodash';
import Wallet from './Wallet.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export default class GoldLootGenerator {
    private readonly _value: RangeType;

    constructor(value: RangeType) {
        this._value = value;
    }

    transfer(wallet: WalletInterface) {
        let gold = _.random(this._value.min, this._value.max);
        wallet.add(gold);
        debug(DebugNamespaceID.Debug)('Генерация золота в луте: ' + gold);
    }
}