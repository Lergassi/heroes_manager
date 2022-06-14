import * as path from "path";
// import * as finalhandler from "finalhandler";
import * as http from "http";
// import * as serveStatic from "serve-static";
import serveStatic from 'serve-static';
import finalhandler from "finalhandler";
// import * as serveStatic from "serve-static";
// import * as finalhandler from "finalhandler";
// import path from "path";
// import finalhandler from "finalhandler";
// import http from "http";
// import serveStatic from "serve-static";
// const path = require('path');
// const finalhandler = require('finalhandler');
// const http = require('http');
// const serveStatic = require('serve-static')
var options = {
    host: 'heroes.sd44.ru',
    port: 80
};
var publicDir = path.resolve('./client/public');
// console.log(publicDir);
// console.log('serveStatic', serveStatic);
var serve = serveStatic(publicDir, { index: ['index.html'] });
var requestListener = function (req, res) {
    // let done = finalhandler(req, res);
    // done('error');
    // serve(req, res, done);
    serve(req, res, function () {
        finalhandler(req, res);
    });
    // serve(req, res, (): void => {
    //
    // });
};
var server = http.createServer(requestListener);
server.listen(options.port, options.host, function () {
    console.log('Server is running on http://' + options.host + ':' + options.port);
});
// res.statusCode = 200;
// res.setHeader('Content-Type', 'text/html');
// res.end('Hello, World!');
