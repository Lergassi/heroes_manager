import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import CharacterAttribute from '../Components/CharacterAttribute.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import {unsigned} from '../types.js';
import CharacterAttributeValueGenerator, {
    BaseValueModifierCallback
} from '../Services/CharacterAttributeValueGenerator.js';

export default class CharacterAttributeFactory {
    private readonly _characterAttributeValueGenerator: CharacterAttributeValueGenerator;
    private readonly _mainCharacterAttributeMultiplier: unsigned = 2;

    constructor(
        characterAttributeValueGenerator: CharacterAttributeValueGenerator,
    ) {
        this._characterAttributeValueGenerator = characterAttributeValueGenerator;
    }

    create(
        ID: CharacterAttributeID,
        level: unsigned,
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,
        baseValueModifierCallback?: BaseValueModifierCallback,
    ) {
        let characterAttribute = new CharacterAttribute(
            ID,
            itemCharacterAttributeCollector,
        );
        characterAttribute.increaseBaseValue(this._characterAttributeValueGenerator.generate(
            ID,
            level,
            baseValueModifierCallback,
        ));

        // }) * (options.heroClass.isMainCharacterAttribute(CharacterAttributeID.Strength) ? this._mainCharacterAttributeMultiplier : 1));  //todo: Найти место где и как это сделать. Стратегия? Возможное решение: сюда надо передавать доп логику для генератора. Выбор логики делается выше. Сюда не надо передавать HeroClass, CharacterAttribute[] или другие сущности и компоненты.
        /*
            У класса есть список главных атрибутов.
         */

        return characterAttribute;
    }
}