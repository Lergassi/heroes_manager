import ItemCategory from './ItemCategory.js';
import Quality from './Quality.js';
import ArmorMaterial from './ArmorMaterial.js';
import {CharacterAttributeIncrease} from '../../source/IncreaseList.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import Icon from './Icon.js';
import {
    assertIsGreaterThanOrEqual,
    assertIsInstanceOf,
    assertIsNumber, assertIsPositive,
    assertIsString,
    assertNotNil
} from '../../source/assert.js';

/**
 * Может быть несколько типов одновременно. Или без типов.
 */
export enum ItemGetType {
    Gathering = 'Gathering',
    Hunting = 'Hunting',    //Имеется ввиду добыча с лута из убитый врагов. todo: Придумать другое название. С трупа, с врагов...
    Crafting = 'Crafting',
    Purchased = 'Purchased',
}

/**
 * @deprecated Будет переделано когда большая бд.
 * @indev Пока только с условие ИЛИ.
 */
export type ItemFilterCondition = Readonly<Partial<{
    alias: string[],
    itemCategory: /*ItemCategory | */ ItemCategory[],
}>>

/**
 * Не обязательные свойства. Атрибуты отдельно.
 */
// export interface ItemProperties {
//     armorMaterial?: ArmorMaterial;
//     twoHandWeapon?: boolean;    //Всё оружие по умолчанию одноручное.
//     defaultBuyPrice?: number;
//     defaultSellPrice?: number;
// }
export type ItemProperties = {
    armorMaterial?: ArmorMaterial;  //if armorMaterial.Plate --- if armorMaterial?.Plate --- if item.has(ArmorMaterial)
    equipable?: boolean;
    twoHandWeapon?: boolean;    //Всё оружие по умолчанию одноручное.
    defaultBuyPrice?: number;
    defaultSellPrice?: number;
}

export type CharacterAttributeRecord = {[ID in CharacterAttributeID]: number};

export interface ItemOptions {
    getTypes: ItemGetType[];
}

//todo: Идеи по private/public.
/**
 * @deprecated Entity больше (временно?) не актуальны. Использовать TSDB.
 */
export default class Item {                             //private or public? Фильтр и поиск не учитывается.
    private readonly _id: string;                        //Пока не понятно как пользоваться.
    private readonly _name: string;                      //Много где но в основном тоже только для игрока при выводе.
    private readonly _description: string;               //Для игрока в тултипе.
    private readonly _icon: Icon;
    private readonly _itemLevel: number;                 //Нужно только для информирования игрока при рендере.
    private readonly _sort: number;                      //Пока не используется. Даже если будет нужен - не понятно как использовать. Сортировать массив/объект который в EntityManager/ItemDatabase? А с другими полями как? Допустим на аукционе. А по другим полям. !!!->>> Это же общий список на всю игру - его не надо сортировать. Для этого будет другой класс. Пока скрыто.
    private readonly _getTypes: ItemGetType[];           //Может в дальнейшем использоваться для генерации лута.
    private readonly _itemCategory: ItemCategory;        //Может в дальнейшем использоваться для генерации лута.
    private readonly _quality: Quality;                  //Может в дальнейшем использоваться для генерации лута.
    private readonly _stackSize: number;                         //Нужно для стека. maxSize у стека? Кстате а зачем все данные в стеке например? sort может пригодиться. Зачем нужен getTypes, characterAttributes, armorMaterial у древесины никогда не будет...
    private readonly _properties: Readonly<ItemProperties>;      //armorMaterial нужно при экипировки в слоты брони и проверки в зависимости от класса, twoHandWeapon блокировка левой руки.
    private readonly _characterAttributes: Readonly<Partial<CharacterAttributeRecord>>;  //Разные атрибуты. Сделан метод увеличения отдельного атрибута.

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get icon(): Icon {
        return this._icon;
    }

    get itemLevel(): number {
        return this._itemLevel;
    }

    get sort(): number {
        return this._sort;
    }

    get getTypes(): ItemGetType[] {
        return this._getTypes;
    }

    get itemCategory(): ItemCategory {
        return this._itemCategory;
    }

    get quality(): Quality {
        return this._quality;
    }

    get stackSize(): number {
        return this._stackSize;
    }

    get properties(): Readonly<ItemProperties> {
        return this._properties;
    }

    get characterAttributes(): Readonly<Partial<CharacterAttributeRecord>> {
        return this._characterAttributes;
    }

    constructor (
        id: string,
        name: string,
        description: string,
        icon: Icon,
        stackSize: number,
        itemLevel: number,
        sort: number,
        itemCategory: ItemCategory,
        quality: Quality,
        properties: ItemProperties = {},
        characterAttributes: Partial<CharacterAttributeRecord>,
        options: Partial<ItemOptions> = {},
    ) {
        assertIsString(id);
        assertIsString(name);
        assertIsString(description);
        assertIsInstanceOf(icon, Icon);
        assertIsGreaterThanOrEqual(stackSize, 1);
        assertIsGreaterThanOrEqual(itemLevel, 0);
        assertIsNumber(sort);
        assertIsInstanceOf(itemCategory, ItemCategory);
        assertIsInstanceOf(quality, Quality);
        assertNotNil(properties);
        assertNotNil(characterAttributes);
        assertNotNil(options);

        this._id = id;
        this._name = name;
        this._description = description;
        this._icon = icon;
        this._itemLevel = itemLevel;
        this._sort = sort;
        this._itemCategory = itemCategory;
        this._quality = quality;
        this._stackSize = stackSize;
        this._characterAttributes = characterAttributes;
        this._properties = properties;
        //Не путать с логикой из строителя. Тут всегда пустые значения.
        this._getTypes = options.getTypes ?? [];
    }

    increaseCharacterAttribute(ID: CharacterAttributeID): number {
        return this.characterAttributes[ID] ?? 0;
    }

    hasItemCategory(itemCategory: ItemCategory | ItemCategory[]): boolean {
        if (itemCategory instanceof ItemCategory) {
            itemCategory = [itemCategory];
        }

        return _.includes(itemCategory, this.itemCategory);
    }

    //todo: Метод должен быть в свойствах.
    hasArmorMaterial(armorMaterial: ArmorMaterial | ArmorMaterial[]): boolean {
        if (!this.properties.armorMaterial) {
            return false;
        }

        if (armorMaterial instanceof ArmorMaterial) {
            armorMaterial = [armorMaterial];
        }

        return _.includes(armorMaterial, this.properties.armorMaterial);
    }

    //todo: Метод должен быть в свойствах.
    isTwoHandWeapon(): boolean {
        return Boolean(this.properties.twoHandWeapon);
    }

    getProperty<T>(key: string): T {
    // getProperty<T extends keyof ItemProperties>(key: keyof ItemProperties): T {
    // getProperty(key: keyof ItemProperties) {
    // getProperty<T>(key: keyof ItemProperties): T {
        return this._properties[key];
    }
}