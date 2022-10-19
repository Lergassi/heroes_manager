import Component from '../../source/Component.js';
import CharacterAttribute from './CharacterAttribute.js';
import {unsigned} from '../types.js';
import ItemCharacterAttributeCollector from './ItemCharacterAttributeCollector.js';
import _, {curryRight, round} from 'lodash';
import {assert} from '../../source/assert.js';
import CharacterAttributeCollector from './CharacterAttributeCollector.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';

export default class AttackPowerComponent extends Component {
    private readonly _rangeSide: unsigned;
    private readonly _attackPowerCharacterAttribute: CharacterAttributeInterface;
    private readonly _dependentCharacterAttributeComponents: CharacterAttributeInterface[];
    private readonly _dependentCharacterAttributeMultiplier: number;

    constructor(
        attackPowerCharacterAttribute: CharacterAttributeInterface,
        dependentCharacterAttributeComponents?: CharacterAttributeInterface[],
    ) {
        super();
        // assert(options.attackPowerCharacterAttributeComponent instanceof CharacterAttributeComponent);
        // assert(options.attackPower instanceof CharacterAttributeValueCollector);
        assert(!_.isNil(attackPowerCharacterAttribute));
        // assert(!_.isNil(options.dependentCharacterAttributeComponents));

        this._rangeSide = 5;
        this._dependentCharacterAttributeMultiplier = 2;

        this._attackPowerCharacterAttribute = attackPowerCharacterAttribute;
        this._dependentCharacterAttributeComponents = dependentCharacterAttributeComponents;
    }

    value(): {left: number; right: number} {
        let left = this._attackPowerCharacterAttribute.value() -
            round(this._rangeSide, 0)
        ;
        left = left < 0 ? 0 : left;

        let right = this._attackPowerCharacterAttribute.value() +
            round(this._rangeSide, 0)
            ;

        return {
            left: left,
            right: right,
        };
    }

    generateAttackPower(): number {
        let value = this.value();

        return _.random(value.left, value.right);
    }
}