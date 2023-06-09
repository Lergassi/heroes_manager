import ContainerConfigureInterface from '../../../source/ContainerConfigureInterface.js';
import ContainerInterface from '../../../source/ContainerInterface.js';
import GameConsole from '../../../source/GameConsole/GameConsole.js';
import HelpCommand from '../../../../server/app/Commands/HelpCommand.js';
import ListCommand from '../../../../server/app/Commands/ListCommand.js';
import CreateDefaultStartPlayerObjectsCommand
    from '../../Commands/NewGameScenariosCommands/CreateDefaultStartPlayerObjectsCommand.js';
import DetailHeroCommand from '../../Commands/DetailHeroCommand.js';
import DetailLocationCommand from '../../Commands/DetailLocationCommand.js';
import NewGameCommand from '../../Commands/NewGameCommand.js';
import CreateAllContentStartPlayerObjectsCommand
    from '../../Commands/NewGameScenariosCommands/CreateAllContentStartPlayerObjectsCommand.js';
import CreateItemCommand from '../../Commands/CreateItemCommand.js';
import CreateHeroCommand from '../../Commands/CreateHeroCommand.js';
import CreateItemStorageCommand from '../../Commands/CreateItemStorageCommand.js';
import EquipCommand from '../../Commands/EquipCommand.js';
import RemoveEquipCommand from '../../Commands/RemoveEquipCommand.js';
import DebugEntityManagerCommand from '../../Commands/DebugCommands/DebugEntityManagerCommand.js';
import DebugContainerCommand from '../../../../server/app/Commands/DebugCommands/DebugContainerCommand.js';
import InspectGameObjectCommand from '../../Commands/DebugCommands/InspectGameObjectCommand.js';
import DebugUserEnvironmentCommand from '../../../../server/app/Commands/DebugCommands/DebugUserEnvironmentCommand.js';
import DebugPlayerEnvironmentCommand from '../../Commands/DebugCommands/DebugPlayerEnvironmentCommand.js';
import DebugGameObjectStorageCommand from '../../Commands/DebugCommands/DebugGameObjectStorageCommand.js';
import DeleteHeroCommand from '../../Commands/DeleteHeroCommand.js';
import CreatePlayerEnvironmentCommand from '../../Commands/CreatePlayerEnvironmentCommand.js';
import CreateLocationCommand from '../../Commands/CreateLocationCommand.js';
import AddHeroToLocationCommand from '../../Commands/AddHeroToLocationCommand.js';
import RemoveHeroFromLocationCommand from '../../Commands/RemoveHeroFromLocationCommand.js';
import DeleteLocationCommand from '../../Commands/DeleteLocationCommand.js';
import ToggleLocationCommand from '../../Commands/ToggleLocationCommand.js';
import GetRewardFromLocationCommand from '../../Commands/GetRewardFromLocationCommand.js';
import ClearItemStorageSlotCommand from '../../Commands/ClearItemStorageSlotCommand.js';
import CreateAllHeroClassesCommand from '../../Commands/CreateAllHeroClassesCommand.js';
import FightCommand from '../../Commands/FightCommand.js';
import ResurrectHeroCommand from '../../Commands/ResurrectHeroCommand.js';
import KillHeroCommand from '../../Commands/KillHeroCommand.js';
import CreateRandomHeroClassCommand from '../../Commands/CreateRandomHeroClassCommand.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import debug from 'debug';
import _ from 'lodash';
import CreateItemKitCommand from '../../Commands/CreateItemKitCommand.js';
import {ServiceID} from '../../../types/enums/ServiceID.js';
import AddMoneyCommand from '../../Commands/AddMoneyCommand.js';
import DebugItemsCommand from '../../Commands/DebugCommands/DebugItemsCommand.js';
import CreateStubObjectsCommand from '../../Commands/CreateStubObjectsCommand.js';
import CreateDemoStartPlayerObjectsCommand
    from '../../Commands/NewGameScenariosCommands/CreateDemoStartPlayerObjectsCommand.js';
import CreateBasicStartPlayerObjectsCommand
    from '../../Commands/NewGameScenariosCommands/CreateBasicStartPlayerObjectsCommand.js';
