import WalletComponent from '../../Components/WalletComponent.js';
import Currency from '../../Entities/Currency.js';
import {unsigned} from '../../types.js';

export default class WalletComponentFactory {
    create(options: {
        currency: Currency,
        value: unsigned,
    },): WalletComponent {
        return new WalletComponent({
            currency: options.currency,
            value: options.value,
        });
    }

    // createIn() {
    //
    // }
}