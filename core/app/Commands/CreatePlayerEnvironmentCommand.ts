import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import WalletFactory from '../Factories/WalletFactory.js';
import EntityManager from '../../source/EntityManager.js';
import Currency from '../Entities/Currency.js';
import PlayerFactory from '../Factories/PlayerFactory.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../Components/ItemStorageComponent.js';

/**
 * Команда отвечает за обязательные настраиваемые объекты без которых игра не работает. Кошельки, 1 контейнер и тд.
 */
export default class CreatePlayerEnvironmentCommand extends Command {
    get name(): string {
        return 'create_player_env';
    }

    async execute(input: Input) {
        this._createItemStorages(); //todo: Игра может работать без контейнера, но это не удобно. Придётся его каждый раз создавать вручную. Еще 1 команда?
        this._createWallets();
    }

    private _createItemStorages() {
        this.container.get<ItemStorageFactoryInterface>('player.playerItemStorageFactory').create(DEFAULT_ITEM_STORAGE_SIZE);
    }

    private _createWallets() {
        let config = this.container.get<object>('core.config');

        let currencies = [
            'currency_gold',
            'currency_research_points',
        ];

        currencies.forEach((currencyAlias) => {
            this.container.get<GameObjectStorage>('player.gameObjectStorage').add(this.container.get<WalletFactory>('player.walletFactory').create(
                this.container.get<EntityManager>('core.entityManager').getRepository<Currency>(Currency.name).getOneByAlias(currencyAlias),
                config['start_wallet_values'][currencyAlias]['value'],
            ));
        });
    }
}