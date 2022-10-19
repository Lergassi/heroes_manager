import GameObjectFactory from './GameObjectFactory.js';
import HealthPointsComponent from '../Components/HealthPointsComponent.js';
import {EnemyConfig, EntityManagerKey, unsigned} from '../types.js';
import GoldLootGeneratorComponent from '../Components/GoldLootGeneratorComponent.js';
import EnemyType from '../Entities/EnemyType.js';
import EntityManager from '../../source/EntityManager.js';
import EnemyComponent from '../Components/EnemyComponent.js';
import ExperienceGeneratorComponent from '../Components/ExperienceGeneratorComponent.js';
import ItemLootGeneratorComponent from '../Components/ItemLootGeneratorComponent.js';
import _ from 'lodash';
import ExperienceComponent from '../Components/ExperienceComponent.js';
import WalletComponent from '../Components/WalletComponent.js';
import {assert} from '../../source/assert.js';
import {sprintf} from 'sprintf-js';
import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import CharacterAttribute from '../Components/CharacterAttribute.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {GameObjectKey} from '../../types/enums/GameObjectKey.js';
import ArmorDecorator from '../Components/CharacterAttributes/ArmorDecorator.js';
import CharacterAttributeStartValueGenerator from '../Services/CharacterAttributeStartValueGenerator.js';
import CharacterAttributeValueGenerator from '../Services/CharacterAttributeValueGenerator.js';
import CharacterAttributeFactory from './CharacterAttributeFactory.js';
// import assert from 'assert';

// export type EnemyFactoryOptions = {
//     gameObjectFactory: GameObjectFactory;
//     entityManager: EntityManager;
//     playerExperienceComponent: ExperienceComponent;
//     playerWalletComponent: WalletComponent;
// };

export type EnemyFactoryCreateOptions = {
    level: unsigned;
    enemyTypeID: EnemyTypeID;
};

export default class EnemyFactory {
    private readonly _gameObjectFactory: GameObjectFactory;
    private readonly _entityManager: EntityManager;
    private readonly _characterAttributeFactory: CharacterAttributeFactory;

    constructor(options: {
        gameObjectFactory: GameObjectFactory,
        entityManager: EntityManager,
        characterAttributeFactory: CharacterAttributeFactory;
    }) {
        this._gameObjectFactory = options.gameObjectFactory;
        this._entityManager = options.entityManager;
        this._characterAttributeFactory = options.characterAttributeFactory;
    }

    create(
        enemyTypeID: EnemyTypeID,
        level: unsigned,
    ) {
        assert(level >= 1);
        assert(!_.isNil(enemyTypeID));

        let enemyType = this._entityManager.entity<EnemyType>(EntityManagerKey.EnemyType, enemyTypeID);
        assert(enemyType instanceof EnemyType, sprintf('EnemyType (%s) не найден.', enemyTypeID));

        let enemyConfig = this._entityManager.entity<EnemyConfig>(EntityManagerKey.EnemyConfig, enemyTypeID);
        assert(!_.isNil(enemyConfig), sprintf('EnemyConfig (%s) не найден.', enemyTypeID));

        let enemy = this._gameObjectFactory.create();

        enemy.name = 'Enemy: ' + enemyType.name;
        enemy.addTags('#enemy');

        let itemCharacterAttributeCollector = new ItemCharacterAttributeCollector();

        let enemyComponent = enemy.set<EnemyComponent>(EnemyComponent.name, new EnemyComponent({
            enemyType: enemyType,
            level: level,
        }));

        let healthPointsComponent = enemy.set<HealthPointsComponent>(HealthPointsComponent.name, new HealthPointsComponent(
            this._characterAttributeFactory.create(
                CharacterAttributeID.MaxHealthPoints,
                level,
                itemCharacterAttributeCollector,
            ),
        ));
        let armorDecorator = enemy.set<DamageControllerInterface>(GameObjectKey.DamageController, new ArmorDecorator(
            healthPointsComponent as DamageControllerInterface,
            this._characterAttributeFactory.create(
                CharacterAttributeID.Protection,
                level,
                itemCharacterAttributeCollector,
            ),
        ));
        // let attackPower =

        //лут
        let itemLootGeneratorComponent = enemy.set<ItemLootGeneratorComponent>(ItemLootGeneratorComponent.name, new ItemLootGeneratorComponent({
            itemsLoot: enemyConfig.loot,
        }));
        let goldLootGeneratorComponent = enemy.set<GoldLootGeneratorComponent>(GoldLootGeneratorComponent.name, new GoldLootGeneratorComponent({
            min: enemyConfig.gold[0],
            max: enemyConfig.gold[1],
        }));
        let experienceGeneratorComponent = enemy.set<ExperienceGeneratorComponent>(ExperienceGeneratorComponent.name, new ExperienceGeneratorComponent({
            exp: enemyConfig.exp,
        }));

        return enemy;
    }
}