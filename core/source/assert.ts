import AppError from './Errors/AppError.js';
import AssertError from './Errors/AssertError.js';

export function assert(condition: boolean, message?: string) {
    if (!condition) {
        throw new AssertError(message);
    }
}