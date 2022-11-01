import WalletComponent from '../Components/WalletComponent.js';
import GameObjectFactory from './GameObjectFactory.js';
import {unsigned} from '../../types/main.js';
import Currency from '../Entities/Currency.js';
import {assertIsGreaterThanOrEqual, assertIsPositive, assertNotNil} from '../../source/assert.js';
import GameObject from '../../source/GameObject.js';
import {CurrencyID} from '../../types/enums/CurrencyID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import {EntityID} from '../../types/enums/EntityID.js';

export default class WalletFactory {
    private readonly _gameObjectFactory: GameObjectFactory;
    private readonly _entityManager: EntityManagerInterface;

    constructor(
        gameObjectFactory: GameObjectFactory,
        entityManager: EntityManagerInterface,
    ) {
        this._gameObjectFactory = gameObjectFactory;
        this._entityManager = entityManager;
    }

    create(
        currency: Currency | CurrencyID,
        value: unsigned = 0,
    ): GameObject {
        if (!(currency instanceof Currency)) {
            currency = this._entityManager.get<Currency>(EntityID.Currency, currency);
        }

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