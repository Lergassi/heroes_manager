import Component from '../../source/Component.js';
import CharacterAttribute from './CharacterAttribute.js';
import {unsigned} from '../types.js';
import ItemCharacterAttributeCollector from './ItemCharacterAttributeCollector.js';
import _, {curryRight, round} from 'lodash';
import {assert} from '../../source/assert.js';
import CharacterAttributeCollector from './CharacterAttributeCollector.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export default class AttackPowerComponent extends Component {
    private readonly _range: unsigned;
    private readonly _attackPowerCharacterAttributeComponent: CharacterAttribute;
    private readonly _itemAttributeCollectorComponent: ItemCharacterAttributeCollector;
    private readonly _attackPower: CharacterAttribute;
    private readonly _dependentCharacterAttributeComponents: CharacterAttribute[];
    private readonly _dependentCharacterAttributeMultiplier: number;

    constructor(options: {
        attackPower: CharacterAttribute,
        dependentCharacterAttributeComponents?: CharacterAttribute[],
    }) {
        super();
        // assert(options.attackPowerCharacterAttributeComponent instanceof CharacterAttributeComponent);
        // assert(options.attackPower instanceof CharacterAttributeValueCollector);
        assert(!_.isNil(options.attackPower));
        // assert(!_.isNil(options.dependentCharacterAttributeComponents));

        this._range = 10;
        this._attackPower = options.attackPower;
        this._dependentCharacterAttributeComponents = options.dependentCharacterAttributeComponents;
        this._dependentCharacterAttributeMultiplier = 2;
    }

    // /**
    //  * @deprecated
    //  */
    // finalMinAttackPower(): number {
    //     let value = this._attackPower.value() +
    //         _.sum(_.map(this._dependentCharacterAttributeComponents, (value) => {
    //             return value.value() * this._dependentCharacterAttributeMultiplier;
    //         })) -
    //         round(this._range / 2, 0)
    //         ;
    //
    //     return value < 0 ? 0 : value;
    // }
    //
    // /**
    //  * @deprecated
    //  */
    // finalMaxAttackPower(): number {
    //     return this._attackPower.value() +
    //         _.sum(_.map(this._dependentCharacterAttributeComponents, (value) => {
    //             return value.value() * this._dependentCharacterAttributeMultiplier;
    //             // return this._attackPower.totalValue(value['_characterAttribute']) * this._dependentCharacterAttributeMultiplier;
    //         })) +
    //         round(this._range / 2, 0)
    //         ;
    // }
    //
    // finalAttackPower(): number {
    //     return _.random(this.finalMinAttackPower(), this.finalMaxAttackPower());
    // }

    value(): {left: number; right: number} {
        let left = this._attackPower.value() +
            _.sum(_.map(this._dependentCharacterAttributeComponents, (value) => {
                return value.value() * this._dependentCharacterAttributeMultiplier;
            })) -
            round(this._range / 2, 0)
        ;
        left = left < 0 ? 0 : left;

        let right = this._attackPower.value() +
            _.sum(_.map(this._dependentCharacterAttributeComponents, (value) => {
                return value.value() * this._dependentCharacterAttributeMultiplier;
            })) +
            round(this._range / 2, 0)
            ;

        return {
            left: left,
            right: right,
        };
    }
}