import config from '../config/main.js';
import Container from '../../core/source/Container.js';
import AbstractContainerConfigure from '../../core/source/AbstractContainerConfigure.js';
import Router from '../source/Router.js';
import SiteRoutes from './Routes/SiteRoutes.js';
import AdminRoutes from './Routes/AdminRoutes.js';
import DevRoutes from './Routes/DevRoutes.js';
import SandboxRoutes from './Routes/SandboxRoutes.js';
import TestRoutes from './Routes/TestRoutes.js';
import mysql from 'mysql';
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
import AddItemCommand from '../../core/app/Commands/AddItemCommand.js';
import CreateHeroCommand from '../../core/app/Commands/CreateHeroCommand.js';
import CreateItemStorageCommand from '../../core/app/Commands/CreateItemStorageCommand.js';
import EquipCommand from '../../core/app/Commands/EquipCommand.js';
import RemoveEquipCommand from '../../core/app/Commands/RemoveEquipCommand.js';
import InspectGameObjectCommand from '../../core/app/Commands/DebugCommands/InspectGameObjectCommand.js';

export default class ContainerConfigure extends AbstractContainerConfigure {
    configure(container: Container): Container {
        container.set('config.server', config);
        container.set('router', (container) => {
            let router = new Router(container, container.get('config.server').services.router.controllerDir);

            (new SiteRoutes()).register(router);
            (new AdminRoutes()).register(router);

            //todo: Только для dev.
            (new DevRoutes()).register(router);
            (new SandboxRoutes()).register(router);
            (new TestRoutes()).register(router);

            return router;
        });
        container.set('database.pool', (container) => {
            let config = container.get('config.server');

            return mysql.createPool({
                connectionLimit : config.services.database.connectionLimit,
                host            : config.services.database.host,
                user            : config.services.database.user,
                password        : config.services.database.password,
                database        : config.services.database.name,
            })
        });
        container.set('passwordHasher', (container) => {
            return new PasswordHasher();
        });
        container.set('userDBObjectFactory', (container) => {
            return new UserDBObjectFactory(container.get('database.pool'), container.get('passwordHasher'));
        });
        container.set('userDBObjectRepository', (container) => {
            // return new UserDBObjectRepository(UserDBObject.name, container.get('database.pool'));
            return new UserDBObjectRepository<UserDBObject>(UserDBObject.name, container.get('database.pool'));
        });
        container.set('security', (container) => {
            return new Security(container);
        });

        this._gameConsoleConfigure(container);

        return container;
    }

    private _gameConsoleConfigure(container: Container) {
        let gameConsole: GameConsole = container.get('gameConsole');

        gameConsole.register(new CreateUserEnvironmentCommand(container));
        gameConsole.register(new LoadUserEnvironmentCommand(container));
        gameConsole.register(new UnloadUserEnvironmentCommand(container));
        gameConsole.register(new ExitCommand(container));

        gameConsole.register(new CreatePlayerEnvironmentCommand(container));
        gameConsole.register(new UnloadPlayerEnvironmentCommand(container));

        gameConsole.register(new AddItemCommand(container));
        gameConsole.register(new CreateHeroCommand(container));
        gameConsole.register(new CreateItemStorageCommand(container));
        gameConsole.register(new EquipCommand(container));
        gameConsole.register(new RemoveEquipCommand(container));

        /* DEBUG */
        gameConsole.register(new DebugUserEnvironmentCommand(container));
        gameConsole.register(new DebugPlayerEnvironmentCommand(container));
        gameConsole.register(new InspectGameObjectCommand(container));
    }
}