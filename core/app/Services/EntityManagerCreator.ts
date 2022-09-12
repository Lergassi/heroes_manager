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

export default class EntityManagerCreator {
    create() {
        let entityManager = new EntityManager();

        this._createArmorMaterial(entityManager);
        this._createCharacterAttribute(entityManager);
        this._createCurrency(entityManager);
        this._createQuality(entityManager);
        this._createHeroRole(entityManager);

        this._createItemCategory(entityManager);
        this._createItem(entityManager);
        this._createHeroClass(entityManager);
        this._createEquipSlot(entityManager);

        return entityManager;
    }

    private _createArmorMaterial(entityManager: EntityManager) {
        entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).add(new ArmorMaterial(
            'a86d1e86-1768-47c0-a630-2eb8c49ef029',
            'Латы',
            'armor_material_plate',
            '',
            500,
        ));
        entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).add(new ArmorMaterial(
            '7e9daae3-eb9d-41c6-8589-d5830edc10d0',
            'Кожа',
            'armor_material_leather',
            '',
            510,
        ));
        entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).add(new ArmorMaterial(
            'e13f90ff-eabe-4966-bec8-b805d2c1b4b0',
            'Ткань',
            'armor_material_cloth',
            '',
            520,
        ));
    }

    private _createCharacterAttribute(entityManager: EntityManager) {
        entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            '0380bfd3-1885-4788-bb11-0216e6d216b5',
            'Сила',
            'character_attribute_strength',
            'Увеличивает силу атаки у классов с главной характеристикой \"Сила\".',
            500,
        ));
        entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            '61134aa3-fa19-45a6-a740-b1013abd7bed',
            'Ловкость',
            'character_attribute_agility',
            'Увеличивает силу атаки у классов с главной характеристикой \"Ловкость\".',
            510,
        ));
        entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            '8bd442cf-c3e0-4ecd-8276-9a9df012320c',
            'Интеллект',
            'character_attribute_intelligence',
            'Увеличивает силу атаки и кол-во очков магии у классов с главной характеристикой \"Интеллект\".',
            520,
        ));
        entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            '62f04c4e-fae1-4acb-baad-ef196964368d',
            'Скорость атаки',
            'character_attribute_attack_speed',
            '',
            530,
        ));
        entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            '578f79f9-87df-4218-b5ae-f70572c3794f',
            'Критический удар',
            'character_attribute_critical_strike',
            '',
            540,
        ));
        entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            '226cccb3-8738-473d-9488-15c550203c4b',
            'Выносливость',
            'character_attribute_stamina',
            '',
            550,
        ));
        entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).add(new CharacterAttribute(
            '03b8d14f-dbc6-47f5-90a6-8d005b837e57',
            'Удача',
            'character_attribute_luck',
            'Влияет на многие характеристики.',
            560,
        ));
    }

    private _createCurrency(entityManager: EntityManager) {
        entityManager.getRepository<Currency>(Currency.name).add(new Currency(
            '998495f3-567b-4dc8-af87-70916e96f50a',
            'Золото',
            'currency_gold',
            '',
            500,
        ));
        entityManager.getRepository<Currency>(Currency.name).add(new Currency(
            '3a4b5a8a-68e3-4f4c-86b0-5dbd6b161f3c',
            'Очки исследования',
            'currency_research_points',
            '',
            510,
        ));
    }

    private _createQuality(entityManager: EntityManager) {
        entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            '363b5284-5638-417b-b53c-edd2d90d5a42',
            'Poor',
            'quality_poor',
            'Серые вещи. Мусор для продажи.',
            500,
        ));
        entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            'ddc2fb35-2593-4f5d-948d-61d53573b1cc',
            'Common',
            'quality_common',
            'Белые вещи.',
            510,
        ));
        entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            '2b7bd30d-7c02-4275-8685-0ad6025a7c48',
            'Uncommon',
            'quality_uncommon',
            'Зеленые вещи.',
            520,
        ));
        entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            'f020a3ba-0e4c-45ce-b05b-efdc56283305',
            'Rare',
            'quality_rare',
            'Синие вещи.',
            530,
        ));
        entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            'e442f182-328f-4126-b9ab-d3ca902c3edf',
            'Epic',
            'quality_epic',
            'Фиолетовые вещи.',
            540,
        ));
        entityManager.getRepository<Quality>(Quality.name).add(new Quality(
            '0c969893-94e9-4851-b890-c39f5a1979ae',
            'Legendary',
            'quality_legendary',
            'Оранжевые вещи.',
            550,
        ));
    }

    private _createHeroRole(entityManager: EntityManager) {
        entityManager.getRepository<HeroRole>(HeroRole.name).add(new HeroRole(
            '8317f2cf-5ec0-4ec8-81e3-9ae0c308c7c8',
            'Танк',
            'hero_role_tank',
            '',
            500,
        ));
        entityManager.getRepository<HeroRole>(HeroRole.name).add(new HeroRole(
            '189a0a98-c90a-4deb-a933-2fa76bd147d3',
            'Поддержка',
            'hero_role_support',
            '',
            510,
        ));
        entityManager.getRepository<HeroRole>(HeroRole.name).add(new HeroRole(
            'b0a0b54b-4c1e-4fe3-b43d-addad24b664e',
            'Боец',
            'hero_role_damage_dealer',
            '',
            520,
        ));
    }

    private _createItemCategory(entityManager: EntityManager) {
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '611abe4d-86fc-4107-baab-54a95e1ae2fd',
            'Оружие',
            'item_category_weapons',
            '',
            500,
            null,
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'e8326c4b-8762-450c-9128-e868ade59db1',
            'Одноручные мечи',
            'item_category_one_handed_swords',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_weapons'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '874d2f2c-96e6-4d4b-aa79-abaa2cd7d8a6',
            'Двуручные мечи',
            'item_category_two_handed_swords',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_weapons'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'a217e997-83b8-4ac5-8bf1-271c46b947db',
            'Одноручные топоры',
            'item_category_one_handed_axes',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_weapons'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'a697e1d7-dd76-4056-8053-06ad8ae6ad40',
            'Двуручные топоры',
            'item_category_two_handed_axes',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_weapons'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '02434bf5-a2cf-47d6-b388-0e4a10745656',
            'Посохи',
            'item_category_staffs',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_weapons'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '0876ae49-d54c-4d4b-a123-c6d0d4588f4e',
            'Жезлы',
            'item_category_wands',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_weapons'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '1916d139-3891-4e97-b0f8-a3670061f861',
            'Кинжалы',
            'item_category_daggers',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_weapons'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'cea704a3-4cf8-4182-af74-69dc336fbd44',
            'Луки',
            'item_category_bows',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_weapons'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '9bfbae69-b95a-4d5d-8df9-ccf2aa27a840',
            'Арбалеты',
            'item_category_crossbows',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_weapons'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'bd2fabdf-72a8-4302-b20c-2c0696c6831b',
            'Револьверы',
            'item_category_revolvers',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_weapons'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '640236fb-3b22-4c0e-b74a-4edf3e62d6a8',
            'Броня',
            'item_category_armor',
            '',
            500,
            null,
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'de977f36-a225-405d-a6bf-664b31fbe67f',
            'Шлемы',
            'item_category_helmets',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_armor'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'de977f36-a225-405d-a6bf-664b31fbe67f',
            'Нагрудники',
            'item_category_breastplates',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_armor'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'd66b65e1-cebd-40b8-9d42-c1518bf4387d',
            'Сапоги',
            'item_category_boots',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_armor'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'c5a44fa9-6028-4ab0-8ac3-dcb69973ea03',
            'Перчатки',
            'item_category_gloves',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_armor'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '98d13cf4-8241-4129-bb6c-3a1ffaa3c90f',
            'Штаны',
            'item_category_pants',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_armor'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'eb003637-a6d5-4192-b7e4-136da550e734',
            'Наплечники',
            'item_category_shoulders',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_armor'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'd4e1aef8-4300-4567-b24b-a269512a82cf',
            'Поясы',
            'item_category_belts',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_armor'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '7b67f17e-0f12-463e-b18b-22a4fe470ce0',
            'Браслеты',
            'item_category_bracers',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_armor'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '0765d7ba-600e-41cf-863e-176acfa19ae5',
            'Амулеты',
            'item_category_amulets',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_armor'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '01a33c6d-339c-4a82-91c7-2b9442e057a4',
            'Кольца',
            'item_category_rings',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_armor'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '3e86e1de-c59d-4aed-a968-ab864410e132',
            'Аксессуары',
            'item_category_trinkets',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_armor'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '6fbb8dcb-f86f-495f-82cb-9cfeecd85c00',
            'Щиты',
            'item_category_shields',
            '',
            500,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_armor'),
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            '4df46a18-2d85-40d1-bdc8-6dbda6d12574',
            'Ресурсы',
            'item_category_resources',
            '',
            500,
            null,
        ));
        entityManager.getRepository<ItemCategory>(ItemCategory.name).add(new ItemCategory(
            'acd5d4fc-31cf-4ffe-a69a-026b51613818',
            'Материалы',
            'item_category_materials',
            '',
            500,
            null,
        ));
    }

    private _createItem(entityManager: EntityManager) {
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '09954f0a-3291-4569-b288-02d073bc826f',
            'Древесина',
            'item_wood',
            '',
            20,
            1,
            500,
            false,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_resources'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            null,
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'd2423253-3eff-4715-b2a8-228f78cd1968',
            'Железная руда',
            'item_iron_ore',
            '',
            20,
            1,
            500,
            false,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_resources'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            null,
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '83eea98a-21f9-48ed-b2a9-88b2638ac03b',
            'Железный слиток',
            'item_iron_bar',
            '',
            20,
            1,
            500,
            false,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_resources'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            null,
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'a5492c54-9a4d-42b7-8ec3-a8ccaa787854',
            'Одноручный меч (01)',
            'item_one_handed_sword_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_one_handed_swords'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            null,
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '7e294428-7448-43d0-aff0-23f86511fdf2',
            'Двуручный меч (01)',
            'item_two_handed_sword_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_two_handed_swords'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            null,
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'f01594a0-efdc-418d-98e9-fe4128a5bc63',
            'Кинжал (01)',
            'item_dagger_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_daggers'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            null,
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '1efc1c84-bc42-49c6-ba6a-87615a5308ea',
            'Одноручный топор (01)',
            'item_one_handed_axe_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_one_handed_axes'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            null,
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '2c6e3f0f-0f64-45d3-a9d5-68775b938d36',
            'Двуручный топор (01)',
            'item_two_handed_axe_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_two_handed_axes'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            null,
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '5d67d7e2-76f5-435c-a0e0-e76cc5c23564',
            'Посох (01)',
            'item_staff_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_staffs'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            null,
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '6dead4cd-91cd-4f48-b103-0a7e7f652b3c',
            'Жезл (01)',
            'item_wand_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_wands'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            null,
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '7a00f9f6-d6a7-471c-b95f-a48533cfdeb8',
            'Револьвер (01)',
            'item_revolver_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_revolvers'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            null,
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'b0ccfb06-588e-4ea8-bac4-25d57f18cc29',
            'Кольцо (01)',
            'item_ring_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            null,
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'fe4042e6-43fd-468f-9e64-9c661cec4cb9',
            'Амулет (01)',
            'item_amulet_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_amulets'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            null,
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '9d2775b7-7700-4ab6-9b4c-2cd03d7b98fc',
            'Тринкет (01)',
            'item_trinket_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_trinkets'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            null,
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'f2d58c88-a439-46b7-a4ef-e849963356b9',
            'Щит (01)',
            'item_shield_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shields'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            null,
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '51a2a98c-584b-47ca-a2aa-fe4d32b323df',
            'Латный шлем (01)',
            'item_plate_helmet_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_helmets'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_plate'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'd54c9ab6-faac-4ef9-a2f1-407e71304a24',
            'Латные наплечники (01)',
            'item_plate_shoulders_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shoulders'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_plate'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'b18f9675-20f1-49b0-939a-f9d5ec4a199d',
            'Латный нагрудник (01)',
            'item_plate_breastplate_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_breastplates'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_plate'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '30630466-c3b2-4a0e-a347-93b919dd3102',
            'Латный браслет (01)',
            'item_plate_bracer_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bracers'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_plate'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '0de0097c-9d4a-4094-b800-d37196ac3207',
            'Латные перчатки (01)',
            'item_plate_gloves_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_gloves'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_plate'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'f65240d0-5c4f-47b7-ae18-91d2714cd715',
            'Латный пояс (01)',
            'item_plate_belt_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_belts'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_plate'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '6547cc56-741c-4a17-ba44-6368298c6dd2',
            'Латный штаны (01)',
            'item_plate_pants_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_pants'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_plate'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '604677b5-e285-4c04-9ee3-537746621f5a',
            'Латный сапоги (01)',
            'item_plate_boots_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_boots'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_plate'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '4de1e1bc-5842-4e78-a956-6b43735293c3',
            'Кожанный шлем (01)',
            'item_leather_helmet_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_helmets'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_leather'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'f30905f4-e924-4ad2-bbaf-5099a99eaf10',
            'Кожанные наплечники (01)',
            'item_leather_shoulders_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shoulders'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_leather'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'ada53cb7-244c-4a31-9649-c558bbd7800b',
            'Кожанный нагрудник (01)',
            'item_leather_breastplate_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_breastplates'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_leather'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '4dc33853-057f-441d-95ac-94aad1211c61',
            'Кожанный браслет (01)',
            'item_leather_bracer_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bracers'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_leather'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '07ec4b03-30d9-482a-8f97-4a3f016cce0c',
            'Кожанные перчатки (01)',
            'item_leather_gloves_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_gloves'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_leather'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '0e7a301c-918d-4565-9de1-cb2edab327aa',
            'Кожанный пояс (01)',
            'item_leather_belt_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_belts'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_leather'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '9eb09be0-7c1d-4fba-bb11-b6745449978c',
            'Кожанный штаны (01)',
            'item_leather_pants_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_pants'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_leather'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'e1d91749-5c45-47b4-bb31-9053e33a576d',
            'Кожанный сапоги (01)',
            'item_leather_boots_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_boots'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_leather'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'f4bac01f-0d07-4948-b235-631f7e63d83e',
            'Тканевый шлем (01)',
            'item_cloth_helmet_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_helmets'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_cloth'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'a92dfe24-68c9-44a9-ad5c-45a392e60850',
            'Тканевые наплечники (01)',
            'item_cloth_shoulders_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shoulders'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_cloth'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '6b7a9104-6f81-4f24-8403-a6d9577011a6',
            'Тканевый нагрудник (01)',
            'item_cloth_breastplate_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_breastplates'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_cloth'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'd5e4b73a-68bd-4ddf-954f-e70d4e367d2b',
            'Тканевый браслет (01)',
            'item_cloth_bracer_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bracers'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_cloth'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'f9aaca7a-4acd-448e-a0d1-ea1a1c916d9f',
            'Тканевые перчатки (01)',
            'item_cloth_gloves_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_gloves'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_cloth'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            '61847221-ee77-4e81-809c-3d980aecdfd9',
            'Тканевый пояс (01)',
            'item_cloth_belt_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_belts'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_cloth'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'fa9dc8a9-c74b-4c55-9a2b-4d5c1e045f29',
            'Тканевый штаны (01)',
            'item_cloth_pants_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_pants'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_cloth'),
        ));
        entityManager.getRepository<Item>(Item.name).add(new Item(
            'c4ea5041-7709-402a-8bbd-f43e82735902',
            'Тканевый сапоги (01)',
            'item_cloth_boots_01',
            '',
            1,
            1,
            500,
            true,
            entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_boots'),
            entityManager.getRepository<Quality>(Quality.name).getOneByAlias('quality_common'),
            entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_cloth'),
        ));
    }

    private _createHeroClass(entityManager: EntityManager) {
        entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            'bc0c6967-f35b-47eb-b71b-f9270a9b296b',
            'Воин',
            'hero_class_warrior',
            '',
            500,
            entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('hero_role_tank'),
            [
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_one_handed_swords'),
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_one_handed_axes'),
            ],
            [
                entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_plate'),
            ],
            [
                entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias('character_attribute_strength'),
            ],
        ));
        entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            'a0e6e0ba-1781-498b-8608-09f1d825e5fe',
            'Паладин',
            'hero_class_paladin',
            '',
            510,
            entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('hero_role_tank'),
            [
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_one_handed_swords'),
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_one_handed_axes'),
            ],
            [
                entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_plate'),
            ],
            [
                entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias('character_attribute_strength'),
            ],
        ));
        entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            'c7890a07-7bf4-41e7-97fd-3be54426d132',
            'Разбойник',
            'hero_class_rogue',
            '',
            520,
            entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('hero_role_damage_dealer'),
            [
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_daggers'),
            ],
            [
                entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_leather'),
            ],
            [
                entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias('character_attribute_agility'),
            ],
        ));
        entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            '567eb990-4e02-4d6b-b95c-16d191acce9b',
            'Гладиатор',
            'hero_class_gladiator',
            '',
            530,
            entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('hero_role_damage_dealer'),
            [
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_one_handed_swords'),
            ],
            [
                entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_plate'),
            ],
            [
                entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias('character_attribute_strength'),
            ],
        ));
        entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            'ff162123-f440-46dc-a6ed-459efd9b8a8d',
            'Лучник',
            'hero_class_archer',
            '',
            540,
            entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('hero_role_damage_dealer'),
            [
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bows'),
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_crossbows'),
            ],
            [
                entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_leather'),
            ],
            [
                entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias('character_attribute_agility'),
            ],
        ));
        entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            '216fae48-8fed-4eb1-ba05-8c19c941435e',
            'Стрелок',
            'hero_class_gunslinger',
            '',
            550,
            entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('hero_role_damage_dealer'),
            [
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_revolvers'),
            ],
            [
                entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_leather'),
            ],
            [
                entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias('character_attribute_agility'),
                entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias('character_attribute_intelligence'),
            ],
        ));
        entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            '231f3a84-c7c1-4876-8a43-84d838e93e1a',
            'Маг',
            'hero_class_mage',
            '',
            560,
            entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('hero_role_damage_dealer'),
            [
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_staffs'),
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_wands'),
            ],
            [
                entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_cloth'),
            ],
            [
                entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias('character_attribute_intelligence'),
            ],
        ));
        entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            '92200122-b76b-4264-8082-f39af9f21d01',
            'Чернокнижник',
            'hero_class_warlock',
            '',
            570,
            entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('hero_role_damage_dealer'),
            [
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_staffs'),
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_wands'),
            ],
            [
                entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_cloth'),
            ],
            [
                entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias('character_attribute_intelligence'),
            ],
        ));
        entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            '3a85f5dd-8aa6-44f1-a46f-2dad63b92fdd',
            'Священик',
            'hero_class_priest',
            '',
            560,
            entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('hero_role_support'),
            [
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_staffs'),
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_wands'),
            ],
            [
                entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_cloth'),
            ],
            [
                entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias('character_attribute_intelligence'),
            ],
        ));
        entityManager.getRepository<HeroClass>(HeroClass.name).add(new HeroClass(
            'bd3fdce4-3820-4621-b519-59ab1398b4eb',
            'Друид',
            'hero_class_druid',
            '',
            560,
            entityManager.getRepository<HeroRole>(HeroRole.name).getOneByAlias('hero_role_support'),
            [
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_staffs'),
                entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_wands'),
            ],
            [
                entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias('armor_material_cloth'),
            ],
            [
                entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias('character_attribute_intelligence'),
            ],
        ));
    }

    private _createEquipSlot(entityManager: EntityManager) {
        entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            '4223fda7-b0b3-4cda-8cbf-073246cb9df6',
            'Голова',
            'equip_slot_head',
            '',
            500,
            [
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_helmets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_paladin'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_helmets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_helmets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gladiator'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_helmets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_archer'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_helmets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_helmets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_helmets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warlock'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_helmets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_priest'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_helmets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_druid'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_helmets'),
                    ],
                ),
            ],
        ));
        entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            '6be05e16-d9f4-470d-9c99-505e9d6a1a6a',
            'Плечи',
            'equip_slot_shoulders',
            '',
            510,
            [
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shoulders'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_paladin'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shoulders'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shoulders'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gladiator'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shoulders'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_archer'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shoulders'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shoulders'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shoulders'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warlock'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shoulders'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_priest'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shoulders'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_druid'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shoulders'),
                    ],
                ),
            ],
        ));
        entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            '8b7a7277-6011-462a-a258-7d774ed51d1e',
            'Грудь',
            'equip_slot_chest',
            '',
            520,
            [
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_breastplates'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_paladin'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_breastplates'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_breastplates'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gladiator'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_breastplates'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_archer'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_breastplates'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_breastplates'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_breastplates'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warlock'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_breastplates'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_priest'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_breastplates'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_druid'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_breastplates'),
                    ],
                ),
            ],
        ));
        entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            'df67d5be-c5af-45ad-8467-821ea6c0429f',
            'Запястье',
            'equip_slot_wrist',
            '',
            530,
            [
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bracers'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_paladin'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bracers'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bracers'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gladiator'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bracers'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_archer'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bracers'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bracers'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bracers'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warlock'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bracers'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_priest'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bracers'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_druid'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bracers'),
                    ],
                ),
            ],
        ));
        entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            '926bb2e2-640d-4f25-89ff-167457ac6d83',
            'Руки',
            'equip_slot_hands',
            '',
            540,
            [
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_gloves'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_paladin'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_gloves'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_gloves'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gladiator'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_gloves'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_archer'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_gloves'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_gloves'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_gloves'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warlock'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_gloves'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_priest'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_gloves'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_druid'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_gloves'),
                    ],
                ),
            ],
        ));
        entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            '1afeb2f6-9231-412b-9083-357a8828ee12',
            'Талия',
            'equip_slot_waist',
            '',
            550,
            [
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_belts'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_paladin'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_belts'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_belts'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gladiator'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_belts'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_archer'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_belts'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_belts'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_belts'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warlock'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_belts'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_priest'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_belts'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_druid'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_belts'),
                    ],
                ),
            ],
        ));
        entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            'f32b66c1-dd40-491e-9c39-bbc245086281',
            'Ноги',
            'equip_slot_legs',
            '',
            560,
            [
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_pants'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_paladin'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_pants'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_pants'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gladiator'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_pants'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_archer'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_pants'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_pants'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_pants'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warlock'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_pants'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_priest'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_pants'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_druid'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_pants'),
                    ],
                ),
            ],
        ));
        entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            '3c25204e-4771-485e-96c4-914c99519a95',
            'Ступни',
            'equip_slot_foots',
            '',
            570,
            [
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_boots'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_paladin'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_boots'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_boots'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gladiator'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_boots'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_archer'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_boots'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_boots'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_boots'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warlock'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_boots'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_priest'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_boots'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_druid'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_boots'),
                    ],
                ),
            ],
        ));
        entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            '9d9fbf4e-1a2f-46f0-b10e-f5963403ed33',
            'Шея',
            'equip_slot_neck',
            '',
            580,
            [
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_amulets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_paladin'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_amulets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_amulets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gladiator'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_amulets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_archer'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_amulets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_amulets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_amulets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warlock'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_amulets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_priest'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_amulets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_druid'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_amulets'),
                    ],
                ),
            ],
        ));
        entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            'b421b711-1a3f-4558-b245-a76aa8348b30',
            'Палец 1',
            'equip_slot_finger_1',
            '',
            590,
            [
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_paladin'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gladiator'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_archer'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warlock'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_priest'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_druid'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
            ],
        ));
        entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            'c68bd399-504b-40ab-afb0-4fd5da96036b',
            'Палец 2',
            'equip_slot_finger_2',
            '',
            600,
            [
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_paladin'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gladiator'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_archer'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warlock'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_priest'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_druid'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_rings'),
                    ],
                ),
            ],
        ));
        entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            '60735275-5510-4430-85e8-8e0105579c80',
            'Аксессуар',
            'equip_slot_trinket',
            '',
            610,
            [
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_trinkets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_paladin'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_trinkets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_trinkets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gladiator'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_trinkets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_archer'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_trinkets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_trinkets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_trinkets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warlock'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_trinkets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_priest'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_trinkets'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_druid'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_trinkets'),
                    ],
                ),
            ],
        ));
        entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            'bba431bf-a332-4bee-8f5b-e5bd19337ec7',
            'Правая рука',
            'equip_slot_right_hand',
            '',
            620,
            [
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_one_handed_swords'),
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_one_handed_axes'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_paladin'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_one_handed_swords'),
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_one_handed_axes'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_daggers'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gladiator'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_one_handed_swords'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_archer'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bows'),
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_crossbows'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_revolvers'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_staffs'),
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_wands'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warlock'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_staffs'),
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_wands'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_priest'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_staffs'),
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_wands'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_druid'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_staffs'),
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_wands'),
                    ],
                ),
            ],
        ));
        entityManager.getRepository<EquipSlot>(EquipSlot.name).add(new EquipSlot(
            '800282dc-a818-4459-8245-a37f06e976ff',
            'Левая рука',
            'equip_slot_left_hand',
            '',
            620,
            [
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warrior'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shields'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_paladin'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_shields'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_rogue'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_daggers'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gladiator'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_one_handed_swords'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_archer'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_bows'),
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_crossbows'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_gunslinger'),
                    [
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_revolvers'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_mage'),
                    [
                        // entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_staffs'),
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_wands'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_warlock'),
                    [
                        // entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_staffs'),
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_wands'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_priest'),
                    [
                        // entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_staffs'),
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_wands'),
                    ],
                ),
                new EquipSlotRule(
                    entityManager.getRepository<HeroClass>(HeroClass.name).getOneByAlias('hero_class_druid'),
                    [
                        // entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_staffs'),
                        entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias('item_category_wands'),
                    ],
                ),
            ],
        ));
    }
}