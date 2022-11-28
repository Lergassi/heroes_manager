import _ from 'lodash';
import debug from 'debug';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import ItemFactory from '../Factories/ItemFactory.js';
import ItemCategoryFactory from '../Factories/EntityFactories/ItemCategoryFactory.js';
import itemCategoriesData from '../../data/item_categories.json';
import ItemBuilder from './ItemBuilder.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';

export default class LoadItemCategories {
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