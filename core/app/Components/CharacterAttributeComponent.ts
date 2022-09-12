import Component from '../../source/Component.js';
import CharacterAttribute from '../Entities/CharacterAttribute.js';
import GameObject from '../../source/GameObject.js';

export default class CharacterAttributeComponent extends Component {
    private readonly _characterAttribute: CharacterAttribute;
    private _baseValue: number;

    get characterAttribute(): CharacterAttribute {
        return this._characterAttribute;
    }

    get baseValue(): number {
        return this._baseValue;
    }

    set baseValue(value: number) {
        this._baseValue = value;
    }

    get finalValue(): number {
        return this._baseValue; //+Усиления от экипировки, баффов.
    }

    constructor(
        id: number,
        gameObject: GameObject,
        characterAttribute: CharacterAttribute,
        baseValue: number = 0,
    ) {
        super(id, gameObject);
        this._characterAttribute = characterAttribute;
        this._baseValue = baseValue;
    }
}