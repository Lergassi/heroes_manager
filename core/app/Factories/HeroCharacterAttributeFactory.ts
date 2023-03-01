import {startCharacterAttributeConfig} from '../../config/start_character_values.js';
import {database} from '../../data/ts/database.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import CharacterAttribute from '../Components/CharacterAttribute.js';
import CharacterAttributeManager from '../Components/CharacterAttributeManager.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import HeroCharacterAttributeGenerator from '../Services/BalanceTools/HeroCharacterAttributeGenerator.js';
import CharacterAttributeValueGeneratorByConfig from '../Services/CharacterAttributeValueGeneratorByConfig.js';
import EnemyCharacterAttributeStartValueGenerator from '../Services/EnemyCharacterAttributeStartValueGenerator.js';

export default class HeroCharacterAttributeFactory {
    private readonly _characterAttributeStartValueFactory: EnemyCharacterAttributeStartValueGenerator;
    private readonly _generatorByConfig: CharacterAttributeValueGeneratorByConfig;
    private readonly _heroCharacterAttributeGenerator: HeroCharacterAttributeGenerator;

    constructor(
        heroCharacterAttributeGenerator: HeroCharacterAttributeGenerator,
    ) {
        this._generatorByConfig = new CharacterAttributeValueGeneratorByConfig(startCharacterAttributeConfig);
        this._heroCharacterAttributeGenerator = heroCharacterAttributeGenerator;
    }

    create(
        heroClassID: HeroClassID,
        characterAttributeID: CharacterAttributeID,
        level: number,
        options?: { //todo: Времено пока в разработке. Далее для каждого класса будет своя логика без передачи из вне.
            baseValue?: number,
            // baseValueModifier?: CharacterAttributeValueModifier,
            // increaseValueModifier?: CharacterAttributeValueModifier,
        },
    ) {
        let value = 0;
        switch (characterAttributeID) {
            case CharacterAttributeID.MaxHealthPoints:
                value = this._heroCharacterAttributeGenerator.baseHeroMaxHealthPoints(level, heroClassID);
                break;
            case CharacterAttributeID.AttackPower:
                value = this._heroCharacterAttributeGenerator.baseHeroAttackPower(level, heroClassID);
                break;
            default:
                // value = database.heroes.character_attributes.startValue(heroClassID, characterAttributeID);
                // value = this._heroCharacterAttributeGenerator.defaultBaseHeroAttackPower(level);
                break;
        }
        //todo: Добавить генерацию главных атрибутов. На основе рейтов. Пока будут нулевые значения.

        let characterAttribute = new CharacterAttribute(
            characterAttributeID,
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