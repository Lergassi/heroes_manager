import config from '../config/main.js';
import ContainerConfigureInterface from '../source/ContainerConfigureInterface.js';
import GameConsole from '../source/GameConsole/GameConsole.js';
import HelpCommand from '../../server/app/Commands/HelpCommand.js';
import ListCommand from '../../server/app/Commands/ListCommand.js';
import ContainerInterface from '../source/ContainerInterface.js';
import EntityManager from '../source/EntityManager.js';
import DebugEntitiesCommand from './Commands/DebugCommands/DebugEntitiesCommand.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import Serializer from '../source/Serializer.js';
import JsonSerializer from '../source/JsonSerializer.js';
import MetadataManager from '../source/MetadataManager.js';
import MetadataManagerCreator from './Services/MetadataManagerCreator.js';
import EntityManagerCreator from './Services/EntityManagerCreator.js';

export default class CoreContainerConfigure implements ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        container.set<object>('core.config', config);
        //Тут не save_inject, а просто загрузка данных из файла. На сервере из файла, на клиенте через import и webpack.
        container.set<EntityManager>('core.entityManager', (container) => {
            // return (new RepositoryManagerFileLoader()).load(path.resolve(process.env.PROJECT_DIR, 'core/data/entities.json'), container);
            // return new EntityManager();
            return (new EntityManagerCreator()).create();
        });
        container.set<JsonSerializer>('core.jsonSerializer', (container) => {
            return new JsonSerializer();
        });
        container.set<MetadataManager>('core.metadataManager', (container) => {
            return (new MetadataManagerCreator()).create();
        });
        container.set<Serializer>('core.serializer', (container) => {
            return new Serializer(container, container.get<MetadataManager>('core.metadataManager'));
        });

        this._gameConsoleConfigure(container);

        debug('log')(sprintf('Конфигурация %s завершена.', this.constructor.name));

        return container;
    }

    private _gameConsoleConfigure(container: ContainerInterface) {
        let gameConsole: GameConsole = container.get<GameConsole>('gameConsole');

        gameConsole.register(new HelpCommand(container));
        gameConsole.register(new ListCommand(container));

        //add_item
        //create_hero
        //kill_hero
        //...

        /* DEBUG */
        gameConsole.register(new DebugEntitiesCommand(container));
    }
}