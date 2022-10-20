import AppError from './AppError.js';

export default class CharacterIsDeadError extends AppError {
    constructor(message?: string) {
        super(message || 'Персонаж мертвый.');
    }
}