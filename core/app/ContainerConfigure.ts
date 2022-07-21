import Container from '../source/Container.js';
import AbstractContainerConfigure from '../source/AbstractContainerConfigure.js';
import AutoIncrementIDGenerator from '../source/AutoIncrementIDGenerator.js';
import RepositoryManagerFileLoader from './Services/RepositoryManagerFileLoader.js';
import path from 'path';
import UserFactory from './Factories/UserFactory.js';
import PlayerFactory from './Factories/PlayerFactory.js';
import WalletFactory from './Factories/WalletFactory.js';
import GameObjectStorage from '../source/GameObjectStorage.js';
import HeroFactory from './Factories/HeroFactory.js';
import config from '../config/main.js';
import ItemStorageFactory from './Factories/ItemStorageFactory.js';
import GameConsole from '../source/GameConsole/GameConsole.js';
import HelpCommand from './Commands/HelpCommand.js';
import ListCommand from './Commands/ListCommand.js';
import ItemStorageManager from './Services/ItemStorageManager.js';

export default class ContainerConfigure extends AbstractContainerConfigure {
    configure(container: Container): Container {
        container.set('config.core', config);

        container.set('gameConsole', (container) => {
            let gameConsole = new GameConsole();

            gameConsole.register(new HelpCommand(container));
            gameConsole.register(new ListCommand(container));

            return gameConsole;
        });
        // container.set('dataObjectIdGenerator', new AutoIncrementIdGenerator(1));      //todo: save
        container.set('realtimeObjectIdGenerator', new AutoIncrementIDGenerator(1));  //todo: save
        container.set('repositoryManager', (container) => {
            //todo: Только для сервера. На клиенте загрузка будет не из файла.
            return (new RepositoryManagerFileLoader()).load(path.resolve(process.env.PROJECT_DIR, 'core/data/entities.json'), container);
        });
        container.set('gameObjectStorage', (container) => {
            return new GameObjectStorage();
        });
        container.set('userFactory', (container) => {
            return new UserFactory(container.get('realtimeObjectIdGenerator'));
        });
        container.set('playerFactory', (container) => {
            return new PlayerFactory(container.get('realtimeObjectIdGenerator'), {
                maxLevel: 100,
            });
        });
        container.set('walletFactory', (container) => {
            return new WalletFactory(container.get('realtimeObjectIdGenerator'));
        });
        container.set('heroFactory', (container) => {
            return new HeroFactory(
                container.get('realtimeObjectIdGenerator'),
                container.get('repositoryManager'),
                container.get('config.core'),
            );
        });
        container.set('itemStorageFactory', (container) => {
            return new ItemStorageFactory(
                container.get('realtimeObjectIdGenerator'),
            );
        });
        container.set('itemStorageManager', (container) => {
            return new ItemStorageManager(container.get('gameObjectStorage'));
        });

        return container;
    }
}