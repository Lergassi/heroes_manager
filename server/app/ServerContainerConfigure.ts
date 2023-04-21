import config from '../config/main.js';
import ContainerConfigureInterface from '../../core/source/ContainerConfigureInterface.js';
import Router from '../source/Router.js';
import SiteRoutes from './Routes/SiteRoutes.js';
import AdminRoutes from './Routes/AdminRoutes.js';
import DevRoutes from './Routes/DevRoutes.js';
import SandboxRoutes from './Routes/SandboxRoutes.js';
import TestRoutes from './Routes/TestRoutes.js';
import mysql, {Pool} from 'mysql';
import PasswordHasher from '../source/PasswordHasher.js';
import UserDBObjectRepository from './Repositories/UserDBObjectRepository.js';
import UserDBObject from './DBObjects/UserDBObject.js';
import UserDBObjectFactory from './Factories/UserDBObjectFactory.js';
import GameConsole from '../../core/source/GameConsole/GameConsole.js';
import CreateUserEnvironmentCommand from './Commands/CreateUserEnvironmentCommand.js';
import Security from '../source/Security.js';
import DebugUserEnvironmentCommand from './Commands/DebugCommands/DebugUserEnvironmentCommand.js';
import LoadUserEnvironmentCommand from './Commands/LoadUserEnvironmentCommand.js';
import UnloadUserEnvironmentCommand from './Commands/UnloadUserEnvironmentCommand.js';
import CreatePlayerEnvironmentCommand from './Commands/CreatePlayerEnvironmentCommand.js';
import ExitCommand from './Commands/ExitCommand.js';
import UnloadPlayerEnvironmentCommand from './Commands/UnloadPlayerEnvironmentCommand.js';
import DebugPlayerEnvironmentCommand from '../../core/app/Commands/DebugCommands/DebugPlayerEnvironmentCommand.js';
import InspectGameObjectCommand from '../../core/app/Commands/DebugCommands/InspectGameObjectCommand.js';
import SavePlayerEnvironmentCommand from './Commands/SavePlayerEnvironmentCommand.js';
import LoadPlayerEnvironmentCommand from './Commands/LoadPlayerEnvironmentCommand.js';
import HelpCommand from './Commands/HelpCommand.js';
import ListCommand from './Commands/ListCommand.js';
import ContainerInterface from '../../core/source/ContainerInterface.js';
import PlayerDBObjectRepository from './Repositories/PlayerDBObjectRepository.js';
import PlayerDBObject from './DBObjects/PlayerDBObject.js';
import PlayerDBObjectFactory from './Factories/PlayerDBObjectFactory.js';
import LoadFullEnvironmentCommand from './Commands/LoadFullEnvironmentCommand.js';
import DebugContainerCommand from './Commands/DebugCommands/DebugContainerCommand.js';
import SecurityStatusCommand from './Commands/SecurityStatusCommand.js';
import UnloadFullEnvironmentCommand from './Commands/UnloadFullEnvironmentCommand.js';
import {sprintf} from 'sprintf-js';
import PathResolver from '../source/PathResolver.js';
import {DebugNamespaceID} from '../../core/types/enums/DebugNamespaceID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import DebugApp from '../../core/app/Services/DebugApp.js';

export default class ServerContainerConfigure implements ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        container.set<object>('server.config', config);
        // container.set<Paths>('server.paths', (container) => {
        //     return new Paths(
        //         process.env.PROJECT_DIR,
        //         {
        //             relativeServerDataDir: 'data',
        //             relativeCoreDataDir: 'data',
        //         }
        //     );
        // });
        container.set<PathResolver>('server.pathResolver', (container) => {
            return new PathResolver(<string>container.get('server.config')['projectDir']);
        })
        // container.set<GameConsole>('server.gameConsole', (container) => {
        //     return new GameConsole();
        // });
        // container.set('gameConsole', container.get<GameConsole>('server.gameConsole'));    //alias
        container.set<Router>('server.router', (container) => {
            let router = new Router(container, (container.get<object>('server.config'))['services'].router.controllerDir);

            (new SiteRoutes()).register(router);
            (new AdminRoutes()).register(router);

            //todo: Только для dev.
            (new DevRoutes()).register(router);
            (new SandboxRoutes()).register(router);
            (new TestRoutes()).register(router);

            return router;
        });
        container.set<Pool>('server.database.pool', (container) => {
            let config = container.get<object>('server.config');

            return mysql.createPool({
                connectionLimit: config['services'].database.connectionLimit,
                host: config['services'].database.host,
                user: config['services'].database.user,
                password: config['services'].database.password,
                database: config['services'].database.name,
            })
        });
        container.set<PasswordHasher>('server.passwordHasher', (container) => {
            return new PasswordHasher();
        });
        container.set<UserDBObjectFactory>('server.userDBObjectFactory', (container) => {
            return new UserDBObjectFactory(container.get<Pool>('server.database.pool'), container.get<PasswordHasher>('server.passwordHasher'));
        });
        container.set<UserDBObjectRepository<UserDBObject>>('server.userDBObjectRepository', (container) => {
            return new UserDBObjectRepository<UserDBObject>(UserDBObject.name, container.get<Pool>('server.database.pool'));
        });
        container.set<PlayerDBObjectFactory>('server.playerDBObjectFactory', (container) => {
            return new PlayerDBObjectFactory();
        });
        container.set<PlayerDBObjectRepository<PlayerDBObject>>('server.playerDBObjectRepository', (container) => {
            return new PlayerDBObjectRepository<PlayerDBObject>(
                PlayerDBObject.name,
                container.get<Pool>('server.database.pool'),
                container.get<UserDBObjectRepository<UserDBObject>>('server.userDBObjectRepository'),
            );
        });
        container.set<Security>('server.security', (container) => {
            return new Security(container);
        });

        this._gameConsoleConfigure(container);

        DebugApp.debug(DebugNamespaceID.Log)(sprintf('Конфигурация %s завершена.', this.constructor.name));

        return container;
    }

    //todo: Команды не имеют смысла без загрузки ядра.
    private _gameConsoleConfigure(container: ContainerInterface) {
        // let gameConsole: GameConsole = container.get<GameConsole>('server.gameConsole');
        let gameConsole: GameConsole = container.get<GameConsole>(ServiceID.GameConsole);

        gameConsole.register(new HelpCommand(container));
        gameConsole.register(new ListCommand(container));

        /* USER */
        gameConsole.register(new CreateUserEnvironmentCommand(container));
        gameConsole.register(new LoadUserEnvironmentCommand(container));
        gameConsole.register(new UnloadUserEnvironmentCommand(container));
        gameConsole.register(new ExitCommand(container));

        /* PLAYER */
        gameConsole.register(new CreatePlayerEnvironmentCommand(container));
        gameConsole.register(new SavePlayerEnvironmentCommand(container));
        gameConsole.register(new LoadPlayerEnvironmentCommand(container));
        gameConsole.register(new UnloadPlayerEnvironmentCommand(container));

        gameConsole.register(new LoadFullEnvironmentCommand(container));
        gameConsole.register(new UnloadFullEnvironmentCommand(container));

        /* DEBUG */
        gameConsole.register(new SecurityStatusCommand(container));
        gameConsole.register(new DebugContainerCommand(container));
        gameConsole.register(new DebugUserEnvironmentCommand(container));
        gameConsole.register(new DebugPlayerEnvironmentCommand(container));
        gameConsole.register(new InspectGameObjectCommand(container));
    }
}