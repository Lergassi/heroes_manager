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
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import Icon from '../Entities/Icon.js';
import {IconID} from '../../types/enums/IconID.js';
import {sprintf} from 'sprintf-js';
import {env} from 'yargs';
import dotenv from 'dotenv';
import ItemsLoader from './Loadres/ItemsLoader.js';
import ItemCategoriesLoader from './Loadres/ItemCategoriesLoader.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import ItemFactory from '../Factories/ItemFactory.js';
import RecipesLoader from './Loadres/RecipesLoader.js';
import RecipeFactory from '../Factories/EntityFactories/RecipeFactory.js';

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
        debug(DebugNamespaceID.Load)('[OK]: EntityManagerBuilder.Start');

        this._createIcons();

        this._createArmorMaterials();
        this._createCharacterAttributes();
        this._createCurrencies();
        this._createQualities();
        this._createHeroRoles();

        // this._createItemCategories();
        // this._createItems();

        this._loadItemCategories();
        this._loadItems();
        this._loadRecipes();

        this._createHeroClasses();
        this._createEquipSlots();
        this._createEnemyEntities();

        // this._calcHeroConfig();
        this._initHeroConfig();

        debug(DebugNamespaceID.Load)('[OK]: EntityManagerBuilder.End');
        debug(DebugNamespaceID.Dump)(this._entityManager);

        return this._entityManager;
    }

    private _createItems() {
        (new ItemDatabaseBuilder(this._entityManager)).build();
    }

    private _loadItemCategories() {
        (new ItemCategoriesLoader()).load(this._entityManager, this._container.get<ItemCategoryFactory>(ServiceID.ItemCategoryFactory));
    }

    private _loadItems() {
        (new ItemsLoader()).load(this._entityManager, this._container.get<ItemFactory>(ServiceID.ItemFactory));
    }

    private _loadRecipes() {
        (new RecipesLoader()).load(this._entityManager, this._container.get<RecipeFactory>(ServiceID.RecipeFactory));
    }

    private _createArmorMaterials() {
        this._entityManager.add<ArmorMaterial>(EntityID.ArmorMaterial, ArmorMaterialID.Plate, new ArmorMaterial(
            ArmorMaterialID.Plate,
            'Латы',
            500,
        ));
        this._entityManager.add<ArmorMaterial>(EntityID.ArmorMaterial, ArmorMaterialID.Leather, new ArmorMaterial(
            ArmorMaterialID.Leather,
            'Кожа',
            510,
        ));
        this._entityManager.add<ArmorMaterial>(EntityID.ArmorMaterial, ArmorMaterialID.Cloth, new ArmorMaterial(
            ArmorMaterialID.Cloth,
            'Ткань',
            520,
        ));

        debug(DebugNamespaceID.Load)('[OK]: EntityManagerBuilder.ArmorMaterial');
    }

    private _createCharacterAttributes() {
        let characterAttributeFactory = new CharacterAttributeEntityFactory(this._entityManager);
        characterAttributeFactory.create(
            CharacterAttributeID.MaxHealthPoints,
            'Очки здоровья',
            480,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.MaxMagicPoints,
            'Очки магии',
            490,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.Strength,
            'Сила',
            500,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.Agility,
            'Ловкость',
            500,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.Intelligence,
            'Интеллект',
            520,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.Protection,
            'Защита',
            530,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.AttackPower,
            'Сила атаки',
            535,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.AttackSpeed,
            'Скорость атаки',
            540,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.CriticalStrike,
            'Критический удар',
            550,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.Stamina,
            'Выносливость',
            560,
        );
        characterAttributeFactory.create(
            CharacterAttributeID.Luck,
            'Удача',
            570,
        );

        debug(DebugNamespaceID.Load)('[OK]: EntityManagerBuilder.CharacterAttribute');

    }

    private _createCurrencies() {
        let currencyFactory = new CurrencyFactory(this._entityManager);
        currencyFactory.create(
            CurrencyID.Gold,
            'Золото',
            500,
        );
        currencyFactory.create(
            CurrencyID.ResearchPoints,
            'Очки исследования',
            510,
        );

        debug(DebugNamespaceID.Load)('[OK]: EntityManagerBuilder.Currency');

    }

    private _createQualities() {
        let qualityFactory = new QualityFactory(this._entityManager);
        qualityFactory.create(
            QualityID.Poor,
            'Poor',
            500,
        );
        qualityFactory.create(
            QualityID.Common,
            'Common',
            510,
        );
        qualityFactory.create(
            QualityID.Uncommon,
            'Uncommon',
            520,
        );
        qualityFactory.create(
            QualityID.Rare,
            'Rare',
            530,
        );
        qualityFactory.create(
            QualityID.Epic,
            'Epic',
            540,
        );
        qualityFactory.create(
            QualityID.Legendary,
            'Legendary',
            550,
        );

        debug(DebugNamespaceID.Load)('[OK]: EntityManagerBuilder.Quality');
    }

    private _createHeroRoles() {
        let heroRoleFactory = new HeroRoleFactory(this._entityManager);
        heroRoleFactory.create(
            HeroRoleID.Tank,
            'Танк',
            500,
            IconID.Shield01,
        );
        heroRoleFactory.create(
            HeroRoleID.DamageDealer,
            'Боец',
            510,
            IconID.Sword01,
        );
        heroRoleFactory.create(
            HeroRoleID.Support,
            'Поддержка',
            520,
            IconID.Plus01,
        );

        debug(DebugNamespaceID.Load)('[OK]: EntityManagerBuilder.HeroRole');
    }

    private _createItemCategories() {
        let itemCategoryFactory = new ItemCategoryFactory(this._entityManager);

        itemCategoryFactory.create(
            ItemCategoryID.Others,
            'Остальное',
            500,
            null,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Weapons,
            'Оружие',
            500,
            null,
        );
        itemCategoryFactory.create(
            ItemCategoryID.OneHandedSwords,
            'Одноручные мечи',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.TwoHandedSwords,
            'Двуручные мечи',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.OneHandedAxes,
            'Одноручные топоры',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.TwoHandedAxes,
            'Двуручные топоры',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Staffs,
            'Посохи',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Wands,
            'Жезлы',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Daggers,
            'Кинжалы',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Bows,
            'Луки',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Crossbows,
            'Арбалеты',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Revolvers,
            'Револьверы',
            500,
            ItemCategoryID.Weapons,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Armor,
            'Броня',
            500,
            null,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Helmets,
            'Шлемы',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Breastplates,
            'Нагрудники',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Boots,
            'Сапоги',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Gloves,
            'Перчатки',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Pants,
            'Штаны',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.ShoulderPads,
            'Наплечники',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Belts,
            'Поясы',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Bracelets,
            'Браслеты',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Amulets,
            'Амулеты',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Rings,
            'Кольца',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Trinkets,
            'Аксессуары',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Shields,
            'Щиты',
            500,
            ItemCategoryID.Armor,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Resources,
            'Ресурсы',
            500,
            null,
        );
        itemCategoryFactory.create(
            ItemCategoryID.Materials,
            'Материалы',
            500,
            null,
        );

        debug(DebugNamespaceID.Load)('[OK]: EntityManagerBuilder.ItemCategory');
    }

    private _createHeroClasses() {
        let heroClassFactory = new HeroClassFactory(this._entityManager);
        heroClassFactory.create(
            HeroClassID.Warrior,
            HeroClassID.Warrior,
            IconID.Ares01,
            500,
            HeroRoleID.Tank,
            [                   //Может не HeroClass, а отдельный параметр у героя ArmorMaterial
                ArmorMaterialID.Plate,
            ],
            [
                CharacterAttributeID.Strength,
            ],
            [
                ItemCategoryID.OneHandedSwords,
                ItemCategoryID.OneHandedAxes,
            ],
            [
                ItemCategoryID.Shields,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Paladin,
            HeroClassID.Paladin,
            IconID.Question01,
            510,
            HeroRoleID.Tank,
            [
                ArmorMaterialID.Plate,
            ],
            [
                CharacterAttributeID.Strength,
                CharacterAttributeID.Intelligence,
            ],
            [
                ItemCategoryID.OneHandedSwords,
                ItemCategoryID.OneHandedAxes,
            ],
            [
                ItemCategoryID.Shields,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Tank1,
            HeroClassID.Tank1,
            IconID.Question01,
            500,    //todo: Не удобно. Надо в отдельный файл переносить.
            HeroRoleID.Tank,
            [
                ArmorMaterialID.Plate,
            ],
            [
                CharacterAttributeID.Strength,
            ],
            [
                ItemCategoryID.OneHandedSwords,
            ],
            [
                ItemCategoryID.Shields,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Tank2,
            HeroClassID.Tank2,
            IconID.Question01,
            500,
            HeroRoleID.Tank,
            [
                ArmorMaterialID.Plate,
            ],
            [
                CharacterAttributeID.Strength,
            ],
            [
                ItemCategoryID.OneHandedSwords,
            ],
            [
                ItemCategoryID.Shields,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Tank3,
            HeroClassID.Tank3,
            IconID.Question01,
            500,
            HeroRoleID.Tank,
            [
                ArmorMaterialID.Plate,
            ],
            [
                CharacterAttributeID.Strength,
            ],
            [
                ItemCategoryID.OneHandedSwords,
            ],
            [
                ItemCategoryID.Shields,
            ],
        );
        //dd plate
        heroClassFactory.create(
            HeroClassID.Gladiator,
            HeroClassID.Gladiator,
            IconID.Sword02,
            530,
            HeroRoleID.DamageDealer,
            [
                ArmorMaterialID.Plate,
            ],
            [
                CharacterAttributeID.Strength,
            ],
            [
                ItemCategoryID.OneHandedSwords,
            ],
            [
                ItemCategoryID.OneHandedSwords,
            ],
        );
        heroClassFactory.create(
            HeroClassID.PlateDamageDealerWithOneTwoHandedWeapon,
            HeroClassID.PlateDamageDealerWithOneTwoHandedWeapon,
            IconID.Sword02,
            500,
            HeroRoleID.DamageDealer,
            [
                ArmorMaterialID.Plate,
            ],
            [
                CharacterAttributeID.Strength,
            ],
            [
                ItemCategoryID.TwoHandedSwords,
                ItemCategoryID.TwoHandedAxes,
            ],
        );
        heroClassFactory.create(
            HeroClassID.PlateDamageDealerWithTwoTwoHandedWeapon,
            HeroClassID.PlateDamageDealerWithTwoTwoHandedWeapon,
            IconID.Sword02,
            500,
            HeroRoleID.DamageDealer,
            [
                ArmorMaterialID.Plate,
            ],
            [
                CharacterAttributeID.Strength,
            ],
            [
                ItemCategoryID.TwoHandedSwords,
                ItemCategoryID.TwoHandedAxes,
            ],
            [
                ItemCategoryID.TwoHandedSwords,
                ItemCategoryID.TwoHandedAxes,
            ],
        );
        heroClassFactory.create(
            HeroClassID.PlateDamageDealer1,
            HeroClassID.PlateDamageDealer1,
            IconID.Sword02,
            500,
            HeroRoleID.DamageDealer,
            [
                ArmorMaterialID.Plate,
            ],
            [
                CharacterAttributeID.Strength,
                CharacterAttributeID.Intelligence,
            ],
            [
                ItemCategoryID.OneHandedSwords,
                ItemCategoryID.OneHandedAxes,
            ],
            [
                ItemCategoryID.OneHandedSwords,
                ItemCategoryID.OneHandedAxes,
            ],
        );
        heroClassFactory.create(
            HeroClassID.PlateDamageDealer2,
            HeroClassID.PlateDamageDealer2,
            IconID.Sword02,
            500,
            HeroRoleID.DamageDealer,
            [
                ArmorMaterialID.Plate,
            ],
            [
                CharacterAttributeID.Strength,
                CharacterAttributeID.Intelligence,
            ],
            [
                ItemCategoryID.TwoHandedSwords,
            ],
        );
        //dd leather
        heroClassFactory.create(
            HeroClassID.Rogue,
            HeroClassID.Rogue,
            IconID.Sword01,
            520,
            HeroRoleID.DamageDealer,
            [
                ArmorMaterialID.Leather,
            ],
            [
                CharacterAttributeID.Agility,
            ],
            [
                ItemCategoryID.Daggers,
            ],
            [
                ItemCategoryID.Daggers,
            ]
        );
        heroClassFactory.create(
            HeroClassID.Archer,
            HeroClassID.Archer,
            IconID.Sword01,
            540,
            HeroRoleID.DamageDealer,
            [
                ArmorMaterialID.Leather,
            ],
            [
                CharacterAttributeID.Agility,
            ],
            [
                ItemCategoryID.Bows,
                ItemCategoryID.Crossbows,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Gunslinger,
            HeroClassID.Gunslinger,
            IconID.Question01,
            550,
            HeroRoleID.DamageDealer,
            [
                ArmorMaterialID.Leather,
            ],
            [
                CharacterAttributeID.Agility,
                CharacterAttributeID.Intelligence,
            ],
            [
                ItemCategoryID.Revolvers,
            ],
            [
                ItemCategoryID.Revolvers,
            ],
        );
        heroClassFactory.create(
            HeroClassID.LeatherDamageDealer1,
            HeroClassID.LeatherDamageDealer1,
            IconID.Sword01,
            550,
            HeroRoleID.DamageDealer,
            [
                ArmorMaterialID.Leather,
            ],
            [
                CharacterAttributeID.Agility,
                CharacterAttributeID.Intelligence,
            ],
            [
                ItemCategoryID.OneHandedSwords,
            ],
            [

            ],
        );
        heroClassFactory.create(
            HeroClassID.LeatherDamageDealer2,
            HeroClassID.LeatherDamageDealer2,
            IconID.Sword01,
            550,
            HeroRoleID.DamageDealer,
            [
                ArmorMaterialID.Leather,
            ],
            [
                CharacterAttributeID.Agility,
            ],
            [
                ItemCategoryID.OneHandedAxes,
            ],
            [
                ItemCategoryID.OneHandedAxes,
            ],
        );
        //dd cloth
        heroClassFactory.create(
            HeroClassID.FireMage,
            HeroClassID.FireMage,
            IconID.Fire01,
            560,
            HeroRoleID.DamageDealer,
            [
                ArmorMaterialID.Cloth,
            ],
            [
                CharacterAttributeID.Intelligence,
            ],
            [
                ItemCategoryID.Staffs,  //todo: Перчакти вместо оружия.
                ItemCategoryID.Wands,
            ],
            [
                ItemCategoryID.Wands,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Mage1,
            HeroClassID.Mage1,
            IconID.Fire01,
            560,
            HeroRoleID.DamageDealer,
            [
                ArmorMaterialID.Cloth,
            ],
            [
                CharacterAttributeID.Intelligence,
            ],
            [
                ItemCategoryID.Staffs,
                ItemCategoryID.Wands,
            ],
            [
                ItemCategoryID.Wands,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Mage2,
            HeroClassID.Mage2,
            IconID.Question01,
            560,
            HeroRoleID.DamageDealer,
            [
                ArmorMaterialID.Cloth,
            ],
            [
                CharacterAttributeID.Intelligence,
            ],
            [
                ItemCategoryID.Staffs,
                ItemCategoryID.Wands,
            ],
            [
                ItemCategoryID.Wands,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Warlock,
            HeroClassID.Warlock,
            IconID.Question01,
            570,
            HeroRoleID.DamageDealer,
            [
                ArmorMaterialID.Cloth,
            ],
            [
                CharacterAttributeID.Intelligence,
            ],
            [
                ItemCategoryID.Staffs,
                ItemCategoryID.Wands,
            ],
            [
                ItemCategoryID.Wands,
            ],
        );
        heroClassFactory.create(
            HeroClassID.Necromancer,
            HeroClassID.Necromancer,
            IconID.Question01,
            560,
            HeroRoleID.DamageDealer,
            [
                ArmorMaterialID.Cloth,
            ],
            [
                CharacterAttributeID.Intelligence,
            ],
            [
                ItemCategoryID.Staffs,
            ],
            [

            ],
        );
        //support
        heroClassFactory.create(
            HeroClassID.Priest,
            HeroClassID.Priest,
            IconID.Question01,
            560,
            HeroRoleID.Support,
            [
                ArmorMaterialID.Cloth,
            ],
            [
                CharacterAttributeID.Intelligence,
            ],
            [
                ItemCategoryID.Staffs,
            ],
            [
            ],
        );
        heroClassFactory.create(
            HeroClassID.Druid,
            HeroClassID.Druid,
            IconID.Question01,
            560,
            HeroRoleID.Support,
            [
                ArmorMaterialID.Cloth,
            ],
            [
                CharacterAttributeID.Intelligence,
            ],
            [
                ItemCategoryID.Staffs,
            ],
            [
            ],
        );
        heroClassFactory.create(
            HeroClassID.Support1,
            HeroClassID.Support1,
            IconID.Question01,
            560,
            HeroRoleID.Support,
            [
                ArmorMaterialID.Cloth,
            ],
            [
                CharacterAttributeID.Intelligence,
            ],
            [
                ItemCategoryID.Staffs,
            ],
            [

            ],
        );
        heroClassFactory.create(
            HeroClassID.Support2,
            HeroClassID.Support2,
            IconID.Question01,
            560,
            HeroRoleID.Support,
            [
                ArmorMaterialID.Cloth,
            ],
            [
                CharacterAttributeID.Intelligence,
            ],
            [
                ItemCategoryID.Staffs,
            ],
            [

            ],
        );
        heroClassFactory.create(
            HeroClassID.Support3,
            HeroClassID.Support3,
            IconID.Question01,
            560,
            HeroRoleID.Support,
            [
                ArmorMaterialID.Cloth,
            ],
            [
                CharacterAttributeID.Intelligence,
            ],
            [
                ItemCategoryID.Staffs,
            ],
            [

            ],
        );


        debug(DebugNamespaceID.Load)('[OK]: EntityManagerBuilder.HeroClass');
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
                ItemCategoryID.Bracelets,
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
            EquipSlotID.Finger01,
            'Палец 1',
            590,
            [
                ItemCategoryID.Rings,
            ],
        );
        equipSlotFactory.createArmorSlot(
            EquipSlotID.Finger02,
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
                [HeroClassID.FireMage]: [
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
                [HeroClassID.FireMage]: [
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

        debug(DebugNamespaceID.Load)('[OK]: EntityManagerBuilder.EquipSlot');
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
                {enemyLevel: [50, 100], item: this._entityManager.get<Item>(EntityID.Item, ItemID.OneHandedSword01), count: [1, 1], chance: 1},
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
                {enemyLevel: [50, 100], item: this._entityManager.get<Item>(EntityID.Item, ItemID.OneHandedSword01), count: [1, 1], chance: 1},
            ],
            20,
            [10, 20],
        );

        debug(DebugNamespaceID.Load)('[OK]: EntityManagerBuilder.EnemyEntity');
    }

    // private _calcHeroConfig() {
    //     let defaultMainCharacterMultiplier = 0.5;
    //     let tankHealthPointsMultiplier = 1;
    //
    //     let characterAttributeRange = {
    //         [CharacterAttributeID.Strength]: 3,
    //         [CharacterAttributeID.Agility]: 3,
    //         [CharacterAttributeID.Intelligence]: 3,
    //         [CharacterAttributeID.MaxHealthPoints]: 40,
    //         [CharacterAttributeID.Protection]: 50,
    //         [CharacterAttributeID.AttackPower]: 10,
    //     };
    //     let defaultCharacterAttributes = {
    //         [CharacterAttributeID.Strength]: [6, 6 + characterAttributeRange[CharacterAttributeID.Strength]],
    //         [CharacterAttributeID.Agility]: [6, 6 + characterAttributeRange[CharacterAttributeID.Agility]],
    //         [CharacterAttributeID.Intelligence]: [6, 6 + characterAttributeRange[CharacterAttributeID.Intelligence]],
    //
    //         [CharacterAttributeID.MaxHealthPoints]: [80, 80 + characterAttributeRange[CharacterAttributeID.MaxHealthPoints]],
    //         [CharacterAttributeID.Protection]: [0, 0 + characterAttributeRange[CharacterAttributeID.Protection]],    //3-5%
    //         // [CharacterAttributeID.Stamina]: [0, 0],
    //
    //         // [CharacterAttributeID.MaxMagicPoints]: [100, 100],
    //
    //         [CharacterAttributeID.AttackPower]: [16, 16 + characterAttributeRange[CharacterAttributeID.AttackPower]],
    //         // [CharacterAttributeID.AttackSpeed]: [0, 0],
    //         // [CharacterAttributeID.CriticalStrike]: [0, 0],
    //
    //         // [CharacterAttributeID.Luck]: [0, 0],
    //     };
    //
    //     let startCharacterAttributeConfig = {
    //         [HeroClassID.Warrior]: {
    //             [CharacterAttributeID.Strength]: [
    //                 defaultCharacterAttributes[CharacterAttributeID.Strength][0] + defaultCharacterAttributes[CharacterAttributeID.Strength][0] * defaultMainCharacterMultiplier,
    //                 defaultCharacterAttributes[CharacterAttributeID.Strength][0] + defaultCharacterAttributes[CharacterAttributeID.Strength][0] * defaultMainCharacterMultiplier + characterAttributeRange
    //             ],
    //             [CharacterAttributeID.Protection]: [
    //                 200,
    //                 300
    //             ],
    //             //todo: Если так просто умножать, то получается слишком большой разброс значений: 160-240. Может быть 160/170/180/190/200/210/220/230/240 - 9 вариантов.
    //             [CharacterAttributeID.MaxHealthPoints]: [
    //                 defaultCharacterAttributes[CharacterAttributeID.MaxHealthPoints][0] + defaultCharacterAttributes[CharacterAttributeID.MaxHealthPoints][0] * tankHealthPointsMultiplier,
    //                 defaultCharacterAttributes[CharacterAttributeID.MaxHealthPoints][1] + defaultCharacterAttributes[CharacterAttributeID.MaxHealthPoints][1] * tankHealthPointsMultiplier
    //             ],
    //             // [CharacterAttributeID.Agility]: [6, 9],
    //             // [CharacterAttributeID.Intelligence]: [6, 9],
    //         },
    //     };
    //     console.log(defaultCharacterAttributes);
    //     console.log(startCharacterAttributeConfig);
    // }

    //Без расчетов. Только в ручную заданные все параметры. todo: Автоматизация позже.
    private _initHeroConfig() {

    }//end method

    private _createIcons() {
        let webPathPattern = '/images/icons/bordered/64x64/%s.png';

        // let p: any = '';
        // path = Path('/to/folder', {root: '/home/hosting', isExists = true});

        //todo: в бд
        let iconIDs = [
            IconID.Adventure01,
            IconID.Ares01,
            IconID.Bear01,
            IconID.BearPawPrint01,
            IconID.Boar01,
            IconID.Board01,
            IconID.Bow01,
            IconID.Brain01,
            IconID.Coins01,
            IconID.CowboyHat01,
            IconID.Dagger01,
            IconID.Fabric01,
            IconID.Fire01,
            IconID.Fist01,
            IconID.Flash01,
            IconID.Flower01,
            IconID.Helmet01,
            IconID.Ingot01,
            IconID.Leather01,
            IconID.Leather02,
            IconID.Leather03,
            IconID.MageHat01,
            IconID.Monster01,
            IconID.Monster02,
            IconID.Ore01,
            IconID.Plant01,
            IconID.Plus01,
            IconID.Question01,
            IconID.Question02,
            IconID.Question03,
            IconID.Question04,
            IconID.Shield01,
            IconID.Sword01,
            IconID.Sword02,
            IconID.Sword03,
            IconID.Sword04,
            IconID.Sword05,
            IconID.Sword06,
            IconID.Sword07,
            IconID.Sword08,
            IconID.Sword09,
            IconID.Sword10,
            IconID.Sword11,
            IconID.Target01,
            IconID.Target02,
            IconID.Thread01,
            IconID.Warrior01,
            IconID.Wood01,
            IconID.BackgroundSlot01,
            IconID.BackgroundSlot02,
            IconID.Amulet01,
            IconID.Belt01,
            IconID.Boot01,
            IconID.Bracelet01,
            IconID.Breastplate01,
            IconID.Gloves01,
            IconID.Gloves02,
            IconID.Pants01,
            IconID.Ring01,
            IconID.ShoulderPads01,
            IconID.Trinket01,
        ];

        for (let i = 0; i < iconIDs.length; i++) {
            this._entityManager.add<Icon>(EntityID.Icon, iconIDs[i], new Icon(
                iconIDs[i],
            ));
        }
    }
}