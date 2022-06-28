/// <reference path="Point.ts" />
/// <reference path="TestNamespace/ClassA.ts" />
// import ClassC from './ClassC.js';
// import dotenv from 'dotenv';
// import dotenv from 'dotenv/config.js';
// dotenv.config();
// dotenv;

import Route from '../server/source/Route.js';
import {HttpMethod} from '../server/source/Http.js';
import * as url from 'url';
import MainSiteController from '../server/app/Controllers/SiteControllers/MainSiteController.js';
import {lowerFirst} from 'lodash';
import Controller from '../server/source/Controller.js';
import AppError from '../core/source/AppError.js';
import {stringify} from 'querystring';
import Bottle from 'bottlejs';
import Container from '../core/source/Container.js';
// import testNamespace = TestNamespace;
// import * as testNamespace from './TestNamespace/ClassA.js';
// import polygons = TestNamespace.Polygons;

// console.log(testNamespace);
// console.log(TestNamespace);
// console.log(polygons);
// import * as ClassA from './TestNamespace/ClassA.js';
import debug from 'debug';
// import createDebug from 'debug';

// const debugHttp = debug('http');

// raw

namespace Test {
    export class Point {
        _x: number;
        _y: number;

        constructor(x: number, y: number) {
            this._x = x;
            this._y = y;
        }
    }
}

// class Point {
//     _x: number;
//     _y: number;
//
//     constructor(x: number = 0, y: number = 0) {
//         this._x = x;
//         this._y = y;
//     }
// }

//
// const pt = new Point();
// pt.x = 0;
// pt.y = 0;
// console.log(pt);

// testTypeScriptClassesGetStarted();
// testTypes('this is string', () => {
//     console.log('this is callback');
// });

class Weapon {
    private _name: string;
    private _power: number;

    // constructor(name, power) {
    constructor() {
        this._name = '';
        this._power = 0;
    }
}

class Hero {
    private _id: number;
    private _name: string;
    private _heroClass: string;
    private _weapon: Weapon;
    private _level: number;

    constructor(name: string, heroClass: string, weapon: Weapon, level: number = 1) {
    // constructor(weapon: Weapon) {
        this._id = Math.random();
        this._name = name;
        this._heroClass = heroClass;
        this._weapon = weapon;
        this._level = level;
        // this._name = '';
        // this._heroClass = '';
        // this._weapon = weapon;
        // this._level = 0;
    }
}

// function Hero(name: string, heroClass: string, level: number = 1) {
//     this._name = name;
//     this._heroClass = heroClass;
//     this._level = level;
// }

// function Hero(...any: any[]): any {
//
// }

//includes
// enum HttpMethod {
//     GET = 'GET',
//     HEAD = 'HEAD',
//     POST = 'POST',
//     PUT = 'PUT',
//     DELETE = 'DELETE',
//     CONNECT = 'CONNECT',
//     OPTIONS = 'OPTIONS',
//     TRACE = 'TRACE',
//     PATCH = 'PATCH',
// }

//functions
// devRoute();
// devHttpMethodTypes();
// testUrl();
// testNewUrl();
// testDotenv();
// testCreateControllers();
// testDynamicInstance();
// testNamespaceFunction();
// bottleGetStarted();
// bottleTestAccess();
// containerGetStarted();
debugGetStarted();

function testTypeScriptClassesGetStarted() {
    // let classC = new ClassC('hello');
    // console.log(classC);
    // console.log(classC.name);
}

function testTypes(name: string, callback: () => void) {
    console.log(name);
    callback();
}

function devRoute() {
    let route = new Route([HttpMethod.GET], '/about', (req, res) => {
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'text/html');
        // res.end('this is route: "GET: /about"');
        console.log('this is route: "GET: /about"');
    });

    route.run({}, {});
}

function devHttpMethodTypes() {
    // let method: Method = Method.GET;
    // console.log(method);
    let methods: Array<HttpMethod> = [HttpMethod.GET];
    methods.push(HttpMethod.GET);
    methods.push(HttpMethod.POST);
    methods.push(HttpMethod.CONNECT);
    console.log(methods);
    console.log(methods.indexOf(HttpMethod.GET));
    console.log(methods.indexOf(HttpMethod.CONNECT));
    console.log(methods.indexOf(HttpMethod.PUT));

    enumTest2([HttpMethod.GET]);

    // enumTest(method);
    // enumTest('asd');
}

function enumTest(method: HttpMethod) {
    console.log('enumTest: ' + method);
}

