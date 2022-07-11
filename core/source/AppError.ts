import {sprintf} from 'sprintf-js';

export default class AppError extends Error {
    //Сделано для работы ctrl+B.
    constructor(message?: string) {
        super(message);
    }

    static entityNotFound(entityClass, id) {
        return new AppError(sprintf('Сущность типа %s id(%s) не найдена.', entityClass, id));
    }

    static gameObjectNotFound(id) {
        return new AppError(sprintf('GameObject id(%s) не найден.', id));
    }

    static componentNotFound(id) {
        return new AppError(sprintf('Компонент id(%s) в GameObject не найден.', id));
    }

    static playerNotLoaded() {
        return new AppError('Игрок не загружен.');
    }

    static userNotLoaded() {
        return new AppError('Пользователь не загружен.');
    }

    static userAlreadyLoaded() {
        return new AppError('Пользователь уже загружен.');
    }

    static playerAlreadyLoaded() {
        return new AppError('Игрок уже загружен.');
    }

    static metadataNotFound(name: string) {
        return new AppError(sprintf('Метаданные для %s не найдены.', name));
    }
}