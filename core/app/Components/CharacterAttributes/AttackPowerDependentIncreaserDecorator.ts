import CharacterAttributeInterface, {
    CharacterAttributeInterfaceRender
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
        this._attackPower.renderByRequest(ui);
    }
}