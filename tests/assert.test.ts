import {assert, assertInRange, assertIsMaxLength, assertIsMinLength} from '../core/source/assert.js';

test('assert basic', () => {
    expect(() => {
        assert(true);
    }).not.toThrow('Assertion failed.');
    expect(() => {
        assert(false);
    }).toThrow('Assertion failed.');
});

describe.each([
    [[1, 2, 3], 3],
    [[1, 2, 3, 4], 3],
])('assertMinLength valid', (array, expectLength) => {
    test('assertMinLength not.toThrow', () => {
        expect(() => {
            assertIsMinLength(array as number[], expectLength as number);
        }).not.toThrow();
    });
});

describe.each([
    [[], 3],
    [[1], 3],
    [[1, 2], 3],
])('assertMinLength invalid', (array, expectLength) => {
    test('assertMinLength toThrow', () => {
        expect(() => {
            assertIsMinLength(array as number[], expectLength as number);
        }).toThrow();
    });
});

describe.each([
    [[], 3],
    [[1], 3],
    [[1, 2], 3],
    [[1, 2, 3], 3],
])('assertMaxLength valid', (array, expectLength) => {
    test('assertMaxLength not.toThrow', () => {
        expect(() => {
            assertIsMaxLength(array as number[], expectLength as number);
        }).not.toThrow();
    });
});

describe.each([
    [[1, 2, 3, 4], 3],
])('assertMaxLength invalid', (array, expectLength) => {
    test('assertMaxLength toThrow', () => {
        expect(() => {
            assertIsMaxLength(array as number[], expectLength as number);
        }).toThrow();
    });
});

describe.each([
    [0,0,0],
    [0,1,1],
    [0,0,1],
    [1,1,1],
    [1,2,3],
    [1,1,3],
    [1,3,3],
])('assertInRange valid', (min, value, max) => {
    test('assertInRange not.toThrow', () => {
        expect(() => {
            assertInRange(value as number, min as number, max as number);
        }).not.toThrow();
    });
});

describe.each([
    [1,0,3],
    [1,4,3],
])('assertInRange invalid', (min, value, max) => {
    test('assertInRange toThrow', () => {
        expect(() => {
            assertInRange(value as number, min as number, max as number);
        }).toThrow();
    });
});