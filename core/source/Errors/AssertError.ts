import AppError from './AppError.js';

export default class AssertError extends AppError {
    constructor(message?: string) {
        super(message || 'Assertion failed.');
    }
}