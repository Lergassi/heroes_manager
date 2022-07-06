import AppError from './AppError.js';
import {sprintf} from 'sprintf-js';

export default class RepositoryManager {
    private _repositories;

    addRepository() {

    }

    getRepository(entityClassname: string) {
        if (!this._repositories.hasOwnProperty(entityClassname)) {
            throw new AppError(sprintf('Репозиторий для сущности %s не найден.', entityClassname));
        }

        return this._repositories[entityClassname];
    }
}