function enumTest2(methods: Array<HttpMethod>) {
    console.log('enumTest2', methods);
}

function testUrl() {
    let u = '/about';
    // let u = '/about?foo=bar&arr[0]=10';
    let urlParsed = url.parse(u, true).query;
    console.log(urlParsed);
    // console.log(urlParsed.foo);
}

function testNewUrl() {
    let host = 'heroes.sd44.ru';
    let protocol = 'http://';

    // let path = '/about';
    let path = '/about?foo=bar&arr[0]=10';

    // let myUrl = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash\'');
    // let myUrl = new URL('http://heroes.sd44.ru');
    // let myUrl = new URL(path, protocol + host);
    let myUrl = new URL(path, host);
    console.log(myUrl);
    console.log(myUrl.href);
    console.log(myUrl.searchParams);
    // console.log(myUrl.searchParams);
    console.log(myUrl.searchParams['foo']);
    console.log(myUrl.searchParams.get('foo'));

    const newSearchParams = new URLSearchParams(myUrl.searchParams);
    console.log(myUrl.href);
}

function testDotenv() {
    config();
    console.log(process.env.APP_ENV);
}

function testCreateControllers() {
    // let container = new Container();
    // let mainSiteController = new MainSiteController(container);
    // console.log(mainSiteController);
    // console.log(mainSiteController['homepage']);
    // console.log(mainSiteController['homepage1']);
    // mainSiteController['homepage']();
    // mainSiteController.homepage();

    // console.log(imports);
    // console.log(imports.a);
    // console.log(imports.modules['SiteControllers/MainSiteController']);

    // let c = new imports.modules['SiteControllers/MainSiteController'](container);
    // console.log(c);
    // c.homepage('asd');
}

// namespace TestNamespacePoint {
//     let p: any = new (<any>TestNamespacePoint)['Point'](42, 42);
//     console.log(p);
// }

// let p: any = new (<any>TestNamespacePoint)['Point'](42, 42);
// console.log(p);

// let p = new TestNamespacePoint.Point();

function testDynamicInstance() {
    // let p = new Point(42, 42);
    // let p = new (<any>window)'Point'(42, 42);
    // console.log(p);

    //let p: any = new (<any>MyNamespace)[classNameString](parametersIfAny);
    // let p: any = new (<any>Test)['Point'](42, 42);
    // console.log(p);
}

function testNamespaceFunction() {
    // let p = new Test.Point(42, 42);
    // console.log(p);

    // let a = new TestNamespace.ClassA();
    // let a = new ClassA.TestNamespace.ClassA();
    // console.log(a);
    // console.log(ClassA);
}

function makeDate(timestamp: number): Date;
// function makeDate(timestamp: number, d: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
    // console.log(m);
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    } else {
        return new Date(mOrTimestamp);
    }
}

// makeDate(123)
// console.log(makeDate(12345678));
// console.log(makeDate(5, 5, 5));
// console.log(makeDate(1, 3));

function map(httpMethods: Array<HttpMethod>, pattern: string, target: (req, res) => void): void;
function map(httpMethods: Array<HttpMethod>, pattern: string, target: string): void;
function map(httpMethods: Array<HttpMethod>, pattern: string, target: string | ((req, res) => void)): void {
    console.log(target);
    if (typeof target === 'function') {
        console.log('callback');
    } else {
        console.log('method');
    }
}

// map([HttpMethod.GET], '/', ({}, {}) => {
//     console.log('this is map define');
// });
// map([HttpMethod.GET], '/', MainSiteController, 'homepage');
// map([HttpMethod.GET], '/', 'MainSiteController', 'homepage');
// map([HttpMethod.GET], '/', 'MainSiteController:homepage');

function testCallbackArgument(number): number;
function testCallbackArgument(number: number, callback: (value: number) => number): number;
function testCallbackArgument(number: number, numberOrCallback?: (value: number) => number): number {
    // console.log(number);
    // console.log(numberOrCallback);
    if (typeof numberOrCallback === 'function') {
        return numberOrCallback(number);
    } else {
        return number;
    }

    // throw new AppError(42);
}

// console.log(testCallbackArgument(100));
// console.log(testCallbackArgument(100, (value: number): number => {
//     return value * value;
// }));

// let r = testCallbackArgument((value: number) => {
//     return value * value;
// });
// console.log(r);

