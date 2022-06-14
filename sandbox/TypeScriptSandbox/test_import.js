import TestImport from "./TestImport.js";
// import * as path from "path";
import { sprintf } from 'sprintf-js';
// import * as sprintf from 'sprintf-js';
// import * as path from "path";
import path from "path";
// import Vanilla from '../../vanilla/Vanilla.js';
// console.log(new Vanilla());
import serveStatic from "serve-static";
// import * as serveStatic from "serve-static";
// console.log('serveStatic', serveStatic);
testImportRun();
testPath();
testSprintf();
testServeStatic();
function testImportRun() {
    var testImport = new TestImport();
    var result = testImport.exp(32);
    console.log('test import: ' + result);
}
function testSprintf() {
    var pattern = 'test sprintf: Hello, %s!';
    var result = sprintf(pattern, 'World');
    // let result = sprintf.sprintf(pattern, 'World');
    console.log(result);
}
function testPath() {
    console.log('test path: ' + path.join('/home', 'root'));
}
function testServeStatic() {
    // console.log(serveStatic);
    // console.log('serveStatic', serveStatic);
    var publicDir = path.resolve('./client/public');
    var serve = serveStatic(publicDir, { index: ['index.html'] });
    console.log('test serveStatic end');
}
