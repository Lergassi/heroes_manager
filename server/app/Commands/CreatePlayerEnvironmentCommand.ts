import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import debug from 'debug';
import fs from 'fs';
import Currency from '../../../core/app/Entities/Currency.js';
import ItemStackPattern from '../../../core/app/RuntimeObjects/ItemStackPattern.js';
import Item from '../../../core/app/Entities/Item.js';
import HeroClass from '../../../core/app/Entities/HeroClass.js';
import PlayerFactory from '../../../core/app/Factories/PlayerFactory.js';
import GameObjectStorage from '../../../core/source/GameObjectStorage.js';
import HeroFactory from '../../../core/app/Factories/HeroFactory.js';
import EntityManager from '../../../core/source/EntityManager.js';
import ItemStorageManager from '../../../core/app/Services/ItemStorageManager.js';
import BasicItemStorageFactory from '../../../core/app/Factories/BasicItemStorageFactory.js';
import WalletFactory from '../../../core/app/Factories/WalletFactory.js';
import Security from '../../source/Security.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import PlayerDBObjectFactory from '../Factories/PlayerDBObjectFactory.js';
import PlayerDBObjectRepository from '../Repositories/PlayerDBObjectRepository.js';
import PlayerDBObject from '../DBObjects/PlayerDBObject.js';
import {Pool} from 'mysql';
import _ from 'lodash';
import PlayerContainerConfigure from '../../../core/app/PlayerContainerConfigure.js';
import PathResolver from '../../source/PathResolver.js';
import UUIDGenerator from '../../../core/source/UUIDGenerator.js';
import ItemStorageFactoryInterface from '../../../core/app/Factories/ItemStorageFactoryInterface.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../../../core/app/Components/ItemStorageComponent.js';
import IDGeneratorInterface from '../../../core/source/IDGeneratorInterface.js';

export default class CreatePlayerEnvironmentCommand extends Command {
    get name(): string {
        return 'create_player_env';
    }

    configure() {
        super.configure();
        this.addArgument('name', '', true);
    }

    get description(): string {
        return 'Создает окружение игрока необходимые для игры.';
    }

    async execute(input: Input) {
        this.container.get<Security>('server.security').assertIsUserLoaded();
        this.container.get<Security>('server.security').assertIsPlayerAlreadyLoaded();

        let name: string = _.trim(input.getArgument('name'));

        let playerDBObject = this.container.get<PlayerDBObjectFactory>('server.playerDBObjectFactory').create(name, this.container.get<Security>('server.security').user);
        this.container.get<Pool>('server.database.pool').getConnection((err, connection) => {
            new Promise((resolve, reject) => {
                connection.beginTransaction((error) => {
                    this.container.get<PlayerDBObjectRepository<PlayerDBObject>>('server.playerDBObjectRepository').save(connection, playerDBObject, resolve, reject);
                });//beginTransaction
            })
                .then(async () => {
                    this.container.get<Security>('server.security').loginPlayer(playerDBObject);
                    debug('info')('Игрок создан: ' + playerDBObject['_id']);

                    //Без save_inject.
                    // (new CoreContainerConfigure()).configure(this.container);
                    (new PlayerContainerConfigure()).configure(this.container);

                    let playerGameObject = this.container.get<PlayerFactory>('player.playerFactory').create();
                    this.container.get<GameObjectStorage>('player.gameObjectStorage').add(playerGameObject);

                    //Создание директорий.
                    let playerSaveDir = this.container.get<PathResolver>('server.pathResolver').resolve(
                        'server/data/saves',
                        this.container.get<Security>('server.security').user.id.toString(),
                        playerDBObject['_id'].toString(),
                    );
                    fs.mkdirSync(playerSaveDir);
                    fs.chownSync(playerSaveDir, 1001, 1001);

                    debug('info')('Директория создана: ' + playerSaveDir);

                    //todo: Вся подобная логика в отдельные классы.
                    //Окружение игрока.
                    this._createWallets();

                    //todo: Начальные объекты игрока убрать в другое место.
                    //Начальные объекты.
                    this._createStartItemStorages();
                    this._createStartItems();
                    this._createStartHeroes();

                    //todo: Сохранение должно происходить отдельно. При создании игрока нужно производить только подготовку: директории.
                    await this.container.get<GameConsole>('gameConsole').run('save_player_env');

                    connection.commit();
                })
                .catch((error) => {
                    debug('error')(error);
                    connection.rollback();
                })
            ;
        });//end Promise connection.beginTransaction
    }

