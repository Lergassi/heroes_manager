import _ from 'lodash'
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';
import {DebugFormatterID} from '../../../types/enums/DebugFormatterID.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {unsigned} from '../../../types/main.js';
import CharacterAttributeInterface, {
    CharacterAttributeInterfaceRender
} from '../../Decorators/CharacterAttributeInterface.js';
import DebugApp from '../../Services/DebugApp.js';

/**
 * @deprecated Не удобно. Переделать.
 */
export default class AttackPowerDependentIncreaseDecorator implements CharacterAttributeInterface {
    private readonly _attackPower: CharacterAttributeInterface;
    private readonly _dependentsCharacterAttributes: CharacterAttributeInterface[];
    private readonly _dependentCharacterAttributeMultiplier: unsigned;

    get value(): number {
        return this._attackPower.value +
            _.sum(_.map(this._dependentsCharacterAttributes, (characterAttribute) => {
                return characterAttribute.finalValue * this._dependentCharacterAttributeMultiplier;
            }))
            ;
    }

    get finalValue(): number {
        // return this._attackPower.finalValue +
        //     _.sum(_.map(this._dependentsCharacterAttributes, (characterAttribute) => {
        //         return characterAttribute.finalValue * this._dependentCharacterAttributeMultiplier;
        //     }))
        //     ;
        return this.value;
    }

    constructor(options: {
        attackPower: CharacterAttributeInterface,
        dependentCharacterAttributes: CharacterAttributeInterface[],
    }) {
        this._attackPower = options.attackPower;
        this._dependentsCharacterAttributes = options.dependentCharacterAttributes;
        this._dependentCharacterAttributeMultiplier = 2;
    }

    increase(value: number): number {
        return this._attackPower.increase(value);
    }

    decrease(value: number): number {
        return this._attackPower.decrease(value);
    }

    renderByRequest(ui: CharacterAttributeInterfaceRender): void {
        ui.updateCharacterAttributeFinalValue?.(CharacterAttributeID.AttackPower, this.finalValue);
    }

    debug(): void {
        DebugApp.debug(DebugNamespaceID.Debug)(DebugFormatterID.Json, {
            ID: CharacterAttributeID.AttackPower,
            baseValue: this.value,
            finalValue: this.finalValue,
        });
    }
}