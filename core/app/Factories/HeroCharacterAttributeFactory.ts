import {startCharacterAttributeConfig} from '../../config/start_character_values.js';
import {database} from '../../data/ts/database.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import CharacterAttribute from '../Components/CharacterAttribute.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import Balance from '../Services/Balance.js';
import CharacterAttributeValueGeneratorByConfig from '../Services/CharacterAttributeValueGeneratorByConfig.js';
import EnemyCharacterAttributeStartValueGenerator from '../Services/EnemyCharacterAttributeStartValueGenerator.js';

export default class HeroCharacterAttributeFactory {
    private readonly _characterAttributeStartValueFactory: EnemyCharacterAttributeStartValueGenerator;
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
        level: number,
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,   //todo: В декоратор.
        options?: { //todo: Времено пока в разработке. Далее для каждого класса будет своя логика без передачи из вне.
            baseValue?: number,
            // baseValueModifier?: CharacterAttributeValueModifier,
            // increaseValueModifier?: CharacterAttributeValueModifier,
        },
    ) {
        let balance = new Balance();

        let value = 0;
        switch (characterAttributeID) {
            case CharacterAttributeID.MaxHealthPoints:
                value = balance.baseHeroMaxHealthPoints(level, heroClassID);
                break;
            case CharacterAttributeID.AttackPower:
                value = balance.baseHeroAttackPower(level, heroClassID);
                break;
            default:
                value = database.heroes.character_attributes.startValue(heroClassID, characterAttributeID)
                break;
        }

        let characterAttribute = new CharacterAttribute(
            characterAttributeID,
            itemCharacterAttributeCollector,
            // options?.baseValue ?? this._generatorByConfig.generate(heroClassID, characterAttributeID),
            // options?.baseValue ?? database.heroes.character_attributes.startValue(heroClassID, characterAttributeID),
            options?.baseValue ?? value,
            // options?.baseValue ?? this._characterAttributeStartValueFactory.generate(
            //     characterAttributeID,
            //     level,
            //     options?.baseValueModifier,
            // )
        );

        return characterAttribute;
    }
}