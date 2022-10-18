import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import CharacterAttribute from '../Components/CharacterAttribute.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import {unsigned} from '../types.js';
import CharacterAttributeStartValueGenerator, {
    CharacterAttributeValueModifier
} from '../Services/CharacterAttributeStartValueGenerator.js';
import CharacterAttributeValueGenerator from '../Services/CharacterAttributeValueGenerator.js';

export default class CharacterAttributeFactory {
    private readonly _characterAttributeStartValueGenerator: CharacterAttributeStartValueGenerator;

    constructor(
        characterAttributeStartValueGenerator: CharacterAttributeStartValueGenerator,
    ) {
        this._characterAttributeStartValueGenerator = characterAttributeStartValueGenerator;
    }

    create(
        ID: CharacterAttributeID,
        level: unsigned,
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,
        options?: { //todo: Времено пока в разработке. Далее для каждого класса будет своя логика без передачи из вне.
            baseValueModifier?: CharacterAttributeValueModifier,
            increaseValueModifier?: CharacterAttributeValueModifier,
        },
    ) {
        let characterAttribute = new CharacterAttribute(
            ID,
            itemCharacterAttributeCollector,
            this._characterAttributeStartValueGenerator.generate(
                ID,
                level,
                options?.baseValueModifier,
            )
        );

        return characterAttribute;
    }
}