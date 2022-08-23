import sum from '../test_objects/sum.js';

test('get_started.test: adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});