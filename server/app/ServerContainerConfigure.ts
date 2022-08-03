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
import AddItemCommand from '../../core/app/Commands/AddItemCommand.js';
import CreateHeroCommand from '../../core/app/Commands/CreateHeroCommand.js';
import CreateItemStorageCommand from '../../core/app/Commands/CreateItemStorageCommand.js';
import EquipCommand from '../../core/app/Commands/EquipCommand.js';
import RemoveEquipCommand from '../../core/app/Commands/RemoveEquipCommand.js';
import InspectGameObjectCommand from '../../core/app/Commands/DebugCommands/InspectGameObjectCommand.js';
import SavePlayerEnvironmentCommand from './Commands/SavePlayerEnvironmentCommand.js';
import LoadPlayerEnvironmentCommand from './Commands/LoadPlayerEnvironmentCommand.js';
import HelpCommand from './Commands/HelpCommand.js';
import ListCommand from './Commands/ListCommand.js';
import ContainerInterface from '../../core/source/ContainerInterface.js';
import Serializer, {SerializeType} from '../../core/source/Serializer.js';
import GameObject from '../../core/source/GameObject.js';
import ItemStorageComponent from '../../core/app/Components/ItemStorageComponent.js';
import ItemStorageSlotComponent from '../../core/app/Components/ItemStorageSlotComponent.js';
import ItemStackSlot from '../../core/app/RuntimeObjects/ItemStackSlot.js';
import ItemStack from '../../core/app/RuntimeObjects/ItemStack.js';
import WalletComponent from '../../core/app/Components/WalletComponent.js';
import HeroComponent from '../../core/app/Components/HeroComponent.js';
import LevelComponent from '../../core/app/Components/LevelComponent.js';
import EquipSlotComponent from '../../core/app/Components/EquipSlotComponent.js';
import CharacterAttributeComponent from '../../core/app/Components/CharacterAttributeComponent.js';
import HealthPointsComponent from '../../core/app/Components/HealthPointsComponent.js';
import MagicPointsComponent from '../../core/app/Components/MagicPointsComponent.js';
import AttackPowerComponent from '../../core/app/Components/AttackPowerComponent.js';
import PlayerComponent from '../../core/app/Components/PlayerComponent.js';
import AutoIncrementIDGenerator from '../../core/source/AutoIncrementIDGenerator.js';
import PlayerDBObjectRepository from './Repositories/PlayerDBObjectRepository.js';
import PlayerDBObject from './DBObjects/PlayerDBObject.js';
import PlayerDBObjectFactory from './Factories/PlayerDBObjectFactory.js';
import LoadFullEnvironmentCommand from './Commands/LoadFullEnvironmentCommand.js';
import StatusServerCommand from './Commands/StatusServerCommand.js';
import DebugContainerCommand from './Commands/DebugCommands/DebugContainerCommand.js';
import SecurityStatusCommand from './Commands/SecurityStatusCommand.js';
import UnloadFullEnvironmentCommand from './Commands/UnloadFullEnvironmentCommand.js';
import ArmorMaterial from '../../core/app/Entities/ArmorMaterial.js';
import Quality from '../../core/app/Entities/Quality.js';
import CharacterAttribute from '../../core/app/Entities/CharacterAttribute.js';
import Currency from '../../core/app/Entities/Currency.js';
import HeroRole from '../../core/app/Entities/HeroRole.js';
import ItemCategory from '../../core/app/Entities/ItemCategory.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import Item from '../../core/app/Entities/Item.js';
import HeroClass from '../../core/app/Entities/HeroClass.js';
import EquipSlot from '../../core/app/Entities/EquipSlot.js';
import EquipSlotRule from '../../core/app/Entities/EquipSlotRule.js';

export default class ServerContainerConfigure extends ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        container.set<object>('server.config', config);
        container.set<GameConsole>('server.gameConsole', (container) => {
            return new GameConsole();
        });
        container.set('gameConsole', container.get<GameConsole>('server.gameConsole'));    //alias
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
                connectionLimit : config['services'].database.connectionLimit,
                host            : config['services'].database.host,
                user            : config['services'].database.user,
                password        : config['services'].database.password,
                database        : config['services'].database.name,
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

        debug('server:log')(sprintf('Конфигурация %s завершена.', this.constructor.name));

        return container;
    }

    private _gameConsoleConfigure(container: ContainerInterface) {
        let gameConsole: GameConsole = container.get<GameConsole>('server.gameConsole');

        gameConsole.register(new HelpCommand(container));
        gameConsole.register(new ListCommand(container));

        gameConsole.register(new CreateUserEnvironmentCommand(container));
        gameConsole.register(new LoadUserEnvironmentCommand(container));
        gameConsole.register(new UnloadUserEnvironmentCommand(container));
        gameConsole.register(new ExitCommand(container));

        gameConsole.register(new CreatePlayerEnvironmentCommand(container));
        gameConsole.register(new SavePlayerEnvironmentCommand(container));
        gameConsole.register(new LoadPlayerEnvironmentCommand(container));
        gameConsole.register(new UnloadPlayerEnvironmentCommand(container));

        gameConsole.register(new LoadFullEnvironmentCommand(container));
        gameConsole.register(new UnloadFullEnvironmentCommand(container));

        /* DEBUG */
        // gameConsole.register(new StatusServerCommand(container));
        gameConsole.register(new SecurityStatusCommand(container));
        gameConsole.register(new DebugContainerCommand(container));
        gameConsole.register(new DebugUserEnvironmentCommand(container));
        gameConsole.register(new DebugPlayerEnvironmentCommand(container));
        gameConsole.register(new InspectGameObjectCommand(container));
    }
}