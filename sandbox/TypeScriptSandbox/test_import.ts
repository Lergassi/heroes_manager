import TestImport from "./TestImport.js";
// import * as path from "path";
import {sprintf, vsprintf} from 'sprintf-js';
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
    let testImport = new TestImport();
    let result = testImport.exp(32);
    console.log('test import: ' + result);
}

function testSprintf() {
    let pattern = 'test sprintf: Hello, %s!';
    let result = sprintf(pattern, 'World');
    // let result = sprintf.sprintf(pattern, 'World');
    console.log(result);
}

function testPath() {
    console.log('test path: ' + path.join('/home', 'root'));
}

function testServeStatic() {
    // console.log(serveStatic);
// console.log('serveStatic', serveStatic);
    let publicDir = path.resolve('./client/public');
    let serve = serveStatic(publicDir, { index: ['index.html'] })
    console.log('test serveStatic end');
}