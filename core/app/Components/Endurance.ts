import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import ActionStateController, {CharacterActionStateCode} from './ActionStateController.js';
import _ from 'lodash';

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

    /**
     * @deprecated @dev Пока не будет сделан метод восстановления по зелью/эффекту.
     */
    get endurance(): number {
        return this._endurance;
    }

    /**
     * @deprecated @dev Пока не будет сделан метод восстановления по зелью/эффекту.
     */
    get maxEndurance(): number {
        return this._maxEndurance;
    }

    get currentEnduranceToMaxRatio(): number {
        return _.round(this._endurance / this._maxEndurance, 2);
    }

    constructor(actionStateController: ActionStateController) {
        this._actionStateController = actionStateController;
        this._maxEndurance = 100;
        this._endurance = this._maxEndurance;
    }

    add(endurance: number): number {
        // if (!this._actionStateController.canAction()) return 0;

        let value = this._endurance + endurance;
        let addedValue = 0;
        if (value > this._maxEndurance) {
            addedValue = this._maxEndurance - this._endurance;
            this._endurance = this._maxEndurance;
        } else {
            addedValue = endurance;
            this._endurance = value;
        }

        if (this._endurance > 0) {
            this._actionStateController.removeState(CharacterActionStateCode.Tired);
        }

        return addedValue;
    }

    remove(endurance: number): number {
        // if (!this._actionStateController.canAction()) return 0;

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
        // if (!this._actionStateController.canAction()) return 0;

        this._endurance = this._maxEndurance;

        this._actionStateController.removeState(CharacterActionStateCode.Tired);

        return this._endurance;
    }

    // recoveryByEffect(callback: () => void): number {
    //
    // }

    update(options: {
        itemStorage: ItemStorageInterface;
    }): void {
        // this._endurance -=
    }

    renderByRequest(ui: EnduranceRCInterface): void {
        ui?.update(this._endurance, this._maxEndurance);
    }
}