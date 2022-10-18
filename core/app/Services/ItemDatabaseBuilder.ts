import EntityManager from '../../source/EntityManager.js';
import Item, {ItemGetType} from '../Entities/Item.js';
import ItemBuilder from './ItemBuilder.js';
import ItemFactory from '../Factories/ItemFactory.js';
import {DEFAULT_STACK_SIZE} from '../consts.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {ArmorMaterialID} from '../../types/enums/ArmorMaterialID.js';
import {ItemID} from '../../types/enums/ItemID.js';

export default class ItemDatabaseBuilder {
    private readonly _em: EntityManager;
    private _itemFactory: ItemFactory;

    constructor(
        entityManager: EntityManager,
        itemFactory: ItemFactory,
    ) {
        this._em = entityManager;
        this._itemFactory = itemFactory;
    }

    build(): EntityManager {
        this._createItems();
        this._createResources();
        this._createArmor();
        this._createWeapons();

        return this._em;
    }

    private _createItems() {

    }

    private _createResources() {
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.Wood,
                    'Древесина',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        properties: {

                        },
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.WoodBoards,
                    'Доски',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        properties: {

                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.Coal,
                    'Уголь',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.IronOre,
                    'Железная руда',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.IronBar,
                    'Железный слиток',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.CopperOre,
                    'Медная руда',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.CopperBar,
                    'Медный слиток',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.TinOre,
                    'Оловяная руда',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.TinBar,
                    'Оловянный слиток',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.BronzeBar,
                    'Бронзовый слиток',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.GoldOre,
                    'Золотая руда',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.GoldBar,
                    'Золотой слиток',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.Herb_1,
                    'Трава 1',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.Herb_2,
                    'Трава 2',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.Herb_3,
                    'Трава 3',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.Cotton,
                    'Хлопок',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.CottonThread,
                    'Хлопковая нить',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.CottonFabric,
                    'Хлопковая ткань',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.RabbitSkin,
                    'Шкура зайца',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Hunting,
                        ],
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.FoxSkin,
                    'Шкура лисы',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Hunting,
                        ],
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.DeerSkin,
                    'Шкура оленя',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Hunting,
                        ],
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.WolfSkin,
                    'Шкура волка',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Hunting,
                        ],
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.BearSkin,
                    'Шкура медведя',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Hunting,
                        ],
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.Leather_1,
                    'Кожа',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Hunting,
                        ],
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.MagicResources_1,
                    'Магический ресурс 1',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.MagicMaterial_1,
                    'Магический предмет 1',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
                .build()
        );
    }

    private _createArmor() {
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.PlateHelmet_01,
                    'Латный шлем 01',
                    ItemCategoryID.Helmets,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Plate,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.PlateHelmet_02,
                    'Латный шлем 02',
                    ItemCategoryID.Helmets,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Plate,
                        },
                        characterAttributes: {
                            [CharacterAttributeID.Strength]: 10,
                            [CharacterAttributeID.Agility]: 11,
                            [CharacterAttributeID.Intelligence]: 12,
                            [CharacterAttributeID.AttackPower]: 100,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.PlateShoulders_01,
                    'Латные наплечники 01',
                    ItemCategoryID.ShoulderPads,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Plate,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.PlateBreastplate_01,
                    'Латный нагрудник 01',
                    ItemCategoryID.Breastplates,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Plate,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.PlateBracer_01,
                    'Латный браслет 01',
                    ItemCategoryID.Bracers,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Plate,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.PlateGloves_01,
                    'Латные перчатки 01',
                    ItemCategoryID.Gloves,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Plate,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.PlateBelt_01,
                    'Латный пояс 01',
                    ItemCategoryID.Belts,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Plate,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.PlatePants_01,
                    'Латный штаны 01',
                    ItemCategoryID.Pants,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Plate,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.PlateBoots_01,
                    'Латный сапоги 01',
                    ItemCategoryID.Boots,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Plate,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.LeatherHelmet_01,
                    'Кожаный шлем 01',
                    ItemCategoryID.Helmets,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Leather,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.LeatherShoulders_01,
                    'Кожаные наплечники 01',
                    ItemCategoryID.ShoulderPads,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Leather,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.LeatherBreastplate_01,
                    'Кожаный нагрудник 01',
                    ItemCategoryID.Breastplates,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Leather,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.LeatherBracer_01,
                    'Кожаный браслет 01',
                    ItemCategoryID.Bracers,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Leather,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.LeatherGloves_01,
                    'Кожаные перчатки 01',
                    ItemCategoryID.Gloves,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Leather,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.LeatherBelt_01,
                    'Кожаный пояс 01',
                    ItemCategoryID.Belts,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Leather,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.LeatherPants_01,
                    'Кожаный штаны 01',
                    ItemCategoryID.Pants,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Leather,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.LeatherBoots_01,
                    'Кожаный сапоги 01',
                    ItemCategoryID.Boots,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Leather,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.ClothHelmet_01,
                    'Тканевый шлем 01',
                    ItemCategoryID.Helmets,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Cloth,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.ClothShoulders_01,
                    'Тканевые наплечники 01',
                    ItemCategoryID.ShoulderPads,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Cloth,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.ClothBreastplate_01,
                    'Тканевый нагрудник 01',
                    ItemCategoryID.Breastplates,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Cloth,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.ClothBracer_01,
                    'Тканевый браслет 01',
                    ItemCategoryID.Bracers,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Cloth,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.ClothGloves_01,
                    'Тканевые перчатки 01',
                    ItemCategoryID.Gloves,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Cloth,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.ClothBelt_01,
                    'Тканевый пояс 01',
                    ItemCategoryID.Belts,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Cloth,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.ClothPants_01,
                    'Тканевый штаны 01',
                    ItemCategoryID.Pants,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Cloth,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.ClothBoots_01,
                    'Тканевый сапоги 01',
                    ItemCategoryID.Boots,
                    {
                        properties: {
                            armorMaterial: ArmorMaterialID.Cloth,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.Shield_01,
                    'Щит',
                    ItemCategoryID.Shields,
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.Amulet_01,
                    'Амулет 01',
                    ItemCategoryID.Amulets,
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.Ring_01,
                    'Кольцо 01',
                    ItemCategoryID.Rings,
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.Trinket_01,
                    'Тринкет',
                    ItemCategoryID.Trinkets,
                    {

                    },
                )
                .build()
        );
    }

    private _createWeapons() {
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.OneHandedSword_01,
                    'Одноручный меч 01',
                    ItemCategoryID.OneHandedSwords,
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.TwoHandedSword_01,
                    'Двуручный меч 01',
                    ItemCategoryID.TwoHandedSwords,
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.Dagger_01,
                    'Кинжал 01',
                    ItemCategoryID.Daggers,
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.OneHandedAxe_01,
                    'Одноручный топор 01',
                    ItemCategoryID.OneHandedAxes,
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.TwoHandedAxe_01,
                    'Двуручный топор 01',
                    ItemCategoryID.TwoHandedAxes,
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.Staff_01,
                    'Посох 01',
                    ItemCategoryID.Staffs,
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.Wand_01,
                    'Жезл 01',
                    ItemCategoryID.Wands,
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.Revolver_01,
                    'Револьвер 01',
                    ItemCategoryID.Revolvers,
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.BoarSkin,
                    'Кожа кабана',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.BearMeat,
                    'Мясо медведя',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    ItemID.BoarMeat,
                    'Мясо кабана',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
                .build()
        );
    }
}