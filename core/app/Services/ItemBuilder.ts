import Item, {CharacterAttributeIncreaseObject} from '../Entities/Item.js';
import ArmorMaterial from '../Entities/ArmorMaterial.js';
import {CharacterAttributeIncrease} from '../../source/IncreaseList.js';
import CharacterAttribute from '../Entities/CharacterAttribute.js';
import ItemCategory from '../Entities/ItemCategory.js';
import Quality from '../Entities/Quality.js';
import EntityManager from '../../source/EntityManager.js';
import {CharacterAttributeIncreaseObjectBuilder} from './CharacterAttributeIncreaseBuilder.js';

type alias = string;

interface ItemBuilderOptions {
    description?: string;
    stackSize?: number;
    itemLevel?: number;
    sort?: number;
    isEquipable?: boolean;
    quality?: alias;
    armorMaterial?: alias;
    increase?: CharacterAttributeIncreaseObjectBuilder;
}

export default class ItemBuilder {
    private _entityManager: EntityManager;

    private _id: string;
    private _name: string;
    private _alias: string;
    private _description: string;
    private _itemLevel: number;
    private _sort: number;
    private _itemCategory: ItemCategory;
    private _quality: Quality;

    private _stackSize: number;
    private _isEquipable: boolean;
    private _armorMaterial: ArmorMaterial;

    private _increase: CharacterAttributeIncreaseObject;

    constructor(entityManager: EntityManager) {
        this._entityManager = entityManager;
    }

    default(
        id: string,
        name: string,
        alias: string,
        itemCategory: alias,
        options: ItemBuilderOptions = {}
    ) {
        this._id = id;
        this._name = name;
        this._alias = alias;

        this._description = options.description ?? '';
        this._stackSize = options.stackSize ?? 1;
        this._itemLevel = options.itemLevel ?? 1;
        this._sort = options.sort ?? 500;
        this._isEquipable = options.isEquipable ?? false;
        this._armorMaterial = options.armorMaterial ?
            this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias(options.armorMaterial) :
            null
        ;
        this._quality = options.quality ?
            this._entityManager.getRepository<Quality>(Quality.name).getOneByAlias(options.quality) :
            this._entityManager.getRepository<Quality>(Quality.name).getOneByAlias('common')  //или poor?

        ;
        this._itemCategory = this._entityManager.getRepository<ItemCategory>(ItemCategory.name).getOneByAlias(itemCategory);
        this._increase = {};
        let characterAttributeIncreaseObjectBuilder = options.increase ?? {};
        for (const alias in characterAttributeIncreaseObjectBuilder) {
            let characterAttribute = this._entityManager.getRepository<CharacterAttribute>(CharacterAttribute.name).getOneByAlias(alias);
            this._increase[alias] = new CharacterAttributeIncrease(characterAttribute, characterAttributeIncreaseObjectBuilder[alias]);
        }

        return this;
    }

    build(): Item {
        return new Item(
            this._id,
            this._name,
            this._alias,
            this._description,
            this._stackSize,
            this._itemLevel,
            this._sort,
            this._isEquipable,
            this._itemCategory,
            this._quality,
            this._armorMaterial,
            this._increase,
        );
    }

    armor(armorMaterial: alias) {
        this._armorMaterial = this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias(armorMaterial);
        this._equip();

        return this;
    }

    weapon() {
        this._equip();

        return this;
    }

    private _equip() {
        this._isEquipable = true;
        this._stackSize = 1;

        return this;
    }
}