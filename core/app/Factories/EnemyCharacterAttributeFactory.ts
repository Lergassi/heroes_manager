import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import CharacterAttribute from '../Components/CharacterAttribute.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import {unsigned} from '../../types/main.js';
import EnemyCharacterAttributeStartValueGenerator, {
    CharacterAttributeValueModifier
} from '../Services/EnemyCharacterAttributeStartValueGenerator.js';
import CharacterAttributeValueGenerator from '../Services/CharacterAttributeValueGenerator.js';

/**
 * @deprecated У врагов не будет атрибутов - будет проще. Только сила и хп.
 */
export default class EnemyCharacterAttributeFactory {
    private readonly _enemyCharacterAttributeStartValueFactory: EnemyCharacterAttributeStartValueGenerator;

    constructor(
        characterAttributeStartValueGenerator: EnemyCharacterAttributeStartValueGenerator,
    ) {
        this._enemyCharacterAttributeStartValueFactory = characterAttributeStartValueGenerator;
    }

    create(
        ID: CharacterAttributeID,
        level: unsigned,
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,   //todo: В декоратор.
        options?: {
            baseValue?: number,
        },
    ) {
        let characterAttribute = new CharacterAttribute(
            ID,
            itemCharacterAttributeCollector,
            options?.baseValue ?? this._enemyCharacterAttributeStartValueFactory.generate(
                ID,
                level,
            )
        );

        return characterAttribute;
    }
}