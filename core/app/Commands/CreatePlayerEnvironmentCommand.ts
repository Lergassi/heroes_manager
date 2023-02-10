import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import WalletFactory from '../Factories/WalletFactory.js';
import EntityManager from '../../source/EntityManager.js';
import Currency from '../Entities/Currency.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';
import MainItemStorageListComponent from '../Components/MainItemStorageListComponent.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../consts.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {CurrencyID} from '../../types/enums/CurrencyID.js';
import {CommandID} from '../../types/enums/CommandID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import {EntityID} from '../../types/enums/EntityID.js';
import _ from 'lodash';
import ItemStorageFactory from '../Factories/ItemStorageFactory.js';
import GameConsole from '../../source/GameConsole/GameConsole.js';
import WalletInterface from '../Interfaces/WalletInterface.js';

/**
 * Команда отвечает за обязательные настраиваемые объекты без которых игра не работает. Данные пустые. Наполнение в другом месте, в том числе деньги.
 * Список:
 * 1 сумка
 * 1 кошелек
 */
export default class CreatePlayerEnvironmentCommand extends Command {
    get name(): string {
        return CommandID.create_player_env;
    }

    async execute(input: Input) {
        await this._createItemStorages(); //todo: Игра может работать без контейнера, но это не удобно. Придётся его каждый раз создавать вручную. Еще 1 команда?
        this._createWallets();   //Пока создается в ...ContainerConfigure из-за зависимостей друг от друга. <<<--- Где была зависимость?
    }

    private async _createItemStorages() {
        await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_item_storage, [String(DEFAULT_ITEM_STORAGE_SIZE)]);
    }

    private _createWallets() {
        this.container.set<WalletInterface>(ServiceID.Wallet, this.container.get<WalletFactory>(ServiceID.WalletFactory).create(0).get<WalletInterface>(ComponentID.Wallet));
    }
}