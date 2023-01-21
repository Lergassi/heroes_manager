import {ItemID} from '../../../types/enums/ItemID.js';
import ItemStackBlankInterface from '../../Interfaces/ItemStackBlankInterface.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import {EntityID} from '../../../types/enums/EntityID.js';
import Recipe from '../../Entities/Recipe.js';
import Item from '../../Entities/Item.js';
import _ from 'lodash';

export default class RecipeFactory {
    private readonly _entityManager: EntityManagerInterface;

    constructor(
        entityManager: EntityManagerInterface,
    ) {
        this._entityManager = entityManager;
    }

    create(
        ID: string,
        resultItemID: ItemID,
        resultCount: number,
        craftTimeInSeconds: number,
        requireItems: ItemStackBlankInterface[],
    ): Recipe {
        return this._entityManager.add(EntityID.Recipe, ID, new Recipe(
            ID,
            this._entityManager.get<Item>(EntityID.Item, resultItemID),
            resultCount,
            craftTimeInSeconds,
            _.map(requireItems, (requireItemData) => {
                return {
                    item: this._entityManager.get<Item>(EntityID.Item, requireItemData.itemID),
                    count: requireItemData.count,
                };
            }),
        ));
    }
}