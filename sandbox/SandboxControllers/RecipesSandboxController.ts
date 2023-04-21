import AbstractSandboxController from './AbstractSandboxController.js';
import {ItemID} from '../../core/types/enums/ItemID.js';
import ItemDatabase from '../../core/source/ItemDatabase.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import Recipe from '../../core/app/Entities/Recipe.js';
import {RecipeID} from '../../core/types/enums/RecipeID.js';
import RecipeFactory from '../../core/app/Factories/EntityFactories/RecipeFactory.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import {EntityID} from '../../core/types/enums/EntityID.js';
import EntityManager from '../../core/source/EntityManager.js';
import RecipesLoader from '../../core/app/Services/Loadres/RecipesLoader.js';

export default class RecipesSandboxController extends AbstractSandboxController {
    run(): void {
        // this._getStarted();
        // this._getEntityManager();
        this._load();
    }

    private _getStarted() {
        let itemID = ItemID.OneHandedSword01;
        // let itemID = 'asd';
        let item = this.container.get<ItemDatabase>(ServiceID.ItemDatabase).get(itemID);
        console.log(item);

        let recipe = new Recipe(
            RecipeID.OneHandedSword01,
            item,
            1,
            60,
            [
                {item: this.container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.IronIngot), count: 10},
            ],
        );
        console.log(recipe);
    }

    private _getEntityManager() {
        // let entityManager = this.container.get<EntityManagerInterface>(ContainerID.EntityManager);
        let entityManager: EntityManager = this.container.get<EntityManager>(ServiceID.EntityManager);
        let recipeFactory = new RecipeFactory(this.container.get<EntityManagerInterface>(ServiceID.EntityManager));

        entityManager.add(EntityID.Recipe, RecipeID.OneHandedSword01, recipeFactory.create(
            RecipeID.OneHandedSword01,
            ItemID.OneHandedSword01,
            1,
            60,
            [
                {itemID: ItemID.IronIngot, count: 10},
                {itemID: ItemID.Coal, count: 2},
            ],
        ));
        entityManager.add(EntityID.Recipe, RecipeID.TwoHandedSword01, recipeFactory.create(
            RecipeID.TwoHandedSword01,
            ItemID.TwoHandedSword01,
            1,
            60,
            [
                {itemID: ItemID.IronIngot, count: 20},
                {itemID: ItemID.CopperOre, count: 10},
                {itemID: ItemID.Coal, count: 10},
            ],
        ));
        entityManager.add(EntityID.Recipe, RecipeID.Leather01, recipeFactory.create(
            RecipeID.Leather01,
            ItemID.Leather01,
            1,
            60,
            [
                {itemID: ItemID.Skin01, count: 5},
            ],
        ));
        console.log(entityManager);

        let searchItemID = ItemID.OneHandedSword01;
        // let searchItemID = ItemID.Skin01;
        // let recipe = entityManager.getBy<Recipe>(EntityID.Recipe, (items) => {
        //     console.log('items', items);
        //     for (let i = 0; i < items.length; i++) {
        //         console.log(items[i].resultItem.id === searchItemID);
        //         if (items[i].resultItem.id === searchItemID) return items[i];
        //     }
        //
        //     return undefined;
        // });
        // let recipe = entityManager.getBy<Recipe>(EntityID.Recipe, {property: 'resultItem', value: searchItemID});
        let recipe = entityManager.getRecipeByResultItem(searchItemID);
        console.log('recipe', recipe);
    }

    private _load() {
        let loadRecipe = new RecipesLoader();
        loadRecipe.load(this.container.get(ServiceID.EntityManager), new RecipeFactory(this.container.get(ServiceID.EntityManager)));
        // console.log(loadRecipe);
        console.log(this.container.get(ServiceID.EntityManager));
    }
}