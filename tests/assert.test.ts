import {assert, assertIsMaxLength, assertIsMinLength} from '../core/source/assert.js';

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