import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import EntityManager from '../../source/EntityManager.js';
import ItemStackPattern from '../RuntimeObjects/ItemStackPattern.js';
import Item from '../Entities/Item.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import HeroClass from '../Entities/HeroClass.js';
import HeroFactory from '../Factories/HeroFactory.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';
import MainHeroListComponent from '../Components/MainHeroListComponent.js';
import EquipSlotComponentControllerComponent from '../Components/EquipSlotComponentControllerComponent.js';
import EntityManagerFacade from '../../source/Facades/EntityManagerFacade.js';
import EquipSlot from '../Entities/EquipSlot.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';
import {ContainerKey, DEFAULT_ITEM_STORAGE_SIZE} from '../consts.js';
import MainItemStorageListComponent from '../Components/MainItemStorageListComponent.js';
import {HeroClassID} from '../types.js';

export default class CreateStartPlayerObjectsCommand extends Command {
    get name(): string {
        return 'player.create_start_objects';
    }

    get description(): string {
        return 'Создает начальные объекты игрока: предметы, герои и тд. Окружение должно быть создано отдельно.';
    }

    async execute(input: Input) {
        this._createItemStorages();
        this._createItems();
        this._createHeroes();
    }

    private _createItemStorages() {
        // this.container.get<ItemStorageFactoryInterface>('player.itemStorageFactory').create(DEFAULT_ITEM_STORAGE_SIZE);
        // this.container.get<ItemStorageFactoryInterface>('player.itemStorageFactory').create(DEFAULT_ITEM_STORAGE_SIZE);
        this.container.get<MainItemStorageListComponent>('player.itemStorageCollection').create(
            DEFAULT_ITEM_STORAGE_SIZE,
            this.container.get<ItemStorageFactoryInterface>('player.itemStorageFactory'),
        );
        this.container.get<MainItemStorageListComponent>('player.itemStorageCollection').create(
            DEFAULT_ITEM_STORAGE_SIZE,
            this.container.get<ItemStorageFactoryInterface>('player.itemStorageFactory'),
        );
    }

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
            this.container.get<ItemStorageManager>(ContainerKey.ItemStorageManager).addItem(itemStackBuilder);
        });
    }

    private _createHeroes() {
        //todo: config
        //todo: Сделать заготовки для разных задач. Это в репозиторий. Герои создаются НА основе паттерном. Паттер можно взять уже готовый (для начальных героев) или сделать новый. Только не путать с данными для создания героя в целом.
        //todo: Сделать проще: в одну строку.
        let heroPatterns = [
            {
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                level: 1,
                equip: {
                    head: new ItemStackPattern(
                        this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
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
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
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
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
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
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
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
            let hero = this.container.get<MainHeroListComponent>('player.heroesListComponent').createHero({
                heroClass: datum['heroClass'],
                level: 1,
                heroFactory: this.container.get<HeroFactory>('player.heroFactory'),
            });

            //Начальная экипировка.
            for (const datumElementKey in datum['equip']) {
                hero.getComponentByName<EquipSlotComponentControllerComponent>(EquipSlotComponentControllerComponent.name).equipItemStack(
                    this.container.get<EntityManagerFacade>(ContainerKey.EntityManagerFacade).entity<EquipSlot>(EquipSlot, datumElementKey),
                    datum['equip'][datumElementKey].build(),
                );
            }
        });
        this.container.get<MainHeroListComponent>('player.heroesListComponent').createHero({
            heroClass: this.container.get<EntityManager>(ContainerKey.EntityManager).get<HeroClass>(HeroClass, HeroClassID.Warrior),
            level: 1,
            heroFactory: this.container.get<HeroFactory>('player.heroFactory'),
        });
        this.container.get<MainHeroListComponent>('player.heroesListComponent').createHero({
            heroClass: this.container.get<EntityManager>(ContainerKey.EntityManager).get<HeroClass>(HeroClass, HeroClassID.Warrior),
            level: 1,
            heroFactory: this.container.get<HeroFactory>('player.heroFactory'),
        });
    }
}