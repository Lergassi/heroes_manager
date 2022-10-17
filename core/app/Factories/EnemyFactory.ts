import GameObjectFactory from './GameObjectFactory.js';
import HealthPointsComponent from '../Components/HealthPointsComponent.js';
import {EnemyConfig, EntityManagerKey, unsigned} from '../types.js';
import GoldLootGeneratorComponent from '../Components/GoldLootGeneratorComponent.js';
import EnemyType from '../Entities/EnemyType.js';
import EntityManager from '../../source/EntityManager.js';
import EnemyComponent from '../Components/EnemyComponent.js';
import ExperienceGeneratorComponent from '../Components/ExperienceGeneratorComponent.js';
import ItemLootGeneratorComponent from '../Components/ItemLootGeneratorComponent.js';
import AppError from '../../source/Errors/AppError.js';
import _ from 'lodash';
import ExperienceComponent from '../Components/ExperienceComponent.js';
import WalletComponent from '../Components/WalletComponent.js';
import {assert} from '../../source/assert.js';
import {sprintf} from 'sprintf-js';
import AttackPowerComponent from '../Components/AttackPowerComponent.js';
import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
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
    private readonly _playerExperienceComponent: ExperienceComponent;
    private readonly _playerWalletComponent: WalletComponent;
    // private readonly _walletComponentFactory: WalletComponentFactory;

    constructor(options: {
        gameObjectFactory: GameObjectFactory,
        entityManager: EntityManager,
        playerExperienceComponent: ExperienceComponent,
        playerWalletComponent: WalletComponent,
        // walletComponentFactory: WalletComponentFactory,
    }) {
        this._gameObjectFactory = options.gameObjectFactory;
        this._entityManager = options.entityManager;
        this._playerExperienceComponent = options.playerExperienceComponent;
        this._playerWalletComponent = options.playerWalletComponent;
    }

    create(options: EnemyFactoryCreateOptions) {
        assert(options.level >= 1);
        assert(!_.isNil(options.enemyTypeID));

        let enemyType = this._entityManager.entity<EnemyType>(EntityManagerKey.EnemyType, options.enemyTypeID);
        assert(enemyType instanceof EnemyType, sprintf('EnemyType (%s) не найден.', options.enemyTypeID));

        // let enemyConfig = this._entityManager.entity<EnemyConfig>(EntityManagerKey.EnemyConfig, options.type.alias);    //todo: Пока без классов.
        let enemyConfig = this._entityManager.entity<EnemyConfig>(EntityManagerKey.EnemyConfig, options.enemyTypeID);
        assert(!_.isNil(enemyConfig), sprintf('EnemyConfig (%s) не найден.', options.enemyTypeID));

        let enemy = this._gameObjectFactory.create();

        enemy.name = 'Enemy: ' + enemyType.name;
        enemy.addTags('#enemy');

        let enemyComponent = enemy.set<EnemyComponent>(EnemyComponent.name, new EnemyComponent({
            enemyType: enemyType,
            level: options.level,
        }));
        let healthPointsComponent = enemy.set<HealthPointsComponent>(HealthPointsComponent.name, new HealthPointsComponent(
            100,
        ));
        // enemy.set(AttackPowerComponent.name, new AttackPowerComponent({
        //     baseMinAttackPower: 10,
        //     baseMaxAttackPower: 20,
        // }));

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