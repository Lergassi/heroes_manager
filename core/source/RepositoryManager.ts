import AppError from './AppError.js';
import {sprintf} from 'sprintf-js';
import Repository from './Repository.js';

export default class RepositoryManager {
    private readonly _repositories;

    constructor() {
        this._repositories = {};
    }

    addRepository<Entity>(entityClassName: string, repository: Repository<Entity>): void {
        this._repositories[entityClassName] = repository;
    }

    getRepository<Entity>(entityClassname: string): Repository<Entity> {
        if (!this._repositories.hasOwnProperty(entityClassname)) {
            throw new AppError(sprintf('Репозиторий для сущности %s не найден.', entityClassname));
        }

        return this._repositories[entityClassname];
    }
}