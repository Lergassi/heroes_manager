import AppError from './Errors/AppError.js';

export function assert(condition: boolean, message?: string) {
    if (!condition) {
        throw new AppError(message || 'Assertion failed');
    }
}