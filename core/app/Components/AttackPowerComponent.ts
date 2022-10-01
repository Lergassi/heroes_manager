import Component from '../../source/Component.js';
import CharacterAttributeComponent from './CharacterAttributeComponent.js';
import GameObject from '../../source/GameObject.js';
import CharacterAttribute from '../Entities/CharacterAttribute.js';

export default class AttackPowerComponent extends Component {
    /**
     * Постоянное минимальное значения диапазона урона. Повышаются с уровнем. Не зависит ни от чего.
     * @private
     */
    private _baseMinAttackPower: number;

    /**
     * Постоянное максимальное значения диапазона урона. Повышаются с уровнем. Не зависит ни от чего.
     * @private
     */
    private _baseMaxAttackPower: number;
    private readonly _dependentCharacterAttributeComponents: CharacterAttributeComponent[];

    get baseMinAttackPower(): number {
        return this._baseMinAttackPower;
    }

    set baseMinAttackPower(value: number) {
        this._baseMinAttackPower = value;
    }

    get baseMaxAttackPower(): number {
        return this._baseMaxAttackPower;
    }

    set baseMaxAttackPower(value: number) {
        this._baseMaxAttackPower = value;
    }

    get dependentCharacterAttributeComponents(): CharacterAttributeComponent[] {
        return this._dependentCharacterAttributeComponents;
    }

    get dependents() {
        return [
            CharacterAttributeComponent.name,
        ];
    }

    constructor(
        // id: number,
        // gameObject: GameObject,
        baseMinAttackPower: number,
        baseMaxAttackPower: number,
        dependentCharacterAttributes: CharacterAttribute[]
    ) {
        // super(id, gameObject);
        super();
        this._baseMinAttackPower = baseMinAttackPower;
        this._baseMaxAttackPower = baseMaxAttackPower;

        //todo: В зависимости. Зависимости должны быть указаны отдельно для сохранения и загрузки.
        //todo: В GameObjectStorage.
        // this._dependentCharacterAttributeComponents = gameObject
        //     .findComponentsByName(CharacterAttributeComponent.name)
        //     .filter((characterAttributeComponentFound: CharacterAttributeComponent) => {
        //         return dependentCharacterAttributes.some((characterAttributeComponent) => {
        //             return characterAttributeComponent === characterAttributeComponentFound.characterAttribute;
        //         });
        //     });

        // this._dependentCharacterAttributeComponents = <CharacterAttributeComponent[]>gameObject
        //     .findComponentsByName(CharacterAttributeComponent.name)
        //     .filter((characterAttributeComponentFound: CharacterAttributeComponent) => {
        //         return dependentCharacterAttributes.some((characterAttributeComponent) => {
        //             return characterAttributeComponent === characterAttributeComponentFound.characterAttribute;
        //         });
        //     })
        // ;
    }
}