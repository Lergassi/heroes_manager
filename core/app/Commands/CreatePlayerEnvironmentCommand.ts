import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import WalletFactory from '../Factories/WalletFactory.js';
import EntityManager from '../../source/EntityManager.js';
import Currency from '../Entities/Currency.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';
import MainItemStorageListComponent from '../Components/MainItemStorageListComponent.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../consts.js';
import {ContainerKey} from '../../types/enums/ContainerKey.js';
import {CurrencyID} from '../../types/enums/CurrencyID.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import {EntityID} from '../../types/enums/EntityID.js';

/**
 * Команда отвечает за обязательные настраиваемые объекты без которых игра не работает. Кошельки, 1 контейнер и тд.
 */
export default class CreatePlayerEnvironmentCommand extends Command {
    get name(): string {
        return CommandNameID.create_player_env;
    }

    async execute(input: Input) {
        this._createItemStorages(); //todo: Игра может работать без контейнера, но это не удобно. Придётся его каждый раз создавать вручную. Еще 1 команда?
        // this._createWallets();
    }

    private _createItemStorages() {
        // let itemStorage = this.container.get<ItemStorageFactoryInterface>('player.itemStorageFactory').create(DEFAULT_ITEM_STORAGE_SIZE);
        // this.container.get<ItemStorageListComponent>(ContainerKey.MainItemStorageList).add(itemStorage);
        this.container.get<MainItemStorageListComponent>(ContainerKey.MainItemStorageList).create(
            DEFAULT_ITEM_STORAGE_SIZE,
            this.container.get<ItemStorageFactoryInterface>(ContainerKey.ItemStorageFactory),
        );
    }

    private _createWallets() {
        let config = this.container.get<object>('core.config');

        let currencies = [
            CurrencyID.Gold,
            CurrencyID.ResearchPoints,
        ];

        currencies.forEach((currencyAlias) => {
            this.container.get<GameObjectStorage>(ContainerKey.GameObjectStorage).add(this.container.get<WalletFactory>('player.walletFactory').create({
                currency: this.container.get<EntityManagerInterface>(ContainerKey.EntityManager).get<Currency>(EntityID.Currency, currencyAlias),
                value: config['start_wallet_values'][currencyAlias]['value'],
            }));
            // core.entityManager
        });
    }
}