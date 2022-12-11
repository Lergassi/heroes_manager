import Wallet from '../../Components/Wallet.js';
import Currency from '../../Entities/Currency.js';
import {unsigned} from '../../../types/main.js';

export default class WalletComponentFactory {
    create(options: {
        currency: Currency,
        value: unsigned,
    },): Wallet {
        return new Wallet(
            options.value,
        );
    }

    // createIn() {
    //
    // }
}