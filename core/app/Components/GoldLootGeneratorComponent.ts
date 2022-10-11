import {unsigned} from '../types.js';
import _ from 'lodash';
import Component from '../../source/Component.js';
import WalletComponent from './WalletComponent.js';

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

        // EventSystem.addListener({
        //     codes: HealthPointsComponentEventCode.Died,
        //     listener: {
        //         callback: (target) => {
        //             walletComponent.add(this._generate());
        //         },
        //         target: healthPointsComponent,
        //     },
        // });
    }

    private _generate(): unsigned {
        return _.random(this._min, this._max);
    }

    transfer(walletComponent: WalletComponent) {
        walletComponent.add(this._generate());
    }
}