import Command from '../../../core/source/GameConsole/Command.js';

/**
 * TODO: Не актуально пока нет сервера.
 */
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

    // async execute(input: Input) {
    //     this.container.get<Security>('server.security').assertIsUserLoaded();
    //     this.container.get<Security>('server.security').assertIsPlayerAlreadyLoaded();
    //
    //     let name: string = _.trim(input.getArgument('name'));
    //
    //     let playerDBObject = this.container.get<PlayerDBObjectFactory>('server.playerDBObjectFactory').create(name, this.container.get<Security>('server.security').user);
    //     this.container.get<Pool>('server.database.pool').getConnection((err, connection) => {
    //         new Promise((resolve, reject) => {
    //             connection.beginTransaction((error) => {
    //                 this.container.get<PlayerDBObjectRepository<PlayerDBObject>>('server.playerDBObjectRepository').save(connection, playerDBObject, resolve, reject);
    //             });//beginTransaction
    //         })
    //             .then(async () => {
    //                 this.container.get<Security>('server.security').loginPlayer(playerDBObject);
    //                 debug(DebugNamespaceID.Info)('Игрок создан: ' + playerDBObject['_id']);
    //
    //                 //Без save_inject.
    //                 // (new CoreContainerConfigure()).configure(this.container);
    //                 (new PlayerContainerConfigure()).configure(this.container);
    //
    //                 let playerGameObject = this.container.get<PlayerFactory>('player.playerFactory').create();
    //                 this.container.get<GameObjectStorage>(ContainerID.GameObjectStorage).add(playerGameObject);
    //
    //                 //Создание директорий.
    //                 let playerSaveDir = this.container.get<PathResolver>('server.pathResolver').resolve(
    //                     'server/data/saves',
    //                     this.container.get<Security>('server.security').user.id.toString(),
    //                     playerDBObject['_id'].toString(),
    //                 );
    //                 fs.mkdirSync(playerSaveDir);
    //                 fs.chownSync(playerSaveDir, 1001, 1001);
    //
    //                 debug(DebugNamespaceID.Info)('Директория создана: ' + playerSaveDir);
    //
    //                 //todo: Вся подобная логика в отдельные классы.
    //                 //Окружение игрока.
    //                 this._createWallets();
    //
    //                 //todo: Начальные объекты игрока убрать в другое место.
    //                 //Начальные объекты.
    //                 this._createStartItemStorages();
    //                 this._createStartItems();
    //                 this._createStartHeroes();
    //
    //                 //todo: Сохранение должно происходить отдельно. При создании игрока нужно производить только подготовку: директории.
    //                 await this.container.get<GameConsole>(ContainerID.GameConsole).run('save_player_env');
    //
    //                 connection.commit();
    //             })
    //             .catch((error) => {
    //                 debug(DebugNamespaceID.Error)(error);
    //                 connection.rollback();
    //             })
    //         ;
    //     });//end Promise connection.beginTransaction
    // }
    //
    // private _createWallets() {
    //     let config = this.container.get<object>('core.config');
    //
    //     let currencyIDs = [
    //         CurrencyID.Gold,
    //         CurrencyID.ResearchPoints,
    //     ];
    //
    //     _.map(currencyIDs, (currencyID) => {
    //         this.container.get<WalletFactory>(ContainerID.WalletFactory).create(
    //             this.container.get<EntityManagerInterface>(ContainerID.EntityManager).get<Currency>(EntityID.Currency, currencyID),
    //             config['start_wallet_values'][currencyID]['value'],
    //         )
    //     });
    // }
    //
    // private _createStartItemStorages() {
    //     this.container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(DEFAULT_ITEM_STORAGE_SIZE);
    //     this.container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(DEFAULT_ITEM_STORAGE_SIZE);
    // }
    //
    // private _createStartItems() {
    //     let items = [
    //         {
    //             itemID: ItemID.Wood,
    //             count: 10,
    //         },
    //         {
    //             itemID: ItemID.IronOre,
    //             count: 10,
    //         },
    //         {
    //             itemID: ItemID.OneHandedSword_01,
    //             count: 1,
    //         },
    //         {
    //             itemID: ItemID.OneHandedSword_01,
    //             count: 1,
    //         },
    //         {
    //             itemID: ItemID.PlateHelmet_01,
    //             count: 1,
    //         },
    //         {
    //             itemID: ItemID.PlateBoots_01,
    //             count: 1,
    //         },
    //         {
    //             itemID: ItemID.Shield_01,
    //             count: 1,
    //         },
    //     ];
    //
    //     for (let i = 0; i < items.length; i++) {
    //         this.container.get<ItemStorageManager>(ContainerID.ItemStorageManager).addItemStack(
    //             this.container.get<ItemStackFactory>(ContainerID.ItemStackFactory).create(items[i].itemID, items[i].count),
    //         );
    //     }
    // }
    //
    // private _createStartHeroes() {
    //     //todo: config
    //     //todo: Сделать заготовки для разных задач. Это в репозиторий. Герои создаются НА основе паттерном. Паттер можно взять уже готовый (для начальных героев) или сделать новый. Только не путать с данными для создания героя в целом.
    //     let heroPatterns = [
    //         {
    //             heroClassID: HeroClassID.Warrior,
    //             level: 1,
    //             equip: {
    //                 chest: ItemID.PlateBreastplate_01,
    //                 legs: ItemID.PlatePants_01,
    //                 foots: ItemID.PlateBoots_01,
    //                 right_hand: ItemID.OneHandedSword_01,
    //                 left_hand: ItemID.Shield_01,
    //             },
    //         },
    //         {
    //             heroClassID: HeroClassID.Rogue,
    //             level: 1,
    //             equip: {
    //                 chest: ItemID.LeatherBreastplate_01,
    //                 legs: ItemID.LeatherPants_01,
    //                 foots: ItemID.LeatherBoots_01,
    //                 right_hand: ItemID.Dagger_01,
    //                 left_hand: ItemID.Dagger_01,
    //             },
    //         },
    //         {
    //             heroClassID: HeroClassID.FireMage,
    //             level: 1,
    //             equip: {
    //                 chest: ItemID.ClothBreastplate_01,
    //                 legs: ItemID.ClothPants_01,
    //                 foots: ItemID.ClothBoots_01,
    //                 right_hand: ItemID.Staff_01,
    //             },
    //         },
    //         {
    //             heroClassID: HeroClassID.Gunslinger,
    //             level: 1,
    //             equip: {
    //                 chest: ItemID.LeatherBreastplate_01,
    //                 legs: ItemID.LeatherPants_01,
    //                 foots: ItemID.LeatherBoots_01,
    //                 right_hand: ItemID.Revolver_01,
    //                 left_hand: ItemID.Revolver_01,
    //             },
    //         },
    //     ];
    //
    //     for (let i = 0; i < heroPatterns.length; i++) {
    //         this.container.get<MainHeroListComponent>(ContainerID.MainHeroList).createHero(
    //             heroPatterns[i].heroClassID as HeroClassID,
    //             heroPatterns[i].level,
    //             this.container.get<HeroFactory>(ContainerID.HeroFactory),
    //         );
    //     }
    // }
}