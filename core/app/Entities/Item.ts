import ItemCategory from './ItemCategory.js';
import Quality from './Quality.js';
import ArmorMaterial from './ArmorMaterial.js';
import {CharacterAttributeIncrease} from '../../source/IncreaseList.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';

/**
 * Может быть несколько типов одновременно. Или без типов.
 */
export enum ItemGetType {
    Gathering = 'Gathering',
    Hunting = 'Hunting',    //Имеется ввиду добыча с лута из убитый врагов.
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
export interface ItemProperties {
    armorMaterial?: ArmorMaterial;
    twoHandWeapon?: boolean;    //Всё оружие по умолчанию одноручное.
}

export type CharacterAttributeRecord = {[ID in CharacterAttributeID]: number};

export interface ItemOptions {
    getTypes: ItemGetType[];
}

//todo: Идеи по private/public.
export default class Item {                             //private or public? Фильтр и поиск не учитывается.
    /**
     * @deprecated private
     */
    readonly id: string;                        //Пока не понятно как пользоваться.
    /**
     * @deprecated private
     */
    readonly name: string;                      //Много где но в основном тоже только для игрока при выводе.
    private readonly description: string;               //Для игрока в тултипе.
    private readonly itemLevel: number;                 //Нужно только для информирования игрока при рендере.
    private readonly sort: number;                      //Пока не используется. Даже если будет нужен - не понятно как использовать. Сортировать массив/объект который в EntityManager/ItemDatabase? А с другими полями как? Допустим на аукционе. А по другим полям. !!!->>> Это же общий список на всю игру - его не надо сортировать. Для этого будет другой класс. Пока скрыто.
    private readonly getTypes: ItemGetType[];           //Может в дальнейшем использоваться для генерации лута.
    /**
     * @deprecated private
     */
    readonly itemCategory: ItemCategory;        //Может в дальнейшем использоваться для генерации лута.
    private readonly quality: Quality;                  //Может в дальнейшем использоваться для генерации лута.
    /**
     * @deprecated private
     */
    readonly stackSize: number;                         //Нужно для стека. maxSize у стека? Кстате а зачем все данные в стеке например? sort может пригодиться. Зачем нужен getTypes, characterAttributes, armorMaterial у древесины никогда не будет...

    /**
     * @deprecated private
     */
    readonly properties: Readonly<ItemProperties>;      //armorMaterial нужно при экипировки в слоты брони и проверки в зависимости от класса, twoHandWeapon блокировка левой руки.
    private readonly characterAttributes: Readonly<Partial<CharacterAttributeRecord>>;  //Разные атрибуты. Сделан метод увеличения отдельного атрибута.

    constructor (
        id: string,
        name: string,
        description: string,
        stackSize: number,
        itemLevel: number,
        sort: number,
        itemCategory: ItemCategory,
        quality: Quality,
        properties: ItemProperties = {},
        characterAttributes: Partial<CharacterAttributeRecord>,
        options: Partial<ItemOptions> = {},
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.itemLevel = itemLevel;
        this.sort = sort;
        this.itemCategory = itemCategory;
        this.quality = quality;
        this.stackSize = stackSize;
        this.characterAttributes = characterAttributes;
        this.properties = properties;
        //Не путать с логикой из строителя. Тут всегда пустые значения.
        this.getTypes = options.getTypes ?? [];
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
}