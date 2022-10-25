import {unsigned} from '../types.js';
import _ from 'lodash';
import Component from '../../source/Component.js';
import WalletComponent from './WalletComponent.js';
import WalletInterface from '../Interfaces/WalletInterface.js';

export default class GoldLootGeneratorComponent extends Component {
    private readonly _min: unsigned;
    private readonly _max: unsigned;

    constructor(options: {
        min: unsigned,
        max: unsigned,
    }) {
        super();
        this._min = options.min;
        this._max = options.max;
    }

    private _generate(): unsigned {
        return _.random(this._min, this._max);
    }

    transfer(wallet: WalletInterface) {
        wallet.add(this._generate());
    }
}