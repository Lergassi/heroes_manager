import Item, {
    CharacterAttributeIncreaseObject,
    CharacterAttributeRecord,
    ItemGetType,
    ItemOptions,
    ItemProperties
} from '../Entities/Item.js';
import ArmorMaterial from '../Entities/ArmorMaterial.js';
import {CharacterAttributeIncrease} from '../../source/IncreaseList.js';
import CharacterAttributeData from '../Entities/CharacterAttributeData.js';
import ItemCategory from '../Entities/ItemCategory.js';
import Quality from '../Entities/Quality.js';
import EntityManager from '../../source/EntityManager.js';
import {CharacterAttributeIncreaseObjectBuilder} from './CharacterAttributeIncreaseBuilder.js';
import {QualityID} from '../../types/enums/QualityID.js';

export type alias = string;
// export type ItemBuilderCreate = (
//     id: string,
//     name: string,
//     alias: string,
//     itemCategory: alias,
//     options: ItemBuilderOptions
// ) => Item;
// export interface ItemBuilderDefaultInterface {
//     default(
//         id: string,
//         name: string,
//         alias: string,
//         itemCategory: alias,
//         options: ItemBuilderOptions = {},
//     )
// }

// export interface ItemBuilder {
//
// }

export interface ItemBuilderOptions {
    description: string;
    stackSize: number;
    itemLevel: number;
    sort: number;
    quality: alias;
    getTypes: ItemGetType[];
    properties: ItemPropertiesBuilderOptions;
    //todo: options и другие свойства в Item это не обязательные параметры. Тут пока объединены в ItemBuilderOptions.
    // armorMaterial: alias;
    increase: CharacterAttributeIncreaseObjectBuilder;
    characterAttributes: Partial<CharacterAttributeRecord>;
    // options: Partial<ItemOptions>;
}

// export interface ItemPropertiesBuilderOptions {
// export interface ItemPropertiesBuilderOptions extends omit<ItemProperties, 'armorMaterial'> {
// export type ItemPropertiesBuilderOptions = Omit<ItemProperties, "armorMaterial"> = {
//     // armorMaterial?: alias;
//     // isEquipable?: boolean;
//     // stackSize?: number;
// }
// export type ItemPropertiesBuilderOptions = Omit<ItemProperties, "armorMaterial">;
// export type ItemPropertiesBuilderOptions = Pick<ItemProperties, 'stackSize' | 'isEquipable'>;
// export interface ItemPropertiesBuilderOptions extends Pick<ItemProperties, 'stackSize' | 'isEquipable'> {
//     armorMaterial?: string;
// }
export interface ItemPropertiesBuilderOptions extends Omit<ItemProperties, 'armorMaterial'> {
    armorMaterial?: string;
}

export class ItemPropertiesBuilder {
    _properties: Readonly<ItemProperties>;

    // constructor(properties: ItemPropertiesBuilderOptions) {
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
    private _entityManager: EntityManager;

    private _id: string;
    private _name: string;
    private _description: string;
    private _itemLevel: number;
    private _sort: number;
    private _itemCategory: ItemCategory;
    private _quality: Quality;
    private _options: Partial<ItemOptions>;

    private _stackSize: number;
    private _isEquipable: boolean;
    private _armorMaterial: ArmorMaterial;

    private _increase: CharacterAttributeIncreaseObject;
    private _characterAttributes: Partial<CharacterAttributeRecord>;
    private _properties: ItemProperties;

    private _default: Partial<ItemBuilderOptions> = {
        description: '',
        itemLevel: 1,
        quality: QualityID.Common,
        sort: 500,
        stackSize: 1,   //todo: Может как stackable лучше указать как default?
    };

    constructor(entityManager: EntityManager) {
        this._entityManager = entityManager;
    }

    //todo: Не понятно, что надо сначала вызвать этот метод.
    default(
        id: string,
        name: string,
        itemCategory: alias,
        options: Partial<ItemBuilderOptions> = {},
    ) {
        this._id = id;
        this._name = name;
        this._itemCategory = this._entityManager.get<ItemCategory>(ItemCategory, itemCategory);

        this._description = options.description ?? this._default.description;
        this._itemLevel = options.itemLevel ?? this._default.itemLevel;
        this._sort = options.sort ?? this._default.sort;
        this._quality = options.quality ?
            this._entityManager.get<Quality>(Quality, options.quality) :
            this._entityManager.get<Quality>(Quality, this._default.quality)  //или poor?
        ;
        this._stackSize = options.stackSize ?? this._default.stackSize;

        this._increase = {};
        let characterAttributeIncreaseObjectBuilder = options.increase ?? {};
        for (const alias in characterAttributeIncreaseObjectBuilder) {
            let characterAttribute = this._entityManager.get<CharacterAttributeData>(CharacterAttributeData, alias);
            this._increase[alias] = new CharacterAttributeIncrease(characterAttribute, characterAttributeIncreaseObjectBuilder[alias]);
        }
        this._characterAttributes = options.characterAttributes || {};

        this._options = {};
        this._options.getTypes = options.getTypes ?? [];

        // this._stackSize = options.stackSize ?? 1;
        // this._isEquipable = options.isEquipable ?? false;
        // this._armorMaterial = options.armorMaterial ?
        //     this._entityManager.get<ArmorMaterial>(ArmorMaterial, options.armorMaterial) :
        //     null
        // ;

        // this._properties = {
        //     armorMaterial: options?.properties?.armorMaterial ?
        //         this._entityManager.get<ArmorMaterial>(ArmorMaterial, options.properties.armorMaterial) :
        //         undefined,
        //     isEquipable: options?.properties?.isEquipable ?? undefined,
        //     stackSize: options?.properties?.stackSize ?? undefined,
        // };

        //todo: Когда будет очень много свойств станет не удобно.
        // this._properties = {};
        // if (options?.properties?.hasOwnProperty('armorMaterial')) {
        //     this._properties.armorMaterial = options.properties.armorMaterial ?
        //         this._entityManager.get<ArmorMaterial>(ArmorMaterial, options.properties.armorMaterial) :
        //         undefined
        //     ;
        // }
        // if (options?.properties?.hasOwnProperty('isEquipable')) {
        //     this._properties.isEquipable = options.properties.isEquipable;
        // }
        // if (options?.properties?.hasOwnProperty('stackSize')) {
        //     this._properties.stackSize = options.properties.stackSize;
        // }
        this._properties = (new ItemPropertiesBuilder({
            armorMaterial: options?.properties?.armorMaterial ?
                this._entityManager.get<ArmorMaterial>(ArmorMaterial, options.properties.armorMaterial) :
                undefined,
            twoHandWeapon: options?.properties?.twoHandWeapon,
        })).build();

        // typeof options?.properties?.stackSize !== 'undefined' ? this._properties.stackSize = options.properties.stackSize : 0;
        // typeof options?.properties?.stackSize !== 'undefined' ?? this._properties.stackSize = options.properties.stackSize;
        // options?.properties?.stackSize ?? (this._properties.stackSize = options.properties.stackSize);
        // this._properties.stackSize = options?.properties?.stackSize;
        // this._properties.set('stackSize', options?.properties?.stackSize);

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
            this._increase,
            this._properties,
            this._options,
            this._characterAttributes,
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
        this._stackSize = 1;

        return this;
    }
}