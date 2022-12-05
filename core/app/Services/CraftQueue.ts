import _ from 'lodash';
import debug from 'debug';
import Recipe from '../Entities/Recipe.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import ItemStorageV2 from '../Components/ItemStorageV2.js';
import InfinityItemStorage from '../Components/InfinityItemStorage.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export default class CraftQueue {
    private _size: number;
    private readonly _queue: any[];
    private readonly _resourcesItemStorage: InfinityItemStorage;

    constructor() {
        this._size = 5;
        this._queue = [];
        this._resourcesItemStorage = new InfinityItemStorage();
    }

    addRecipe(recipe: Recipe, itemStorage: ItemStorageInterface): boolean {
        if (this._queue.length >= this._size) {
            debug(DebugNamespaceID.Throw)('Очередь производства заполнена.');

            return false;
        }

        for (let i = 0; i < recipe.requireItems.length; i++) {
            if (!recipe.containRequireItems(itemStorage)) {
                debug(DebugNamespaceID.Throw)('Недостаточно ресурсов.');

                return false;
            }
        }

        for (let i = 0; i < recipe.requireItems.length; i++) {
            itemStorage.removeItem(<ItemID>recipe.requireItems[i].item.id, recipe.requireItems[i].count);
            this._resourcesItemStorage.addItem(recipe.requireItems[i].item, recipe.requireItems[i].count);
        }

        this._queue.push(recipe);
        debug(DebugNamespaceID.Log)('Рецепт добавлен в очередь.');

        return true;
    }

    pop(): Recipe {
        if (!this._queue.length) return undefined;
        debug(DebugNamespaceID.Log)('Рецепт удалён из конца очереди.');

        return this._queue.pop();
    }

    shift(): Recipe {
        if (!this._queue.length) return undefined;

        // for (let i = 0; i < this._queue[0].requireItems.length; i++) {
        //     this._resourcesItemStorage.removeItem(this._queue[0].requireItems[i].item, this._queue[0].requireItems[i].count);
        // }

        debug(DebugNamespaceID.Log)('Рецепт удалён из начала очереди.');

        return this._queue.shift();
    }

    isEmpty(): boolean {
        return this._queue.length === 0;
    }

    isFull(): boolean {
        return this._queue.length === this._size;
    }

    get length(): number {
        return this._queue.length;
    }
}