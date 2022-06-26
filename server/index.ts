//node modules
import http from 'http';
import path from 'path';

//external modules
import finalhandler from 'finalhandler';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';
import Bottle from 'bottlejs';

//project modules
import config from './config/main.js';
import Router from './source/Router.js';
import {HttpMethod} from './source/Http.js';

console.log('SYSTEM', 'Server init start.');

let bottle = new Bottle();

bottle.factory('config', function (container) {
    return config;
});

bottle.factory('router', function (container) {
    return new Router(bottle, path.resolve(container.config.projectDir, 'server/app/Controllers'));
});

let router: Router = bottle.container.router;

router.get('/game/', 'SiteControllers/MainSiteController:homepage')
router.get('/game/about', 'SiteControllers/MainSiteController:about');
router.map([HttpMethod.GET], '/game/help', 'SiteControllers/MainSiteController:help');
router.get('/game/admin', 'AdminControllers/MainAdminController:homepage');
router.map([HttpMethod.GET], '/game/test/router/callback', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('this is test router.map with callback');
});

const server = http.createServer((req, res) => {
    let done = finalhandler(req, res, {
        env: bottle.container.config.env,
    });

    try {
        router.run(req, res);
    } catch (error) {
        console.log('ERROR', 'requestListener', error);
        done(error);
    }
})//end http.createServer

server.listen(config.port, () => {
    console.log('LOG', sprintf('Server running at port %s', config.port));
    console.log(_.repeat('-', 32));
});//end listen

console.log('SYSTEM', 'Server init end.');