import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import CharacterAttribute from '../Components/CharacterAttribute.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import {unsigned} from '../../types/main.js';
import EnemyCharacterAttributeGenerator from '../Services/BalanceTools/EnemyCharacterAttributeGenerator.js';
import HeroCharacterAttributeGenerator from '../Services/BalanceTools/HeroCharacterAttributeGenerator.js';
import EnemyCharacterAttributeStartValueGenerator, {
    CharacterAttributeValueModifier
} from '../Services/EnemyCharacterAttributeStartValueGenerator.js';
import CharacterAttributeValueGenerator from '../Services/CharacterAttributeValueGenerator.js';

/**
 * @deprecated У врагов не будет атрибутов - будет проще. Только сила и хп.
 */
export default class EnemyCharacterAttributeFactory {
    private readonly _enemyCharacterAttributeStartValueFactory: EnemyCharacterAttributeStartValueGenerator;
    private readonly _enemyCharacterAttributeGenerator: EnemyCharacterAttributeGenerator;

    constructor(enemyCharacterAttributeGenerator: EnemyCharacterAttributeGenerator) {
        this._enemyCharacterAttributeGenerator = enemyCharacterAttributeGenerator;
    }

    create(
        characterAttributeID: CharacterAttributeID,
        level: number,
        options?: {
            baseValue?: number,
        },
    ) {
        let value = 0;
        switch (characterAttributeID) {
            case CharacterAttributeID.MaxHealthPoints:
                value = this._enemyCharacterAttributeGenerator.defaultEnemyMaxHealthPoints(level);
                break;
            case CharacterAttributeID.AttackPower:
                value = this._enemyCharacterAttributeGenerator.defaultEnemyAttackPower(level);
                break;
        }

        let characterAttribute = new CharacterAttribute(
            characterAttributeID,
            new ItemCharacterAttributeCollector(),  //Временно, для совместимости.
            options?.baseValue ?? value,
            // options?.baseValue ?? this._enemyCharacterAttributeStartValueFactory.generate(
            //     characterAttributeID,
            //     level,
            // ),
        );

        return characterAttribute;
    }
}