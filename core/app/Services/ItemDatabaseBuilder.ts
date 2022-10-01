import EntityManager from '../../source/EntityManager.js';
import Item, {ItemGetType} from '../Entities/Item.js';
import ItemBuilder from './ItemBuilder.js';
import {DEFAULT_STACK_SIZE} from '../RuntimeObjects/ItemStack.js';
import ItemCategory from '../Entities/ItemCategory.js';
import Quality from '../Entities/Quality.js';
import ArmorMaterial from '../Entities/ArmorMaterial.js';
import {CharacterAttributeIncrease} from '../../source/IncreaseList.js';
import CharacterAttribute from '../Entities/CharacterAttribute.js';
import ItemFactory from '../Factories/ItemFactory.js';

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
                    '09954f0a-3291-4569-b288-02d073bc826f',
                    'Древесина',
                    'wood',
                    'resources',
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
                    '689e8bd3-1b1c-437f-8532-66680a1f6609',
                    'Доски',
                    'wood_boards',
                    'materials',
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
                    '4f2873d9-6a24-4753-b40d-3bcea2e71d07',
                    'Уголь',
                    'coal',
                    'resources',
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
                    'd2423253-3eff-4715-b2a8-228f78cd1968',
                    'Железная руда',
                    'iron_ore',
                    'resources',
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
                    '5e48954f-f1ae-457e-8b36-c8ef800bbbd8',
                    'Железный слиток',
                    'iron_bar',
                    'materials',
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
                    '046e6d7c-6629-4486-9c7b-0fef2e3456f9',
                    'Медная руда',
                    'copper_ore',
                    'resources',
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
                    '9dc8102a-3def-43df-9078-332a77dcd4e8',
                    'Медный слиток',
                    'copper_bar',
                    'materials',
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
                    'b95e4cc7-d55c-4f43-8dc3-6195b6601469',
                    'Оловяная руда',
                    'tin_bar',
                    'resources',
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
                    'ad8e524f-21da-4312-8d3e-bb761c576f72',
                    'Оловянный слиток',
                    'tin_bar',
                    'materials',
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
                    '28409dfa-8ad4-489f-a9f3-bc4e7eea8ffc',
                    'Бронзовый слиток',
                    'bronze_bar',
                    'materials',
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
                    'e008221f-2468-480b-a27c-a9702a616e7a',
                    'Трава 1',
                    'herb_1',
                    'resources',
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
                    '66560e57-59e6-49b8-a6dc-d008b51c6908',
                    'Трава 2',
                    'herb_2',
                    'resources',
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
                    '8ac45b16-af8c-4373-9906-06778de8de81',
                    'Трава 3',
                    'herb_3',
                    'resources',
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
                    'ca77d48f-a249-479a-8f55-2d2cf90c353f',
                    'Хлопок',
                    'cotton',
                    'resources',
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
                    '85a67e7b-ab4c-42eb-896a-c02f42416bbd',
                    'Хлопковая нить',
                    'cotton_thread',
                    'materials',
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
                    'e5082072-4b00-4159-a4bb-85223ed28757',
                    'Хлопковая ткань',
                    'cotton_fabric',
                    'materials',
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
                    '2c4fe3a3-57eb-424f-876b-595a252b2877',
                    'Шкура зайца',
                    'rabbit_skin',
                    'resources',
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
                    '3b749e72-29f1-4590-ba0b-54d765a94766',
                    'Шкура лисы',
                    'fox_skin',
                    'resources',
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
                    '3810cd06-23f9-4257-b6ae-3facfdfebfcb',
                    'Шкура оленя',
                    'deer_skin',
                    'resources',
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
                    '46d89c19-3cc6-4cbb-89df-3faf247bb881',
                    'Шкура волка',
                    'wolf_skin',
                    'resources',
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
                    '5ec3ea72-d263-4b94-ac4a-b77d3c0dbfc3',
                    'Шкура медведя',
                    'bear_skin',
                    'resources',
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
                    'd98c137b-140d-427d-b17b-03ec35afec1d',
                    'Кожа',
                    'leather_1',
                    'materials',
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
                    'a8555923-f7f6-43ea-9acf-2f58ec20670a',
                    'Магический ресурс 1',
                    'magic_resources_1',
                    'resources',
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
                    '4cef1e2c-dc75-48cb-9299-c450ae1dfad0',
                    'Магический предмет 1',
                    'magic_material_1',
                    'materials',
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
                    '8a2e3afc-5d39-4493-90cf-6f212abc05ed',
                    'Латный шлем 01',
                    'plate_helmet_01',
                    'helmets',
                    {
                        properties: {
                            armorMaterial: 'plate',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '51a2a98c-584b-47ca-a2aa-fe4d32b323df',
                    'Латный шлем 02',
                    'plate_helmet_02',
                    'helmets',
                    {
                        properties: {
                            armorMaterial: 'plate',
                        },
                        increase: {
                            strength: 1000,
                            agility: 1000,
                            intelligence: 1000,
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    'd54c9ab6-faac-4ef9-a2f1-407e71304a24',
                    'Латные наплечники 01',
                    'plate_shoulders_01',
                    'shoulders',
                    {
                        properties: {
                            armorMaterial: 'plate',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    'b18f9675-20f1-49b0-939a-f9d5ec4a199d',
                    'Латный нагрудник 01',
                    'plate_breastplate_01',
                    'breastplates',
                    {
                        properties: {
                            armorMaterial: 'plate',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '30630466-c3b2-4a0e-a347-93b919dd3102',
                    'Латный браслет 01',
                    'plate_helmet_01',
                    'bracers',
                    {
                        properties: {
                            armorMaterial: 'plate',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '0de0097c-9d4a-4094-b800-d37196ac3207',
                    'Латные перчатки 01',
                    'plate_gloves_01',
                    'gloves',
                    {
                        properties: {
                            armorMaterial: 'plate',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    'f65240d0-5c4f-47b7-ae18-91d2714cd715',
                    'Латный пояс 01',
                    'plate_belt_01',
                    'belts',
                    {
                        properties: {
                            armorMaterial: 'plate',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '6547cc56-741c-4a17-ba44-6368298c6dd2',
                    'Латный штаны 01',
                    'plate_pants_01',
                    'pants',
                    {
                        properties: {
                            armorMaterial: 'plate',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '604677b5-e285-4c04-9ee3-537746621f5a',
                    'Латный сапоги 01',
                    'plate_boots_01',
                    'boots',
                    {
                        properties: {
                            armorMaterial: 'plate',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '4de1e1bc-5842-4e78-a956-6b43735293c3',
                    'Кожаный шлем 01',
                    'leather_helmet_01',
                    'helmets',
                    {
                        properties: {
                            armorMaterial: 'leather',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    'f30905f4-e924-4ad2-bbaf-5099a99eaf10',
                    'Кожаные наплечники 01',
                    'leather_shoulders_01',
                    'shoulders',
                    {
                        properties: {
                            armorMaterial: 'leather',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '1d86155f-2c89-4d73-8f57-8b93e1e19751',
                    'Кожаный нагрудник 01',
                    'leather_breastplate_01',
                    'breastplates',
                    {
                        properties: {
                            armorMaterial: 'leather',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '4dc33853-057f-441d-95ac-94aad1211c61',
                    'Кожаный браслет 01',
                    'leather_helmet_01',
                    'bracers',
                    {
                        properties: {
                            armorMaterial: 'leather',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '07ec4b03-30d9-482a-8f97-4a3f016cce0c',
                    'Кожаные перчатки 01',
                    'leather_gloves_01',
                    'gloves',
                    {
                        properties: {
                            armorMaterial: 'leather',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '0e7a301c-918d-4565-9de1-cb2edab327aa',
                    'Кожаный пояс 01',
                    'leather_belt_01',
                    'belts',
                    {
                        properties: {
                            armorMaterial: 'leather',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '9eb09be0-7c1d-4fba-bb11-b6745449978c',
                    'Кожаный штаны 01',
                    'leather_pants_01',
                    'pants',
                    {
                        properties: {
                            armorMaterial: 'leather',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    'e1d91749-5c45-47b4-bb31-9053e33a576d',
                    'Кожаный сапоги 01',
                    'leather_boots_01',
                    'boots',
                    {
                        properties: {
                            armorMaterial: 'leather',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    'f4bac01f-0d07-4948-b235-631f7e63d83e',
                    'Тканевый шлем 01',
                    'cloth_helmet_01',
                    'helmets',
                    {
                        properties: {
                            armorMaterial: 'cloth',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    'a92dfe24-68c9-44a9-ad5c-45a392e60850',
                    'Тканевые наплечники 01',
                    'cloth_shoulders_01',
                    'shoulders',
                    {
                        properties: {
                            armorMaterial: 'cloth',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '6b7a9104-6f81-4f24-8403-a6d9577011a6',
                    'Тканевый нагрудник 01',
                    'cloth_breastplate_01',
                    'breastplates',
                    {
                        properties: {
                            armorMaterial: 'cloth',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    'd5e4b73a-68bd-4ddf-954f-e70d4e367d2b',
                    'Тканевый браслет 01',
                    'cloth_helmet_01',
                    'bracers',
                    {
                        properties: {
                            armorMaterial: 'cloth',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    'f9aaca7a-4acd-448e-a0d1-ea1a1c916d9f',
                    'Тканевые перчатки 01',
                    'cloth_gloves_01',
                    'gloves',
                    {
                        properties: {
                            armorMaterial: 'cloth',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '61847221-ee77-4e81-809c-3d980aecdfd9',
                    'Тканевый пояс 01',
                    'cloth_belt_01',
                    'belts',
                    {
                        properties: {
                            armorMaterial: 'cloth',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    'fa9dc8a9-c74b-4c55-9a2b-4d5c1e045f29',
                    'Тканевый штаны 01',
                    'cloth_pants_01',
                    'pants',
                    {
                        properties: {
                            armorMaterial: 'cloth',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    'c4ea5041-7709-402a-8bbd-f43e82735902',
                    'Тканевый сапоги 01',
                    'cloth_boots_01',
                    'boots',
                    {
                        properties: {
                            armorMaterial: 'cloth',
                        },
                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    'f2d58c88-a439-46b7-a4ef-e849963356b9',
                    'Щит',
                    'shield_01',
                    'shields',
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '3378ac2f-a12d-4737-b16f-6e15d3453ecf',
                    'Амулет 01',
                    'amulet_01',
                    'amulets',
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    'b0ccfb06-588e-4ea8-bac4-25d57f18cc29',
                    'Кольцо 01',
                    'ring_01',
                    'rings',
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '9d2775b7-7700-4ab6-9b4c-2cd03d7b98fc',
                    'Тринкет',
                    'trinket_01',
                    'trinkets',
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
                    'a5492c54-9a4d-42b7-8ec3-a8ccaa787854',
                    'Одноручный меч 01',
                    'one_handed_sword_01',
                    'one_handed_swords',
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '7e294428-7448-43d0-aff0-23f86511fdf2',
                    'Двуручный меч 01',
                    'two_handed_sword_01',
                    'two_handed_swords',
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    'f01594a0-efdc-418d-98e9-fe4128a5bc63',
                    'Кинжал 01',
                    'dagger_01',
                    'daggers',
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '1efc1c84-bc42-49c6-ba6a-87615a5308ea',
                    'Одноручный топор 01',
                    'one_handed_axe_01',
                    'one_handed_axes',
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '2c6e3f0f-0f64-45d3-a9d5-68775b938d36',
                    'Двуручный топор 01',
                    'two_handed_axe_01',
                    'two_handed_axes',
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '5d67d7e2-76f5-435c-a0e0-e76cc5c23564',
                    'Посох 01',
                    'staff_01',
                    'staffs',
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '6dead4cd-91cd-4f48-b103-0a7e7f652b3c',
                    'Жезл 01',
                    'wand_01',
                    'wands',
                    {

                    },
                )
                .build()
        );
        this._em.add<Item>(
            Item,
            (new ItemBuilder(this._em))
                .default(
                    '7a00f9f6-d6a7-471c-b95f-a48533cfdeb8',
                    'Револьвер 01',
                    'revolver_01',
                    'revolvers',
                    {

                    },
                )
                .build()
        );
        // this._em.add<Item>(
        //     Item,
        //     this._itemFactory.create(
        //         '4242',
        //         'bla bla bla',
        //         'bla_bla_bla',
        //         'one_handed_swords',
        //     )
        // );
    }
}