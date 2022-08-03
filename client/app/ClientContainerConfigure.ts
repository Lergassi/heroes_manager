import ContainerConfigureInterface from '../../core/source/ContainerConfigureInterface.js';
import GameConsole from '../../core/source/GameConsole/GameConsole.js';
import config from '../config/main.js';
import ContainerInterface from '../../core/source/ContainerInterface.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';

export default class ClientContainerConfigure extends ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        container.set<object>('config.client', config);
        // container.set('config.client', (container) => {
        //     return config;
        // });
        container.set<GameConsole>('client.gameConsole', (container) => {
            return new GameConsole();
        });
        container.set('gameConsole', container.get<GameConsole>('client.gameConsole'));    //alias

        debug('client:log')(sprintf('Конфигурация %s завершена.', this.constructor.name));

        return container;
    }
}