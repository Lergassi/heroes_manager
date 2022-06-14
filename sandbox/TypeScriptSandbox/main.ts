// import * as path from 'path';
// let helloWorld = 'Hello, World!';
// let msg = 'this is sandbox/main';
// console.log(msg);

// import Foo from "./Foo";

// let foo = new Foo(helloWorld);
// console.log(foo);

import * as path from "path";

const sprintf = require('sprintf-js').sprintf,
    vsprintf = require('sprintf-js').vsprintf;
// import {sprintf, vsprintf} from 'sprintf-js';
// import sprintf from 'sprintf-js';

// import {sprintf, vsprintf} from 'sprintf-js';
// import sprintf = require('sprintf-js');

// import {TestImport} from "./TestImport";
import TestImport from "./TestImport";

// testImportRun();
testPath();
testSprintf();

function testSprintf() {
    let pattern = 'test sprintf: Hello, %s!';
    let result = sprintf(pattern, 'World');
    console.log(result);
}

function testPath() {
    console.log('test path: ' + path.join('/home', 'root'));
}

function testImportRun() {
    let testImport = new TestImport();
    let result = testImport.exp(10);
    console.log(result);
}