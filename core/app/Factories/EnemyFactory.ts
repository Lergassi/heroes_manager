import GameObjectFactory from './GameObjectFactory.js';
import HealthPointsComponent from '../Components/HealthPointsComponent.js';
import {unsigned} from '../../types/main.js';
import GoldLootGeneratorComponent from '../Components/GoldLootGeneratorComponent.js';
import EntityManager from '../../source/EntityManager.js';
import ExperienceGeneratorComponent from '../Components/ExperienceGeneratorComponent.js';
import ItemLootGeneratorComponent from '../Components/ItemLootGeneratorComponent.js';
import _ from 'lodash';
import {assert} from '../../source/assert.js';
import {sprintf} from 'sprintf-js';
import {EnemyID} from '../../types/enums/EnemyID.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import {GameObjectKey} from '../../types/enums/GameObjectKey.js';
import ArmorDecorator from '../Components/CharacterAttributes/ArmorDecorator.js';
import CharacterAttributeFactory from './CharacterAttributeFactory.js';
import AttackController from '../Components/AttackController.js';
import StateController from '../Components/StateController.js';
import {EntityID} from '../../types/enums/EntityID.js';
import EnemyEntity from '../Entities/EnemyEntity.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';

export default class EnemyFactory {
    private readonly _gameObjectFactory: GameObjectFactory;
    private readonly _entityManager: EntityManagerInterface;
    private readonly _characterAttributeFactory: CharacterAttributeFactory;

    constructor(
        gameObjectFactory: GameObjectFactory,
        entityManager: EntityManagerInterface,
        characterAttributeFactory: CharacterAttributeFactory,
    ) {
        this._gameObjectFactory = gameObjectFactory;
        this._entityManager = entityManager;
        this._characterAttributeFactory = characterAttributeFactory;
    }

    create(
        enemyID: EnemyID,
        level: unsigned,
        options?: {
            characterAttributeValues: Partial<{[ID in CharacterAttributeID]: number}>,
        }
    ) {
        assert(level >= 1);
        assert(!_.isNil(enemyID));

        let enemyEntity = this._entityManager.get<EnemyEntity>(EntityID.EnemyEntity, enemyID);
        assert(enemyEntity instanceof EnemyEntity, sprintf('EnemyEntity (%s) не найден.', enemyID));

        // let enemyConfig = this._entityManager.get<EnemyConfig>(EntityID.EnemyConfig, enemyID);
        // assert(!_.isNil(enemyConfig), sprintf('EnemyConfig (%s) не найден.', enemyID));

        let enemy = this._gameObjectFactory.create();

        enemy.name = 'Enemy: ' + enemyID;
        enemy.addTags('#enemy');

        let stateController = new StateController();

        let itemCharacterAttributeCollector = new ItemCharacterAttributeCollector();

        //todo: Потом сделаю отдельный компонент для уровня.
        // let enemyComponent = enemy.set<EnemyComponent>(EnemyComponent.name, new EnemyComponent({
        //     enemyEntity: enemyEntity,
        //     level: level,
        // }));

        let healthPointsComponent = enemy.set<HealthPointsComponent>(HealthPointsComponent.name, new HealthPointsComponent(
            this._characterAttributeFactory.create(
                CharacterAttributeID.MaxHealthPoints,
                level,
                itemCharacterAttributeCollector,
            ),
            stateController,
        ));
        let armorDecorator = enemy.set<DamageControllerInterface>(GameObjectKey.DamageController, new ArmorDecorator(
            healthPointsComponent as DamageControllerInterface,
            this._characterAttributeFactory.create(
                CharacterAttributeID.Protection,
                level,
                itemCharacterAttributeCollector,
            ),
        ));

        enemy.set<AttackController>(GameObjectKey.AttackController, new AttackController(
            // new CharacterAttribute(
            //     CharacterAttributeID.AttackPower,
            //     new ItemCharacterAttributeCollector(),
            //     200,
            // ),
            this._characterAttributeFactory.create(
                CharacterAttributeID.AttackPower,
                level,
                itemCharacterAttributeCollector,    //todo: При такой реализации нельзя вообще изменить начальные настройки. Надо доработать.
                {
                    // baseValue: 1000,                //todo: Так? А тогда зачем модификатор? При указании baseValue и baseValueModifier одновременно baseValue работать не будет.
                    baseValue: options?.characterAttributeValues?.AttackPower,
                }
            ),
            stateController,
        ))

        //лут
        let itemLootGeneratorComponent = enemy.set<ItemLootGeneratorComponent>(ItemLootGeneratorComponent.name, enemyEntity.createLootGenerator());
        let goldLootGeneratorComponent = enemy.set<GoldLootGeneratorComponent>(GoldLootGeneratorComponent.name, enemyEntity.createGoldLootGenerator());
        let experienceGeneratorComponent = enemy.set<ExperienceGeneratorComponent>(ExperienceGeneratorComponent.name, enemyEntity.createExperienceLootGenerator());

        return enemy;
    }
}