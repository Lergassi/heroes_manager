//node modules
import http from 'http';
import path from 'path';

//external modules
// import debugFactory from 'debug';
import debug from 'debug';
// const debug = debugFactory('http');
import finalhandler from 'finalhandler';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';

//project modules
import config from './config/main.js';
import Router from './source/Router.js';
import {HttpMethod} from './source/Http.js';
import Container from '../core/source/Container.js';

debug('http')('Server init start.');

//region container
const container = new Container();

//todo: Временно.
container.set('config', (container) => {
    return config;
});
container.set('router', (container) => {
    return new Router(container, path.resolve(container.get('config').projectDir, 'server/app/Controllers'));
});

let router: Router = container.get('router');

router.prefix('/game', (group) => {
    group.get('/', 'SiteControllers/MainSiteController:homepage');
    group.get('/about', 'SiteControllers/MainSiteController:about');
    group.map([HttpMethod.GET], '/help', 'SiteControllers/MainSiteController:help');
    group.get('/admin', 'AdminControllers/MainAdminController:homepage');

    //debug
    group.prefix('/debug',(group) => {
        group.get('/router', (req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end('/debug/router');
            router.debug();
        });
    });

    //test
    group.prefix('/test',(group) => {
        group.get('/router/callback', (req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end('this is test router.map with callback');
        });
    });
});
//endregion container

const server = http.createServer((req, res) => {
    let done = finalhandler(req, res, {
        env: container.get('config').env,
    });

    try {
        router.run(req, res);
    } catch (error) {
        // console.log('ERROR', 'requestListener', error);
        debug('error')('requestListener', error);
        done(error);
    }
})//end http.createServer

server.listen(config.port, () => {
    debug('http')(sprintf('Server running at port %s', config.port));
    debug('http')(_.repeat('-', 32));
});//end listen

debug('http')('Server init end.');