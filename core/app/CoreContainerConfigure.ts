import path from 'path';
import config from '../config/main.js';
import ContainerConfigureInterface from '../source/ContainerConfigureInterface.js';
import AutoIncrementIDGenerator from '../source/AutoIncrementIDGenerator.js';
import RepositoryManagerFileLoader from './Services/RepositoryManagerFileLoader.js';
import UserFactory from './Factories/UserFactory.js';
import PlayerFactory from './Factories/PlayerFactory.js';
import WalletFactory from './Factories/WalletFactory.js';
import GameObjectStorage from '../source/GameObjectStorage.js';
import HeroFactory from './Factories/HeroFactory.js';
import ItemStorageFactory from './Factories/ItemStorageFactory.js';
import GameConsole from '../source/GameConsole/GameConsole.js';
import HelpCommand from '../../server/app/Commands/HelpCommand.js';
import ListCommand from '../../server/app/Commands/ListCommand.js';
import ItemStorageManager from './Services/ItemStorageManager.js';
import AddItemCommand from './Commands/AddItemCommand.js';
import CreateHeroCommand from './Commands/CreateHeroCommand.js';
import CreateItemStorageCommand from './Commands/CreateItemStorageCommand.js';
import EquipCommand from './Commands/EquipCommand.js';
import RemoveEquipCommand from './Commands/RemoveEquipCommand.js';
import ContainerInterface from '../source/ContainerInterface.js';
import ItemStackFactory from './Factories/ItemStackFactory.js';
import Item from './Entities/Item.js';
import RepositoryManager from '../source/RepositoryManager.js';
import EquipManager from './Services/EquipManager.js';
import DebugEntitiesCommand from './Commands/DebugCommands/DebugEntitiesCommand.js';

export default class CoreContainerConfigure extends ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        container.set<object>('core.config', config);
        //Тут не save_inject, а просто загрузка данных из файла. На сервере из файла, на клиенте через import и webpack
        container.set<RepositoryManager>('core.repositoryManager', (container) => {
            return (new RepositoryManagerFileLoader()).load(path.resolve(process.env.PROJECT_DIR, 'core/data/entities.json'), container);
        });

        this._gameConsoleConfigure(container);

        return container;
    }

    private _gameConsoleConfigure(container: ContainerInterface) {
        let gameConsole: GameConsole = container.get<GameConsole>('gameConsole');

        gameConsole.register(new HelpCommand(container));
        gameConsole.register(new ListCommand(container));

        /* DEBUG */
        gameConsole.register(new DebugEntitiesCommand(container));
    }
}