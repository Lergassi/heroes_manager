import CharacterAttributeInterface, {
    CharacterAttributeInterfaceRender,
    CharacterAttributeRenderCallback
} from '../../Decorators/CharacterAttributeInterface.js';
import {unsigned} from '../../../types/main.js';
import _ from 'lodash'
import CharacterAttribute from '../CharacterAttribute.js';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';
import ItemCharacterAttributeCollector from '../ItemCharacterAttributeCollector.js';

export default class AttackPowerDependentIncreaserDecorator implements CharacterAttributeInterface {
    private readonly _attackPower: CharacterAttributeInterface;
    private readonly _dependentsCharacterAttributes: CharacterAttributeInterface[];
    private readonly _dependentCharacterAttributeMultiplier: unsigned;

    private readonly _callbacks;

    get baseValue(): number {
        return this._attackPower.baseValue;
    }

    get finalValue(): number {
        return this._attackPower.finalValue +
            _.sum(_.map(this._dependentsCharacterAttributes, (characterAttribute) => {
                return characterAttribute.finalValue * this._dependentCharacterAttributeMultiplier;
            }))
            ;
    }

    constructor(options: {
        attackPower: CharacterAttributeInterface,
        dependentCharacterAttributes: CharacterAttributeInterface[],
    }) {
        this._attackPower = options.attackPower;
        this._dependentsCharacterAttributes = options.dependentCharacterAttributes;
        this._dependentCharacterAttributeMultiplier = 2;

        this._callbacks = [];
    }

    increaseBaseValue(value: unsigned): void {
        this._attackPower.increaseBaseValue(value);
    }

    view(callback: (data: {
        ID: string,
        baseValue: number,
        value: number,
    }) => void) {
        this._attackPower.view(callback);
    }

    render(callback: CharacterAttributeRenderCallback): void {
        if (!_.includes(this._callbacks, callback)) {
            this._callbacks.push(callback);
        }
        this.updateUI();
    }

    removeRender(callback: CharacterAttributeRenderCallback): void {
        _.pull(this._callbacks, callback);
    }

    updateUI(): void {
        for (let i = 0; i < this._callbacks.length; i++) {
            this._callbacks[i](CharacterAttributeID.AttackPower, this.finalValue);
        }
    }

    renderByRequest(ui: CharacterAttributeInterfaceRender): void {
        this._attackPower.renderByRequest(ui);
    }
}