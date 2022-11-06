import EntityManager from '../../source/EntityManager.js';
import Item, {ItemGetType} from '../Entities/Item.js';
import ItemBuilder from './ItemBuilder.js';
import ItemFactory from '../Factories/ItemFactory.js';
import {DEFAULT_STACK_SIZE} from '../consts.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {ArmorMaterialID} from '../../types/enums/ArmorMaterialID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {IconID} from '../../types/enums/IconID.js';

export default class ItemDatabaseBuilder {
    private readonly _entityManager: EntityManagerInterface;
    private readonly _itemFactory: ItemFactory;

    constructor(
        entityManager: EntityManagerInterface,
    ) {
        this._entityManager = entityManager;
        this._itemFactory = new ItemFactory(this._entityManager);
    }

    build(): EntityManagerInterface {
        debug(DebugNamespaceID.Load)('[OK]: ItemDatabaseBuilder.Start');

        // this._createItems();
        this._createStubItems();
        this._createResources();
        this._createArmor();
        this._createWeapons();

        debug(DebugNamespaceID.Load)('[OK]: ItemDatabaseBuilder.End');

        return this._entityManager;
    }

    private _createStubItems() {
        let stubIDs = [
            ItemID.Stub01,
            ItemID.Stub02,
            ItemID.Stub03,
            ItemID.Stub04,
            ItemID.Stub05,
        ];
        // _.map(stubIDs, (ID) => {
        //     this._itemFactory.createByBuilder(
        //         ID,
        //         (new ItemBuilder(this._entityManager))
        //             .default(
        //                 ID,
        //                 ID,
        //                 ItemCategoryID.Stubs,
        //                 {
        //
        //                 },
        //             )
        //     );
        // });
    }

