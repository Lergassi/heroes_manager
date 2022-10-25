import EntityManager from '../../source/EntityManager.js';
import ArmorMaterial from '../Entities/ArmorMaterial.js';
import Item from '../Entities/Item.js';
import ContainerInterface from '../../source/ContainerInterface.js';
import ItemDatabaseBuilder from './ItemDatabaseBuilder.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import {EnemyID} from '../../types/enums/EnemyID.js';
import {CurrencyID} from '../../types/enums/CurrencyID.js';
import {ArmorMaterialID} from '../../types/enums/ArmorMaterialID.js';
import {QualityID} from '../../types/enums/QualityID.js';
import {HeroRoleID} from '../../types/enums/HeroRoleID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {EntityID} from '../../types/enums/EntityID.js';
import CharacterAttributeEntityFactory from '../Factories/EntityFactories/CharacterAttributeEntityFactory.js';
import CurrencyFactory from '../Factories/EntityFactories/CurrencyFactory.js';
import QualityFactory from '../Factories/EntityFactories/QualityFactory.js';
import HeroRoleFactory from '../Factories/EntityFactories/HeroRoleFactory.js';
import ItemCategoryFactory from '../Factories/EntityFactories/ItemCategoryFactory.js';
import HeroClassFactory from '../Factories/EntityFactories/HeroClassFactory.js';
import {assertNotNil} from '../../source/assert.js';
import EquipSlotEntityFactory from '../Factories/EntityFactories/EquipSlotEntityFactory.js';
import EnemyEntityFactory from '../Factories/EntityFactories/EnemyEntityFactory.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';

export default class EntityManagerBuilder {
    private readonly _container: ContainerInterface;
    private readonly _entityManager: EntityManagerInterface;

    constructor(
        container: ContainerInterface,
        entityManager: EntityManagerInterface,
    ) {
        assertNotNil(entityManager);
        assertNotNil(container);

        this._container = container;
        this._entityManager = entityManager;
    }

    build(): EntityManagerInterface {
        this._createArmorMaterials();
        this._createCharacterAttributes();
        this._createCurrencies();
        this._createQualities();
        this._createHeroRoles();
        this._createItemCategories();
        this._createItems();    //ItemDatabase
        // this._createRecipes();
        this._createHeroClasses();
        this._createEquipSlots();

        this._createEnemyEntities();

        return this._entityManager;
    }

    private _createItems() {
        (new ItemDatabaseBuilder(this._entityManager)).build();
    }

    private _createArmorMaterials() {
        this._entityManager.add<ArmorMaterial>(EntityID.ArmorMaterial, ArmorMaterialID.Plate, new ArmorMaterial(
            ArmorMaterialID.Plate,
            'Латы',
            '',
            500,
        ));
        this._entityManager.add<ArmorMaterial>(EntityID.ArmorMaterial, ArmorMaterialID.Leather, new ArmorMaterial(
            ArmorMaterialID.Leather,
            'Кожа',
            '',
            510,
        ));
        this._entityManager.add<ArmorMaterial>(EntityID.ArmorMaterial, ArmorMaterialID.Cloth, new ArmorMaterial(
            ArmorMaterialID.Cloth,
            'Ткань',
            '',
            520,
        ));
    }

    private _createCharacterAttributes() {
        let characterAttributeFactory = new CharacterAttributeEntityFactory(this._entityManager);
        characterAttributeFactory.create(
            CharacterAttributeID.MaxHealthPoints,
            'Очки здоровья',
            '',
            480,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.MaxMagicPoints,
            'Очки магии',
            '',
            490,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.Strength,
            'Сила',
            'Увеличивает силу атаки у классов с главной характеристикой \"Сила\".',
            500,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.Agility,
            'Ловкость',
            'Увеличивает силу атаки у классов с главной характеристикой \"Ловкость\".',
            500,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.Intelligence,
            'Интеллект',
            'Увеличивает силу атаки и кол-во очков магии у классов с главной характеристикой \"Интеллект\".',
            520,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.Protection,
            'Защита',
            '',
            530,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.AttackPower,
            'Сила атаки',
            'Сила атаки - это одно значение. Диапазон управляется в другом месте.',
            535,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.AttackSpeed,
            'Скорость атаки',
            '',
            540,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.CriticalStrike,
            'Критический удар',
            '',
            550,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.Stamina,
            'Выносливость',
            '',
            560,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.Luck,
            'Удача',
            'Влияет на многие характеристики.',
            570,
        );
    }

