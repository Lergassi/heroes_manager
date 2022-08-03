import ContainerConfigureInterface from '../source/ContainerConfigureInterface.js';
import ContainerInterface from '../source/ContainerInterface.js';
import AutoIncrementIDGenerator from '../source/AutoIncrementIDGenerator.js';
import GameObjectStorage from '../source/GameObjectStorage.js';
import PlayerFactory from './Factories/PlayerFactory.js';
import WalletFactory from './Factories/WalletFactory.js';
import HeroFactory from './Factories/HeroFactory.js';
import RepositoryManager from '../source/RepositoryManager.js';
import ItemStackFactory from './Factories/ItemStackFactory.js';
import Item from './Entities/Item.js';
import ItemStorageFactory from './Factories/ItemStorageFactory.js';
import ItemStorageManager from './Services/ItemStorageManager.js';
import EquipManager from './Services/EquipManager.js';
import GameConsole from '../source/GameConsole/GameConsole.js';
import HelpCommand from '../../server/app/Commands/HelpCommand.js';
import ListCommand from '../../server/app/Commands/ListCommand.js';
import AddItemCommand from './Commands/AddItemCommand.js';
import CreateHeroCommand from './Commands/CreateHeroCommand.js';
import CreateItemStorageCommand from './Commands/CreateItemStorageCommand.js';
import EquipCommand from './Commands/EquipCommand.js';
import RemoveEquipCommand from './Commands/RemoveEquipCommand.js';
import DebugEntitiesCommand from './Commands/DebugCommands/DebugEntitiesCommand.js';
// import config from '../config/main.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';

export default class PlayerContainerConfigure extends ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        // container.set<object>('core.config', config);
        //На игрока. Но сервис используется еще чтобы создать GameObject для пользователя и игрока. Получается для нового игрока надо будет загрузить данные... всех игроков? ID должны быть уникальны во всем проекте. Можно сделать через namespace с id игроком. Логика должна быть такой. Загружается игрок и данные по доступным игрокам. Каждый игрок независим от всей игры. Его можно удалить навсегда. А зачем нужен поиск по ID?
        container.set<AutoIncrementIDGenerator>('player.realtimeObjectIdGenerator', (container: ContainerInterface) => {
            return new AutoIncrementIDGenerator(1);
        });
        debug('debug')(container.get('player.realtimeObjectIdGenerator'));
        container.set<GameObjectStorage>('player.gameObjectStorage', (container) => {
            return new GameObjectStorage();
        });
        // container.set<UserFactory>('core.userFactory', (container) => {
        //     return new UserFactory(container.get<AutoIncrementIDGenerator>('player.realtimeObjectIdGenerator'));
        // });
        container.set<PlayerFactory>('player.playerFactory', (container) => {
            return new PlayerFactory(container.get<AutoIncrementIDGenerator>('player.realtimeObjectIdGenerator'), {
                maxLevel: 100,
            });
        });
        container.set<WalletFactory>('player.walletFactory', (container) => {
            return new WalletFactory(container.get<AutoIncrementIDGenerator>('player.realtimeObjectIdGenerator'));
        });

        container.set<HeroFactory>('player.heroFactory', (container) => {
            return new HeroFactory(
                container.get<AutoIncrementIDGenerator>('player.realtimeObjectIdGenerator'),
                container.get<RepositoryManager>('core.repositoryManager'),
                container.get<object>('core.config'),
            );
        });
        container.set<ItemStackFactory>('player.itemStackFactory', (container) => {
            return new ItemStackFactory(
                container.get<AutoIncrementIDGenerator>('player.realtimeObjectIdGenerator'),
                container.get<RepositoryManager>('core.repositoryManager').getRepository<Item>(Item.name),
            );
        });
        container.set<ItemStorageFactory>('player.itemStorageFactory', (container) => {
            return new ItemStorageFactory(
                container.get<AutoIncrementIDGenerator>('player.realtimeObjectIdGenerator'),
            );
        });
        container.set<ItemStorageManager>('player.itemStorageManager', (container) => {
            return new ItemStorageManager(container.get<GameObjectStorage>('player.gameObjectStorage'));
        });
        container.set<EquipManager>('player.equipManager', (container) => {
            return new EquipManager();
        });

        this._gameConsoleConfigure(container);

        debug('core:log')(sprintf('Конфигурация %s завершена.', this.constructor.name));

        return container;
    }

    private _gameConsoleConfigure(container: ContainerInterface) {
        let gameConsole: GameConsole = container.get<GameConsole>('gameConsole');

        gameConsole.register(new AddItemCommand(container));
        gameConsole.register(new CreateHeroCommand(container));
        gameConsole.register(new CreateItemStorageCommand(container));
        gameConsole.register(new EquipCommand(container));
        gameConsole.register(new RemoveEquipCommand(container));

        /* DEBUG */
    }
}