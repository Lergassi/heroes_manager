import EntityManager from '../../source/EntityManager.js';
import ArmorMaterial from '../Entities/ArmorMaterial.js';
import CharacterAttribute from '../Entities/CharacterAttribute.js';
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
import EnemyType from '../Entities/EnemyType.js';
import {
    CharacterAttributeID,
    CurrencyAlias,
    EnemyConfigRecord,
    EnemyTypeID,
    EnemyTypeRecord,
    EntityManagerKey, EquipSlotID, HeroClassID,
    ItemCategoryID
} from '../types.js';

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
        this._createItems();
        this._createRecipes();
        this._createHeroClasses();
        this._createEquipSlots();
        this._createEnemyTypes();
        this._createEnemyConfigs();

        return this._entityManager;
    }

    private _createItems() {
        (new ItemDatabaseBuilder(this._entityManager, this._itemFactory)).build();
    }

    private _createArmorMaterials() {
        this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).add(new ArmorMaterial(
            'a86d1e86-1768-47c0-a630-2eb8c49ef029',
            'Латы',
            'plate',
            '',
            500,
        ));
        this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).add(new ArmorMaterial(
            '7e9daae3-eb9d-41c6-8589-d5830edc10d0',
            'Кожа 1',
            'leather',
            '',
            510,
        ));
        this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).add(new ArmorMaterial(
            'e13f90ff-eabe-4966-bec8-b805d2c1b4b0',
            'Ткань',
            'cloth',
            '',
            520,
        ));
    }

    private _createCharacterAttributes() {
        this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            'a06e6ef0-b0b2-43b2-a162-e16f40f1446b',
            'Очки здоровья',
            'max_health_points',    //Логично, что очки здоровья тоже могут быть увеличены или уменьшены. И работать они могут как CharacterAttribute.
            '',
            480,
        ));
        this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            '9ad2f9b7-07dc-4ade-b8b2-b870dcb8cbdf',
            'Очки магии',
            'max_magic_points',
            '',
            490,
        ));
        this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            CharacterAttributeID.Strength,
            'Сила',
            CharacterAttributeID.Strength,
            'Увеличивает силу атаки у классов с главной характеристикой \"Сила\".',
            500,
        ));
        this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            CharacterAttributeID.Agility,
            'Ловкость',
            CharacterAttributeID.Agility,
            'Увеличивает силу атаки у классов с главной характеристикой \"Ловкость\".',
            510,
        ));
        this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            CharacterAttributeID.Intelligence,
            'Интеллект',
            CharacterAttributeID.Intelligence,
            'Увеличивает силу атаки и кол-во очков магии у классов с главной характеристикой \"Интеллект\".',
            520,
        ));
        //---
        this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            '66c5e7ca-c84a-489d-b49e-b80f15efd2a3',
            'Защита',
            'protection',
            '',
            530,
        ));
        this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            '6b50221f-7498-4740-b013-b0324672c2f1',
            'Сила атаки',
            'attack_power',
            'Сила атаки - это одно значение. Диапазон управляется в другом месте.',
            535,
        ));
        this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            '62f04c4e-fae1-4acb-baad-ef196964368d',
            'Скорость атаки',
            'attack_speed',
            '',
            540,
        ));
        this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            '578f79f9-87df-4218-b5ae-f70572c3794f',
            'Критический удар',
            'critical_strike',
            '',
            550,
        ));
        this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            '226cccb3-8738-473d-9488-15c550203c4b',
            'Выносливость',
            'stamina',
            '',
            560,
        ));
        this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            '03b8d14f-dbc6-47f5-90a6-8d005b837e57',
            'Удача',
            'luck',
            'Влияет на многие характеристики.',
            570,
        ));
    }

    private _createCurrencies() {
        this._entityManager.getRepository<Currency>(Currency.name).add(new Currency(
            '998495f3-567b-4dc8-af87-70916e96f50a',
            'Золото',
            CurrencyAlias.Gold,
            '',
            500,
        ));
        this._entityManager.getRepository<Currency>(Currency.name).add(new Currency(
            '3a4b5a8a-68e3-4f4c-86b0-5dbd6b161f3c',
            'Очки исследования',
            CurrencyAlias.ResearchPoints,
            '',
            510,
        ));
    }

    private _createQualities() {
        this._entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            '363b5284-5638-417b-b53c-edd2d90d5a42',
            'Poor',
            'poor',
            'Серые вещи. Мусор для продажи.',
            500,
        ));
        this._entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            'ddc2fb35-2593-4f5d-948d-61d53573b1cc',
            'Common',
            'common',
            'Белые вещи.',
            510,
        ));
        this._entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            '2b7bd30d-7c02-4275-8685-0ad6025a7c48',
            'Uncommon',
            'uncommon',
            'Зеленые вещи.',
            520,
        ));
        this._entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            'f020a3ba-0e4c-45ce-b05b-efdc56283305',
            'Rare',
            'rare',
            'Синие вещи.',
            530,
        ));
        this._entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            'e442f182-328f-4126-b9ab-d3ca902c3edf',
            'Epic',
            'epic',
            'Фиолетовые вещи.',
            540,
        ));
        this._entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            '0c969893-94e9-4851-b890-c39f5a1979ae',
            'Legendary',
            'legendary',
            'Оранжевые вещи.',
            550,
        ));
    }

    private _createHeroRoles() {
        this._entityManager.getRepository<HeroRole>(HeroRole.name).add(new HeroRole(
            '8317f2cf-5ec0-4ec8-81e3-9ae0c308c7c8',
            'Танк',
            'tank',
            '',
            500,
        ));
        this._entityManager.getRepository<HeroRole>(HeroRole.name).add(new HeroRole(
            '189a0a98-c90a-4deb-a933-2fa76bd147d3',
            'Поддержка',
            'support',
            '',
            510,
        ));
        this._entityManager.getRepository<HeroRole>(HeroRole.name).add(new HeroRole(
            'b0a0b54b-4c1e-4fe3-b43d-addad24b664e',
            'Боец',
            'damage_dealer',
            '',
            520,
        ));
    }

    private _createItemCategories() {
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '611abe4d-86fc-4107-baab-54a95e1ae2fd',
            'Оружие',
            ItemCategoryID.Weapons,
            '',
            500,
            null,
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'e8326c4b-8762-450c-9128-e868ade59db1',
            'Одноручные мечи',
            ItemCategoryID.OneHandedSwords,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '874d2f2c-96e6-4d4b-aa79-abaa2cd7d8a6',
            'Двуручные мечи',
            ItemCategoryID.TwoHandedSwords,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'a217e997-83b8-4ac5-8bf1-271c46b947db',
            'Одноручные топоры',
            ItemCategoryID.OneHandedAxes,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'a697e1d7-dd76-4056-8053-06ad8ae6ad40',
            'Двуручные топоры',
            ItemCategoryID.TwoHandedAxes,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '02434bf5-a2cf-47d6-b388-0e4a10745656',
            'Посохи',
            ItemCategoryID.Staffs,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '0876ae49-d54c-4d4b-a123-c6d0d4588f4e',
            'Жезлы',
            ItemCategoryID.Wands,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '1916d139-3891-4e97-b0f8-a3670061f861',
            'Кинжалы',
            ItemCategoryID.Daggers,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'cea704a3-4cf8-4182-af74-69dc336fbd44',
            'Луки',
            ItemCategoryID.Bows,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '9bfbae69-b95a-4d5d-8df9-ccf2aa27a840',
            'Арбалеты',
            ItemCategoryID.Crossbows,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'bd2fabdf-72a8-4302-b20c-2c0696c6831b',
            'Револьверы',
            ItemCategoryID.Revolvers,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Weapons),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '640236fb-3b22-4c0e-b74a-4edf3e62d6a8',
            'Броня',
            ItemCategoryID.Armor,
            '',
            500,
            null,
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'de977f36-a225-405d-a6bf-664b31fbe67f',
            'Шлемы',
            ItemCategoryID.Helmets,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'de977f36-a225-405d-a6bf-664b31fbe67f',
            'Нагрудники',
            ItemCategoryID.Breastplates,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'd66b65e1-cebd-40b8-9d42-c1518bf4387d',
            'Сапоги',
            ItemCategoryID.Boots,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'c5a44fa9-6028-4ab0-8ac3-dcb69973ea03',
            'Перчатки',
            ItemCategoryID.Gloves,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '98d13cf4-8241-4129-bb6c-3a1ffaa3c90f',
            'Штаны',
            ItemCategoryID.Pants,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'eb003637-a6d5-4192-b7e4-136da550e734',
            'Наплечники',
            ItemCategoryID.ShoulderPads,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'd4e1aef8-4300-4567-b24b-a269512a82cf',
            'Поясы',
            ItemCategoryID.Belts,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '7b67f17e-0f12-463e-b18b-22a4fe470ce0',
            'Браслеты',
            ItemCategoryID.Bracers,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '0765d7ba-600e-41cf-863e-176acfa19ae5',
            'Амулеты',
            ItemCategoryID.Amulets,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '01a33c6d-339c-4a82-91c7-2b9442e057a4',
            'Кольца',
            ItemCategoryID.Rings,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '3e86e1de-c59d-4aed-a968-ab864410e132',
            'Аксессуары',
            ItemCategoryID.Trinkets,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '6fbb8dcb-f86f-495f-82cb-9cfeecd85c00',
            'Щиты',
            ItemCategoryID.Shields,
            '',
            500,
            this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Armor),
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '4df46a18-2d85-40d1-bdc8-6dbda6d12574',
            'Ресурсы',
            ItemCategoryID.Resources,
            '',
            500,
            null,
        ));
        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'acd5d4fc-31cf-4ffe-a69a-026b51613818',
            'Материалы',
            ItemCategoryID.Materials,
            '',
            500,
            null,
        ));
    }

    private _createHeroClasses() {
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Warrior,
            'Воин',
            HeroClassID.Warrior,
            '',
            500,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('tank'),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedSwords),
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedAxes),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('plate'),
            ],
            [
                this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(CharacterAttributeID.Strength),
            ],
        ));
        // console.log(this._entityManager.get(HeroClass, HeroClassID.Warrior));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Paladin,
            'Паладин',
            HeroClassID.Paladin,
            '',
            510,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('tank'),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedSwords),
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedAxes),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('plate'),
            ],
            [
                this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(CharacterAttributeID.Strength),
                this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(CharacterAttributeID.Intelligence),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Rogue,
            'Разбойник',
            HeroClassID.Rogue,
            '',
            520,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('damage_dealer'),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Daggers),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('leather'),
            ],
            [
                this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(CharacterAttributeID.Agility),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Gladiator,
            'Гладиатор',
            HeroClassID.Gladiator,
            '',
            530,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('damage_dealer'),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedSwords),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('plate'),
            ],
            [
                this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(CharacterAttributeID.Strength),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Archer,
            'Лучник',
            HeroClassID.Archer,
            '',
            540,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('damage_dealer'),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Bows),
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Crossbows),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('leather'),
            ],
            [
                this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(CharacterAttributeID.Agility),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Gunslinger,
            'Стрелок',
            HeroClassID.Gunslinger,
            '',
            550,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('damage_dealer'),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Revolvers),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('leather'),
            ],
            [
                this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(CharacterAttributeID.Agility),
                this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(CharacterAttributeID.Intelligence),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Mage,
            'Маг',
            HeroClassID.Mage,
            '',
            560,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('damage_dealer'),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Staffs),
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('cloth'),
            ],
            [
                this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(CharacterAttributeID.Intelligence),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Warlock,
            'Чернокнижник',
            HeroClassID.Warlock,
            '',
            570,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('damage_dealer'),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Staffs),
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('cloth'),
            ],
            [
                this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(CharacterAttributeID.Intelligence),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Priest,
            'Священик',
            HeroClassID.Priest,
            '',
            560,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('support'),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Staffs),
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('cloth'),
            ],
            [
                this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(CharacterAttributeID.Intelligence),
            ],
        ));
        this._entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            HeroClassID.Druid,
            'Друид',
            HeroClassID.Druid,
            '',
            560,
            this._entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('support'),
            [
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Staffs),
                this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
            ],
            [
                this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('cloth'),
            ],
            [
                this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(CharacterAttributeID.Intelligence),
            ],
        ));
    }

    private _createEquipSlots() {
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Head,
            'Голова',
            EquipSlotID.Head,
            '',
            500,
            [
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Helmets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Paladin),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Helmets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Helmets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gladiator),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Helmets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Archer),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Helmets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Helmets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Helmets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warlock),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Helmets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Priest),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Helmets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Druid),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Helmets),
                    ],
                ),
            ],
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Shoulders,
            'Плечи',
            EquipSlotID.Shoulders,
            '',
            510,
            [
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.ShoulderPads),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Paladin),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.ShoulderPads),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.ShoulderPads),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gladiator),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.ShoulderPads),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Archer),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.ShoulderPads),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.ShoulderPads),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.ShoulderPads),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warlock),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.ShoulderPads),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Priest),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.ShoulderPads),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Druid),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.ShoulderPads),
                    ],
                ),
            ],
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            '8b7a7277-6011-462a-a258-7d774ed51d1e',
            'Грудь',
            EquipSlotID.Chest,
            '',
            520,
            [
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Breastplates),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Paladin),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Breastplates),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Breastplates),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gladiator),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Breastplates),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Archer),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Breastplates),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Breastplates),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Breastplates),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warlock),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Breastplates),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Priest),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Breastplates),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Druid),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Breastplates),
                    ],
                ),
            ],
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Wrist,
            'Запястье',
            EquipSlotID.Wrist,
            '',
            530,
            [
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Bracers),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Paladin),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Bracers),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Bracers),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gladiator),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Bracers),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Archer),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Bracers),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Bracers),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Bracers),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warlock),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Bracers),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Priest),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Bracers),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Druid),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Bracers),
                    ],
                ),
            ],
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Hands,
            'Руки',
            EquipSlotID.Hands,
            '',
            540,
            [
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Gloves),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Paladin),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Gloves),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Gloves),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gladiator),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Gloves),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Archer),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Gloves),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Gloves),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Gloves),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warlock),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Gloves),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Priest),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Gloves),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Druid),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Gloves),
                    ],
                ),
            ],
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Waist,
            'Талия',
            EquipSlotID.Waist,
            '',
            550,
            [
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Belts),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Paladin),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Belts),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Belts),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gladiator),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Belts),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Archer),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Belts),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Belts),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Belts),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warlock),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Belts),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Priest),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Belts),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Druid),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Belts),
                    ],
                ),
            ],
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Legs,
            'Ноги',
            EquipSlotID.Legs,
            '',
            560,
            [
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Pants),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Paladin),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Pants),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Pants),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gladiator),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Pants),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Archer),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Pants),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Pants),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Pants),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warlock),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Pants),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Priest),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Pants),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Druid),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Pants),
                    ],
                ),
            ],
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Foots,
            'Ступни',
            EquipSlotID.Foots,
            '',
            570,
            [
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Boots),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Paladin),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Boots),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Boots),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gladiator),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Boots),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Archer),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Boots),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Boots),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Boots),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warlock),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Boots),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Priest),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Boots),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Druid),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Boots),
                    ],
                ),
            ],
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Neck,
            'Шея',
            EquipSlotID.Neck,
            '',
            580,
            [
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Amulets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Paladin),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Amulets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Amulets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gladiator),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Amulets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Archer),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Amulets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Amulets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Amulets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warlock),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Amulets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Priest),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Amulets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Druid),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Amulets),
                    ],
                ),
            ],
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Finger_1,
            'Палец 1',
            EquipSlotID.Finger_1,
            '',
            590,
            [
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Paladin),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gladiator),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Archer),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warlock),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Priest),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Druid),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
            ],
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Finger_2,
            'Палец 2',
            EquipSlotID.Finger_2,
            '',
            600,
            [
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Paladin),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gladiator),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Archer),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warlock),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Priest),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Druid),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Rings),
                    ],
                ),
            ],
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.Trinket,
            'Аксессуар',
            EquipSlotID.Trinket,
            '',
            610,
            [
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Trinkets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Paladin),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Trinkets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Trinkets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gladiator),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Trinkets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Archer),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Trinkets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Trinkets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Trinkets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warlock),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Trinkets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Priest),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Trinkets),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Druid),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Trinkets),
                    ],
                ),
            ],
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.RightHand,
            'Правая рука',
            EquipSlotID.RightHand,
            '',
            620,
            [
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedSwords),
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedAxes),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Paladin),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedSwords),
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedAxes),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Daggers),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gladiator),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedSwords),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Archer),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Bows),
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Crossbows),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Revolvers),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Staffs),
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warlock),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Staffs),
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Priest),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Staffs),
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Druid),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Staffs),
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
                    ],
                ),
            ],
        ));
        this._entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            EquipSlotID.LeftHand,
            'Левая рука',
            EquipSlotID.LeftHand,
            '',
            620,
            [
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warrior),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Shields),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Paladin),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Shields),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Rogue),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Daggers),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gladiator),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.OneHandedSwords),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Archer),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Bows),
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Crossbows),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Gunslinger),
                    [
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Revolvers),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Mage),
                    [
                        // this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryAlias.Staffs),
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Warlock),
                    [
                        // this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryAlias.Staffs),
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Priest),
                    [
                        // this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryAlias.Staffs),
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
                    ],
                ),
                new EquipSlotRule(
                    this._entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias(HeroClassID.Druid),
                    [
                        // this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryAlias.Staffs),
                        this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(ItemCategoryID.Wands),
                    ],
                ),
            ],
        ));
    }

    private _createRecipes() {
        this._entityManager.add<Recipe>(
            Recipe,
            new Recipe(
                '572bb85a-5046-4366-bd8b-5ee494fc362b',
                this._entityManager.get<Item>(Item, 'wood_boards'),
                'wood_board_recipe',
                500,
                1,
                [
                    {item: this._entityManager.get<Item>(Item, 'wood'), count: 1},
                ],
            )
        );
        this._entityManager.add<Recipe>(
            Recipe,
            new Recipe(
                '572bb85a-5046-4366-bd8b-5ee494fc362b',
                this._entityManager.get<Item>(Item, 'leather_1'),
                'leather_rabbit_skin_recipe',
                500,
                1,
                [
                    {item: this._entityManager.get<Item>(Item, 'rabbit_skin'), count: 5},
                ],
            )
        );
        this._entityManager.add<Recipe>(
            Recipe,
            new Recipe(
                'd3f50597-1607-4971-b2ea-c8c15960ffc8',
                this._entityManager.get<Item>(Item, 'leather_1'),
                'leather_fox_skin_recipe',
                500,
                1,
                [
                    {item: this._entityManager.get<Item>(Item, 'fox_skin'), count: 1},
                ],
            )
        );
        this._entityManager.add<Recipe>(
            Recipe,
            new Recipe(
                '1e7c2421-3c8a-41ce-a68f-24d994f4280c',
                this._entityManager.get<Item>(Item, 'leather_1'),
                'leather_deer_skin_recipe',
                500,
                1,
                [
                    {item: this._entityManager.get<Item>(Item, 'deer_skin'), count: 1},
                ],
            )
        );
        this._entityManager.add<Recipe>(
            Recipe,
            new Recipe(
                '50cc0d46-4759-4fab-99da-71aa98d582bb',
                this._entityManager.get<Item>(Item, 'leather_1'),
                'leather_wolf_skin_recipe',
                500,
                1,
                [
                    {item: this._entityManager.get<Item>(Item, 'wolf_skin'), count: 1},
                ],
            )
        );
        this._entityManager.add<Recipe>(
            Recipe,
            new Recipe(
                '7a9a2b93-43bf-4495-abf5-c4ea3231db62',
                this._entityManager.get<Item>(Item, 'leather_1'),
                'leather_bear_skin_recipe',
                500,
                5,
                [
                    {item: this._entityManager.get<Item>(Item, 'bear_skin'), count: 1},
                ],
            )
        );
    }

    private _createEnemyTypes() {
        let enemyTypes: EnemyTypeRecord = {
            [EnemyTypeID.Boar]: new EnemyType({
                id: EnemyTypeID.Boar,
                name: 'Кабан',
            }),
            [EnemyTypeID.Bear]: new EnemyType({
                id: EnemyTypeID.Bear,
                name: 'Медведь',
            }),
        };

        this._entityManager.set<EnemyTypeRecord>(EntityManagerKey.EnemyType, enemyTypes);
        // console.log(this._entityManager.entity<EnemyTypeRecord>(EntityManagerKey.EnemyTypes)[EnemyTypeAlias.Bear]);
        // console.log(this._entityManager.get<EnemyTypeRecord>();
    }

    private _createEnemyConfigs() {
        let enemyConfigs: EnemyConfigRecord = {
            [EnemyTypeID.Boar]: {
                enemy: this._entityManager.entity<EnemyType>(EntityManagerKey.EnemyType, EnemyTypeID.Boar), //todo: Тоже через фабрику, чтобы сократить кол-во использований EntityManager.
                loot: [
                    {enemyLevel: [1, 40], item: this._entityManager.get<Item>(Item, 'wood'), count: [4, 10], chance: 40},
                    {enemyLevel: [10, 30], item: this._entityManager.get<Item>(Item, 'iron_ore'), count: [2, 6], chance: 20},
                    {enemyLevel: [20, 40], item: this._entityManager.get<Item>(Item, 'copper_ore'), count: [1, 4], chance: 20},
                    {enemyLevel: [30, 50], item: this._entityManager.get<Item>(Item, 'gold_ore'), count: [0, 3], chance: 10},
                    {enemyLevel: [40, 100], item: this._entityManager.get<Item>(Item, 'plate_helmet_01'), count: [1, 1], chance: 1},
                    {enemyLevel: [50, 100], item: this._entityManager.get<Item>(Item, 'one_handed_sword_01'), count: [1, 1], chance: 1},
                ],
                exp: 20,
                gold: [10, 20],
            },
        };

        this._entityManager.set<EnemyConfigRecord>(EntityManagerKey.EnemyConfig, enemyConfigs);
    }
}