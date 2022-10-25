import WalletComponent from '../Components/WalletComponent.js';
import GameObjectFactory from './GameObjectFactory.js';
import {unsigned} from '../types.js';
import Currency from '../Entities/Currency.js';
import {assertNotNil} from '../../source/assert.js';

export default class WalletFactory {
    private readonly _gameObjectFactory: GameObjectFactory;

    constructor(options: {
        gameObjectFactory: GameObjectFactory,
    }) {
        this._gameObjectFactory = options.gameObjectFactory;
    }

    create(options: {
        currency: Currency,
        value: unsigned,
    }) {
        assertNotNil(options);
        assertNotNil(options.currency);
        assertNotNil(options.value);

        let wallet = this._gameObjectFactory.create();

        wallet.name = 'Wallet';
        wallet.addTags([    //todo: Всё равно тегов не будет.
            '#wallet',
            '#wallet.' + options.currency['_id'],   //todo: Доступ.
        ]);

        wallet.set(WalletComponent.name, new WalletComponent(
            options.currency,
            options.value,
        ));

        return wallet;
    }
}