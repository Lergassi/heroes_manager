import EntityManager from '../../source/EntityManager.js';
import ArmorMaterial from '../Entities/ArmorMaterial.js';
import CharacterAttributeEntity from '../Entities/CharacterAttributeEntity.js';
import Currency from '../Entities/Currency.js';
import Quality from '../Entities/Quality.js';
import HeroRole from '../Entities/HeroRole.js';
import ItemCategory from '../Entities/ItemCategory.js';
import Item from '../Entities/Item.js';
import HeroClass from '../Entities/HeroClass.js';
import EquipSlot from '../Entities/EquipSlot.js';
import EquipSlotRule from '../Entities/EquipSlotRule.js';
import ContainerInterface from '../../source/ContainerInterface.js';
import CharacterAttributeIncreaseBuilder from './CharacterAttributeIncreaseBuilder.js';
import Recipe from '../Entities/Recipe.js';
import ItemDatabaseBuilder from './ItemDatabaseBuilder.js';
import ItemFactory from '../Factories/ItemFactory.js';
import EnemyEntity from '../Entities/EnemyEntity.js';
import {
    EnemyConfig,
    EnemyConfigRecord,
    EnemyTypeRecord,
    EntityManagerKey
} from '../types.js';
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
import EquipSlotAvailableItemCategory from '../Entities/EquipSlotAvailableItemCategory.js';
import EquipSlotAvailableItemCategoryForHands from '../Entities/EquipSlotAvailableItemCategoryForHands.js';
import {RecipeID} from '../../types/enums/RecipeID.js';

export default class EntityManagerBuilder {
    private readonly _container: ContainerInterface;
    private readonly _entityManager: EntityManager;
    private readonly _characterAttributeIncreaseBuilder: CharacterAttributeIncreaseBuilder;
    private readonly _itemFactory: ItemFactory;

    constructor(options: {
        entityManager: EntityManager,
        itemFactory: ItemFactory,
        container: ContainerInterface,
    }) {
        this._container = options.container;
        this._itemFactory = options.itemFactory;
        this._entityManager = options.entityManager;
        this._characterAttributeIncreaseBuilder = new CharacterAttributeIncreaseBuilder(this._entityManager);
    }

    build(): EntityManager {
        this._createArmorMaterials();
        this._createCharacterAttributes();
        this._createCurrencies();
        this._createQualities();
        this._createHeroRoles();
        this._createItemCategories();
        this._createItems();    //ItemDatabase
        this._createRecipes();
        this._createHeroClasses();
        this._createEquipSlots();

        // this._createEnemyTypes();
        this._createEnemyConfigs();

        return this._entityManager;
    }

    private _createItems() {
        (new ItemDatabaseBuilder(this._entityManager, this._itemFactory)).build();
    }

