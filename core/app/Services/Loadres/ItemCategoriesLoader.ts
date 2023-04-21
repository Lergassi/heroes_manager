import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import ItemCategoryFactory from '../../Factories/EntityFactories/ItemCategoryFactory.js';
import itemCategoriesData from '../../../data/json/item_categories.json';

export default class ItemCategoriesLoader {
    load(entityManager: EntityManagerInterface, itemCategoryFactory: ItemCategoryFactory) {
        this._load(entityManager, itemCategoryFactory, itemCategoriesData);
    }

    private _load(entityManager: EntityManagerInterface, itemCategoryFactory: ItemCategoryFactory, data: any) {
        for (let i = 0; i < data.length; i++) {
            itemCategoryFactory.create(
                data[i].ID,
                data[i].Name,
                500,
                data[i].ParentID,
            );
        }
    }
}