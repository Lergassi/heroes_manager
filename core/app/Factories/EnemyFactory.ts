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
import {ComponentID} from '../../types/enums/ComponentID.js';
import ArmorDecorator from '../Components/CharacterAttributes/ArmorDecorator.js';
import EnemyCharacterAttributeFactory from './EnemyCharacterAttributeFactory.js';
import AttackController from '../Components/AttackController.js';
import CharacterStateController from '../Components/CharacterStateController.js';
import {EntityID} from '../../types/enums/EntityID.js';
import EnemyEntity from '../Entities/EnemyEntity.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import ExperienceComponent from '../Components/ExperienceComponent.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import ExperienceDistributorInterface from '../Interfaces/ExperienceDistributorInterface.js';

export default class EnemyFactory {
    private readonly _gameObjectFactory: GameObjectFactory;
    private readonly _entityManager: EntityManagerInterface;
    private readonly _enemyCharacterAttributeFactory: EnemyCharacterAttributeFactory;

    constructor(
        gameObjectFactory: GameObjectFactory,
        entityManager: EntityManagerInterface,
        characterAttributeFactory: EnemyCharacterAttributeFactory,
    ) {
        this._gameObjectFactory = gameObjectFactory;
        this._entityManager = entityManager;
        this._enemyCharacterAttributeFactory = characterAttributeFactory;
    }

    create(
        enemyID: EnemyID,
        level: unsigned,
        options?: {
            baseCharacterAttributeValues: Partial<{[ID in CharacterAttributeID]: number}>,
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

        let stateController = new CharacterStateController();

        let itemCharacterAttributeCollector = new ItemCharacterAttributeCollector();

        //todo: Потом сделаю отдельный компонент для уровня.
        // let enemyComponent = enemy.set<EnemyComponent>(EnemyComponent.name, new EnemyComponent({
        //     enemyEntity: enemyEntity,
        //     level: level,
        // }));

        let experienceGeneratorComponent = enemy.set<ExperienceGeneratorComponent>(ExperienceGeneratorComponent.name, enemyEntity.createExperienceLootGenerator());
        let goldLootGeneratorComponent = enemy.set<GoldLootGeneratorComponent>(GoldLootGeneratorComponent.name, enemyEntity.createGoldLootGenerator());
        let itemLootGeneratorComponent = enemy.set<ItemLootGeneratorComponent>(ItemLootGeneratorComponent.name, enemyEntity.createLootGenerator());

        let healthPointsComponent = enemy.set<HealthPointsComponent>(ComponentID.HealthPoints, new HealthPointsComponent(
            this._enemyCharacterAttributeFactory.create(
                CharacterAttributeID.MaxHealthPoints,
                level,
                itemCharacterAttributeCollector,
                {
                    baseValue: options?.baseCharacterAttributeValues?.MaxHealthPoints,
                },
            ),
            stateController,
            (target?: {
                experienceDistributor?: ExperienceDistributorInterface,
                wallet?: WalletInterface,
                itemStorage?: ItemStorageInterface,
            }) => {
                console.log('this is HealthPointsComponent callback target', target);
                if (target?.experienceDistributor) experienceGeneratorComponent.distribute(target.experienceDistributor);
                if (target?.wallet) goldLootGeneratorComponent.transfer(target.wallet);
                if (target?.itemStorage) itemLootGeneratorComponent.generate();
            }
        ));
        let armorDecorator = enemy.set<DamageControllerInterface>(ComponentID.DamageController, new ArmorDecorator(
            healthPointsComponent as DamageControllerInterface,
            this._enemyCharacterAttributeFactory.create(
                CharacterAttributeID.Protection,
                level,
                itemCharacterAttributeCollector,
            ),
        ));

        enemy.set<AttackController>(ComponentID.AttackController, new AttackController(
            // new CharacterAttribute(
            //     CharacterAttributeID.AttackPower,
            //     new ItemCharacterAttributeCollector(),
            //     200,
            // ),
            this._enemyCharacterAttributeFactory.create(
                CharacterAttributeID.AttackPower,
                level,
                itemCharacterAttributeCollector,
                {
                    baseValue: options?.baseCharacterAttributeValues?.AttackPower,
                }
            ),
            stateController,
        ))

        return enemy;
    }
}