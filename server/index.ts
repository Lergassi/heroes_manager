//node modules
import http from 'http';

//external modules
import finalhandler from 'finalhandler';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';

//project modules
import dotenv from 'dotenv';
import config from './config/main.js';  //todo: Временно.
import Router from './source/Router.js';
import {Method} from './source/Http.js';

console.log('SYSTEM', 'Server init start.');

dotenv.config();

let router = new Router();
router.map([Method.GET], '/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('this is router.map');
});

const server = http.createServer((req, res) => {
    let done = finalhandler(req, res, {
        env: process.env.APP_ENV,
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