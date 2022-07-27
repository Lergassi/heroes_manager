import Container from '../../core/source/Container.js';
import AbstractContainerConfigure from '../../core/source/AbstractContainerConfigure.js';
import GameConsole from '../../core/source/GameConsole/GameConsole.js';
import config from '../config/main.js';
import ContainerInterface from '../../core/source/ContainerInterface.js';

export default class ContainerConfigure extends AbstractContainerConfigure {
    configure(container: ContainerInterface): ContainerInterface {
        container.set<object>('config.client', config);
        // container.set('config.client', (container) => {
        //     return config;
        // });
        container.set<GameConsole>('client.gameConsole', (container) => {
            return new GameConsole();
        });
        container.set('gameConsole', container.get<GameConsole>('client.gameConsole'));    //alias

        console.log('Создание ContainerConfigure на клиенте завершено.');

        return container;
    }
}