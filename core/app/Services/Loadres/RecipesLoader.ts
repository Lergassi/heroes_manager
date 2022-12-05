import _ from 'lodash';
import debug from 'debug';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import ItemFactory from '../../Factories/ItemFactory.js';
import ItemBuilder from '../ItemBuilder.js';
import data from '../../../data/items.json';
import RecipeFactory from '../../Factories/EntityFactories/RecipeFactory.js';
import ItemStackBlankInterface from '../../Interfaces/ItemStackBlankInterface.js';

export default class RecipesLoader {
    load(entityManager: EntityManagerInterface, recipeFactory: RecipeFactory) {
        this._load(entityManager, recipeFactory, data);
    }

    private _load(entityManager: EntityManagerInterface, recipeFactory: RecipeFactory, data) {
        for (let i = 0; i < data.length; i++) {
            if (!data[i].ResultCount) continue;

            let requireItems: ItemStackBlankInterface[] = [];
            if (data[i].RequireItem01) requireItems.push({item: data[i].RequireItem01, count: Number(data[i].Count01)});
            if (data[i].RequireItem02) requireItems.push({item: data[i].RequireItem02, count: Number(data[i].Count02)});
            if (data[i].RequireItem03) requireItems.push({item: data[i].RequireItem03, count: Number(data[i].Count03)});
            if (data[i].RequireItem04) requireItems.push({item: data[i].RequireItem04, count: Number(data[i].Count04)});

            recipeFactory.create(
                data[i].ID,
                data[i].ID,
                Number(data[i].ResultCount),
                Number(data[i].CraftTimeInSeconds),
                requireItems,
            );
        }
    }
}