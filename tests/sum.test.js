import TestObject from '../sandbox/TestObject.js';
import sum from '../vanilla_sandbox/sum.js';
// const sum = require('../vanilla_sandbox/sum.cjs');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('adds 5 + 5 to equal 10', () => {
    expect(sum(5, 5)).toBe(10);
});

test('adds 5 + 5 not to equal 11', () => {
    expect(sum(5, 5)).not.toBe(11);
});

test('TestObject: adds 1 + 2 not to equal 3', () => {
    let testObject = new TestObject();
    expect(testObject.sum(1, 2)).toBe(3);
});