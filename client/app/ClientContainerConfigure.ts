import ContainerConfigureInterface from '../../core/source/ContainerConfigureInterface.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import config from '../config/main.js';
import ContainerInterface from '../../core/source/ContainerInterface.js';
import {sprintf} from 'sprintf-js';
import {DebugNamespaceID} from '../../core/types/enums/DebugNamespaceID.js';
import UIUpdater from './UIUpdater.js';
import DebugApp from '../../core/app/Services/DebugApp.js';

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

        container.set(ServiceID.UI_Updater, new UIUpdater(container));

        DebugApp.debug(DebugNamespaceID.Log)(sprintf('Конфигурация %s завершена.', this.constructor.name));

        return container;
    }
}