    private _createResources() {
        let wood = this._itemFactory.createByBuilder(
            ItemID.Wood,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.Wood,
                    'Древесина',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                        iconID: IconID.Wood,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.WoodBoards,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.WoodBoards,
                    'Доски',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.Coal,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.Coal,
                    'Уголь',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.IronOre,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.IronOre,
                    'Железная руда',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                        iconID: IconID.Ore,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.IronBar,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.IronBar,
                    'Железный слиток',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        iconID: IconID.Bar,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.CopperOre,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.CopperOre,
                    'Медная руда',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                        iconID: IconID.Ore,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.CopperBar,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.CopperBar,
                    'Медный слиток',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        iconID: IconID.Bar,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.GoldOre,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.GoldOre,
                    'Золотая руда',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                        iconID: IconID.Ore,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.TinBar,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.TinBar,
                    'Оловянный слиток',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        iconID: IconID.Bar,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.GoldBar,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.GoldBar,
                    'Золотой слиток',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        iconID: IconID.Bar,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.Herb_1,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.Herb_1,
                    'Трава 1',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                        iconID: IconID.Herb01,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.Herb_2,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.Herb_2,
                    'Трава 2',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                        iconID: IconID.Herb01,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.Herb_3,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.Herb_3,
                    'Трава 3',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Gathering,
                        ],
                        iconID: IconID.Herb01,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.Cotton,
            (new ItemBuilder(this._entityManager))
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
        );
        this._itemFactory.createByBuilder(
            ItemID.CottonThread,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.CottonThread,
                    'Хлопковая нить',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.CottonFabric,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.CottonFabric,
                    'Хлопковая ткань',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.RabbitSkin,
            (new ItemBuilder(this._entityManager))
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
        );
        this._itemFactory.createByBuilder(
            ItemID.FoxSkin,
            (new ItemBuilder(this._entityManager))
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
        );
        this._itemFactory.createByBuilder(
            ItemID.DeerSkin,
            (new ItemBuilder(this._entityManager))
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
        );
        this._itemFactory.createByBuilder(
            ItemID.WolfSkin,
            (new ItemBuilder(this._entityManager))
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
        );
        this._itemFactory.createByBuilder(
            ItemID.BearSkin,
            (new ItemBuilder(this._entityManager))
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
        );
        this._itemFactory.createByBuilder(
            ItemID.Leather_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.Leather_01,
                    'Кожа',
                    ItemCategoryID.Materials,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                        getTypes: [
                            ItemGetType.Hunting,
                        ],
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.MagicResources_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.MagicResources_01,
                    'Магический ресурс 1',
                    ItemCategoryID.Resources,
                    {
                        stackSize: 1,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.MagicMaterial_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.MagicMaterial_01,
                    'Магический материал 1',
                    ItemCategoryID.Materials,
                    {
                        stackSize: 1,
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.BoarSkin,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.BoarSkin,
                    'Кожа кабана',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                ),
        );
        this._itemFactory.createByBuilder(
            ItemID.BearMeat,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.BearMeat,
                    'Мясо медведя',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                ),
        );
        this._itemFactory.createByBuilder(
            ItemID.BoarMeat,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.BoarMeat,
                    'Мясо кабана',
                    ItemCategoryID.Resources,
                    {
                        stackSize: DEFAULT_STACK_SIZE,
                    },
                ),
        );

        debug(DebugNamespaceID.Load)('[OK]: ItemDatabaseBuilder.Resources');
    }

    private _createArmor() {
        this._itemFactory.createByBuilder(
            ItemID.PlateHelmet_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.PlateHelmet_01,
                    'Латный шлем 01',
                    ItemCategoryID.Helmets,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Plate,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.PlateHelmet_02,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.PlateHelmet_02,
                    'Латный шлем 02',
                    ItemCategoryID.Helmets,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Plate,
                        },
                        characterAttributes: {
                            [CharacterAttributeID.Strength]: 2,
                            // [CharacterAttributeID.Agility]: 1,
                            // [CharacterAttributeID.Intelligence]: 12,
                            // [CharacterAttributeID.AttackPower]: 10,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.PlateShoulders_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.PlateShoulders_01,
                    'Латные наплечники 01',
                    ItemCategoryID.ShoulderPads,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Plate,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.PlateBreastplate_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.PlateBreastplate_01,
                    'Латный нагрудник 01',
                    ItemCategoryID.Breastplates,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Plate,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.PlateBracer_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.PlateBracer_01,
                    'Латный браслет 01',
                    ItemCategoryID.Bracers,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Plate,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.PlateGloves_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.PlateGloves_01,
                    'Латные перчатки 01',
                    ItemCategoryID.Gloves,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Plate,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.PlateBelt_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.PlateBelt_01,
                    'Латный пояс 01',
                    ItemCategoryID.Belts,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Plate,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.PlatePants_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.PlatePants_01,
                    'Латный штаны 01',
                    ItemCategoryID.Pants,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Plate,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.PlateBoots_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.PlateBoots_01,
                    'Латный сапоги 01',
                    ItemCategoryID.Boots,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Plate,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.LeatherHelmet_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.LeatherHelmet_01,
                    'Кожаный шлем 01',
                    ItemCategoryID.Helmets,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Leather,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.LeatherShoulders_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.LeatherShoulders_01,
                    'Кожаные наплечники 01',
                    ItemCategoryID.ShoulderPads,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Leather,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.LeatherBreastplate_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.LeatherBreastplate_01,
                    'Кожаный нагрудник 01',
                    ItemCategoryID.Breastplates,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Leather,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.LeatherBracer_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.LeatherBracer_01,
                    'Кожаный браслет 01',
                    ItemCategoryID.Bracers,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Leather,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.LeatherGloves_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.LeatherGloves_01,
                    'Кожаные перчатки 01',
                    ItemCategoryID.Gloves,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Leather,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.LeatherBelt_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.LeatherBelt_01,
                    'Кожаный пояс 01',
                    ItemCategoryID.Belts,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Leather,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.LeatherPants_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.LeatherPants_01,
                    'Кожаный штаны 01',
                    ItemCategoryID.Pants,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Leather,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.LeatherBoots_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.LeatherBoots_01,
                    'Кожаный сапоги 01',
                    ItemCategoryID.Boots,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Leather,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.ClothHelmet_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.ClothHelmet_01,
                    'Тканевый шлем 01',
                    ItemCategoryID.Helmets,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Cloth,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.ClothShoulders_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.ClothShoulders_01,
                    'Тканевые наплечники 01',
                    ItemCategoryID.ShoulderPads,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Cloth,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.ClothBreastplate_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.ClothBreastplate_01,
                    'Тканевый нагрудник 01',
                    ItemCategoryID.Breastplates,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Cloth,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.ClothBracer_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.ClothBracer_01,
                    'Тканевый браслет 01',
                    ItemCategoryID.Bracers,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Cloth,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.ClothGloves_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.ClothGloves_01,
                    'Тканевые перчатки 01',
                    ItemCategoryID.Gloves,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Cloth,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.ClothBelt_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.ClothBelt_01,
                    'Тканевый пояс 01',
                    ItemCategoryID.Belts,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Cloth,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.ClothPants_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.ClothPants_01,
                    'Тканевый штаны 01',
                    ItemCategoryID.Pants,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Cloth,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.ClothBoots_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.ClothBoots_01,
                    'Тканевый сапоги 01',
                    ItemCategoryID.Boots,
                    {
                        properties: {
                            armorMaterialID: ArmorMaterialID.Cloth,
                        },
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.Shield_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.Shield_01,
                    'Щит',
                    ItemCategoryID.Shields,
                    {

                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.Amulet_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.Amulet_01,
                    'Амулет 01',
                    ItemCategoryID.Amulets,
                    {

                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.Ring_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.Ring_01,
                    'Кольцо 01',
                    ItemCategoryID.Rings,
                    {

                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.Trinket_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.Trinket_01,
                    'Тринкет',
                    ItemCategoryID.Trinkets,
                    {

                    },
                )
        );

        debug(DebugNamespaceID.Load)('[OK]: ItemDatabaseBuilder.Armor');
    }

    private _createWeapons() {
        this._itemFactory.createByBuilder(
            ItemID.OneHandedSword_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.OneHandedSword_01,
                    'Одноручный меч 01',
                    ItemCategoryID.OneHandedSwords,
                    {

                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.TwoHandedSword_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.TwoHandedSword_01,
                    'Двуручный меч 01',
                    ItemCategoryID.TwoHandedSwords,
                    {
                        properties: {
                            twoHandWeapon: true,
                        }
                    },
                )
        );
        this._itemFactory.createByBuilder(
            ItemID.Dagger_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.Dagger_01,
                    'Кинжал 01',
                    ItemCategoryID.Daggers,
                    {

                    },
                ),
        );
        this._itemFactory.createByBuilder(
            ItemID.OneHandedAxe_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.OneHandedAxe_01,
                    'Одноручный топор 01',
                    ItemCategoryID.OneHandedAxes,
                    {

                    },
                ),
        );
        this._itemFactory.createByBuilder(
            ItemID.TwoHandedAxe_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.TwoHandedAxe_01,
                    'Двуручный топор 01',
                    ItemCategoryID.TwoHandedAxes,
                    {

                    },
                ),
        );
        this._itemFactory.createByBuilder(
            ItemID.Staff_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.Staff_01,
                    'Посох 01',
                    ItemCategoryID.Staffs,
                    {
                        properties: {
                            twoHandWeapon: true,
                        }
                    },
                ),
        );
        this._itemFactory.createByBuilder(
            ItemID.Wand_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.Wand_01,
                    'Жезл 01',
                    ItemCategoryID.Wands,
                    {

                    },
                ),
        );
        this._itemFactory.createByBuilder(
            ItemID.Revolver_01,
            (new ItemBuilder(this._entityManager))
                .default(
                    ItemID.Revolver_01,
                    'Револьвер 01',
                    ItemCategoryID.Revolvers,
                    {

                    },
                ),
        );

        debug(DebugNamespaceID.Load)('[OK]: ItemDatabaseBuilder.Weapons');
    }//end method
}//end class