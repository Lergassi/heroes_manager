import Repository from './Repository.js';
import {assert, assertIsString, assertNotEmpty, assertNotNil} from './assert.js';
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

    add<T>(entityID: EntityID, ID: string, entity: T): T {
        assertIsString(entityID);   //Или значение приведенное к string.
        assertNotEmpty(entityID);
        assertIsString(ID);
        assertNotEmpty(ID);
        assertNotEmpty(entity); //todo: Нужна проверка на правильные объект. Нужно собрать из нескольких методов lodash, одного вроде нету.

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
    get<T>(entityID: EntityID, ID: string): T | undefined {
        assertIsString(entityID);
        assertNotEmpty(entityID);
        assertIsString(ID);
        assertNotEmpty(ID);

        return this._entities[entityID]?.[ID];
    }
}