import {EntityID} from '../../../types/enums/EntityID.js';
import ItemCategory from '../../Entities/ItemCategory.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import {ItemCategoryID} from '../../../types/enums/ItemCategoryID.js';
import _ from 'lodash';

export default class ItemCategoryFactory {
    private readonly _entityManager: EntityManagerInterface;

    constructor(entityManager: EntityManagerInterface) {
        this._entityManager = entityManager;
    }

    create(
        id: string,
        name: string,
        sort: number,
        parent?: ItemCategoryID,
    ) {
        return this._entityManager.add<ItemCategory>(EntityID.ItemCategory, id, new ItemCategory(
            id,
            name,
            sort,
            (!parent || _.isNil(parent)) ? null : this._entityManager.get<ItemCategory>(EntityID.ItemCategory, parent),
        ));
    }
}