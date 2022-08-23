import Repository from './Repository.js';

export interface ModuleInterface {
    name: string;
}

export default class EntityManager {
    private readonly _repositories;

    constructor() {
        this._repositories = {};
    }

    getRepository<Entity>(classname: string): Repository<Entity> {
        if (!this._repositories.hasOwnProperty(classname)) {
            this._repositories[classname] = new Repository<Entity>(classname);
        }

        return this._repositories[classname];
    }

    // add<T>(module: ModuleInterface, entity: T) {
    //     this.getRepository<T>(module).add(entity);
    // }
}