    private _createArmorMaterials() {
        this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).add(new ArmorMaterial(
            ArmorMaterialID.Plate,
            'Латы',
            '',
            500,
        ));
        this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).add(new ArmorMaterial(
            ArmorMaterialID.Leather,
            'Кожа',
            '',
            510,
        ));
        this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).add(new ArmorMaterial(
            ArmorMaterialID.Cloth,
            'Ткань',
            '',
            520,
        ));
    }

    private _createCharacterAttributes() {
        this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).add(new CharacterAttributeEntity(
            CharacterAttributeID.MaxHealthPoints,
            'Очки здоровья',
            '',
            480,
        ));
        this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).add(new CharacterAttributeEntity(
            CharacterAttributeID.MaxMagicPoints,
            'Очки магии',
            '',
            490,
        ));
        this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).add(new CharacterAttributeEntity(
            CharacterAttributeID.Strength,
            'Сила',
            'Увеличивает силу атаки у классов с главной характеристикой \"Сила\".',
            500,
        ));
        this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).add(new CharacterAttributeEntity(
            CharacterAttributeID.Agility,
            'Ловкость',
            'Увеличивает силу атаки у классов с главной характеристикой \"Ловкость\".',
            510,
        ));
        this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).add(new CharacterAttributeEntity(
            CharacterAttributeID.Intelligence,
            'Интеллект',
            'Увеличивает силу атаки и кол-во очков магии у классов с главной характеристикой \"Интеллект\".',
            520,
        ));
        //---
        this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).add(new CharacterAttributeEntity(
            CharacterAttributeID.Protection,
            'Защита',
            '',
            530,
        ));
        this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).add(new CharacterAttributeEntity(
            CharacterAttributeID.AttackPower,
            'Сила атаки',
            'Сила атаки - это одно значение. Диапазон управляется в другом месте.',
            535,
        ));
        this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).add(new CharacterAttributeEntity(
            CharacterAttributeID.AttackSpeed,
            'Скорость атаки',
            '',
            540,
        ));
        this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).add(new CharacterAttributeEntity(
            CharacterAttributeID.CriticalStrike,
            'Критический удар',
            '',
            550,
        ));
        this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).add(new CharacterAttributeEntity(
            CharacterAttributeID.Stamina,
            'Выносливость',
            '',
            560,
        ));
        this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).add(new CharacterAttributeEntity(
            CharacterAttributeID.Luck,
            'Удача',
            'Влияет на многие характеристики.',
            570,
        ));
    }

    private _createCurrencies() {
        this._entityManager.getRepository<Currency>(Currency.name).add(new Currency(
            CurrencyID.Gold,
            'Золото',
            '',
            500,
        ));
        this._entityManager.getRepository<Currency>(Currency.name).add(new Currency(
            CurrencyID.ResearchPoints,
            'Очки исследования',
            '',
            510,
        ));
    }

    private _createQualities() {
        this._entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            QualityID.Poor,
            'Poor',
            'Серые вещи. Мусор для продажи.',
            500,
        ));
        this._entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            QualityID.Common,
            'Common',
            'Белые вещи.',
            510,
        ));
        this._entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            QualityID.Uncommon,
            'Uncommon',
            'Зеленые вещи.',
            520,
        ));
        this._entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            QualityID.Rare,
            'Rare',
            'Синие вещи.',
            530,
        ));
        this._entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            QualityID.Epic,
            'Epic',
            'Фиолетовые вещи.',
            540,
        ));
        this._entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            QualityID.Legendary,
            'Legendary',
            'Оранжевые вещи.',
            550,
        ));
    }

    private _createHeroRoles() {
        this._entityManager.getRepository<HeroRole>(HeroRole.name).add(new HeroRole(
            HeroRoleID.Tank,
            'Танк',
            '',
            500,
        ));
        this._entityManager.getRepository<HeroRole>(HeroRole.name).add(new HeroRole(
            HeroRoleID.Support,
            'Поддержка',
            '',
            510,
        ));
        this._entityManager.getRepository<HeroRole>(HeroRole.name).add(new HeroRole(
            HeroRoleID.DamageDealer,
            'Боец',
            '',
            520,
        ));
    }

    private _createItemCategories() {
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Weapons,
            'Оружие',
            '',
            500,
            null,
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.OneHandedSwords,
            'Одноручные мечи',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.TwoHandedSwords,
            'Двуручные мечи',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.OneHandedAxes,
            'Одноручные топоры',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.TwoHandedAxes,
            'Двуручные топоры',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Staffs,
            'Посохи',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Wands,
            'Жезлы',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Daggers,
            'Кинжалы',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Bows,
            'Луки',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Crossbows,
            'Арбалеты',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Revolvers,
            'Револьверы',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Armor,
            'Броня',
            '',
            500,
            null,
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Helmets,
            'Шлемы',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Breastplates,
            'Нагрудники',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Boots,
            'Сапоги',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Gloves,
            'Перчатки',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Pants,
            'Штаны',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.ShoulderPads,
            'Наплечники',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Belts,
            'Поясы',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Bracers,
            'Браслеты',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Amulets,
            'Амулеты',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Rings,
            'Кольца',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Trinkets,
            'Аксессуары',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Shields,
            'Щиты',
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Resources,
            'Ресурсы',
            '',
            500,
            null,
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            ItemCategoryID.Materials,
            'Материалы',
            '',
            500,
            null,
        ));
    }

    private _createHeroClasses() {
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Warrior,
            'Воин',
            '',
            500,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias(HeroRoleID.Tank),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedSwords),
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedAxes),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias(ArmorMaterialID.Plate),
            ],
            [
                this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).getOneByAlias(CharacterAttributeID.Strength),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Paladin,
            'Паладин',
            '',
            510,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias(HeroRoleID.Tank),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedSwords),
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedAxes),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias(ArmorMaterialID.Plate),
            ],
            [
                this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).getOneByAlias(CharacterAttributeID.Strength),
                this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).getOneByAlias(CharacterAttributeID.Intelligence),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Rogue,
            'Разбойник',
            '',
            520,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias(HeroRoleID.DamageDealer),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Daggers),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias(ArmorMaterialID.Leather),
            ],
            [
                this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).getOneByAlias(CharacterAttributeID.Agility),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Gladiator,
            'Гладиатор',
            '',
            530,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias(HeroRoleID.DamageDealer),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedSwords),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias(ArmorMaterialID.Plate),
            ],
            [
                this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).getOneByAlias(CharacterAttributeID.Strength),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Archer,
            'Лучник',
            '',
            540,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias(HeroRoleID.DamageDealer),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Bows),
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Crossbows),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias(ArmorMaterialID.Leather),
            ],
            [
                this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).getOneByAlias(CharacterAttributeID.Agility),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Gunslinger,
            'Стрелок',
            '',
            550,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias(HeroRoleID.DamageDealer),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Revolvers),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias(ArmorMaterialID.Leather),
            ],
            [
                this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).getOneByAlias(CharacterAttributeID.Agility),
                this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).getOneByAlias(CharacterAttributeID.Intelligence),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Mage,
            'Маг',
            '',
            560,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias(HeroRoleID.DamageDealer),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Staffs),
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias(ArmorMaterialID.Cloth),
            ],
            [
                this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).getOneByAlias(CharacterAttributeID.Intelligence),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Warlock,
            'Чернокнижник',
            '',
            570,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias(HeroRoleID.DamageDealer),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Staffs),
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias(ArmorMaterialID.Cloth),
            ],
            [
                this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).getOneByAlias(CharacterAttributeID.Intelligence),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Priest,
            'Священик',
            '',
            560,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias(HeroRoleID.Support),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Staffs),
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias(ArmorMaterialID.Cloth),
            ],
            [
                this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).getOneByAlias(CharacterAttributeID.Intelligence),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Druid,
            'Друид',
            '',
            560,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias(HeroRoleID.Support),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Staffs),
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias(ArmorMaterialID.Cloth),
            ],
            [
                this._entityManager.getRepository<CharacterAttributeEntity>(CharacterAttributeEntity.name).getOneByAlias(CharacterAttributeID.Intelligence),
            ],
        ));
    }

    private _createEquipSlots() {
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Head,
            'Голова',
            '',
            500,
            new EquipSlotAvailableItemCategory([
                this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Helmets),
            ]),
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Shoulders,
            'Плечи',
            '',
            510,
            new EquipSlotAvailableItemCategory([
                this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.ShoulderPads),
            ]),
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Chest,
            'Грудь',
            '',
            520,
            new EquipSlotAvailableItemCategory([
                this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Breastplates),
            ]),
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Wrist,
            'Запястье',
            '',
            530,
            new EquipSlotAvailableItemCategory([
                this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Bracers),
            ]),
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Hands,
            'Руки',
            '',
            540,
            new EquipSlotAvailableItemCategory([
                this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Gloves),
            ]),
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Waist,
            'Талия',
            '',
            550,
            new EquipSlotAvailableItemCategory([
                this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Belts),
            ]),
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Legs,
            'Ноги',
            '',
            560,
            new EquipSlotAvailableItemCategory([
                this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Pants),
            ]),
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Foots,
            'Ступни',
            '',
            570,
            new EquipSlotAvailableItemCategory([
                this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Boots),
            ]),
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Neck,
            'Шея',
            '',
            580,
            new EquipSlotAvailableItemCategory([
                this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Amulets),
            ]),
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Finger_1,
            'Палец 1',
            '',
            590,
            new EquipSlotAvailableItemCategory([
                this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Rings),
            ]),
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Finger_2,
            'Палец 2',
            '',
            600,
            new EquipSlotAvailableItemCategory([
                this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Rings),
            ]),
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Trinket,
            'Аксессуар',
            '',
            610,
            new EquipSlotAvailableItemCategory([
                this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Rings),
            ]),
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.RightHand,
            'Правая рука',
            '',
            620,
            new EquipSlotAvailableItemCategoryForHands(
                {
                    [HeroClassID.Warrior]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.OneHandedSwords),
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.OneHandedAxes),
                    ],
                    [HeroClassID.Paladin]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.OneHandedSwords),
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.OneHandedAxes),
                    ],
                    [HeroClassID.Rogue]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Daggers),
                    ],
                    [HeroClassID.Gladiator]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.OneHandedSwords),
                    ],
                    [HeroClassID.Archer]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Bows),
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Crossbows),
                    ],
                    [HeroClassID.Gunslinger]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Revolvers),
                    ],
                    [HeroClassID.Mage]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Staffs),
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Wands),
                    ],
                    [HeroClassID.Warlock]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Staffs),
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Wands),
                    ],
                    [HeroClassID.Priest]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Staffs),
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Wands),
                    ],
                    [HeroClassID.Druid]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Staffs),
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Wands),
                    ],
                },
            ),
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.LeftHand,
            'Левая рука',
            '',
            620,
            new EquipSlotAvailableItemCategoryForHands(
                {
                    [HeroClassID.Warrior]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Shields),
                    ],
                    [HeroClassID.Paladin]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Shields),
                    ],
                    [HeroClassID.Rogue]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Daggers),
                    ],
                    [HeroClassID.Gladiator]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.OneHandedSwords),
                    ],
                    [HeroClassID.Archer]: [

                    ],
                    [HeroClassID.Gunslinger]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Revolvers),
                    ],
                    [HeroClassID.Mage]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Wands),
                    ],
                    [HeroClassID.Warlock]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Wands),
                    ],
                    [HeroClassID.Priest]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Wands),
                    ],
                    [HeroClassID.Druid]: [
                        this._entityManager.get<ItemCategory>(ItemCategory, ItemCategoryID.Wands),
                    ],
                },
            ),
        ));
    }

    private _createRecipes() {
        this._entityManager.add<Recipe>(
            Recipe,
            new Recipe(
                RecipeID.WoodBoards01,
                this._entityManager.get<Item>(Item, ItemID.WoodBoards),
                1,
                [
                    {item: this._entityManager.get<Item>(Item, ItemID.Wood), count: 2},
                ],
            )
        );
        this._entityManager.add<Recipe>(
            Recipe,
            new Recipe(
                RecipeID.Leather01_01,
                this._entityManager.get<Item>(Item, ItemID.Leather01),
                1,
                [
                    {item: this._entityManager.get<Item>(Item, ItemID.RabbitSkin), count: 5},
                ],
            )
        );
        this._entityManager.add<Recipe>(
            Recipe,
            new Recipe(
                RecipeID.Leather01_02,
                this._entityManager.get<Item>(Item, ItemID.Leather01),
                // 'leather_fox_skin_recipe',
                1,
                [
                    {item: this._entityManager.get<Item>(Item, ItemID.FoxSkin), count: 1},
                ],
            )
        );
        this._entityManager.add<Recipe>(
            Recipe,
            new Recipe(
                RecipeID.Leather01_03,
                this._entityManager.get<Item>(Item, ItemID.Leather01),
                // 'leather_deer_skin_recipe',
                1,
                [
                    {item: this._entityManager.get<Item>(Item, ItemID.DeerSkin), count: 1},
                ],
            )
        );
        this._entityManager.add<Recipe>(
            Recipe,
            new Recipe(
                RecipeID.Leather01_04,
                this._entityManager.get<Item>(Item, ItemID.Leather01),
                // 'leather_wolf_skin_recipe',
                1,
                [
                    {item: this._entityManager.get<Item>(Item, ItemID.WolfSkin), count: 1},
                ],
            )
        );
        this._entityManager.add<Recipe>(
            Recipe,
            new Recipe(
                RecipeID.Leather01_05,
                this._entityManager.get<Item>(Item, ItemID.Leather01),
                // 'leather_bear_skin_recipe',
                5,
                [
                    {item: this._entityManager.get<Item>(Item, ItemID.BearSkin), count: 1},
                ],
            )
        );
    }

    private _createEnemyTypes() {
        // let enemyTypes: EnemyTypeRecord = {
        //     [EnemyTypeID.Boar]: new EnemyEntity(
        //         EnemyTypeID.Boar,
        //         'Кабан',
        //     ),
        //     [EnemyTypeID.Bear]: new EnemyEntity(
        //         EnemyTypeID.Bear,
        //         'Медведь',
        //     ),
        // };
        //
        // this._entityManager.set<EnemyTypeRecord>(EntityManagerKey.EnemyType, enemyTypes);
    }

    private _createEnemyConfigs() {
        let maxEnemyLevel = 100;    //todo: config.maxEnemyLevel
        //todo: А у врага может несколько настроек?
        let enemyConfigs: Partial<EnemyConfigRecord> = {
            [EnemyID.Boar]: {
                enemyID: EnemyID.Boar,
                loot: [
                    //todo: В луте может быть не только предмет с шансом, но и тип предмета: категория + редкость например.
                    {enemyLevel: [1, maxEnemyLevel], item: this._entityManager.get<Item>(Item, ItemID.BoarMeat), count: [1, 3], chance: 30},
                    {enemyLevel: [1, maxEnemyLevel], item: this._entityManager.get<Item>(Item, ItemID.BoarSkin), count: [1, 2], chance: 20},
                    // {enemyLevel: [1, 40], item: this._entityManager.get<Item>(Item, ItemID.Wood), count: [4, 10], chance: 40},
                    // {enemyLevel: [10, 30], item: this._entityManager.get<Item>(Item, ItemID.IronOre), count: [2, 6], chance: 20},
                    // {enemyLevel: [20, 40], item: this._entityManager.get<Item>(Item, ItemID.CopperOre), count: [1, 4], chance: 20},
                    // {enemyLevel: [30, 50], item: this._entityManager.get<Item>(Item, ItemID.GoldOre), count: [0, 3], chance: 10},
                    // {enemyLevel: [40, 100], item: this._entityManager.get<Item>(Item, ItemID.PlateHelmet_01), count: [1, 1], chance: 1},
                    {enemyLevel: [50, 100], item: this._entityManager.get<Item>(Item, ItemID.OneHandedSword_01), count: [1, 1], chance: 1},
                ],
                exp: 20,
                gold: [10, 20],
            },
            [EnemyID.Bear]: {
                enemyID: EnemyID.Bear,
                loot: [
                    {enemyLevel: [1, maxEnemyLevel], item: this._entityManager.get<Item>(Item, ItemID.BearMeat), count: [1, 5], chance: 30},
                    {enemyLevel: [1, maxEnemyLevel], item: this._entityManager.get<Item>(Item, ItemID.BearSkin), count: [1, 3], chance: 20},
                    // {enemyLevel: [1, 40], item: this._entityManager.get<Item>(Item, ItemID.Wood), count: [4, 10], chance: 40},
                    // {enemyLevel: [10, 30], item: this._entityManager.get<Item>(Item, ItemID.IronOre), count: [2, 6], chance: 20},
                    // {enemyLevel: [20, 40], item: this._entityManager.get<Item>(Item, ItemID.CopperOre), count: [1, 4], chance: 20},
                    // {enemyLevel: [30, 50], item: this._entityManager.get<Item>(Item, ItemID.GoldOre), count: [0, 3], chance: 10},
                    {enemyLevel: [40, 100], item: this._entityManager.get<Item>(Item, ItemID.PlateHelmet_01), count: [1, 1], chance: 1},
                    // {enemyLevel: [50, 100], item: this._entityManager.get<Item>(Item, ItemID.OneHandedSword_01), count: [1, 1], chance: 1},
                ],
                exp: 20,
                gold: [10, 20],
            },
        };

        this._entityManager.set<Partial<EnemyConfigRecord>>(EntityManagerKey.EnemyConfig, enemyConfigs);
    }
}