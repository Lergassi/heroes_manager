import _ from 'lodash';
import debug from 'debug';
import Recipe from '../Entities/Recipe.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import InfinityItemStorage from '../Components/InfinityItemStorage.js';
import ItemStorageV2 from '../Components/ItemStorageV2.js';
import CraftQueue from './CraftQueue.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import ItemStackController from '../Components/ItemStackController.js';
import {sprintf} from 'sprintf-js';

enum CraftWorkbenchState {
    Free = 'Free',
    Working = 'Working',
    Waiting = 'Waiting',
}

/**
 * Сейчас:
 * При отмене рецепта ресуры, который не поместились в сумке, будут потеряны.
 */
export default class CraftWorkbench {
    private _state: CraftWorkbenchState;
    private _activeRecipe: Recipe;
    private readonly _craftQueue: CraftQueue;
    private readonly _resourcesItemStorage: ItemStorageInterface;
    private readonly _resultItemStorage: ItemStorageInterface;
    private readonly _tempResultItemSlot: ItemStackController;   //Слот производства. Заменяется при отображении.
    private _timeoutID: NodeJS.Timer;

    constructor() {
        this._state = CraftWorkbenchState.Free;
        this._craftQueue = new CraftQueue();
        this._resourcesItemStorage = new InfinityItemStorage();
        // this._resultItemStorage = new ItemStorageV2(5);
        this._resultItemStorage = new ItemStorageV2(1);
        this._tempResultItemSlot = new ItemStackController();
    }

    addRecipe(recipe: Recipe, itemStorage: ItemStorageInterface): boolean {
        if (
            this._state === CraftWorkbenchState.Free &&
            !this._activeRecipe &&
            recipe.containRequireItems(itemStorage)
        ) {
            this._activeRecipe = recipe;
            recipe.removeRequireItems(itemStorage);
            // debug(DebugNamespaceID.Log)('Рецепт добавлен в верстак.');
            this.startCraft();
        } else {
            this._craftQueue.addRecipe(recipe, itemStorage);
        }

        return true;
    }

    cancelRecipe(itemStorage: ItemStorageInterface) {
        if (!this._craftQueue.isEmpty()) {
            this._craftQueue.pop().createRequireItems(itemStorage);
        } else if (this._activeRecipe) {
            this.cancelCrafting(itemStorage);
        }
    }

    startCraft(): boolean {
        if (!this.canStartCraft()) return false;

        this._timeoutID = setTimeout(() => {
            debug(DebugNamespaceID.Log)('Производство предмета завершено.');
            // if (this._activeRecipe.createItem(this._resultItemStorage) !== 0) {
            this._activeRecipe.createItem(this._tempResultItemSlot);
            this._tempResultItemSlot.moveTo(this._resultItemStorage);
            if (!this._tempResultItemSlot.isFree()) {
                console.log('this._tempResultItemSlot', this._tempResultItemSlot);
                this._state = CraftWorkbenchState.Waiting;
            } else {
                this._state = CraftWorkbenchState.Free;
                this._next();
            }

            clearTimeout(this._timeoutID);
        },this._activeRecipe.craftTimeInSeconds * 1000);
        // },1000);

        this._state = CraftWorkbenchState.Working;
        debug(DebugNamespaceID.Log)(sprintf('Производство предмета %s началось.', this._activeRecipe.resultItem.id));

        return true;
    }

    cancelCrafting(itemStorage: ItemStorageInterface): boolean {
        if (!this._activeRecipe) return false;

        this._activeRecipe.createRequireItems(itemStorage);
        this._activeRecipe = undefined;
        this._state = CraftWorkbenchState.Free;
        clearTimeout(this._timeoutID);
        debug(DebugNamespaceID.Log)('Производство предмета отменено.');

        return true;
    }

    getResult(itemStorage: ItemStorageInterface): void {
        this._resultItemStorage.moveTo(itemStorage);
        this._tempResultItemSlot.moveTo(this._resultItemStorage);
        if (this._tempResultItemSlot.isFree()) {
            this._state = CraftWorkbenchState.Free;
            this._next();
        }
    }

    canAddRecipe(): boolean {
        if (this._state !== CraftWorkbenchState.Free) {
            debug(DebugNamespaceID.Throw)('Верстак занят.');

            return false;
        }

        if (this._activeRecipe) {
            debug(DebugNamespaceID.Throw)('Рецепт уже установлен.');

            return false;
        }

        return true;
    }

    canStartCraft(): boolean {
        if (this._state === CraftWorkbenchState.Working) {
            debug(DebugNamespaceID.Throw)('Производство предмета уже запущено.');

            return false;
        }

        if (this._state === CraftWorkbenchState.Waiting) {
            debug(DebugNamespaceID.Throw)('Не хватает места.');

            return false;
        }

        if (!this._activeRecipe) {
            debug(DebugNamespaceID.Throw)('Рецепт не выбран.');

            return false;
        }

        // if (this._craftQueue.isEmpty()) {
        //     debug(DebugNamespaceID.Throw)('Очередь производства пустая.');
        //
        //     return false;
        // }

        return true;
    }

    test() {
        if (this._state === CraftWorkbenchState.Waiting) {

        }
        console.log(this._state === CraftWorkbenchState.Waiting);
    }

    private _next(): boolean {
        if (!this.canStartCraft()) return false;

        if (this._craftQueue.isEmpty()) {
            return false;
        }

        this._activeRecipe = this._craftQueue.shift();
        this.startCraft();

        return true;
    }
}