/**
 * node modules
 */
import http from 'http';

/**
 * external modules
 */
import finalhandler from 'finalhandler';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';

/**
 * project modules
 */
import config from './config/main.js';
import Router from './source/Router.js';
import Container from '../core/source/Container.js';
import ServerContainerConfigure from './app/ServerContainerConfigure.js';
import CoreContainerConfigure from '../core/app/Services/ContainerConfigures/CoreContainerConfigure.js';
import url from 'url';
import DefaultContainerConfigure from '../core/app/Services/ContainerConfigures/DefaultContainerConfigure.js';
import {DebugNamespaceID} from '../core/types/enums/DebugNamespaceID.js';
import DebugApp from '../core/app/Services/DebugApp.js';

DebugApp.debug(DebugNamespaceID.Log)('Запуск инициализации сервера.');

let container = new Container();

(new DefaultContainerConfigure()).configure(container);
(new ServerContainerConfigure()).configure(container);
(new CoreContainerConfigure()).configure(container);

const router = container.get<Router>('server.router');

const server = http.createServer(async (req, res) => {
    let done = finalhandler(req, res, {
        env: container.get<object>('server.config')['env'],
    });

    req['getParams'] = url.parse(req.url, true).query;

    try {
        await router.run(req, res);
    } catch (error) {
        DebugApp.debug(DebugNamespaceID.Error)('requestListener', error);
        done(error);
    }
})//end http.createServer

server.listen(config.port, () => {
    DebugApp.debug(DebugNamespaceID.Log)(sprintf('Сервер запущен на порте %s.', config.port));
    DebugApp.debug(DebugNamespaceID.Log)(_.repeat('-', 32));
});//end listen

DebugApp.debug(DebugNamespaceID.Log)('Завершение инициализации сервера.');