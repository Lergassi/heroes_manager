import CharacterAttributeInterface from '../../Decorators/CharacterAttributeInterface.js';
import {unsigned} from '../../../types/main.js';
import _ from 'lodash'
import CharacterAttribute from '../CharacterAttribute.js';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';
import ItemCharacterAttributeCollector from '../ItemCharacterAttributeCollector.js';

export default class AttackPowerDependentIncreaserDecorator implements CharacterAttributeInterface {
    private readonly _attackPower: CharacterAttributeInterface;
    private readonly _dependentsCharacterAttributes: CharacterAttributeInterface[];
    private readonly _dependentCharacterAttributeMultiplier: unsigned;

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

    value(): number {
        return this._attackPower.value() +
            _.sum(_.map(this._dependentsCharacterAttributes, (characterAttribute) => {
                return characterAttribute.value() * this._dependentCharacterAttributeMultiplier;
            }))
            ;
    }

    view(callback: (data: {
        ID: string,
        baseValue: number,
        value: number,
    }) => void) {
        this._attackPower.view(callback);
    }
}