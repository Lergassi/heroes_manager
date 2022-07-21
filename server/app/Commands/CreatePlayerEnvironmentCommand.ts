import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import debug from 'debug';
import PlayerComponent from '../../../core/app/Components/PlayerComponent.js';
import fs from 'fs';
import path from 'path';
import Currency from '../../../core/app/Entities/Currency.js';
import WalletComponent from '../../../core/app/Components/WalletComponent.js';
import {debugHeroes, debugItemStorages, debugWallet, debugWallets} from '../../../core/debug/debug_functions.js';
import ItemStackPattern from '../../../core/app/RuntimeObjects/ItemStackPattern.js';
import Item from '../../../core/app/Entities/Item.js';
import HeroClass from '../../../core/app/Entities/HeroClass.js';

export default class CreatePlayerEnvironmentCommand extends Command {
    get name(): string {
        return 'create_player_env';
    }

    get description(): string {
        return 'Создает окружение игрока необходимые для игры. В том числе начальные игровые объекты (пока тут): сумки с предметами, герои и тд.';
    }

    async execute(input: Input) {
        this.container.get('security').assertIsUserLoaded();
        this.container.get('security').assertIsPlayerAlreadyLoaded();

        let playerGameObject = this.container.get('playerFactory').create();

        this.container.get('gameObjectStorage').add(playerGameObject);
        this.container.set('player', playerGameObject);   //todo: Заменить на PlayerDBObject

        debug('info')('Пользователь создан: ' + playerGameObject.getComponentByName(PlayerComponent.name)['_id']);

        //Создание директорий.
        // let playerSaveDir = path.resolve(
        //     this.container.get('config.server').projectDir,
        //     this.container.get('config.server').dataDir,
        //     this.container.get('config.server').savesDir,
        //     playerGameObject.getComponentByName(PlayerComponent.name)['_id'].toString(),
        // );
        // fs.mkdirSync(playerSaveDir);
        // fs.chownSync(playerSaveDir, 1001, 1001);

        // debug('info')('Директория создана: ' + playerSaveDir);

        //todo: Все подобные методы в отдельные классы.
        //Окружение игрока.
        this._createWallets();

        //todo: Начальные объекты игрока убрать в другое место.
        //Начальные объекты.
        this._createStartItemStorages();
        this._createStartItems();
        this._createStartHeroes();

        // await this.container.get('gameConsole').getCommandByName('save_player_env').run();
    }

    private _createWallets() {
        let config = this.container.get('config.core');

        let currencies = [
            'currency_gold',
            'currency_research_points',
        ];

        currencies.forEach((currencyAlias) => {
            this.container.get('gameObjectStorage').add(this.container.get('walletFactory').create(
                this.container.get('repositoryManager').getRepository(Currency.name).getOneByAlias(currencyAlias),
                config['start_wallet_values'][currencyAlias]['value'],
            ));
        });
    }

    private _createStartItemStorages() {
        this.container.get('gameObjectStorage').add(this.container.get('itemStorageFactory').create());
        this.container.get('gameObjectStorage').add(this.container.get('itemStorageFactory').create());
    }

    private _createStartItems() {
        let itemStackBuilders = [
            new ItemStackPattern(this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_wood'), 10),
            new ItemStackPattern(this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_iron_ore'), 10),
            new ItemStackPattern(this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_one_handed_sword_01'), 1),
            new ItemStackPattern(this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_one_handed_sword_01'), 1),
            new ItemStackPattern(this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_plate_helmet_01'), 1),
            new ItemStackPattern(this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_plate_boots_01'), 1),
            new ItemStackPattern(this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_shield_01'), 1),
        ];

        itemStackBuilders.forEach((itemStackBuilder) => {
            this.container.get('itemStorageManager').addItem(itemStackBuilder);
        });
    }

    private _createStartHeroes() {
        //todo: config
        //todo: Сделать заготовки для разных задач. Это в репозиторий. Герои создаются НА основе паттерном. Паттер можно взять уже готовый (для начальных героев) или сделать новый. Только не путать с данными для создания героя в целом.
        let heroPatterns = [
            {
                heroClass: this.container.get('repositoryManager').getRepository(HeroClass.name).getOneByAlias('hero_class_warrior'),
                level: 1,
                equip: {
                    equip_slot_chest: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_plate_breastplate_01'),
                    ),
                    equip_slot_legs: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_plate_pants_01'),
                    ),
                    equip_slot_foots: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_plate_boots_01'),
                    ),
                    equip_slot_right_hand: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_one_handed_sword_01'),
                    ),
                    equip_slot_left_hand: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_shield_01'),
                    ),
                },
            },
            {
                heroClass: this.container.get('repositoryManager').getRepository(HeroClass.name).getOneByAlias('hero_class_rogue'),
                level: 1,
                equip: {
                    equip_slot_chest: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_leather_breastplate_01'),
                    ),
                    equip_slot_legs: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_leather_pants_01'),
                    ),
                    equip_slot_foots: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_leather_boots_01'),
                    ),
                    equip_slot_right_hand: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_dagger_01'),
                    ),
                    equip_slot_left_hand: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_dagger_01'),
                    ),
                },
            },
            {
                heroClass: this.container.get('repositoryManager').getRepository(HeroClass.name).getOneByAlias('hero_class_mage'),
                level: 1,
                equip: {
                    equip_slot_chest: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_cloth_breastplate_01'),
                    ),
                    equip_slot_legs: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_cloth_pants_01'),
                    ),
                    equip_slot_foots: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_cloth_boots_01'),
                    ),
                    equip_slot_right_hand: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_staff_01'),
                    ),
                },
            },
            {
                heroClass: this.container.get('repositoryManager').getRepository(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                level: 1,
                equip: {
                    equip_slot_chest: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_leather_breastplate_01'),
                    ),
                    equip_slot_legs: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_leather_pants_01'),
                    ),
                    equip_slot_foots: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_leather_boots_01'),
                    ),
                    equip_slot_right_hand: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_revolver_01'),
                    ),
                    equip_slot_left_hand: new ItemStackPattern(
                        this.container.get('repositoryManager').getRepository(Item.name).getOneByAlias('item_revolver_01'),
                    ),
                },
            },
        ];

        heroPatterns.forEach((datum) => {
            this.container.get('gameObjectStorage').add(this.container.get('heroFactory').create(
                    datum.heroClass,
                    datum.level,
                    datum.equip,
                ),
            );
        });
    }
}