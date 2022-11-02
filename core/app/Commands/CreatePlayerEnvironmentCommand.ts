import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import WalletFactory from '../Factories/WalletFactory.js';
import EntityManager from '../../source/EntityManager.js';
import Currency from '../Entities/Currency.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';
import MainItemStorageListComponent from '../Components/MainItemStorageListComponent.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../consts.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import {CurrencyID} from '../../types/enums/CurrencyID.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import {EntityID} from '../../types/enums/EntityID.js';
import _ from 'lodash';
import ItemStorageFactory from '../Factories/ItemStorageFactory.js';
import GameConsole from '../../source/GameConsole/GameConsole.js';

/**
 * Команда отвечает за обязательные настраиваемые объекты без которых игра не работает. Кошельки, 1 контейнер и тд.
 */
export default class CreatePlayerEnvironmentCommand extends Command {
    get name(): string {
        return CommandNameID.create_player_env;
    }

    async execute(input: Input) {
        await this._createItemStorages(); //todo: Игра может работать без контейнера, но это не удобно. Придётся его каждый раз создавать вручную. Еще 1 команда?
        // this._createWallets();   //Пока создается в ...ContainerConfigure из-за зависимостей друг от друга.
    }

    private async _createItemStorages() {
        // this.container.get<MainItemStorageListComponent>(ContainerID.MainItemStorageList).create(
        //     DEFAULT_ITEM_STORAGE_SIZE,
        //     this.container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory),
        // );
        await this.container.get<GameConsole>(ContainerID.GameConsole).getCommand(CommandNameID.create_item_storage).run([DEFAULT_ITEM_STORAGE_SIZE.toString()]);
    }

    private _createWallets() {
        let config = this.container.get<object>('core.config');

        let currencyIDs = [
            CurrencyID.Gold,
            CurrencyID.ResearchPoints,
        ];

        _.map(currencyIDs, (currencyID) => {
            this.container.get<WalletFactory>(ContainerID.WalletFactory).create(
                this.container.get<EntityManagerInterface>(ContainerID.EntityManager).get<Currency>(EntityID.Currency, currencyID),
                config['start_wallet_values'][currencyID]['value'],
            )
        });
    }
}