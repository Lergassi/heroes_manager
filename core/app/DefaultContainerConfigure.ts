import ContainerConfigureInterface from '../source/ContainerConfigureInterface.js';
import ContainerInterface from '../source/ContainerInterface.js';
import GameConsole from '../source/GameConsole/GameConsole.js';

export default class DefaultContainerConfigure implements ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        container.set<GameConsole>('gameConsole', (container) => {
            return new GameConsole();
        });
        // container.set('gameConsole', container.get<GameConsole>('server.gameConsole'));    //alias

        return container;
    }
}