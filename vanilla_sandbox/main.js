// console.log("Current directory:", __dirname);
// console.log("Current directory:", process.cwd());

import sum from './sum.cjs';

const arrowFunction = (value) => {
    console.log(this);
    return value * value;
}

const arrowFunctionConstructor = (value) => {
    // return {};
    this._value = value;

    // return function () {
    //
    // }

    return value * value;
}

let func = function(value) {
    this._value = value;
    // return value * value;
};

// testSum();
testArrowFunction();

function testSum() {
    console.log(sum(1, 2));
}

function testArrowFunction() {
    console.log(arrowFunction(42));

    // let o = new arrowFunctionConstructor(42);
    // let o = arrowFunctionConstructor(42);
    // console.log(o);

    // console.log(func(42));
    // let f = new func(42);
    // console.log(f);
}