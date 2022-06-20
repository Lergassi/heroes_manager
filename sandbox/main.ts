import ClassC from './ClassC.js';
import Route from '../server/source/Route.js';
import {Method} from '../server/source/Http.js';
import * as url from 'url';
import {config} from 'dotenv';

// raw

// class Point {
//     x: number;
//     y: number;
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
testDotenv();

function testTypeScriptClassesGetStarted() {
    let classC = new ClassC('hello');
    console.log(classC);
    console.log(classC.name);
}

function testTypes(name: string, callback: () => void) {
    console.log(name);
    callback();
}

function devRoute() {
    let route = new Route([Method.GET], '/about', (req, res) => {
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
    let methods: Array<Method> = [Method.GET];
    methods.push(Method.GET);
    methods.push(Method.POST);
    methods.push(Method.CONNECT);
    console.log(methods);
    console.log(methods.indexOf(Method.GET));
    console.log(methods.indexOf(Method.CONNECT));
    console.log(methods.indexOf(Method.PUT));

    enumTest2([Method.GET]);

    // enumTest(method);
    // enumTest('asd');
}

function enumTest(method: Method) {
    console.log('enumTest: ' + method);
}

function enumTest2(methods: Array<Method>) {
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