import DebugApp from '../DebugApp.js';

export default class DefaultContainerConfigure implements ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        // let _console = console;
        // console.log = console.log.bind(console);
        // console.log = (...data: any[]) => {
        //     _console.log(...data);
        // }

        //@indev
        DebugApp.container = container;

        //todo: Сделать разный источник для клиента и сервера. Вынести за пределы контейнера.
        let debugNamespaces = [
            DebugNamespaceID.Log,
            DebugNamespaceID.Info,
            DebugNamespaceID.Warning,
            DebugNamespaceID.Error,
            // DebugNamespaceID.Load,
            // DebugNamespaceID.DebugLog,
            // DebugNamespaceID.Dump,
            // DebugNamespaceID.DebugAssertThrow,
            DebugNamespaceID.Throw,
            DebugNamespaceID.Replace,
            DebugNamespaceID.Indev,
            DebugNamespaceID.Debug,
            // 'debug:*',
            // 'error:*',
            // 'log:*',

            // DebugNamespaceID.GameConsole,
            // DebugNamespaceID.EventSystem,
        ];
        debug.enable(_.join(debugNamespaces, ','));
        // debug(DebugNamespaceID)();

        container.set<GameConsole>(ServiceID.GameConsole, (container) => {
            return new GameConsole();
        });
        // container.set('gameConsole', container.get<GameConsole>('server.gameConsole'));    //alias

        this._gameConsoleConfigure(container);

        return container;
    }

    private _gameConsoleConfigure(container: ContainerInterface) {
        let gameConsole: GameConsole = container.get<GameConsole>(ServiceID.GameConsole);

        gameConsole.register(new HelpCommand(container));
        gameConsole.register(new ListCommand(container));

        /* GAME */
        gameConsole.register(new NewGameCommand(container));
        gameConsole.register(new CreatePlayerEnvironmentCommand(container));
        gameConsole.register(new CreateAllContentStartPlayerObjectsCommand(container));
        gameConsole.register(new CreateDefaultStartPlayerObjectsCommand(container));
        gameConsole.register(new CreateDemoStartPlayerObjectsCommand(container));
        gameConsole.register(new CreateBasicStartPlayerObjectsCommand(container));

        gameConsole.register(new AddMoneyCommand(container));

        gameConsole.register(new CreateItemStorageCommand(container));
        gameConsole.register(new CreateItemCommand(container));
        gameConsole.register(new ClearItemStorageSlotCommand(container));
        gameConsole.register(new CreateItemKitCommand(container));

        gameConsole.register(new CreateHeroCommand(container));
        gameConsole.register(new DeleteHeroCommand(container));
        gameConsole.register(new KillHeroCommand(container));
        gameConsole.register(new ResurrectHeroCommand(container));
        gameConsole.register(new CreateAllHeroClassesCommand(container));
        gameConsole.register(new CreateRandomHeroClassCommand(container));

        gameConsole.register(new EquipCommand(container));
        gameConsole.register(new RemoveEquipCommand(container));

        gameConsole.register(new CreateLocationCommand(container));
        gameConsole.register(new DeleteLocationCommand(container));
        gameConsole.register(new AddHeroToLocationCommand(container));
        gameConsole.register(new RemoveHeroFromLocationCommand(container));
        gameConsole.register(new ToggleLocationCommand(container));
        gameConsole.register(new GetRewardFromLocationCommand(container));

        gameConsole.register(new FightCommand(container));

        /* STUB OBJECTS */
        gameConsole.register(new CreateStubObjectsCommand(container));

        /* UI */
        gameConsole.register(new DetailHeroCommand(container));
        gameConsole.register(new DetailLocationCommand(container));

        /* DEBUG */
        gameConsole.register(new DebugEntityManagerCommand(container));
        gameConsole.register(new DebugContainerCommand(container));
        gameConsole.register(new DebugGameObjectStorageCommand(container));
        gameConsole.register(new InspectGameObjectCommand(container));
        gameConsole.register(new DebugItemsCommand(container));

        gameConsole.register(new DebugUserEnvironmentCommand(container));
        gameConsole.register(new DebugPlayerEnvironmentCommand(container));
    }
}