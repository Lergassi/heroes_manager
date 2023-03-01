import {ItemID} from '../types/enums/ItemID.js';
import AppError from './Errors/AppError.js';
import AssertError from './Errors/AssertError.js';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';

export function assert(condition: boolean, message?: string) {
    if (!condition) {
        throw new AssertError(message);
    }
}

// export function assert(condition: boolean, message?: string) {
//     if (!condition) {
//         throw new AssertError(message);
//     }
// }

/**
 * Включая ноль.
 * @param value
 * @param message
 */
export function assertIsPositive(value: number, message?: string) {
    assertIsNumber(value);
    assert(value >= 0, 'Значение должно быть больше нуля.');
}

/**
 * Работает как _.isEmpty() включая ноль.
 * @param value
 * @param message
 */
export function assertNotEmpty(value: any, message?: string) {
    assert(!_.isEmpty(value), 'Значение не должно быть пустым.');
}

// export function assertObjectKey(value: any, message?: string) {
//     assert(_.isString(value) || _.isNumber(value), 'Значение не должно быть пустым.');
// }

// export function assertIsObject(value: any, message?: string) {
//     assert(_.isPlainObject(value), 'Значение должно быть объектом созданным через конструктор.');
// }

export function assertNotNil(value: any, message?: string) {
    assert(!_.isNil(value), message || 'Значение не может быть null или undefined.');
}

export function assertIsGreaterThan(value: number, expected: number, message?: string) {
    assert(value > expected, message || 'Значение должно быть больше указанного.');
}

export function assertIsGreaterThanOrEqual(value: number, expected: number, message?: string) {
    assertIsNumber(value);
    assertIsNumber(expected);
    assert(value >= expected, message || 'Значение должно быть больше или равно указанному.');
}

export function assertInRange(value: number, min: number, max: number, message?: string) {
    assertIsNumber(value);
    assertIsNumber(min);
    assertIsNumber(max);
    assert(min <= value && value <= max, 'Значение должно быть в указанном диапазоне.');
}

export function assertIsNumber(value: any, message?: string) {
    assert(typeof value === 'number', message || 'Значение должно быть числом.');
}

export function assertIsString(value: any, message?: string) {
    assert(typeof value === 'string', message || 'Значение должно быть строкой.');
}

export function assertIsMinLength<T>(array: T[], minLength: number, message?: string) {
    assertIsArray(array);
    assert(array.length >= minLength, message || 'Массив не соответствует минимальной указаной длине.');
}

export function assertIsMaxLength<T>(array: T[], maxLength: number, message?: string) {
    assertIsArray(array);
    assert(array.length <= maxLength, message || 'Массив не соответствует максимальной указаной длине.');
}

export function assertIsArray(value: any, message?: string) {
    assert(Array.isArray(value), message || 'Переменная должна быть массивом.');
}

export function assertIsInstanceOf(value: any, target: any, message?: string) {
    assert(value instanceof target, message || sprintf('Неверный тип (instanceof). Ожидаемый тип: %s.', target.name ?? String(target)));
}

export function assertAction(condition: boolean, message?: string) {
    assert(condition, 'Действие не доступно.');
}

export function assertIsInteger(value: number, message?: string) {
    assert(_.isInteger(value), 'Значение должно быть целым числом.');
}

// export function assertIsLength(value: string, message?: string) {
//     assert(_.isInteger(value), 'Значение должно быть целым числом.');
// }

// export function assertItemNotFound(itemID: ItemID): void {
//     assert(condition, 'Действие не доступно.');
// }