import ContainerConfigureInterface from '../../core/source/ContainerConfigureInterface.js';
import config from '../config/main.js';
import ContainerInterface from '../../core/source/ContainerInterface.js';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import {DebugNamespaceID} from '../../core/types/enums/DebugNamespaceID.js';

export default class ClientContainerConfigure implements ContainerConfigureInterface {
    configure(container: ContainerInterface): ContainerInterface {
        container.set<object>('config.client', config);
        // container.set('config.client', (container) => {
        //     return config;
        // });
        // container.set<GameConsole>('client.gameConsole', (container) => {
        //     return new GameConsole();
        // });
        // container.set('gameConsole', container.get<GameConsole>('client.gameConsole'));    //alias

        debug(DebugNamespaceID.Log)(sprintf('Конфигурация %s завершена.', this.constructor.name));

        return container;
    }
}