import ItemFactory from '../Factories/ItemFactory.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import DebugApp from './DebugApp.js';

interface ItemData {

}

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
        DebugApp.debug(DebugNamespaceID.Load)('[OK]: ItemDatabaseBuilder.Start');

        // this._createStubItems();
        // this._createResources();
        // this._createArmor();
        // this._createWeapons();

        DebugApp.debug(DebugNamespaceID.Load)('[OK]: ItemDatabaseBuilder.End');

        return this._entityManager;
    }

    // private _createResources() {
    //     let wood = this._itemFactory.createByBuilder(
    //         ItemID.Wood,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.Wood,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     getTypes: [
    //                         ItemGetType.Gathering,
    //                     ],
    //                     iconID: IconID.Wood01,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.WoodBoards,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.WoodBoards,
    //                 ItemCategoryID.Materials,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.Coal,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.Coal,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.IronOre,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.IronOre,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     getTypes: [
    //                         ItemGetType.Gathering,
    //                     ],
    //                     iconID: IconID.Ore01,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.IronIngot,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.IronIngot,
    //                 ItemCategoryID.Materials,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     iconID:IconID.Question01,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.CopperOre,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.CopperOre,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     getTypes: [
    //                         ItemGetType.Gathering,
    //                     ],
    //                     iconID: IconID.Ore01,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.CopperIngot,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.CopperIngot,
    //                 ItemCategoryID.Materials,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     iconID:IconID.Question01,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.GoldOre,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.GoldOre,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     getTypes: [
    //                         ItemGetType.Gathering,
    //                     ],
    //                     iconID: IconID.Ore01,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.TinIngot,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.TinIngot,
    //                 ItemCategoryID.Materials,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     iconID:IconID.Question01,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.GoldIngot,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.GoldIngot,
    //                 ItemCategoryID.Materials,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     iconID:IconID.Question01,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.Herb01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.Herb01,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     getTypes: [
    //                         ItemGetType.Gathering,
    //                     ],
    //                     iconID: IconID.Plant01,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.Herb02,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.Herb02,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     getTypes: [
    //                         ItemGetType.Gathering,
    //                     ],
    //                     iconID: IconID.Plant01,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.Herb03,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.Herb03,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     getTypes: [
    //                         ItemGetType.Gathering,
    //                     ],
    //                     iconID: IconID.Plant01,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.Cotton,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.Cotton,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     getTypes: [
    //                         ItemGetType.Gathering,
    //                     ],
    //                     iconID: IconID.Flower01,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.CottonThread,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.CottonThread,
    //                 ItemCategoryID.Materials,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     iconID: IconID.Thread01,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.CottonFabric,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.CottonFabric,
    //                 ItemCategoryID.Materials,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     iconID: IconID.Fabric01,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.RabbitSkin,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.RabbitSkin,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     getTypes: [
    //                         ItemGetType.Hunting,
    //                     ],
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.FoxSkin,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.FoxSkin,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     getTypes: [
    //                         ItemGetType.Hunting,
    //                     ],
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.DeerSkin,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.DeerSkin,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     getTypes: [
    //                         ItemGetType.Hunting,
    //                     ],
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.WolfSkin,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.WolfSkin,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     getTypes: [
    //                         ItemGetType.Hunting,
    //                     ],
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.BearSkin,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.BearSkin,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     getTypes: [
    //                         ItemGetType.Hunting,
    //                     ],
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.Leather01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.Leather01,
    //                 ItemCategoryID.Materials,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                     getTypes: [
    //                         ItemGetType.Hunting,
    //                     ],
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.MagicResource01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.MagicResource01,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: 1,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.MagicMaterial01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.MagicMaterial01,
    //                 ItemCategoryID.Materials,
    //                 {
    //                     stackSize: 1,
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.BoarSkin,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.BoarSkin,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                 },
    //             ),
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.BearMeat,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.BearMeat,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                 },
    //             ),
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.BoarMeat,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.BoarMeat,
    //                 ItemCategoryID.Resources,
    //                 {
    //                     stackSize: DEFAULT_STACK_SIZE,
    //                 },
    //             ),
    //     );
    //
    //     debug(DebugNamespaceID.Load)('[OK]: ItemDatabaseBuilder.Resources');
    // }
    //
    // private _createArmor() {
    //     this._itemFactory.createByBuilder(
    //         ItemID.PlateHelmet01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.PlateHelmet01,
    //                 ItemCategoryID.Helmets,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Plate,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.PlateHelmet02,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.PlateHelmet02,
    //                 ItemCategoryID.Helmets,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Plate,
    //                     },
    //                     characterAttributes: {
    //                         [CharacterAttributeID.Strength]: 2,
    //                         // [CharacterAttributeID.Agility]: 1,
    //                         // [CharacterAttributeID.Intelligence]: 12,
    //                         // [CharacterAttributeID.AttackPower]: 10,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.PlateShoulders01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.PlateShoulders01,
    //                 ItemCategoryID.ShoulderPads,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Plate,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.PlateBreastplate01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.PlateBreastplate01,
    //                 ItemCategoryID.Breastplates,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Plate,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.PlateBracer01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.PlateBracer01,
    //                 ItemCategoryID.Bracelets,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Plate,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.PlateGloves01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.PlateGloves01,
    //                 ItemCategoryID.Gloves,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Plate,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.PlateBelt01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.PlateBelt01,
    //                 'Латный пояс 01',
    //                 ItemCategoryID.Belts,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Plate,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.PlatePants01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.PlatePants01,
    //                 'Латный штаны 01',
    //                 ItemCategoryID.Pants,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Plate,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.PlateBoots01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.PlateBoots01,
    //                 'Латный сапоги 01',
    //                 ItemCategoryID.Boots,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Plate,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.LeatherHelmet01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.LeatherHelmet01,
    //                 'Кожаный шлем 01',
    //                 ItemCategoryID.Helmets,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Leather,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.LeatherShoulders01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.LeatherShoulders01,
    //                 'Кожаные наплечники 01',
    //                 ItemCategoryID.ShoulderPads,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Leather,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.LeatherBreastplate01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.LeatherBreastplate01,
    //                 'Кожаный нагрудник 01',
    //                 ItemCategoryID.Breastplates,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Leather,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.LeatherBracer01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.LeatherBracer01,
    //                 'Кожаный браслет 01',
    //                 ItemCategoryID.Bracelets,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Leather,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.LeatherGloves01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.LeatherGloves01,
    //                 'Кожаные перчатки 01',
    //                 ItemCategoryID.Gloves,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Leather,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.LeatherBelt01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.LeatherBelt01,
    //                 'Кожаный пояс 01',
    //                 ItemCategoryID.Belts,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Leather,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.LeatherPants01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.LeatherPants01,
    //                 'Кожаный штаны 01',
    //                 ItemCategoryID.Pants,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Leather,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.LeatherBoots01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.LeatherBoots01,
    //                 'Кожаный сапоги 01',
    //                 ItemCategoryID.Boots,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Leather,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.ClothHelmet01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.ClothHelmet01,
    //                 'Тканевый шлем 01',
    //                 ItemCategoryID.Helmets,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Cloth,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.ClothShoulders_01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.ClothShoulders_01,
    //                 'Тканевые наплечники 01',
    //                 ItemCategoryID.ShoulderPads,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Cloth,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.ClothBreastplate01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.ClothBreastplate01,
    //                 'Тканевый нагрудник 01',
    //                 ItemCategoryID.Breastplates,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Cloth,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.ClothBracer01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.ClothBracer01,
    //                 'Тканевый браслет 01',
    //                 ItemCategoryID.Bracelets,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Cloth,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.ClothGloves01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.ClothGloves01,
    //                 'Тканевые перчатки 01',
    //                 ItemCategoryID.Gloves,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Cloth,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.ClothBelt01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.ClothBelt01,
    //                 'Тканевый пояс 01',
    //                 ItemCategoryID.Belts,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Cloth,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.ClothPants01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.ClothPants01,
    //                 'Тканевый штаны 01',
    //                 ItemCategoryID.Pants,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Cloth,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.ClothBoots01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.ClothBoots01,
    //                 'Тканевый сапоги 01',
    //                 ItemCategoryID.Boots,
    //                 {
    //                     properties: {
    //                         armorMaterialID: ArmorMaterialID.Cloth,
    //                     },
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.Shield01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.Shield01,
    //                 'Щит',
    //                 ItemCategoryID.Shields,
    //                 {
    //
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.Amulet01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.Amulet01,
    //                 'Амулет 01',
    //                 ItemCategoryID.Amulets,
    //                 {
    //
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.Ring01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.Ring01,
    //                 'Кольцо 01',
    //                 ItemCategoryID.Rings,
    //                 {
    //
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.Trinket01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.Trinket01,
    //                 'Тринкет',
    //                 ItemCategoryID.Trinkets,
    //                 {
    //
    //                 },
    //             )
    //     );
    //
    //     debug(DebugNamespaceID.Load)('[OK]: ItemDatabaseBuilder.Armor');
    // }
    //
    // private _createWeapons() {
    //     this._itemFactory.createByBuilder(
    //         ItemID.OneHandedSword01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.OneHandedSword01,
    //                 'Одноручный меч 01',
    //                 ItemCategoryID.OneHandedSwords,
    //                 {
    //
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.TwoHandedSword01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.TwoHandedSword01,
    //                 'Двуручный меч 01',
    //                 ItemCategoryID.TwoHandedSwords,
    //                 {
    //                     properties: {
    //                         twoHandWeapon: true,
    //                     }
    //                 },
    //             )
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.Dagger01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.Dagger01,
    //                 'Кинжал 01',
    //                 ItemCategoryID.Daggers,
    //                 {
    //
    //                 },
    //             ),
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.OneHandedAxe01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.OneHandedAxe01,
    //                 'Одноручный топор 01',
    //                 ItemCategoryID.OneHandedAxes,
    //                 {
    //
    //                 },
    //             ),
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.TwoHandedAxe01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.TwoHandedAxe01,
    //                 'Двуручный топор 01',
    //                 ItemCategoryID.TwoHandedAxes,
    //                 {
    //
    //                 },
    //             ),
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.Staff01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.Staff01,
    //                 'Посох 01',
    //                 ItemCategoryID.Staffs,
    //                 {
    //                     properties: {
    //                         twoHandWeapon: true,
    //                     }
    //                 },
    //             ),
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.Wand01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.Wand01,
    //                 'Жезл 01',
    //                 ItemCategoryID.Wands,
    //                 {
    //
    //                 },
    //             ),
    //     );
    //     this._itemFactory.createByBuilder(
    //         ItemID.Revolver01,
    //         (new ItemBuilder(this._entityManager))
    //             .default(
    //                 ItemID.Revolver01,
    //                 'Револьвер 01',
    //                 ItemCategoryID.Revolvers,
    //                 {
    //
    //                 },
    //             ),
    //     );
    //
    //     debug(DebugNamespaceID.Load)('[OK]: ItemDatabaseBuilder.Weapons');
    // }//end method
}//end class