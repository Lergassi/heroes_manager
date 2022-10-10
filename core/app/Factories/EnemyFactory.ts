import GameObjectFactory from './GameObjectFactory.js';
import HealthPointsComponent, {HealthPointsComponentEventCode} from '../Components/HealthPointsComponent.js';
import {
    EnemyTypeAlias,
    EnemyConfig,
    EnemyConfigs,
    EntityManagerKey,
    Loot,
    unsigned,
    EnemyConfigRecord, CurrencyAlias
} from '../types.js';
import GoldLootGeneratorComponent from '../Components/GoldLootGeneratorComponent.js';
import EnemyType from '../Entities/EnemyType.js';
import EntityManager from '../../source/EntityManager.js';
import Item from '../Entities/Item.js';
import EnemyComponent from '../Components/EnemyComponent.js';
import ContainerInterface from '../../source/ContainerInterface.js';
import ExperienceGeneratorComponent from '../Components/ExperienceGeneratorComponent.js';
import ItemLootGeneratorComponent from '../Components/ItemLootGeneratorComponent.js';
import AppError from '../../source/Errors/AppError.js';
import _ from 'lodash';
import EventSystem from '../../source/EventSystem.js';
import ExperienceComponent from '../Components/ExperienceComponent.js';
import WalletComponent from '../Components/WalletComponent.js';
import Currency from '../Entities/Currency.js';
import {assert} from '../../source/functions.js';
// import assert from 'assert';

// export type EnemyFactoryOptions = {
//     gameObjectFactory: GameObjectFactory;
//     entityManager: EntityManager;
//     playerExperienceComponent: ExperienceComponent;
//     playerWalletComponent: WalletComponent;
// };

export type EnemyFactoryCreateOptions = {
    level: unsigned;
    type: EnemyType;
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
        assert(
            !_.isNil(options.type) &&
            options.type instanceof EnemyType
        );

        let enemyConfig = this._entityManager.entity<EnemyConfig>(EntityManagerKey.EnemyConfig, options.type.alias);    //todo: Пока без классов.
        if (!enemyConfig) {
            throw new AppError('Для врага не найден EnemyConfig.');
        }

        let enemy = this._gameObjectFactory.create();

        let enemyComponent = enemy.set<EnemyComponent>(EnemyComponent.name, new EnemyComponent({
            enemyType: options.type,
            level: options.level,
        }));
        let healthPointsComponent = enemy.set<HealthPointsComponent>(HealthPointsComponent.name, new HealthPointsComponent(
            100,
            100,
        ));

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

        // EventSystem.addListener({
        //     codes: [
        //         HealthPointsComponentEventCode.Died,
        //     ],
        //     listener: {
        //         target: healthPointsComponent,
        //         callback: (target) => {
        //             goldLootGeneratorComponent.transfer(walletComponent);           //Кошелек локации.
        //             experienceGeneratorComponent.distribute(experienceComponents);  //Все герои.
        //         },
        //     },
        // });

        return enemy;
    }
}