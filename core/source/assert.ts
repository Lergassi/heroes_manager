import AppError from './Errors/AppError.js';
import AssertError from './Errors/AssertError.js';

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