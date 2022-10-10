import Component from '../../source/Component.js';
import CharacterAttribute from '../Entities/CharacterAttribute.js';
import GameObject from '../../source/GameObject.js';
import EquipSlotComponent from './EquipSlotComponent.js';
import _ from 'lodash';
import {CharacterAttributeID, unsigned} from '../types.js';
import ItemAttributeCollectorComponent from './ItemAttributeCollectorComponent.js';

export default class CharacterAttributeComponent extends Component {
    private _characterAttributeID: CharacterAttributeID;
    private _baseValue: number;
    private _increaseItemCollector: ItemAttributeCollectorComponent;

    constructor(options: {
        characterAttributeID: CharacterAttributeID, //todo: Или string?
        baseValue: number,
        increaseItemCollector: ItemAttributeCollectorComponent,
    }) {
        super();
        this._characterAttributeID = options.characterAttributeID;
        this._baseValue = options.baseValue;
        this._increaseItemCollector = options.increaseItemCollector;
    }

    getFinalValue(): number {
        return this._baseValue + this._increaseItemCollector.increaseCharacterAttribute(this._characterAttributeID);
    }
}