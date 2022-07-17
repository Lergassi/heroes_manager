import _ from 'lodash';

// // const isBelowThreshold = (currentValue) => currentValue < 10;
// const isBelowThreshold = (currentValue) => {
//     return currentValue === true;
// };
//
// // const array1 = [1, 30, 39, 29, 10, 13];
// const array1 = [true, true, true];
// // const array1 = [true, true, true, false];
//
// console.log(array1.every(isBelowThreshold));

// console.log(_.every([true, 1, null, 'yes'], Boolean));
// console.log(_.every([true, 1, 'yes'], Boolean));
// console.log(_.every([true, 1, 'yes', 'Hello, World!'], Boolean));
// console.log(_.every([true, true, true], Boolean));
// console.log(_.every([true, true, true, false], Boolean));

// let result = _.every([true, true, true], (a, b, c) => {
let result = _.every([true, true, true, false], (a, b, c) => {
    console.log(a, b, c);
    return a === true;
});
console.log('result', result);

// => false

var users = [
    { 'user': 'barney', 'age': 36, 'active': false },
    { 'user': 'fred',   'age': 40, 'active': false }
];

// The `_.matches` iteratee shorthand.
// _.every(users, { 'user': 'barney', 'active': false });
// => false

// The `_.matchesProperty` iteratee shorthand.
// _.every(users, ['active', false]);
// => true

// The `_.property` iteratee shorthand.
// _.every(users, 'active');
// => false