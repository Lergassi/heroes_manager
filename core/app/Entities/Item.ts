import ItemCategory from './ItemCategory.js';
import Quality from './Quality.js';
import ArmorMaterial from './ArmorMaterial.js';
import {CharacterAttributeIncrease} from '../../source/IncreaseList.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../types.js';

// export enum ItemType {
//     Stackable = 'Stackable',
//     Equip = 'Equip',
// }

/**
 * Может быть несколько типов одновременно. Или без типов.
 */
export enum ItemGetType {
    Gathering = 'Gathering',
    Hunting = 'Hunting',
    Crafting = 'Crafting',
    Purchased = 'Purchased',
}

export type ItemCategoryCondition = {
    itemCategory: ItemCategory;
    includeChildren: boolean;
}

// export type ItemFilter = {
//     id: string | string[],
//     name: string | string[],
//     alias: string | string[],
//     // itemLevel: number | number[],  //тут диапазон
//     itemLevel: {
//         min: number;
//         max: number;
//         condition: string;
//     },
//     // itemLevel: LevelRangeCondition,  //тут диапазон
//     // itemCategory: string | string[] | ItemCategory | ItemCategory[],
//     itemCategory: ItemCategory[],
//     // itemCategory: Partial<ItemCategoryCondition[]>,
//     // itemCategory: {
//     //     list: ItemCategory | ItemCategory[],
//     //     withChildren: boolean,
//     // },
//     // quality: Quality | Quality[],
//     quality: Quality[],
//     increase: {},   //А надо?
//     // properties: ItemProperties,
//     properties: {
//         armorMaterial: ArmorMaterial | ArmorMaterial[],
//     },
// }

/**
 * @indev Пока только с условие ИЛИ.
 */
export type ItemFilterCondition = Readonly<Partial<{
    alias: string[],
    itemCategory: /*ItemCategory | */ ItemCategory[],
}>>

export interface ItemProperties {
    armorMaterial?: ArmorMaterial;
    // readonly isStackable?: boolean;
    // stackSize?: number;    //Не может быть одновременно с isEquipable... хотя зелья? А почему можно экипировать только экипировку? Так и надо ставить тип = Экипировка.
}
export type ItemProperty = keyof ItemProperties;

// export interface CharacterAttributes {
//     strength?: number;
//     agility?: number;
//     intelligence?: number;
// }

// let a: ItemProperties = {
//     stackSize: 10,
//     armorMaterial: null,
// };
// a.stackSize = 42;

export type CharacterAttributeIncreaseObject = {[alias: string]: CharacterAttributeIncrease};
export type CharacterAttributeRecord = {[characterAttributeID in CharacterAttributeID]: number};

export interface ItemOptions {
    getTypes: ItemGetType[];
    isStackable: boolean;
    isEquipable: boolean;
}

export default class Item {
    private readonly _id: string;
    private readonly _name: string;
    /**
     * @deprecated
     * @private
     */
    private readonly _alias: string;
    private readonly _description: string;
    private readonly _itemLevel: number;
    private readonly _sort: number;
    private readonly _getTypes: ItemGetType[];
    private readonly _itemCategory: ItemCategory;
    private readonly _quality: Quality;
    private readonly _stackSize: number;

    private readonly _strengthIncrease: number;
    private readonly _agilityIncrease: number;
    private readonly _intelligenceIncrease: number;
    private readonly _healthPointsIncrease: number; //Отдельно от выносливости.
    private readonly _magicPointsIncrease: number;
    private readonly _attackPowerIncrease: number;
    //и тд. Допустим всего атрибутов в игре 30.

    // private readonly _increase: {[alias: string]: CharacterAttributeIncrease};
    private readonly _increase: CharacterAttributeIncreaseObject;
    private readonly _characterAttributes: Partial<CharacterAttributeRecord>;
    private readonly _properties: Readonly<ItemProperties>;

    //Логические значения будут заданы явно. Иначе сначала придется проверять наличие переменой в properties.
    // private readonly _isStackable: boolean;

    //@deprecated
    // private readonly _stackSize: number;    //Нет у экипировки.
    //@deprecated
    // private readonly _isEquipable: boolean; //Только у экипировки.
    //@deprecated
    private readonly _armorMaterial: ArmorMaterial; //Только у брони. todo: Временно. Необязательные параметры перенести в другое место.

    /**
     * @deprecated
     */
    get id(): string {
        return this._id;
    }

    /**
     * @deprecated
     */
    get name(): string {
        return this._name;
    }

    /**
     * @deprecated Использовать ID который теперь alias.
     */
    get alias(): string {
        return this._alias;
    }

    /**
     * @deprecated
     */
    get description(): string {
        return this._description;
    }

    /**
     * @deprecated
     */
    get stackSize(): number {
        return this._stackSize;
    }

    /**
     * @deprecated
     */
    get itemLevel(): number {
        return this._itemLevel;
    }

    /**
     * @deprecated
     */
    get sort(): number {
        return this._sort;
    }

    // /**
    //  * @deprecated Использовать properties.
    //  */
    // get isEquipable(): boolean {
    //     return this._isEquipable;
    // }

    get itemCategory(): ItemCategory {
        return this._itemCategory;
    }

    get quality(): Quality {
        return this._quality;
    }

    /**
     * @deprecated
     */
    get armorMaterial(): ArmorMaterial {
        return this._armorMaterial;
    }

    /**
     * @deprecated
     */
    get properties(): Readonly<ItemProperties> {
        return this._properties;
    }

    constructor (
        id: string,
        name: string,
        alias: string,
        description: string,
        stackSize: number,
        itemLevel: number,
        sort: number,
        itemCategory: ItemCategory,
        quality: Quality,
        increase: CharacterAttributeIncreaseObject = {},
        properties: ItemProperties = {},
        options: Partial<ItemOptions> = {},
        characterAttributes: Partial<CharacterAttributeRecord>,
    ) {
        this._id = id;
        this._name = name;
        this._alias = alias;
        this._description = description;
        this._itemLevel = itemLevel;
        this._sort = sort;
        this._itemCategory = itemCategory;
        this._quality = quality;
        this._stackSize = stackSize;
        this._increase = increase;
        this._characterAttributes = characterAttributes;
        this._properties = properties;

        //Не путать с логикой из строителя. Тут всегда пустые значения.
        this._getTypes = options.getTypes ?? [];
        // this.properties.increase.strength;
    }

    increaseCharacterAttribute(ID: CharacterAttributeID): number {
        return this._characterAttributes[ID] ?? 0;
    }

    filter(condition: ItemFilterCondition) {
        return condition.alias && _.includes(condition.alias, this._alias) ||
            condition.itemCategory && _.includes(condition.itemCategory, this._itemCategory)
            ;
    }
}