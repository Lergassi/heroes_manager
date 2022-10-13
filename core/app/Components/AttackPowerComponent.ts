import Component from '../../source/Component.js';
import CharacterAttributeComponent from './CharacterAttributeComponent.js';
import {unsigned} from '../types.js';
import ItemAttributeCollectorComponent from './ItemAttributeCollectorComponent.js';
import _, {round} from 'lodash';
import {assert} from '../../source/assert.js';
import CharacterAttributeRawValueCollectorComponent from './CharacterAttributeRawValueCollectorComponent.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export default class AttackPowerComponent extends Component {
    private readonly _range: unsigned;
    private readonly _attackPowerCharacterAttributeComponent: CharacterAttributeComponent;
    private readonly _itemAttributeCollectorComponent: ItemAttributeCollectorComponent;
    private readonly _characterAttributeCollectorComponent: CharacterAttributeRawValueCollectorComponent;
    private readonly _dependentCharacterAttributeComponents: CharacterAttributeComponent[];
    private readonly _dependentCharacterAttributeMultiplier: number;

    constructor(options: {
        range: unsigned,
        characterAttributeCollectorComponent: CharacterAttributeRawValueCollectorComponent,
        dependentCharacterAttributeComponents: CharacterAttributeComponent[],
    }) {
        super();
        // assert(options.attackPowerCharacterAttributeComponent instanceof CharacterAttributeComponent);
        assert(options.characterAttributeCollectorComponent instanceof CharacterAttributeRawValueCollectorComponent);
        assert(!_.isNil(options.dependentCharacterAttributeComponents));

        this._range = options.range;
        this._characterAttributeCollectorComponent = options.characterAttributeCollectorComponent;
        this._dependentCharacterAttributeComponents = options.dependentCharacterAttributeComponents;
        this._dependentCharacterAttributeMultiplier = 2;
    }

    /**
     * @deprecated
     */
    finalMinAttackPower(): number {
        let value = this._characterAttributeCollectorComponent.totalValue(CharacterAttributeID.AttackPower) +
            _.sum(_.map(this._dependentCharacterAttributeComponents, (value) => {
                // return value.finalValue() * this._dependentCharacterAttributeMultiplier;
                return this._characterAttributeCollectorComponent.totalValue(value['_characterAttributeID']) * this._dependentCharacterAttributeMultiplier;
            })) -
            round(this._range / 2, 0)
            ;

        //todo: А если значение min получиться больше max? Или методы буду вызваны с задержкой.
        return value < 0 ? 0 : value;
    }

    /**
     * @deprecated
     */
    finalMaxAttackPower(): number {
        return this._characterAttributeCollectorComponent.totalValue(CharacterAttributeID.AttackPower) +
            _.sum(_.map(this._dependentCharacterAttributeComponents, (value) => {
                return this._characterAttributeCollectorComponent.totalValue(value['_characterAttribute']) * this._dependentCharacterAttributeMultiplier;
            })) +
            round(this._range / 2, 0)
            ;
    }

    finalAttackPower(): number {
        return _.random(this.finalMinAttackPower(), this.finalMaxAttackPower());
    }
}