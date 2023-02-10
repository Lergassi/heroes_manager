import {CommandID} from '../types/enums/CommandID.js';
import {DebugFormatterID} from '../types/enums/DebugFormatterID.js';
import {DebugNamespaceID} from '../types/enums/DebugNamespaceID.js';
import Repository from './Repository.js';
import {assert, assertIsString, assertNotEmpty, assertNotNil} from './assert.js';
import _ from 'lodash';
import AppError from './Errors/AppError.js';
import {EntityID} from '../types/enums/EntityID.js';
import {sprintf} from 'sprintf-js';
import EntityManagerInterface from '../app/Interfaces/EntityManagerInterface.js';
import {clearLine} from 'readline';
import {ItemID} from '../types/enums/ItemID.js';
import Item from '../app/Entities/Item.js';
import Recipe from '../app/Entities/Recipe.js';
import debug from 'debug';

export default class EntityManager implements EntityManagerInterface {
    private readonly _entities;

    constructor() {
        this._entities = {};
    }

    /**
     * todo: Убрать, оставить только чтение.
     * @param entityID
     * @param ID
     * @param entity
     */
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
            throw new AppError(sprintf('Сущность с ID "%s" уже существует.', ID));
        }

        this._entities[entityID][ID] = entity;

        return entity;
    }

    /**
     * @param entityID
     * @param ID
     */
    get<T>(entityID: EntityID, ID: string): T | undefined {
        // assertIsString(entityID);
        assertNotEmpty(entityID);
        // assertIsString(ID);
        assertNotEmpty(ID);

        return this._entities[entityID]?.[ID];
    }

    /*
        @indev todo: Фильтры пока тут. Позже переделать.
     */

    getRecipeByResultItem(resultItem: ItemID) {
        return _.filter<Recipe>(this._entities[EntityID.Recipe], (recipe) => {
            return recipe.resultItem.id === resultItem;
        })[0];
    }

    map<T>(entityID: EntityID, callback: (entity: T) => void) {
        assertNotNil(this._entities[entityID]);
        assertNotNil(callback);

        _.map(this._entities[entityID], (entity) => {
            callback(entity);
        });
    }

    debug = {
        items: () => {
            let count = 0;
            for (const key in this._entities[EntityID.Item]) {
                debug(DebugNamespaceID.Debug)(DebugFormatterID.Json, {
                    ID: this._entities[EntityID.Item][key].id,
                    itemLevel: this._entities[EntityID.Item][key].itemLevel,
                    itemCategory: this._entities[EntityID.Item][key].itemCategory.id,
                    quality: this._entities[EntityID.Item][key].quality.id,
                    stackSize: this._entities[EntityID.Item][key].stackSize,
                });
                count++;
            }

            debug(DebugNamespaceID.Debug)(sprintf('Всего предметов: ', count));
        },
    };
}