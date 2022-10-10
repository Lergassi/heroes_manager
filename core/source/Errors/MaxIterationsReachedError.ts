import AppError from './AppError.js';

export default class MaxIterationsReachedError extends AppError {
    constructor() {
        super('Достигнуто максимальное кол-во итераций. Возможно цикл работает неверно.');
    }
}