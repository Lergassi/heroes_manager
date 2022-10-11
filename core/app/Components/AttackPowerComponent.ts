import Component from '../../source/Component.js';
import CharacterAttributeComponent from './CharacterAttributeComponent.js';
import CharacterAttribute from '../Entities/CharacterAttribute.js';
import {unsigned} from '../types.js';

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

    constructor(
        baseMinAttackPower: number,
        baseMaxAttackPower: number,
        dependentCharacterAttributes: CharacterAttribute[],
    ) {
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

    getFinalAttackPower(): unsigned {
        return 0;
    }
}