    private _createWallets() {
        let config = this.container.get<object>('core.config');

        let currencies = [
            'currency_gold',
            'currency_research_points',
        ];

        currencies.forEach((currencyAlias) => {
            this.container.get<GameObjectStorage>('player.gameObjectStorage').add(this.container.get<WalletFactory>('player.walletFactory').create(
                this.container.get<EntityManager>('core.entityManager').getRepository<Currency>(Currency.name).getOneByAlias(currencyAlias),
                config['start_wallet_values'][currencyAlias]['value'],
            ));
        });
    }

    private _createStartItemStorages() {
        this.container.get<ItemStorageFactoryInterface>('player.playerItemStorageFactory').create(DEFAULT_ITEM_STORAGE_SIZE);
        this.container.get<ItemStorageFactoryInterface>('player.playerItemStorageFactory').create(DEFAULT_ITEM_STORAGE_SIZE);
    }

    private _createStartItems() {
        let itemStackBuilders = [
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_wood'),
                10,
                ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_iron_ore'),
                10,
                ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_one_handed_sword_01'),
                1,
                ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_one_handed_sword_01'),
                1,
                ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_plate_helmet_01'),
                1,
                ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_plate_boots_01'),
                1,
                ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_shield_01'),
                1,
                ),
        ];

        itemStackBuilders.forEach((itemStackBuilder) => {
            this.container.get<ItemStorageManager>('player.itemStorageManager').addItem(itemStackBuilder);
        });
    }

    private _createStartHeroes() {
        //todo: config
        //todo: Сделать заготовки для разных задач. Это в репозиторий. Герои создаются НА основе паттерном. Паттер можно взять уже готовый (для начальных героев) или сделать новый. Только не путать с данными для создания героя в целом.
        let heroPatterns = [
            {
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
                level: 1,
                equip: {
                    equip_slot_chest: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_plate_breastplate_01'),
                    ),
                    equip_slot_legs: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_plate_pants_01'),
                    ),
                    equip_slot_foots: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_plate_boots_01'),
                    ),
                    equip_slot_right_hand: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_one_handed_sword_01'),
                    ),
                    equip_slot_left_hand: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_shield_01'),
                    ),
                },
            },
            {
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue'),
                level: 1,
                equip: {
                    equip_slot_chest: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_leather_breastplate_01'),
                    ),
                    equip_slot_legs: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_leather_pants_01'),
                    ),
                    equip_slot_foots: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_leather_boots_01'),
                    ),
                    equip_slot_right_hand: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_dagger_01'),
                    ),
                    equip_slot_left_hand: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_dagger_01'),
                    ),
                },
            },
            {
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage'),
                level: 1,
                equip: {
                    equip_slot_chest: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_cloth_breastplate_01'),
                    ),
                    equip_slot_legs: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_cloth_pants_01'),
                    ),
                    equip_slot_foots: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_cloth_boots_01'),
                    ),
                    equip_slot_right_hand: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_staff_01'),
                    ),
                },
            },
            {
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                level: 1,
                equip: {
                    equip_slot_chest: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_leather_breastplate_01'),
                    ),
                    equip_slot_legs: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_leather_pants_01'),
                    ),
                    equip_slot_foots: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_leather_boots_01'),
                    ),
                    equip_slot_right_hand: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_revolver_01'),
                    ),
                    equip_slot_left_hand: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('item_revolver_01'),
                    ),
                },
            },
        ];

        heroPatterns.forEach((datum) => {
            this.container.get<GameObjectStorage>('player.gameObjectStorage').add(this.container.get<HeroFactory>('player.heroFactory').create(
                    datum['heroClass'],
                    // datum['level'],
                    // datum['equip'],
                ),
            );
        });
    }
}