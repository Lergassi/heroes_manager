import {RangeType, unsigned} from '../../types/main.js';
import _ from 'lodash';
import Wallet from './Wallet.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export default class GoldLootGeneratorComponent {
    private readonly _min: number;
    private readonly _max: number;

    constructor(options: RangeType) {
        this._min = options.min;
        this._max = options.max;
    }

    transfer(wallet: WalletInterface) {
        let gold = this._generate();
        debug(DebugNamespaceID.Debug)('Генерация золота в луте: ' + gold);
        wallet.add(gold);
    }

    private _generate(): unsigned {
        return _.random(this._min, this._max);
    }
}