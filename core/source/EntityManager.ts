import Repository from './Repository.js';
import {assert} from './assert.js';
import _ from 'lodash';
import AppError from './Errors/AppError.js';

export interface ModuleInterface {
    name: string;
}

export default class EntityManager {
    private readonly _repositories;
    private readonly _entities;
    // private readonly _entities: {[key in ]};

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

    addEntity(key, ID, entity) {
        if (!this._entities.hasOwnProperty(key)) {
            this._entities[key] = {};
        }

        if (this._entities[key].hasOwnProperty(ID)) {
            throw new AppError('Сущность с таким ID уже существует.');
        }

        this._entities[key][ID] = entity;
    }

    //@dev
    set<T>(key: string, value: T): T {
        assert(!_.isNil(key));

        if (!this._entities.hasOwnProperty(key)) {
            this._entities[key] = value;
        }

        return value;
    }

    /**
     * @deprecated Изменять на строковое значение при возможности. Далее будут ключи из переменных.
     * @param moduleOrKey
     * @param ID
     */
    get<T>(moduleOrKey: Function | string, ID: string): T {
        if (typeof moduleOrKey === 'function') {
            moduleOrKey = moduleOrKey.name;
        }

        let entity = this._entities[moduleOrKey]?.[ID];

        if (!entity) {
            entity = this.getRepository<T>(moduleOrKey).getOneByID(ID);
        }

        return entity;
    }

    /**
     * @deprecated
     * @param key
     * @param ID
     */
    entity<T>(key: string, ID: string): T {
        assert(!_.isNil(key));
        assert(!_.isNil(ID));

        return this._entities[key]?.[ID];
    }
}