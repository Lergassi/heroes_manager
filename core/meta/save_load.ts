import ArmorMaterialLoader from '../app/Loaders/ArmorMaterialLoader.js';
import ArmorMaterial from '../app/Entities/ArmorMaterial.js';
import CharacterAttribute from '../app/Entities/CharacterAttribute.js';
import CharacterAttributeLoader from '../app/Loaders/CharacterAttributeLoader.js';
import Currency from '../app/Entities/Currency.js';
import HeroRole from '../app/Entities/HeroRole.js';
import HeroRoleLoader from '../app/Loaders/HeroRoleLoader.js';
import CurrencyLoader from '../app/Loaders/CurrencyLoader.js';
import Quality from '../app/Entities/Quality.js';
import QualityLoader from '../app/Loaders/QualityLoader.js';
import ItemCategory from '../app/Entities/ItemCategory.js';
import ItemCategoryLoader from '../app/Loaders/ItemCategoryLoader.js';
import Item from '../app/Entities/Item.js';
import ItemLoader from '../app/Loaders/ItemLoader.js';
import HeroClass from '../app/Entities/HeroClass.js';
import HeroClassLoader from '../app/Loaders/HeroClassLoader.js';
import EquipSlot from '../app/Entities/EquipSlot.js';
import EquipSlotLoader from '../app/Loaders/EquipSlotLoader.js';
import AutoIncrementIDGenerator from '../source/AutoIncrementIDGenerator.js';
import AutoIncrementIDGeneratorLoader from '../app/Loaders/Services/AutoIncrementIDGeneratorLoader.js';

export default [
    {
        classname: ArmorMaterial.name,
        prototype: ArmorMaterial.prototype,
        loader: ArmorMaterialLoader,
    },
    {
        classname: CharacterAttribute.name,
        prototype: CharacterAttribute.prototype,
        loader: CharacterAttributeLoader,
    },
    {
        classname: Currency.name,
        prototype: Currency.prototype,
        loader: CurrencyLoader,
    },
    {
        classname: HeroRole.name,
        prototype: HeroRole.prototype,
        loader: HeroRoleLoader,
    },
    {
        classname: Quality.name,
        prototype: Quality.prototype,
        loader: QualityLoader,
    },
    {
        classname: ItemCategory.name,
        prototype: ItemCategory.prototype,
        loader: ItemCategoryLoader,
    },
    {
        classname: Item.name,
        prototype: Item.prototype,
        loader: ItemLoader,
    },
    {
        classname: HeroClass.name,
        prototype: HeroClass.prototype,
        loader: HeroClassLoader,
    },
    {
        classname: EquipSlot.name,
        prototype: EquipSlot.prototype,
        loader: EquipSlotLoader,
    },
    // {
    //     classname: AutoIncrementIDGenerator.name,
    //     prototype: AutoIncrementIDGenerator.prototype,
    //     loader: AutoIncrementIDGeneratorLoader,
    // }
];