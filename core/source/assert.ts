import AppError from './Errors/AppError.js';
import AssertError from './Errors/AssertError.js';
import _ from 'lodash';

export function assert(condition: boolean, message?: string) {
    if (!condition) {
        throw new AssertError(message);
    }
}

/**
 * Включая ноль.
 * @param value
 * @param message
 */
export function assertPositive(value: number, message?: string) {
    assert(value >= 0, 'Значение должно быть больше нуля.');
}

export function assertNotNil(value: any, message?: string) {
    assert(!_.isNil(value), 'Значение не может быть null или undefined.');
}

export function assertIsGreaterThan(value: number, expected: number, message?: string) {
    assert(value > expected, 'Значение должно быть больше указанного.');
}

export function assertIsGreaterThanOrEqual(value: number, expected: number, message?: string) {
    assert(value >= expected, 'Значение должно быть больше или равно указанному.');
}

export function assertIsNumber(value: any, message?: string) {
    assert(typeof value === 'number', 'Значение должно быть числом.');
}