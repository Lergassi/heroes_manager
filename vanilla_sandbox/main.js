// console.log("Current directory:", __dirname);
// console.log("Current directory:", process.cwd());

import sum from './sum.cjs';

testSum();

function testSum() {
    console.log(sum(1, 2));
}