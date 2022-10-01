import Component from '../../source/Component.js';
import CharacterAttribute from '../Entities/CharacterAttribute.js';
import GameObject from '../../source/GameObject.js';
import EquipSlotComponent from './EquipSlotComponent.js';
import _ from 'lodash';

export default class CharacterAttributeComponent extends Component {
    private readonly _characterAttribute: CharacterAttribute;
    private _baseValue: number;
    private readonly _equipSlotComponents: EquipSlotComponent[];

    get characterAttribute(): CharacterAttribute {
        return this._characterAttribute;
    }

    get baseValue(): number {
        return this._baseValue;
    }

    set baseValue(value: number) {
        this._baseValue = value;

        this.update();
    }

    get finalValue(): number {
        //todo: DI? Или можно сделать один компонент, который будет отвечать за сбор всех показателей. А слоты и характеристики оставить независимыми.
        let finalValue = this._baseValue +
                // _.sum(this.gameObject.getComponents<EquipSlotComponent>(EquipSlotComponent).map((equipSlotComponent) => {
                //     return !equipSlotComponent.isFree() ? equipSlotComponent.itemStack.item.increase(this._characterAttribute) : 0;
                // }))

                // _.sumBy(this.gameObject.getComponents<EquipSlotComponent>(EquipSlotComponent).filter((equipSlotComponent) => {
                //     return !equipSlotComponent.isFree();
                // }), (equipSlotComponent) => {
                //     return equipSlotComponent.itemStack.item.increase(this._characterAttribute);
                // })

                // _.sumBy(this.gameObject.getComponents<EquipSlotComponent>(EquipSlotComponent), (equipSlotComponent) => {
                //     return !equipSlotComponent.isFree() ? equipSlotComponent.itemStack.item.increase(this._characterAttribute) : 0;
                // })
                _.sumBy(this._equipSlotComponents, (equipSlotComponent) => {
                    return !equipSlotComponent.isFree() ? equipSlotComponent.itemStack.item.increase(this._characterAttribute) : 0;
                })
            ;

        return finalValue;
    }

    constructor(
        // id: number,
        // gameObject: GameObject,
        characterAttribute: CharacterAttribute,
        equipSlotComponents: EquipSlotComponent[],
        baseValue: number = 0,
    ) {
        // super(id, gameObject);
        super();
        this._characterAttribute = characterAttribute;
        this._baseValue = baseValue;
        this._equipSlotComponents = equipSlotComponents;
    }
}