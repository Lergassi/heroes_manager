import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttribute from '../Components/CharacterAttribute.js';
import EnemyCharacterAttributeGenerator from '../Services/BalanceTools/EnemyCharacterAttributeGenerator.js';
import EnemyCharacterAttributeStartValueGenerator from '../Services/EnemyCharacterAttributeStartValueGenerator.js';

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
                value = this._enemyCharacterAttributeGenerator.maxHealthPoints(level);
                break;
            case CharacterAttributeID.AttackPower:
                value = this._enemyCharacterAttributeGenerator.attackPower(level);
                break;
        }

        let characterAttribute = new CharacterAttribute(
            characterAttributeID,
            options?.baseValue ?? value,
        );

        return characterAttribute;
    }
}