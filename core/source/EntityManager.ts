import Repository from './Repository.js';
import {assert} from './assert.js';
import _ from 'lodash';

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

    //@dev
    set<T>(key: string, value: T): T {
        assert(!_.isNil(key));

        if (!this._entities.hasOwnProperty(key)) {
            this._entities[key] = value;
        }

        return value;
    }

    get<Entity>(module: Function | string, ID: string): Entity {
        if (typeof module === 'string') {
            return this.getRepository<Entity>(module).getOneByID(ID);
        } else {
            return this.getRepository<Entity>(module.name).getOneByID(ID);
        }
    }

    //get
    entity<T>(key: string, ID: string): T {
        assert(!_.isNil(key));
        assert(!_.isNil(ID));

        return this._entities[key]?.[ID];
    }
}