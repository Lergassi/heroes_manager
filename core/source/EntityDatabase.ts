import _ from 'lodash';
import AppError from './Errors/AppError.js';
import {sprintf} from 'sprintf-js';

export default class EntityDatabase {
    private readonly _items;

    constructor() {
        this._items = {};
    }

    add<T>(entity: T): void {
        if (!this._items.hasOwnProperty(entity.constructor.name)) {
            this._items[entity.constructor.name] = [];
        }

        if (!_.includes(this._items[entity.constructor.name], entity)) {
            this._items[entity.constructor.name].push(entity);
        }
    }

    findOneByID<T>(entityName: string, ID: number): T {
        this.assertIsEntityStorageExists(entityName);

        for (let i = 0; i < this._items[entityName].length; i++) {
            if (this._items[entityName][i]['_id'] === ID) {
                return this._items[entityName][i];
            }
        }

        return undefined;
    }

    getOneByID<T>(entityName: string, ID: number): T {
        let entity = this.findOneByID<T>(entityName, ID);
        if (!entity) {
            throw AppError.entityNotFound(entityName, ID);
        }

        return entity;
    }

    findOneByAlias<T>(entityName: string, alias: string): T {
        this.assertIsEntityStorageExists(entityName);

        for (let i = 0; i < this._items[entityName].length; i++) {
            if (this._items[entityName][i]['_alias'] === alias) {
                return this._items[entityName][i];
            }
        }

        return undefined;
    }

    getOneByAlias<T>(entityName: string, alias: string): T {
        let entity = this.findOneByAlias<T>(entityName, alias);
        if (!entity) {
            throw AppError.entityNotFound(entityName, alias, 'alias');
        }

        return entity;
    }

    hasEntityStorage(entityName: string): boolean {
        return this._items.hasOwnProperty(entityName);
    }

    assertIsEntityStorageExists(entityName: string) {
        if (!this.hasEntityStorage(entityName)) {
            throw new AppError(sprintf('Сущность типа %s ну существует в базе данных.', entityName));
        }
    }
}