function bottleGetStarted() {
    // let warrior = new Hero('warrior', 'warrior', 42);
    // let warrior = new Hero();
    // console.log(warrior);

    let bottle = new Bottle();
    bottle.service('Weapon', Weapon);
    bottle.service('Weapon', Weapon);
    bottle.service('Weapon', Weapon);
    bottle.service('Weapon', Weapon);
    console.log(bottle.container);
    // console.log(bottle.container.Weapon);
    // bottle.service('Hero', Hero, 'Weapon');
    // bottle.factory('Hero', function (container) {
    //     let weapon = container.Weapon;
    //
    //     return new Hero('this is name', 'warrior', weapon, 1);
    // });
    // let tavernConstructor = function (container) {
    //     console.log('inner bottle', bottle.container === container);
    //     console.log('container', container);
    //     return new Hero('name', 'warrior', container.Weapon, 1);
    //     // return container;
    // };
    // bottle.instanceFactory('Hero.tavern', tavernConstructor);
    bottle.instanceFactory('Hero.Tavern', function (container) {
        console.log('inner container equal', bottle.container === container);
        console.log('inner container', container);
        return new Hero('name', 'warrior', container.Weapon, 1);
        // return container;
    });
    console.log(bottle.container);

    let container = bottle.container;

    // let tavern = bottle.container.HeroTavern;
    let tavern = bottle.container.Hero.Tavern;
    console.log('tavern', tavern);
    console.log(tavern.instance());
    // console.log(tavern.instance());
    // console.log(tavern.instance());
    console.log(bottle.container);
    let weapon = bottle.container.Weapon;
    console.log(weapon);
    // console.log(bottle.container.Weapon);
    // console.log(bottle.container.Hero);
    // let warrior = new bottle.container.Hero();
    // console.log(warrior);
}

function bottleTestAccess() {
    let bottle = new Bottle();

    let container = bottle.container;
    console.log(container);
}


function containerGetStarted() {
    const container = new Container();

    // container.set('test.foo', 'bar');
    // container.set('test.hero', {name: 'Hero', heroClass: 'warrior', level: 42});
    container.set('test.this_is_function_service', (container) => {
    // container.set('test.this_is_function_service', (container) => {
        return {
            one: 'one',
            two: 'two',
            hero: container.get('test.hero'),
        };
    });
    console.log(container);
    // console.log(container.get('test.hero'));
    // console.log(container.get('test.this_is_function_service'));
    // container.get('test.hero').name = 'aaaa';
    // console.log(container.get('test.hero'));
    // console.log(container.get('test.this_is_function_service'));
}

type DescribableFunction = {
    description: string;
    // value: number;
    (someArg: number): boolean;
};

// let a: DescribableFunction = (a: number): boolean => {
//     return false;
// };
// let a: DescribableFunction = <DescribableFunction>function (n: number): boolean {
//
// }

function doSomething(fn: DescribableFunction) {
    // fn.
    console.log(fn.description + " returned " + fn(6));
    // console.log(fn.value);
}

// function f(n: number): boolean {
//     this.description = 'asd';
//     return false;
// }

const myFn = function (someArg: number): boolean {
    return someArg > 5;
};
myFn.description = 'checks if arg is greater than 5';
// console.log(myFn);
// console.log(myFn(6));

// const d: DescribableFunction = {
//     description: 'asd',
//     f: function (n: number): boolean {
//         return false;
//     }
// };
// doSomething(f);
// doSomething(<DescribableFunction>myFn);
// doSomething(myFn);

// type GreetFunction = (a: string) => void;
type GreetFunction = (a: string, a1: string) => void;
// function greeter(fn: (a: string) => void) {
function greeter(fn: GreetFunction) {
    fn("Hello, World", 'a');
    // fn("Hello, World", '');
}

function printToConsole(s: string) {
// function printToConsole(s: string, a: string) {
    console.log('#printToConsole#', s);
    // console.log('#printToConsole#', s, s2);
}

// greeter(printToConsole);

type Point = {
    x: number;
    y: number;
    // (someArg: number): boolean;
    (someArg: number): boolean;
};

// let p: Point = {x: 10, y: 10, fun: function (n: number): boolean {
//         return false;
//     }};

function debugGetStarted() {
    // console.log('DEBUG', process.env.DEBUG);
    // debug.enable('app');
    // console.log(debug.debug);
    // console.log();
    // debug.log(42)
    // let d = debug('booting %o', 42);
    // let debug = createDebug('foo');
    // debug('booting %o', 42);

    // let error = debug('app:error');
    // error('goes to stderr!');

    let app = debug('app');
    app('booting %o', 42);
    app(42);
}