import Component from '../../source/Component.js';
import CharacterAttribute from './CharacterAttribute.js';
import {unsigned} from '../types.js';
import ItemCharacterAttributeCollector from './ItemCharacterAttributeCollector.js';
import _, {curryRight, round} from 'lodash';
import {assert} from '../../source/assert.js';
import CharacterAttributeCollector from './CharacterAttributeCollector.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import StateController from './StateController.js';

export default class AttackController implements AttackControllerInterface {
    private readonly _rangeSide: unsigned;
    private readonly _attackPowerCharacterAttribute: CharacterAttributeInterface;
    private readonly _stateController: StateController;

    constructor(
        attackPowerCharacterAttribute: CharacterAttributeInterface, //todo: Нужен дополнительная логика с числом для врагов.
        stateController: StateController,
    ) {
        assert(!_.isNil(attackPowerCharacterAttribute));
        assert(!_.isNil(stateController));
        // assert(options.attackPowerCharacterAttributeComponent instanceof CharacterAttributeComponent);
        // assert(options.attackPower instanceof CharacterAttributeValueCollector);
        // assert(!_.isNil(options.dependentCharacterAttributeComponents));

        this._rangeSide = 2;
        this._attackPowerCharacterAttribute = attackPowerCharacterAttribute;
        this._stateController = stateController;

    }

    /**
     * @deprecated
     */
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

    attack(): number {
        this._stateController.assertAnyAction();

        let value = this.value();

        return _.random(value.left, value.right);
    }
}