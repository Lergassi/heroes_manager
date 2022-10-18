import ContainerConfigureInterface from '../source/ContainerConfigureInterface.js';
import ContainerInterface from '../source/ContainerInterface.js';
import GameConsole from '../source/GameConsole/GameConsole.js';
import Kernel from '../source/Kernel.js';
import HelpCommand from '../../server/app/Commands/HelpCommand.js';
import ListCommand from '../../server/app/Commands/ListCommand.js';
import NewGameCommand from './Commands/NewGameCommand.js';
import CreateStartPlayerObjectsCommand from './Commands/CreateStartPlayerObjectsCommand.js';
import AddItemCommand from './Commands/AddItemCommand.js';
import CreateHeroCommand from './Commands/CreateHeroCommand.js';
import CreateItemStorageCommand from './Commands/CreateItemStorageCommand.js';
import EquipCommand from './Commands/EquipCommand.js';
import RemoveEquipCommand from './Commands/RemoveEquipCommand.js';
import DebugEntitiesCommand from './Commands/DebugCommands/DebugEntitiesCommand.js';
import DebugContainerCommand from '../../server/app/Commands/DebugCommands/DebugContainerCommand.js';
import InspectGameObjectCommand from './Commands/DebugCommands/InspectGameObjectCommand.js';
import DebugUserEnvironmentCommand from '../../server/app/Commands/DebugCommands/DebugUserEnvironmentCommand.js';
import DebugPlayerEnvironmentCommand from './Commands/DebugCommands/DebugPlayerEnvironmentCommand.js';
import DebugGameObjectStorageCommand from './Commands/DebugCommands/DebugGameObjectStorageCommand.js';
import DeleteHeroCommand from './Commands/DeleteHeroCommand.js';
import CreatePlayerEnvironmentCommand from './Commands/CreatePlayerEnvironmentCommand.js';
import CreateLocationCommand from './Commands/CreateLocationCommand.js';
import AddHeroToLocationCommand from './Commands/AddHeroToLocationCommand.js';
import RemoveHeroFromLocationCommand from './Commands/RemoveHeroFromLocationCommand.js';
import DeleteLocationCommand from './Commands/DeleteLocationCommand.js';
import ToggleLocationCommand from './Commands/ToggleLocationCommand.js';
import GetItemsFromLocationCommand from './Commands/GetItemsFromLocationCommand.js';
import ClearItemStorageSlotCommand from './Commands/ClearItemStorageSlotCommand.js';
import CreateHeroKitCommand from './Commands/CreateHeroKitCommand.js';

export default class DefaultContainerConfigure implements ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        container.set<GameConsole>('gameConsole', (container) => {
            return new GameConsole();
        });
        // container.set('gameConsole', container.get<GameConsole>('server.gameConsole'));    //alias
        container.set<Kernel>('kernel', (container) => {
            return new Kernel(container);
        });

        this._gameConsoleConfigure(container);

        return container;
    }

    private _gameConsoleConfigure(container: ContainerInterface) {
        let gameConsole: GameConsole = container.get<GameConsole>('gameConsole');

        gameConsole.register(new HelpCommand(container));
        gameConsole.register(new ListCommand(container));

        /* GAME */
        gameConsole.register(new NewGameCommand(container));
        gameConsole.register(new CreatePlayerEnvironmentCommand(container));
        gameConsole.register(new CreateStartPlayerObjectsCommand(container));

        gameConsole.register(new CreateItemStorageCommand(container));
        gameConsole.register(new AddItemCommand(container));
        gameConsole.register(new ClearItemStorageSlotCommand(container));

        gameConsole.register(new CreateHeroCommand(container));
        gameConsole.register(new DeleteHeroCommand(container));
        gameConsole.register(new CreateHeroKitCommand(container));

        gameConsole.register(new EquipCommand(container));
        gameConsole.register(new RemoveEquipCommand(container));

        gameConsole.register(new CreateLocationCommand(container));
        gameConsole.register(new DeleteLocationCommand(container));
        gameConsole.register(new AddHeroToLocationCommand(container));
        gameConsole.register(new RemoveHeroFromLocationCommand(container));
        gameConsole.register(new ToggleLocationCommand(container));
        gameConsole.register(new GetItemsFromLocationCommand(container));

        /* DEBUG */
        gameConsole.register(new DebugEntitiesCommand(container));
        gameConsole.register(new DebugContainerCommand(container));
        gameConsole.register(new DebugGameObjectStorageCommand(container));
        gameConsole.register(new InspectGameObjectCommand(container));

        gameConsole.register(new DebugUserEnvironmentCommand(container));
        gameConsole.register(new DebugPlayerEnvironmentCommand(container));
    }
}