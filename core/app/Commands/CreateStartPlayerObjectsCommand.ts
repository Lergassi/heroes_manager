import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import WalletFactory from '../Factories/WalletFactory.js';
import EntityManager from '../../source/EntityManager.js';
import Currency from '../Entities/Currency.js';
import ItemStorageFactory from '../Factories/ItemStorageFactory.js';
import ItemStackPattern from '../RuntimeObjects/ItemStackPattern.js';
import UUIDGenerator from '../../source/UUIDGenerator.js';
import Item from '../Entities/Item.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import HeroClass from '../Entities/HeroClass.js';
import HeroFactory from '../Factories/HeroFactory.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../Components/ItemStorageComponent.js';
import HeroListComponent from '../Components/HeroListComponent.js';
import EquipSlotComponentControllerComponent from '../Components/EquipSlotComponentControllerComponent.js';
import EntityManagerFacade from '../../source/Facades/EntityManagerFacade.js';
import {ContainerKey} from '../CoreContainerConfigure.js';
import EquipSlot from '../Entities/EquipSlot.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';
import LocationFactory from '../Factories/LocationFactory.js';
import {LevelRange} from '../Components/LevelComponent.js';

export default class CreateStartPlayerObjectsCommand extends Command {
    get name(): string {
        return 'create_start_player_objects';
    }

    get description(): string {
        return 'Создает начальные объекты игрока: предметы, герои и тд. Окружение должно быть создано отдельно.';
    }

    async execute(input: Input) {
        // this._createItemStorages();
        // this._createItems();
        this._createHeroes();
    }

    // private _createItemStorages() {
    //     this.container.get<ItemStorageFactoryInterface>('player.playerItemStorageFactory').create(DEFAULT_ITEM_STORAGE_SIZE);
    //     // this.container.get<ItemStorageFactoryInterface>('player.playerItemStorageFactory').create(DEFAULT_ITEM_STORAGE_SIZE);
    // }

    private _createItems() {
        let itemStackBuilders = [
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('wood'),
                10,
            ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('iron_ore'),
                10,
            ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('one_handed_sword_01'),
                1,
            ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('one_handed_sword_01'),
                1,
            ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('plate_helmet_01'),
                1,
            ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('plate_boots_01'),
                1,
            ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('shield_01'),
                1,
            ),
        ];

        itemStackBuilders.forEach((itemStackBuilder) => {
            this.container.get<ItemStorageManager>('player.itemStorageManager').addItem(itemStackBuilder);
        });
    }

    private _createHeroes() {
        //todo: config
        //todo: Сделать заготовки для разных задач. Это в репозиторий. Герои создаются НА основе паттерном. Паттер можно взять уже готовый (для начальных героев) или сделать новый. Только не путать с данными для создания героя в целом.
        //todo: Сделать проще: в одну строку.
        let heroPatterns = [
            {
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('warrior'),
                level: 1,
                equip: {
                    head: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        // this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('plate_helmet_01'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('plate_helmet_02'),
                    ),
                    chest: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('plate_breastplate_01'),
                    ),
                    legs: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('plate_pants_01'),
                    ),
                    foots: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('plate_boots_01'),
                    ),
                    right_hand: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('one_handed_sword_01'),
                    ),
                    left_hand: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('shield_01'),
                    ),
                },
            },
            {
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('rogue'),
                level: 1,
                equip: {
                    chest: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('leather_breastplate_01'),
                    ),
                    legs: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('leather_pants_01'),
                    ),
                    foots: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('leather_boots_01'),
                    ),
                    right_hand: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('dagger_01'),
                    ),
                    left_hand: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('dagger_01'),
                    ),
                },
            },
            {
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('mage'),
                level: 1,
                equip: {
                    chest: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('cloth_breastplate_01'),
                    ),
                    legs: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('cloth_pants_01'),
                    ),
                    foots: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('cloth_boots_01'),
                    ),
                    right_hand: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('staff_01'),
                    ),
                },
            },
            {
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias('gunslinger'),
                level: 1,
                equip: {
                    chest: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('leather_breastplate_01'),
                    ),
                    legs: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('leather_pants_01'),
                    ),
                    foots: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('leather_boots_01'),
                    ),
                    right_hand: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('revolver_01'),
                    ),
                    left_hand: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                        this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias('revolver_01'),
                    ),
                },
            },
        ];

        heroPatterns.forEach((datum) => {
            let hero = this.container.get<HeroFactory>('player.heroFactory').create(
                datum['heroClass'],
            );
            // this.container.get<GameObjectStorage>('player.gameObjectStorage').add(hero);
            this.container.get<HeroListComponent>('player.heroesListComponent').addHero(hero);

            for (const datumElementKey in datum['equip']) {
                hero.getComponentByName<EquipSlotComponentControllerComponent>(EquipSlotComponentControllerComponent.name).equipItemStack(
                    this.container.get<EntityManagerFacade>(ContainerKey.EntityManagerFacade).entity<EquipSlot>(EquipSlot, datumElementKey),
                    datum['equip'][datumElementKey].build(),
                );
            }
        });
    }
}