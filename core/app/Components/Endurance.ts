import {UI_TavernHero_v2} from '../../../client/public/RC/TavernRC_v2.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import ActionStateController, {CharacterActionStateCode} from './ActionStateController.js';

export interface EnduranceRCInterface {
    update?(endurance: number, max: number): void;
}

export interface EnduranceRenderInterface {
    renderByRequest(ui: EnduranceRCInterface): void
}

export default class Endurance implements EnduranceRenderInterface {
    private readonly _options = {
        reduceEnduranceForHit: 2,
    };

    private _endurance: number;
    private _maxEndurance: number;

    private readonly _actionStateController: ActionStateController;

    constructor(actionStateController: ActionStateController) {
        this._actionStateController = actionStateController;
        this._maxEndurance = 100;
        this._endurance = this._maxEndurance;
    }

    add(endurance: number): void {

    }

    remove(endurance: number): number {
        if (this._endurance <= 0) return 0;

        let _endurance = this._endurance - endurance;
        let removedEndurance;
        if (_endurance <= 0) {
            removedEndurance = this._endurance;
            this._endurance = 0;
        } else {
            this._endurance = _endurance;
            removedEndurance = _endurance;
        }

        if (this._endurance <= 0) {
            this._actionStateController.addState(CharacterActionStateCode.Tired);
        }

        return removedEndurance;
    }

    reset(): number {
        this._endurance = this._maxEndurance;

        this._actionStateController.removeState(CharacterActionStateCode.Tired);

        return this._endurance;
    }

    update(options: {
        itemStorage: ItemStorageInterface;
    }): void {
        // this._endurance -=
    }

    renderByRequest(ui: EnduranceRCInterface): void {
        ui?.update(this._endurance, this._maxEndurance);
    }
}