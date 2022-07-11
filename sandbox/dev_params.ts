import url from 'url';

let host = 'heroes.sd44.ru';
let protocol = 'http://';
// let path = '/about';
let query = 'foo=bar&arr[0]=10&arr[1]=20';
let path = '/about?' + query;

testUrl(query);
testUrl2(query);

function testUrl(str) {
    let queryParsed = url.parse(str, true).query;
    console.log(queryParsed);
    // console.log(queryParsed.foo);
}

function testUrl2(str) {
    let myUrl = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash\'');
    // let myUrl = new URL('https://user:pass@sub.example.com:8080/p/a/t' + path);
    // let myUrl = new URL('http://heroes.sd44.ru');
    // let myUrl = new URL(path, protocol + host);
    // let myUrl = new URL(path, host);
    // let myUrl = new URL(path, host);
    // console.log(myUrl);
    // console.log(myUrl.href);
    console.log(myUrl.searchParams);
    // // console.log(myUrl.searchParams);
    // console.log(myUrl.searchParams['foo']);
    // console.log(myUrl.searchParams.get('foo'));
    // const newSearchParams = new URLSearchParams(myUrl.searchParams);
    // console.log(myUrl.href);
}