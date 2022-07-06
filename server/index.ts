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
import ContainerConfigure from './app/ContainerConfigure.js';

debug('http')('Server init start.');

const container: Container = (new ContainerConfigure()).configure(new Container());
const router: Router = container.get('router');

const server = http.createServer((req, res) => {
    let done = finalhandler(req, res, {
        env: container.get('config').env,
    });

    try {
        router.run(req, res);
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