import EntityManager from '../../../source/EntityManager.js';
import {EntityID} from '../../../types/enums/EntityID.js';
import ItemCategory from '../../Entities/ItemCategory.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';

export default class ItemCategoryFactory {
    private readonly _entityManager: EntityManagerInterface;

    constructor(entityManager: EntityManagerInterface) {
        this._entityManager = entityManager;
    }

    create(
        id: string,
        name: string,
        description: string,
        sort: number,
        parent: string | ItemCategory,
    ) {
        return this._entityManager.add<ItemCategory>(EntityID.ItemCategory, id, new ItemCategory(
            id,
            name,
            description,
            sort,
            parent instanceof ItemCategory ? parent : this._entityManager.get<ItemCategory>(EntityID.ItemCategory, parent),
        ));
    }
}