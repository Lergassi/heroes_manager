import Wallet from '../Components/Wallet.js';
import GameObjectFactory from './GameObjectFactory.js';
import {unsigned} from '../../types/main.js';
import Currency from '../Entities/Currency.js';
import {assertIsGreaterThanOrEqual, assertIsPositive, assertNotNil} from '../../source/assert.js';
import GameObject from '../../source/GameObject.js';
import {CurrencyID} from '../../types/enums/CurrencyID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import {EntityID} from '../../types/enums/EntityID.js';
import {ComponentID} from '../../types/enums/ComponentID.js';

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
        value: unsigned = 0,
    ): GameObject {
        let wallet = this._gameObjectFactory.create();

        wallet.name = 'Wallet';
        wallet.addTags([
            '#wallet',
        ]);

        wallet.set(ComponentID.Wallet, new Wallet(
            value,
        ));

        return wallet;
    }
}