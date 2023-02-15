import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import {database} from '../../data/ts/database.js';
import {assert, assertIsGreaterThanOrEqual, assertNotNil} from '../../source/assert.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import {EntityID} from '../../types/enums/EntityID.js';
import {unsigned} from '../../types/main.js';
import AttackController from '../Components/AttackController.js';
import ArmorDecorator from '../Components/CharacterAttributes/ArmorDecorator.js';
import ExperienceLootGenerator from '../Components/ExperienceLootGenerator.js';
import GoldLootGenerator from '../Components/GoldLootGenerator.js';
import HealthPoints from '../Components/HealthPoints.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import ItemLootGenerator from '../Components/ItemLootGenerator.js';
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
            strategies?: {},
        }
    ) {
        assertIsGreaterThanOrEqual(level,1);
        assertNotNil(enemyTypeID);

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
                if (target?.itemStorage) itemLootGeneratorComponent.generate(target.itemStorage);
            }
        ));
        enemy.set<DamageControllerInterface>(ComponentID.DamageController, healthPointsComponent);

        // let armorDecorator = enemy.set<DamageControllerInterface>(ComponentID.DamageController, new ArmorDecorator(
        //     healthPointsComponent as DamageControllerInterface,
        //     this._enemyCharacterAttributeFactory.create(
        //         CharacterAttributeID.Protection,
        //         level,
        //         itemCharacterAttributeCollector,
        //     ),
        // ));

        let attackPower = enemy.set(CharacterAttributeID.AttackPower, this._enemyCharacterAttributeFactory.create(
            CharacterAttributeID.AttackPower,
            level,
            itemCharacterAttributeCollector,
            {
                baseValue: options?.baseCharacterAttributeValues?.AttackPower,
            }
        ));

        enemy.set<AttackController>(ComponentID.AttackController, new AttackController(
            attackPower,
            stateController,
        ));

        let itemLootGeneratorComponent = enemy.set<ItemLootGenerator>(ComponentID.ItemLootGenerator, new ItemLootGenerator());
        database.enemies.rewards.items(enemyTypeID, (itemID, count, chance) => {
            itemLootGeneratorComponent.addItem(itemID, count, chance);
        });
        let experienceGeneratorComponent = enemy.set<ExperienceLootGenerator>(ComponentID.ExperienceLootGenerator, new ExperienceLootGenerator(
            database.enemies.rewards.exp(enemyTypeID),
        ));
        let goldLootGeneratorComponent = enemy.set<GoldLootGenerator>(ComponentID.GoldLootGenerator, new GoldLootGenerator(database.enemies.rewards.money(enemyTypeID)));

        return enemy;
    }
}