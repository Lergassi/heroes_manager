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
import ServerContainerConfigure from './app/ContainerConfigure.js';
import CoreContainerConfigure from './../core/app/ContainerConfigure.js';
import url from 'url';

debug('http')('Server init start.');

const container = new Container();
(new ServerContainerConfigure()).configure(container);
(new CoreContainerConfigure()).configure(container);
// debug('debug')(container);

const router: Router = container.get('router');

const server = http.createServer((req, res) => {
    let done = finalhandler(req, res, {
        env: container.get('config').env,
    });

    // console.log(req.url);
    req['getParams'] = url.parse(req.url, true).query;
    // req['getParams'] = 42;

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