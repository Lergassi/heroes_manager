import WalletComponent from '../Components/WalletComponent.js';
import GameObjectFactory from './GameObjectFactory.js';
import {unsigned} from '../../types/main.js';
import Currency from '../Entities/Currency.js';
import {assertIsGreaterThanOrEqual, assertIsPositive, assertNotNil} from '../../source/assert.js';
import GameObject from '../../source/GameObject.js';

export default class WalletFactory {
    private readonly _gameObjectFactory: GameObjectFactory;

    constructor(options: {
        gameObjectFactory: GameObjectFactory,
    }) {
        this._gameObjectFactory = options.gameObjectFactory;
    }

    create(
        currency: Currency,
        value: unsigned,
    ): GameObject {
        let wallet = this._gameObjectFactory.create();

        wallet.name = 'Wallet';
        wallet.addTags([
            '#wallet',
            '#wallet.' + currency['_id'],   //todo: Доступ.
        ]);

        wallet.set(WalletComponent.name, new WalletComponent(
            currency,
            value,
        ));

        return wallet;
    }
}