    private _createCurrencies() {
        let currencyFactory = new CurrencyFactory(this._entityManager);
        currencyFactory.create(
            CurrencyID.Gold,
            'Золото',
            '',
            500,
        );
        currencyFactory.create(
            CurrencyID.ResearchPoints,
            'Очки исследования',
            '',
            510,
        );
    }

    private _createQualities() {
        let qualityFactory = new QualityFactory(this._entityManager);
        qualityFactory.create(
            QualityID.Poor,
            'Poor',
            'Серые вещи. Мусор для продажи.',
            500,
        );
        qualityFactory.create(
            QualityID.Common,
            'Common',
            'Белые вещи.',
            510,
        );
        qualityFactory.create(
            QualityID.Uncommon,
            'Uncommon',
            'Зеленые вещи.',
            520,
        );
        qualityFactory.create(
            QualityID.Rare,
            'Rare',
            'Синие вещи.',
            530,
        );
        qualityFactory.create(
            QualityID.Epic,
            'Epic',
            'Фиолетовые вещи.',
            540,
        );
        qualityFactory.create(
            QualityID.Legendary,
            'Legendary',
            'Оранжевые вещи.',
            550,
        );
    }

    private _createHeroRoles() {
        let heroRoleFactory = new HeroRoleFactory(this._entityManager);
        heroRoleFactory.create(
            HeroRoleID.Tank,
            'Танк',
            '',
            500,
        );
        heroRoleFactory.create(
            HeroRoleID.Support,
            'Поддержка',
            '',
            510,
        );
        heroRoleFactory.create(
            HeroRoleID.DamageDealer,
            'Боец',
            '',
            520,
        );
    }

    private _createItemCategories() {
        let itemCategoryFactory = new ItemCategoryFactory(this._entityManager);
        itemCategoryFactory.create(
            ItemCategoryID.Weapons,
            'Оружие',
            '',
            500,
            null,
        );
        itemCategoryFactory.create(
            ItemCategoryID.OneHandedSwords,
            'Одноручные мечи',
            '',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.TwoHandedSwords,
            'Двуручные мечи',
            '',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.OneHandedAxes,
            'Одноручные топоры',
            '',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.TwoHandedAxes,
            'Двуручные топоры',
            '',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Staffs,
            'Посохи',
            '',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Wands,
            'Жезлы',
            '',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Daggers,
            'Кинжалы',
            '',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Bows,
            'Луки',
            '',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Crossbows,
            'Арбалеты',
            '',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Revolvers,
            'Револьверы',
            '',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Armor,
            'Броня',
            '',
            500,
            null,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Helmets,
            'Шлемы',
            '',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Breastplates,
            'Нагрудники',
            '',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Boots,
            'Сапоги',
            '',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Gloves,
            'Перчатки',
            '',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Pants,
            'Штаны',
            '',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.ShoulderPads,
            'Наплечники',
            '',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Belts,
            'Поясы',
            '',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Bracers,
            'Браслеты',
            '',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Amulets,
            'Амулеты',
            '',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Rings,
            'Кольца',
            '',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Trinkets,
            'Аксессуары',
            '',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Shields,
            'Щиты',
            '',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Resources,
            'Ресурсы',
            '',
            500,
            null,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Materials,
            'Материалы',
            '',
            500,
            null,
        );
    }

