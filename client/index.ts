// import {default} from '../core/data/test.json';
import data from '../core/data/test.json';
import ClassA from './ClassA.js';

console.log('Hello, World! (#client#/index.js)');

// console.log(data.default.foo);
console.log(data.foo);

let classA = new ClassA();
console.log('classA', classA);