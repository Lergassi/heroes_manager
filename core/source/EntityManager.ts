import Repository from './Repository.js';
import ItemBuilder from '../app/Services/ItemBuilder.js';

export interface ModuleInterface {
    name: string;
}

export default class EntityManager {
    private readonly _repositories;

    constructor() {
        this._repositories = {};
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

    add<Entity>(module: Function, entity: Entity): Entity {
        return this.getRepository<Entity>(module.name).add(entity);
    }

    get<Entity>(module: Function, alias: string/*todo: По ID или фильтру.*/): Entity {
        return this.getRepository<Entity>(module.name).getOneByAlias(alias);
    }
}