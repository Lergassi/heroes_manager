import Wallet from '../Components/Wallet.js';
import GameObjectFactory from './GameObjectFactory.js';
import GameObject from '../../source/GameObject.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
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
        value: number = 0,
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