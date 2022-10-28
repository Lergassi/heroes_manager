import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import CharacterAttribute from '../Components/CharacterAttribute.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import {unsigned} from '../../types/main.js';
import CharacterAttributeStartValueGenerator, {
    CharacterAttributeValueModifier
} from '../Services/CharacterAttributeStartValueGenerator.js';
import CharacterAttributeValueGenerator from '../Services/CharacterAttributeValueGenerator.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import CharacterAttributeValueGeneratorByConfig from '../Services/CharacterAttributeValueGeneratorByConfig.js';
import {startCharacterAttributeConfig} from '../../config/start_character_values.js';

export default class HeroCharacterAttributeFactory {
    private readonly _characterAttributeStartValueFactory: CharacterAttributeStartValueGenerator;
    private readonly _generatorByConfig: CharacterAttributeValueGeneratorByConfig;

    constructor(
        // characterAttributeStartValueGenerator: CharacterAttributeStartValueGenerator,
    ) {
        // this._characterAttributeStartValueFactory = characterAttributeStartValueGenerator;
        this._generatorByConfig = new CharacterAttributeValueGeneratorByConfig(startCharacterAttributeConfig);
    }

    create(
        heroClassID: HeroClassID,
        characterAttributeID: CharacterAttributeID,
        level: unsigned,
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,   //todo: В декоратор.
        options?: { //todo: Времено пока в разработке. Далее для каждого класса будет своя логика без передачи из вне.
            baseValue?: number,
            // baseValueModifier?: CharacterAttributeValueModifier,
            // increaseValueModifier?: CharacterAttributeValueModifier,
        },
    ) {
        let characterAttribute = new CharacterAttribute(
            characterAttributeID,
            itemCharacterAttributeCollector,
            options?.baseValue ?? this._generatorByConfig.generate(heroClassID, characterAttributeID),
            // options?.baseValue ?? this._characterAttributeStartValueFactory.generate(
            //     characterAttributeID,
            //     level,
            //     options?.baseValueModifier,
            // )
        );

        return characterAttribute;
    }
}