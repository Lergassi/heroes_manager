import WalletComponent from '../Components/WalletComponent.js';
import GameObjectFactory from './GameObjectFactory.js';
import {CurrencyWalletAlias, unsigned} from '../types.js';
import Currency from '../Entities/Currency.js';

export default class WalletFactory {
    private readonly _gameObjectFactory: GameObjectFactory;

    constructor(options: {
        gameObjectFactory: GameObjectFactory,
    }) {
        this._gameObjectFactory = options.gameObjectFactory;
    }

    create(options: {
        currency: Currency, //todo: ID
        value: unsigned,
    }) {
        let wallet = this._gameObjectFactory.create();

        wallet.name = 'Wallet';
        wallet.addTags([
            '#wallet',
            CurrencyWalletAlias[options.currency['_id']],   //todo: Доступ.
        ]);

        wallet.set(WalletComponent.name, new WalletComponent({
            currency: options.currency,
            value: options.value,
        }));

        return wallet;
    }
}