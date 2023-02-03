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
import {IconID} from '../../types/enums/IconID.js';
import Icon from '../Entities/Icon.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';
import debug from 'debug';
import _ from 'lodash';
import AppError from '../../source/Errors/AppError.js';

export interface ItemBuilderOptions {
    description: string;
    itemCategoryID: ItemCategoryID;
    iconID: IconID;
    stackSize: number;
    itemLevel: number;
    sort: number;
    defaultBuyPrice: number;
    defaultSellPrice: number;
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
    private _icon: Icon;
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
        itemCategoryID: ItemCategoryID.Others,
        itemLevel: 1,
        quality: QualityID.Common,
        sort: 500,
        stackSize: 1,   //todo: Может как stackable лучше указать как default?
        iconID: IconID.Question01,
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
        if (!this._itemCategory) {
            debug(DebugNamespaceID.Replace)(sprintf('Категория %s не найдена и будет заменена на %s.', itemCategoryID, this._default.itemCategoryID));
            this._itemCategory = this._entityManager.get<ItemCategory>(EntityID.ItemCategory, this._default.itemCategoryID);
        }
        this._description = options.description ?? this._default.description;
        this._icon = options.iconID ?
            (this._entityManager.get<Icon>(EntityID.Icon, options.iconID) ??
                this._entityManager.get<Icon>(EntityID.Icon, this._default.iconID)) :
                this._entityManager.get<Icon>(EntityID.Icon, this._default.iconID)
        ;
        this._itemLevel = options.itemLevel ?? this._default.itemLevel;
        this._sort = options.sort ?? this._default.sort;
        this._quality = options.quality ?
            this._entityManager.get<Quality>(EntityID.Quality, options.quality) :
            this._entityManager.get<Quality>(EntityID.Quality, this._default.quality)
        ;
        this._stackSize = options.stackSize ?? this._default.stackSize;

        this._characterAttributes = options.characterAttributes || {};
        this._options = {};
        this._options.getTypes = options.getTypes ?? [];

        this._properties = {};
        if (options.properties?.equipable) {
            if (options.stackSize !== 1) {
                throw new AppError('StackSize для equipable предмета должен быть равный 1.');
            }
            this._properties.equipable = options.properties.equipable;
        }
        if (options.properties?.armorMaterialID) this._properties.armorMaterial = this._entityManager.get<ArmorMaterial>(EntityID.ArmorMaterial, options.properties.armorMaterialID);
        if (options.properties?.twoHandWeapon) this._properties.twoHandWeapon = options.properties.twoHandWeapon;
        if (options.properties?.defaultBuyPrice) this._properties.defaultBuyPrice = options.properties.defaultBuyPrice;
        if (options.properties?.defaultSellPrice) this._properties.defaultSellPrice = options.properties.defaultSellPrice;

        return this;
    }

    build(): Item {
        return new Item(
            this._id,
            this._name,
            this._description,
            this._icon,
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
}