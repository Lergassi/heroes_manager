import {unsigned} from '../../types/main.js';
import _ from 'lodash';
import WalletComponent from './WalletComponent.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export default class GoldLootGeneratorComponent {
    private readonly _min: unsigned;
    private readonly _max: unsigned;

    constructor(options: {
        min: unsigned,
        max: unsigned,
    }) {
        this._min = options.min;
        this._max = options.max;
    }

    private _generate(): unsigned {
        return _.random(this._min, this._max);
    }

    transfer(wallet: WalletInterface) {
        let gold = this._generate();
        debug(DebugNamespaceID.Log)('Генерация золота в луте: ' + gold);
        wallet.add(gold);
    }
}