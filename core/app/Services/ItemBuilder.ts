import Item, {
    CharacterAttributeRecord,
    ItemGetType,
    ItemOptions,
    ItemProperties
} from '../Entities/Item.js';
import ArmorMaterial from '../Entities/ArmorMaterial.js';
import {CharacterAttributeIncrease} from '../../source/IncreaseList.js';
import CharacterAttributeEntity from '../Entities/CharacterAttributeEntity.js';
import ItemCategory from '../Entities/ItemCategory.js';
import Quality from '../Entities/Quality.js';
import EntityManager from '../../source/EntityManager.js';
import {QualityID} from '../../types/enums/QualityID.js';
import {EntityID} from '../../types/enums/EntityID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';

export interface ItemBuilderOptions {
    description: string;
    stackSize: number;
    itemLevel: number;
    sort: number;
    quality: string;
    getTypes: ItemGetType[];
    properties: ItemPropertiesBuilderOptions;
    characterAttributes: Partial<CharacterAttributeRecord>;
}

export interface ItemPropertiesBuilderOptions extends Omit<ItemProperties, 'armorMaterial'> {
    armorMaterialID?: string;
}

/**
 * Идея строителя в том, чтобы в Item не попадали свойства, которых не должно быть, вообще, даже с undefined значением.
 */
export class ItemPropertiesBuilder {
    private _properties: Readonly<ItemProperties>;

    constructor(properties: ItemProperties) {
        this._properties = {};
        for (const propertiesKey in properties) {
            if (typeof properties[propertiesKey] === 'undefined') {
                continue;
            }

            this._properties[propertiesKey] = properties[propertiesKey];
        }
    }

    build(): Readonly<ItemProperties> {
        return this._properties;
    }
}

export default class ItemBuilder {
    private _entityManager: EntityManagerInterface;

    private _id: string;
    private _name: string;
    private _description: string;
    private _itemLevel: number;
    private _sort: number;
    private _itemCategory: ItemCategory;
    private _quality: Quality;
    private _options: Partial<ItemOptions>;
    private _stackSize: number;
    private _characterAttributes: Partial<CharacterAttributeRecord>;
    private _properties: ItemProperties;

    private _default: Partial<ItemBuilderOptions> = {
        description: '',
        itemLevel: 1,
        quality: QualityID.Common,
        sort: 500,
        stackSize: 1,   //todo: Может как stackable лучше указать как default?
    };

    constructor(entityManager: EntityManagerInterface) {
        this._entityManager = entityManager;
    }

    /**
     * todo: Не понятно, что надо сначала вызвать этот метод.
     * @param id
     * @param name
     * @param itemCategoryID
     * @param options Всё что не указано будет задано стандартными значениями.
     */
    default(
        id: string,
        name: string,
        itemCategoryID: ItemCategoryID,
        options: Partial<ItemBuilderOptions> = {},
    ) {
        this._id = id;
        this._name = name;
        this._itemCategory = this._entityManager.get<ItemCategory>(EntityID.ItemCategory, itemCategoryID);
        this._description = options.description ?? this._default.description;
        this._itemLevel = options.itemLevel ?? this._default.itemLevel;
        this._sort = options.sort ?? this._default.sort;
        this._quality = options.quality ?
            this._entityManager.get<Quality>(EntityID.Quality, options.quality) :
            this._entityManager.get<Quality>(EntityID.Quality, this._default.quality)  //или poor?
        ;
        this._stackSize = options.stackSize ?? this._default.stackSize;

        this._characterAttributes = options.characterAttributes || {};
        this._options = {};
        this._options.getTypes = options.getTypes ?? [];

        this._properties = (new ItemPropertiesBuilder({
            armorMaterial: options?.properties?.armorMaterialID ?
                this._entityManager.get<ArmorMaterial>(EntityID.ArmorMaterial, options.properties.armorMaterialID) :
                undefined,
            twoHandWeapon: options?.properties?.twoHandWeapon,
        })).build();

        return this;
    }

    build(): Item {
        return new Item(
            this._id,
            this._name,
            this._description,
            this._stackSize,
            this._itemLevel,
            this._sort,
            this._itemCategory,
            this._quality,
            this._properties,
            this._characterAttributes,
            this._options,
        );
    }

    // armor(armorMaterial: string) {
    //     this._armorMaterial = this._entityManager.getRepository<ArmorMaterial>(ArmorMaterial.name).getOneByAlias(armorMaterial);
    //     this._equip();
    //
    //     return this;
    // }

    // weapon() {
    //     this._equip();
    //
    //     return this;
    // }
}