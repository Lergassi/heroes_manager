/**
 * node modules
 */
import http from 'http';
import path from 'path';

/**
 * external modules
 */
import debug from 'debug';
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
import CoreContainerConfigure from '../core/app/CoreContainerConfigure.js';
import url from 'url';
import GameConsole from '../core/source/GameConsole/GameConsole.js';

debug('http')('Server init start.');

let container = new Container();

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
        debug('error')('requestListener', error);
        done(error);
    }
})//end http.createServer

server.listen(config.port, () => {
    debug('http')(sprintf('Server running at port %s', config.port));
    debug('http')(_.repeat('-', 32));
});//end listen

debug('http')('Server init end.');