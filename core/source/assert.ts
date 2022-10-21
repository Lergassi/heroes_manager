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
export function assertIsPositive(value: number, message?: string) {
    assertIsNumber(value);
    assert(value >= 0, 'Значение должно быть больше нуля.');
}

export function assertNotNil(value: any, message?: string) {
    assert(!_.isNil(value), 'Значение не может быть null или undefined.');
}

export function assertIsGreaterThan(value: number, expected: number, message?: string) {
    assert(value > expected, 'Значение должно быть больше указанного.');
}

export function assertIsGreaterThanOrEqual(value: number, expected: number, message?: string) {
    assertIsNumber(value);
    assertIsNumber(expected);
    assert(value >= expected, 'Значение должно быть больше или равно указанному.');
}

export function assertIsNumber(value: any, message?: string) {
    assert(typeof value === 'number', 'Значение должно быть числом.');
}

export function assertIsMinLength<T>(array: T[], minLength: number, message?: string) {
    assertIsArray(array);
    assert(array.length >= minLength, 'Массив не соответствует минимальной указаной длине.');
}

export function assertIsMaxLength<T>(array: T[], maxLength: number, message?: string) {
    assertIsArray(array);
    assert(array.length <= maxLength, 'Массив не соответствует максимальной указаной длине.');
}

export function assertIsArray(value: any, message?: string) {
    assert(Array.isArray(value), 'Переменная должна быть массивом.');
}

//todo: Надо ли value и target проверять на nil?
export function assertIsInstanceOf(value: any, target: any, message?: string) {
    assert(value instanceof target, 'Объект неверного типа (instanceof).');
}