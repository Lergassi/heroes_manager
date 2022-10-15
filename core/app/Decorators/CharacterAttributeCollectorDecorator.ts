import CharacterAttribute from '../Components/CharacterAttribute.js';
import {assert} from '../../source/assert.js';
import _ from 'lodash';
import CharacterAttributeCollector
    from '../Components/CharacterAttributeCollector.js';
import {unsigned} from '../types.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeComponentInterface from '../Interfaces/CharacterAttributeComponentInterface.js';

// export default class CharacterAttributeCollectorDecorator implements CharacterAttributeComponentInterface {
export default class CharacterAttributeCollectorDecorator {
    private readonly _characterAttributeID: CharacterAttributeID;
    private readonly _characterAttribute: CharacterAttribute;
    private readonly _characterAttributeCollectorComponent: CharacterAttributeCollector;

    constructor(options: {
        characterAttributeID: CharacterAttributeID,
        characterAttribute: CharacterAttribute,
        characterAttributeCollectorComponent: CharacterAttributeCollector,
    }) {
        assert(!_.isNil(options));
        assert(!_.isNil(options.characterAttributeID));
        assert(options.characterAttribute instanceof CharacterAttribute);
        assert(options.characterAttributeCollectorComponent instanceof CharacterAttributeCollector);

        this._characterAttribute = options.characterAttribute;
    }

    addBaseValue(value: unsigned): void {
        this._characterAttribute.add(value);
        this._characterAttributeCollectorComponent.add({
            ID: this._characterAttributeID,
            value: value,
        });
    }

    // value(): number {
    //     return this._characterAttribute.value() +
    //         this._characterAttributeCollectorComponent.tot
    //         ;
    // }
}