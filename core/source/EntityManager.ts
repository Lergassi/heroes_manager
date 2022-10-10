import Repository from './Repository.js';
import ItemBuilder from '../app/Services/ItemBuilder.js';

export interface ModuleInterface {
    name: string;
}

export default class EntityManager {
    private readonly _repositories;
    private readonly _entities;

    constructor() {
        this._repositories = {};
        this._entities = {};
    }

    /**
     * @deprecated
     * @param classname
     */
    getRepository<Entity>(classname: string): Repository<Entity> {
        if (!this._repositories.hasOwnProperty(classname)) {
            this._repositories[classname] = new Repository<Entity>(classname);
        }

        return this._repositories[classname];
    }

    add<Entity>(module: string | Function, entity: Entity): Entity {
        if (typeof module === 'string') {
            return this.getRepository<Entity>(module).add(entity);
        } else {
            return this.getRepository<Entity>(module.name).add(entity);
        }
    }

    get<Entity>(module: Function | string, alias: string/*todo: По ID или фильтру.*/): Entity {
        if (typeof module === 'string') {
            return this.getRepository<Entity>(module).getOneByAlias(alias);
        } else {
            return this.getRepository<Entity>(module.name).getOneByAlias(alias);
        }
    }

    //@dev
    set<T>(key: string, value: T): T {
        if (!this._entities.hasOwnProperty(key)) {
            this._entities[key] = value;
        }

        return value;
    }

    //get
    entity<T>(key: string, id: string): T {
        return this._entities[key]?.[id];
    }
}