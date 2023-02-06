import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import {database} from '../../data/ts/database.js';
import {assert, assertNotNil} from '../../source/assert.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import {EntityID} from '../../types/enums/EntityID.js';
import {unsigned} from '../../types/main.js';
import AttackController from '../Components/AttackController.js';
import ArmorDecorator from '../Components/CharacterAttributes/ArmorDecorator.js';
import ExperienceGeneratorComponent from '../Components/ExperienceGeneratorComponent.js';
import GoldLootGeneratorComponent from '../Components/GoldLootGeneratorComponent.js';
import HealthPoints from '../Components/HealthPoints.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import ItemLootGeneratorComponent from '../Components/ItemLootGeneratorComponent.js';
import Level from '../Components/Level.js';
import LifeStateController from '../Components/LifeStateController.js';
import EnemyEntity from '../Entities/EnemyEntity.js';
import DamageControllerInterface from '../Interfaces/DamageControllerInterface.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import ExperienceDistributorInterface from '../Interfaces/ExperienceDistributorInterface.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import LevelInterface from '../Interfaces/LevelInterface.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import EnemyCharacterAttributeFactory from './EnemyCharacterAttributeFactory.js';
import GameObjectFactory from './GameObjectFactory.js';

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
        enemyTypeID: EnemyTypeID,
        level: number,
        options?: {
            baseCharacterAttributeValues: Partial<{[ID in CharacterAttributeID]: number}>,
        }
    ) {
        assert(level >= 1);
        assert(!_.isNil(enemyTypeID));

        // let enemyEntity = this._entityManager.get<EnemyEntity>(EntityID.EnemyEntity, enemyTypeID);
        // assert(enemyEntity instanceof EnemyEntity, sprintf('EnemyEntity (%s) не найден.', enemyTypeID));

        let enemy = this._gameObjectFactory.create();

        enemy.name = 'Enemy: ' + enemyTypeID;
        enemy.addTags('#enemy');

        let stateController = new LifeStateController();

        let itemCharacterAttributeCollector = new ItemCharacterAttributeCollector();

        enemy.set<EnemyTypeID>(ComponentID.EnemyTypeID, enemyTypeID);
        enemy.set<LevelInterface>(ComponentID.Level, new Level(level));

        let healthPointsComponent = enemy.set<HealthPoints>(ComponentID.HealthPoints, new HealthPoints(
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

        let attackPower = this._enemyCharacterAttributeFactory.create(
            CharacterAttributeID.AttackPower,
            level,
            itemCharacterAttributeCollector,
            {
                baseValue: options?.baseCharacterAttributeValues?.AttackPower,
            }
        );
        enemy.set(CharacterAttributeID.AttackPower, attackPower);

        enemy.set<AttackController>(ComponentID.AttackController, new AttackController(
            attackPower,
            stateController,
        ));

        let enemyLootData = database.enemies.loot.find(enemyTypeID);

        let experienceGeneratorComponent = enemy.set<ExperienceGeneratorComponent>(ComponentID.ExperienceLootGenerator, new ExperienceGeneratorComponent(
            enemyLootData?.exp,
        ));
        let goldLootGeneratorComponent = enemy.set<GoldLootGeneratorComponent>(ComponentID.GoldLootGenerator, new GoldLootGeneratorComponent({
            min: enemyLootData.money.min,
            max: enemyLootData.money.max,
        }));
        let itemLootGeneratorComponent = enemy.set<ItemLootGeneratorComponent>(ComponentID.ItemLootGenerator, new ItemLootGeneratorComponent({
            itemsLoot: enemyLootData.loot,
        }));

        return enemy;
    }
}