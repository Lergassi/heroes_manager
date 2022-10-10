import AppError from './AppError.js';

export default class MaxLevelReachedError extends AppError {
    constructor(msg?: string) {
        super(msg ?? 'Достигнут максимальный уровен.');
    }
}