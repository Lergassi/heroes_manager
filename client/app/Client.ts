import Container from '../../core/source/Container.js';
import DefaultContainerConfigure from '../../core/app/Services/ContainerConfigures/DefaultContainerConfigure.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import ClientContainerConfigure from './ClientContainerConfigure.js';
import CoreContainerConfigure from '../../core/app/Services/ContainerConfigures/CoreContainerConfigure.js';
import GameUI from '../public/GameUI.js';
import debug from 'debug';
import _ from 'lodash';
import {DebugNamespaceID} from '../../core/types/enums/DebugNamespaceID.js';

export default class Client {
    async run() {
        let container = new Container();

        (new DefaultContainerConfigure()).configure(container);
        (new ClientContainerConfigure()).configure(container);
        (new CoreContainerConfigure()).configure(container);

        debug(DebugNamespaceID.Log)('Создание клиенте завершено (index.js).');

        let gameUI = new GameUI(container);
        container.set<GameUI>(ServiceID.UI_Game, gameUI);

        gameUI.buildPreGameUI();
    }
}