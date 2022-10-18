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
import {DEFAULT_ITEM_STORAGE_SIZE} from '../consts.js';
import MainItemStorageListComponent from '../Components/MainItemStorageListComponent.js';
import {EquipSlots, unsigned} from '../types.js';
import {ContainerKey} from '../../types/enums/ContainerKey.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import HeroAttributeCollectorComponent from '../Components/HeroAttributeCollectorComponent.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {GameObjectKey} from '../../types/enums/GameObjectKey.js';

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
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.Wood),
                10,
            ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.IronOre),
                10,
            ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.OneHandedSword_01),
                1,
            ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.OneHandedSword_01),
                1,
            ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.PlateHelmet_01),
                1,
            ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.PlateBoots_01),
                1,
            ),
            new ItemStackPattern(
                this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
                this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.Shield_01),
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
        let heroPatterns: {
            heroClass: HeroClass,
            level: unsigned,
            equip: Partial<{[ID in EquipSlotID]: Item}>,
        }[] = [
            {
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                level: 1,
                equip: {
                    [EquipSlotID.Head]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.PlateHelmet_02),
                    [EquipSlotID.Chest]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.PlateBreastplate_01),
                    [EquipSlotID.Legs]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.PlatePants_01),
                    [EquipSlotID.Foots]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.PlateBoots_01),
                    [EquipSlotID.RightHand]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.OneHandedSword_01),
                    [EquipSlotID.LeftHand]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.Shield_01),
                },
            },
            {
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Paladin),
                level: 1,
                equip: {
                    [EquipSlotID.Head]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.PlateHelmet_02),
                    [EquipSlotID.Chest]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.PlateBreastplate_01),
                    [EquipSlotID.Legs]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.PlatePants_01),
                    [EquipSlotID.Foots]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.PlateBoots_01),
                    [EquipSlotID.RightHand]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.OneHandedSword_01),
                    [EquipSlotID.LeftHand]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.Shield_01),
                },
            },
            {
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
                level: 1,
                equip: {
                    [EquipSlotID.Chest]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.LeatherBreastplate_01),
                    [EquipSlotID.Legs]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.LeatherPants_01),
                    [EquipSlotID.Foots]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.LeatherBoots_01),
                    [EquipSlotID.RightHand]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.Dagger_01),
                    [EquipSlotID.LeftHand]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.Dagger_01),
                },
            },
            {
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
                level: 1,
                equip: {
                    [EquipSlotID.Chest]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.ClothBreastplate_01),
                    [EquipSlotID.Legs]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.ClothPants_01),
                    [EquipSlotID.Foots]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.ClothBoots_01),
                    [EquipSlotID.RightHand]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.Staff_01),
                },
            },
            {
                heroClass: this.container.get<EntityManager>('core.entityManager').getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
                level: 1,
                equip: {
                    [EquipSlotID.Chest]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.LeatherBreastplate_01),
                    [EquipSlotID.Legs]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.LeatherPants_01),
                    [EquipSlotID.Foots]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.LeatherBoots_01),
                    [EquipSlotID.RightHand]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.Revolver_01),
                    [EquipSlotID.LeftHand]: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(ItemID.Revolver_01),
                },
            },
        ];

        for (let i = 0; i < heroPatterns.length; i++) {
            let hero = this.container.get<MainHeroListComponent>(ContainerKey.MainHeroListComponent).createHero({
                heroClass: heroPatterns[i]['heroClass'],
                level: 1,
                heroFactory: this.container.get<HeroFactory>(ContainerKey.HeroFactory),
            });

            //Начальная экипировка.
            for (const equipSlotID in heroPatterns[i]['equip']) {
                hero
                    .get<EquipSlots>(GameObjectKey.EquipSlots)[equipSlotID as EquipSlotID]
                    ?.createItemStack({
                        item: heroPatterns[i]['equip'][equipSlotID],
                        count: 1,
                        itemStackFactory: this.container.get<ItemStackFactory>(ContainerKey.ItemStackFactory),
                    });
            }
            // console.log(hero.get(HeroAttributeCollectorComponent.name));
            // console.log(hero.get<HeroAttributeCollectorComponent>(HeroAttributeCollectorComponent.name).finalValue(CharacterAttributeID.Strength));
            // console.log(hero.get<HeroAttributeCollectorComponent>(HeroAttributeCollectorComponent.name).finalValue(CharacterAttributeID.Agility));
            // console.log(hero.get<HeroAttributeCollectorComponent>(HeroAttributeCollectorComponent.name).finalValue(CharacterAttributeID.Intelligence));
            // console.log(hero.get<HeroAttributeCollectorComponent>(HeroAttributeCollectorComponent.name).finalValue(CharacterAttributeID.AttackPower));
            // console.log(hero.get<HeroAttributeCollectorComponent>(HeroAttributeCollectorComponent.name).finalValue(CharacterAttributeID.Stamina));
        }

        this.container.get<MainHeroListComponent>(ContainerKey.MainHeroListComponent).createHero({
            heroClass: this.container.get<EntityManager>(ContainerKey.EntityManager).get<HeroClass>(HeroClass, HeroClassID.Warrior),
            level: 1,
            heroFactory: this.container.get<HeroFactory>(ContainerKey.HeroFactory),
        });
        this.container.get<MainHeroListComponent>(ContainerKey.MainHeroListComponent).createHero({
            heroClass: this.container.get<EntityManager>(ContainerKey.EntityManager).get<HeroClass>(HeroClass, HeroClassID.Warrior),
            level: 1,
            heroFactory: this.container.get<HeroFactory>(ContainerKey.HeroFactory),
        });
    }
}