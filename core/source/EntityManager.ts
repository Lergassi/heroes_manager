import Repository from './Repository.js';
import {assert} from './assert.js';
import _ from 'lodash';
import AppError from './Errors/AppError.js';
import {EntityID} from '../types/enums/EntityID.js';
import {sprintf} from 'sprintf-js';
import EntityManagerInterface from '../app/Interfaces/EntityManagerInterface.js';

export default class EntityManager implements EntityManagerInterface {
    private readonly _entities;

    constructor() {
        this._entities = {};
    }

    // add<T>(ID: string, entity: T): T;
    add<T>(entityID: EntityID, ID: string, entity: T): T {
        if (!this._entities.hasOwnProperty(entityID)) {
            this._entities[entityID] = {};
        }

        if (this._entities[entityID].hasOwnProperty(ID)) {
            throw new AppError(sprintf('Сущность с таким ID(%s) уже существует.', ID));
        }

        this._entities[entityID][ID] = entity;

        return entity;
    }

    /**
     * @param entityID
     * @param ID
     */
    get<T>(entityID: EntityID, ID: string): T {
        return this._entities[entityID]?.[ID];
    }


    ///////////////
    // /**
    //  * @deprecated
    //  * @param classname
    //  */
    // getRepository<Entity>(classname: string): Repository<Entity> {
    //     if (!this._repositories.hasOwnProperty(classname)) {
    //         this._repositories[classname] = new Repository<Entity>(classname);
    //     }
    //
    //     return this._repositories[classname];
    // }

    // add<T>(module: string | Function, entity: T): T {
    //     if (typeof module === 'string') {
    //         return this.getRepository<T>(module).add(entity);
    //     } else {
    //         return this.getRepository<T>(module.name).add(entity);
    //     }
    // }

    // addEntity(key, ID, entity) {
    //     if (!this._entities.hasOwnProperty(key)) {
    //         this._entities[key] = {};
    //     }
    //
    //     if (this._entities[key].hasOwnProperty(ID)) {
    //         throw new AppError('Сущность с таким ID уже существует.');
    //     }
    //
    //     this._entities[key][ID] = entity;
    // }

    //@dev
    // set<T>(key: string, value: T): T {
    //     assert(!_.isNil(key));
    //
    //     if (!this._entities.hasOwnProperty(key)) {
    //         this._entities[key] = value;
    //     }
    //
    //     return value;
    // }

    // /**
    //  * @deprecated Изменять key на строковое значение при возможности вместо module.name (не удобно). Далее будут ключи из переменных/enum.
    //  * @param moduleOrKey
    //  * @param ID
    //  */
    // get<T>(moduleOrKey: Function | string | EntityID, ID: string): T {
    //     if (typeof moduleOrKey === 'function') {
    //         moduleOrKey = moduleOrKey.name;
    //     }
    //
    //     let entity = this._entities[moduleOrKey]?.[ID];
    //
    //     if (!entity) {
    //         entity = this.getRepository<T>(moduleOrKey).getOneByID(ID);
    //     }
    //
    //     return entity;
    // }

    // /**
    //  * @deprecated
    //  * @param key
    //  * @param ID
    //  */
    // entity<T>(key: string, ID: string): T {
    //     assert(!_.isNil(key));
    //     assert(!_.isNil(ID));
    //
    //     return this._entities[key]?.[ID];
    // }
}