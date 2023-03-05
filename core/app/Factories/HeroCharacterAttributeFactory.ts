import config from '../../config/config.js';
import {startCharacterAttributeConfig} from '../../config/start_character_values.js';
import {database} from '../../data/ts/database.js';
import {hero_classes} from '../../data/ts/hero_classes.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import CharacterAttribute from '../Components/CharacterAttribute.js';
import {item_attributes_formulas} from '../Services/BalanceTools/formulas/item_attributes_formulas.js';
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
        },
    ) {
        let value = 0;
        switch (characterAttributeID) {
            case CharacterAttributeID.MaxHealthPoints:
                value = this._heroCharacterAttributeGenerator.baseHeroMaxHealthPoints(level, heroClassID);
                break;
            case CharacterAttributeID.AttackPower:
                // value = this._heroCharacterAttributeGenerator.baseHeroAttackPower(level, heroClassID);
                break;
            case CharacterAttributeID.Strength:
            case CharacterAttributeID.Agility:
            case CharacterAttributeID.Intelligence:
                let attackPower = this._heroCharacterAttributeGenerator.baseHeroAttackPower(level, heroClassID);

                hero_classes.mainCharacterAttributes(heroClassID, (ID, startValueRatio) => {
                    if (ID === characterAttributeID) {
                        value = _.round(item_attributes_formulas.attackPowerToCharacterAttribute_revers(attackPower, config.default_character_attribute_to_attack_power_ratio) * startValueRatio);
                    }
                });
                break;
            default:
                // value = database.heroes.character_attributes.startValue(heroClassID, characterAttributeID);
                // value = this._heroCharacterAttributeGenerator.defaultBaseHeroAttackPower(level);
                break;
        }
        //todo: Добавить генерацию главных атрибутов. На основе рейтов. Пока будут нулевые значения.

        let characterAttribute = new CharacterAttribute(
            characterAttributeID,
            options?.baseValue ?? value,
        );

        return characterAttribute;
    }
}