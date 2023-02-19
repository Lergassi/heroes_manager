import debug from 'debug';
import _ from 'lodash'
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';
import {DebugFormatterID} from '../../../types/enums/DebugFormatterID.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {unsigned} from '../../../types/main.js';
import CharacterAttributeInterface, {
    CharacterAttributeInterfaceRender
} from '../../Decorators/CharacterAttributeInterface.js';

/**
 * @deprecated Не удобно. Переделать.
 */
export default class AttackPowerDependentIncreaseDecorator implements CharacterAttributeInterface {
    private readonly _attackPower: CharacterAttributeInterface;
    private readonly _dependentsCharacterAttributes: CharacterAttributeInterface[];
    private readonly _dependentCharacterAttributeMultiplier: unsigned;

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
    }

    increaseBaseValue(value: unsigned): void {
        this._attackPower.increaseBaseValue(value);
    }

    renderByRequest(ui: CharacterAttributeInterfaceRender): void {
        ui.updateCharacterAttributeFinalValue?.(CharacterAttributeID.AttackPower, this.finalValue);
    }

    debug(): void {
        debug(DebugNamespaceID.Debug)(DebugFormatterID.Json, {
            ID: CharacterAttributeID.AttackPower,
            baseValue: this.baseValue,
            finalValue: this.finalValue,
        });
    }
}