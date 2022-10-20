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
    Hunting = 'Hunting',
    Crafting = 'Crafting',
    Purchased = 'Purchased',
}

/**
 * @indev Пока только с условие ИЛИ.
 */
export type ItemFilterCondition = Readonly<Partial<{
    alias: string[],
    itemCategory: /*ItemCategory | */ ItemCategory[],
}>>

export interface ItemProperties {
    armorMaterial?: ArmorMaterial;
    twoHandWeapon?: boolean;
    // readonly isStackable?: boolean;
    // stackSize?: number;    //Не может быть одновременно с isEquipable... хотя зелья? А почему можно экипировать только экипировку? Так и надо ставить тип = Экипировка.
}

export type CharacterAttributeIncreaseObject = {[alias: string]: CharacterAttributeIncrease};
export type CharacterAttributeRecord = {[ID in CharacterAttributeID]: number};

export interface ItemOptions {
    getTypes: ItemGetType[];
    isStackable: boolean;
    isEquipable: boolean;
}

export default class Item {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly itemLevel: number;
    readonly sort: number;
    readonly getTypes: ItemGetType[];
    readonly itemCategory: ItemCategory;
    readonly quality: Quality;
    readonly stackSize: number;

    readonly increase: CharacterAttributeIncreaseObject;
    readonly characterAttributes: Partial<CharacterAttributeRecord>;
    readonly properties: Readonly<ItemProperties>;

    constructor (
        id: string,
        name: string,
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
        this.id = id;
        this.name = name;
        this.description = description;
        this.itemLevel = itemLevel;
        this.sort = sort;
        this.itemCategory = itemCategory;
        this.quality = quality;
        this.stackSize = stackSize;
        this.increase = increase;
        this.characterAttributes = characterAttributes;
        this.properties = properties;
        //Не путать с логикой из строителя. Тут всегда пустые значения.
        this.getTypes = options.getTypes ?? [];
    }

    increaseCharacterAttribute(ID: CharacterAttributeID): number {
        return this.characterAttributes[ID] ?? 0;
    }

    hasArmorMaterial(armorMaterial: ArmorMaterial | ArmorMaterial[]): boolean {
        if (!this.properties.armorMaterial) {
            return false;
        }

        if (armorMaterial instanceof ArmorMaterial) {
            armorMaterial = [armorMaterial];
        }

        return _.includes(armorMaterial, this.properties.armorMaterial);
    }

    hasItemCategory(itemCategory: ItemCategory | ItemCategory[]): boolean {
        if (itemCategory instanceof ItemCategory) {
            itemCategory = [itemCategory];
        }
        // console.log(this.itemCategory);
        // console.log(itemCategory);

        return _.includes(itemCategory, this.itemCategory);
    }

    //todo: tmp
    isTwoHandWeapon(): boolean {
        return Boolean(this.properties.twoHandWeapon);
    }
}