    private _createHeroClasses() {
        let heroClassFactory = new HeroClassFactory(this._entityManager);
        heroClassFactory.create(
            HeroClassID.Warrior,
            'Воин',
            '',
            500,
            HeroRoleID.Tank,
            [
                ItemCategoryID.OneHandedSwords,
                ItemCategoryID.OneHandedAxes,
            ],
            [
                ArmorMaterialID.Plate,
            ],
            [
                CharacterAttributeID.Strength,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Paladin,
            'Паладин',
            '',
            510,
            HeroRoleID.Tank,
            [
                ItemCategoryID.OneHandedSwords,
                ItemCategoryID.OneHandedAxes,
            ],
            [
                ArmorMaterialID.Plate,
            ],
            [
                CharacterAttributeID.Strength,
                CharacterAttributeID.Intelligence,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Rogue,
            'Разбойник',
            '',
            520,
            HeroRoleID.DamageDealer,
            [
                ItemCategoryID.Daggers,
            ],
            [
                ArmorMaterialID.Leather,
            ],
            [
                CharacterAttributeID.Agility,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Gladiator,
            'Гладиатор',
            '',
            530,
            HeroRoleID.DamageDealer,
            [
                ItemCategoryID.OneHandedSwords,
            ],
            [
                ArmorMaterialID.Plate,
            ],
            [
                CharacterAttributeID.Strength,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Archer,
            'Лучник',
            '',
            540,
            HeroRoleID.DamageDealer,
            [
                ItemCategoryID.Bows,
                ItemCategoryID.Crossbows,
            ],
            [
                ArmorMaterialID.Leather,
            ],
            [
                CharacterAttributeID.Agility,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Gunslinger,
            'Стрелок',
            '',
            550,
            HeroRoleID.DamageDealer,
            [
                ItemCategoryID.Revolvers,
            ],
            [
                ArmorMaterialID.Leather,
            ],
            [
                CharacterAttributeID.Agility,
                CharacterAttributeID.Intelligence,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Mage,
            'Маг',
            '',
            560,
            HeroRoleID.DamageDealer,
            [
                ItemCategoryID.Staffs,
                ItemCategoryID.Wands,
            ],
            [
                ArmorMaterialID.Cloth,
            ],
            [
                CharacterAttributeID.Intelligence,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Warlock,
            'Чернокнижник',
            '',
            570,
            HeroRoleID.DamageDealer,
            [
                ItemCategoryID.Staffs,
                ItemCategoryID.Wands,
            ],
            [
                ArmorMaterialID.Cloth,
            ],
            [
                CharacterAttributeID.Intelligence,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Priest,
            'Священик',
            '',
            560,
            HeroRoleID.Support,
            [
                ItemCategoryID.Staffs,
                ItemCategoryID.Wands,
            ],
            [
                ArmorMaterialID.Cloth,
            ],
            [
                CharacterAttributeID.Intelligence,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Druid,
            'Друид',
            '',
            560,
            HeroRoleID.Support,
            [
                ItemCategoryID.Staffs,
                ItemCategoryID.Wands,
            ],
            [
                ArmorMaterialID.Cloth,
            ],
            [
                CharacterAttributeID.Intelligence,
            ],
        );
    }

    private _createEquipSlots() {
        let equipSlotFactory = new EquipSlotEntityFactory(this._entityManager);
        equipSlotFactory.createArmorSlot(
            EquipSlotID.Head,
            'Голова',
            500,
            [
                ItemCategoryID.Helmets,
            ],
        );
        equipSlotFactory.createArmorSlot(
            EquipSlotID.Shoulders,
            'Плечи',
            510,
            [
                ItemCategoryID.ShoulderPads,
            ],
        );
        equipSlotFactory.createArmorSlot(
            EquipSlotID.Chest,
            'Грудь',
            520,
            [
                ItemCategoryID.Breastplates,
            ],
        );
        equipSlotFactory.createArmorSlot(
            EquipSlotID.Wrist,
            'Запястье',
            530,
            [
                ItemCategoryID.Bracers,
            ],
        );
        equipSlotFactory.createArmorSlot(
            EquipSlotID.Hands,
            'Руки',
            540,
            [
                ItemCategoryID.Gloves,
            ],
        );
        equipSlotFactory.createArmorSlot(
            EquipSlotID.Waist,
            'Талия',
            550,
            [
                ItemCategoryID.Belts,
            ],
        );
        equipSlotFactory.createArmorSlot(
            EquipSlotID.Legs,
            'Ноги',
            560,
            [
                ItemCategoryID.Pants,
            ],
        );
        equipSlotFactory.createArmorSlot(
            EquipSlotID.Foots,
            'Ступни',
            570,
            [
                ItemCategoryID.Boots,
            ],
        );
        equipSlotFactory.createArmorSlot(
            EquipSlotID.Neck,
            'Шея',
            580,
            [
                ItemCategoryID.Amulets,
            ],
        );
        equipSlotFactory.createArmorSlot(
            EquipSlotID.Finger_1,
            'Палец 1',
            590,
            [
                ItemCategoryID.Rings,
            ],
        );
        equipSlotFactory.createArmorSlot(
            EquipSlotID.Finger_2,
            'Палец 2',
            600,
            [
                ItemCategoryID.Rings,
            ],
        );
        equipSlotFactory.createArmorSlot(
            EquipSlotID.Trinket,
            'Аксессуар',
            610,
            [
                ItemCategoryID.Rings,
            ],
        );
        equipSlotFactory.createHandSlot(
            EquipSlotID.RightHand,
            'Правая рука',
            620,
            {
                [HeroClassID.Warrior]: [
                    ItemCategoryID.OneHandedSwords,
                    ItemCategoryID.OneHandedAxes,
                ],
                [HeroClassID.Paladin]: [
                    ItemCategoryID.OneHandedSwords,
                    ItemCategoryID.OneHandedAxes,
                ],
                [HeroClassID.Rogue]: [
                    ItemCategoryID.Daggers,
                ],
                [HeroClassID.Gladiator]: [
                    ItemCategoryID.OneHandedSwords,
                ],
                [HeroClassID.Archer]: [
                    ItemCategoryID.Bows,
                    ItemCategoryID.Crossbows,
                ],
                [HeroClassID.Gunslinger]: [
                    ItemCategoryID.Revolvers,
                ],
                [HeroClassID.Mage]: [
                    ItemCategoryID.Staffs,
                    ItemCategoryID.Wands,
                ],
                [HeroClassID.Warlock]: [
                    ItemCategoryID.Staffs,
                    ItemCategoryID.Wands,
                ],
                [HeroClassID.Priest]: [
                    ItemCategoryID.Staffs,
                    ItemCategoryID.Wands,
                ],
                [HeroClassID.Druid]: [
                    ItemCategoryID.Staffs,
                    ItemCategoryID.Wands,
                ],
            },
        );
        equipSlotFactory.createHandSlot(
            EquipSlotID.LeftHand,
            'Левая рука',
            620,
            {
                [HeroClassID.Warrior]: [
                    ItemCategoryID.Shields,
                ],
                [HeroClassID.Paladin]: [
                    ItemCategoryID.Shields,
                ],
                [HeroClassID.Rogue]: [
                    ItemCategoryID.Daggers,
                ],
                [HeroClassID.Gladiator]: [
                    ItemCategoryID.OneHandedSwords,
                ],
                [HeroClassID.Archer]: [

                ],
                [HeroClassID.Gunslinger]: [
                    ItemCategoryID.Revolvers,
                ],
                [HeroClassID.Mage]: [
                    ItemCategoryID.Wands,
                ],
                [HeroClassID.Warlock]: [
                    ItemCategoryID.Wands,
                ],
                [HeroClassID.Priest]: [
                    ItemCategoryID.Wands,
                ],
                [HeroClassID.Druid]: [
                    ItemCategoryID.Wands,
                ],
            },
        );
    }

    // private _createRecipes() {
    //     this._entityManager.add<Recipe>(
    //         Recipe,
    //         new Recipe(
    //             RecipeID.WoodBoards01,
    //             this._entityManager.get<Item>(Item, ItemID.WoodBoards),
    //             1,
    //             [
    //                 {item: this._entityManager.get<Item>(Item, ItemID.Wood), count: 2},
    //             ],
    //         )
    //     );
    //     this._entityManager.add<Recipe>(
    //         Recipe,
    //         new Recipe(
    //             RecipeID.Leather01_01,
    //             this._entityManager.get<Item>(Item, ItemID.Leather01),
    //             1,
    //             [
    //                 {item: this._entityManager.get<Item>(Item, ItemID.RabbitSkin), count: 5},
    //             ],
    //         )
    //     );
    //     this._entityManager.add<Recipe>(
    //         Recipe,
    //         new Recipe(
    //             RecipeID.Leather01_02,
    //             this._entityManager.get<Item>(Item, ItemID.Leather01),
    //             // 'leather_fox_skin_recipe',
    //             1,
    //             [
    //                 {item: this._entityManager.get<Item>(Item, ItemID.FoxSkin), count: 1},
    //             ],
    //         )
    //     );
    //     this._entityManager.add<Recipe>(
    //         Recipe,
    //         new Recipe(
    //             RecipeID.Leather01_03,
    //             this._entityManager.get<Item>(Item, ItemID.Leather01),
    //             // 'leather_deer_skin_recipe',
    //             1,
    //             [
    //                 {item: this._entityManager.get<Item>(Item, ItemID.DeerSkin), count: 1},
    //             ],
    //         )
    //     );
    //     this._entityManager.add<Recipe>(
    //         Recipe,
    //         new Recipe(
    //             RecipeID.Leather01_04,
    //             this._entityManager.get<Item>(Item, ItemID.Leather01),
    //             // 'leather_wolf_skin_recipe',
    //             1,
    //             [
    //                 {item: this._entityManager.get<Item>(Item, ItemID.WolfSkin), count: 1},
    //             ],
    //         )
    //     );
    //     this._entityManager.add<Recipe>(
    //         Recipe,
    //         new Recipe(
    //             RecipeID.Leather01_05,
    //             this._entityManager.get<Item>(Item, ItemID.Leather01),
    //             // 'leather_bear_skin_recipe',
    //             5,
    //             [
    //                 {item: this._entityManager.get<Item>(Item, ItemID.BearSkin), count: 1},
    //             ],
    //         )
    //     );
    // }

    private _createEnemyEntities() {
        let maxEnemyLevel = 100;    //todo: Настройки.
        let enemyEntityFactory = new EnemyEntityFactory(this._entityManager);
        enemyEntityFactory.create(
            EnemyID.Boar,
            'Кабан',
            [
                {enemyLevel: [1, maxEnemyLevel], item: this._entityManager.get<Item>(EntityID.Item, ItemID.BoarMeat), count: [1, 3], chance: 30},
                {enemyLevel: [1, maxEnemyLevel], item: this._entityManager.get<Item>(EntityID.Item, ItemID.BoarSkin), count: [1, 2], chance: 20},
                // {enemyLevel: [1, 40], item: this._entityManager.get<Item>(Item, ItemID.Wood), count: [4, 10], chance: 40},
                // {enemyLevel: [10, 30], item: this._entityManager.get<Item>(Item, ItemID.IronOre), count: [2, 6], chance: 20},
                // {enemyLevel: [20, 40], item: this._entityManager.get<Item>(Item, ItemID.CopperOre), count: [1, 4], chance: 20},
                // {enemyLevel: [30, 50], item: this._entityManager.get<Item>(Item, ItemID.GoldOre), count: [0, 3], chance: 10},
                // {enemyLevel: [40, 100], item: this._entityManager.get<Item>(Item, ItemID.PlateHelmet_01), count: [1, 1], chance: 1},
                {enemyLevel: [50, 100], item: this._entityManager.get<Item>(EntityID.Item, ItemID.OneHandedSword_01), count: [1, 1], chance: 1},
            ],
            20,
            [10, 20],
        );
        enemyEntityFactory.create(
            EnemyID.Bear,
            'Медведь',
            [
                {enemyLevel: [1, maxEnemyLevel], item: this._entityManager.get<Item>(EntityID.Item, ItemID.BoarMeat), count: [1, 3], chance: 30},
                {enemyLevel: [1, maxEnemyLevel], item: this._entityManager.get<Item>(EntityID.Item, ItemID.BoarSkin), count: [1, 2], chance: 20},
                // {enemyLevel: [1, 40], item: this._entityManager.get<Item>(Item, ItemID.Wood), count: [4, 10], chance: 40},
                // {enemyLevel: [10, 30], item: this._entityManager.get<Item>(Item, ItemID.IronOre), count: [2, 6], chance: 20},
                // {enemyLevel: [20, 40], item: this._entityManager.get<Item>(Item, ItemID.CopperOre), count: [1, 4], chance: 20},
                // {enemyLevel: [30, 50], item: this._entityManager.get<Item>(Item, ItemID.GoldOre), count: [0, 3], chance: 10},
                // {enemyLevel: [40, 100], item: this._entityManager.get<Item>(Item, ItemID.PlateHelmet_01), count: [1, 1], chance: 1},
                {enemyLevel: [50, 100], item: this._entityManager.get<Item>(EntityID.Item, ItemID.OneHandedSword_01), count: [1, 1], chance: 1},
            ],
            20,
            [10, 20],
        );
    }
}