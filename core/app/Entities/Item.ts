import ItemCategory from './ItemCategory.js';
import Quality from './Quality.js';
import ArmorMaterial from './ArmorMaterial.js';
import {CharacterAttributeIncrease} from '../../source/IncreaseList.js';
import CharacterAttribute, {CharacterAttributeEnum} from './CharacterAttribute.js';
import _ from 'lodash';

export type CharacterAttributeIncreaseObject = {[alias: string]: CharacterAttributeIncrease};
// export type CharacterAttributeIncreaseObject = {[alias: CharacterAttributeEnum]: CharacterAttributeIncrease};

export default class Item {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _alias: string;
    private readonly _description: string;
    private readonly _itemLevel: number;
    private readonly _sort: number;
    private readonly _itemCategory: ItemCategory;
    private readonly _quality: Quality;

    private readonly _stackSize: number;    //Нет у экипировки.
    private readonly _isEquipable: boolean; //Только у экипировки.
    private readonly _armorMaterial: ArmorMaterial; //Только у брони. todo: Временно. Необязательные параметры перенести в другое место.

    private readonly _strengthIncrease: number;
    private readonly _agilityIncrease: number;
    private readonly _intelligenceIncrease: number;
    private readonly _healthPointsIncrease: number; //Отдельно от выносливости.
    private readonly _magicPointsIncrease: number;
    private readonly _attackPowerIncrease: number;
    //и тд. Допустим всего атрибутов в игре 30.

    // private readonly _increase: {[alias: string]: CharacterAttributeIncrease};
    private readonly _increase: CharacterAttributeIncreaseObject;

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get alias(): string {
        return this._alias;
    }

    get description(): string {
        return this._description;
    }

    get stackSize(): number {
        return this._stackSize;
    }

    get itemLevel(): number {
        return this._itemLevel;
    }

    get sort(): number {
        return this._sort;
    }

    get isEquipable(): boolean {
        return this._isEquipable;
    }

    get itemCategory(): ItemCategory {
        return this._itemCategory;
    }

    get quality(): Quality {
        return this._quality;
    }

    get armorMaterial(): ArmorMaterial {
        return this._armorMaterial;
    }

    constructor (
        id: string,
        name: string,
        alias: string,
        description: string,
        stackSize: number,
        itemLevel: number,
        sort: number,
        isEquipable: boolean,
        itemCategory: ItemCategory,
        quality: Quality,
        armorMaterial: ArmorMaterial = null,
        // increase: {[alias: string]: CharacterAttributeIncrease} = {},
        increase: CharacterAttributeIncreaseObject = {},
    ) {
        this._id = id;
        this._name = name;
        this._alias = alias;
        this._description = description;
        this._stackSize = stackSize;
        this._itemLevel = itemLevel;
        this._sort = sort;
        this._isEquipable = isEquipable;
        this._itemCategory = itemCategory;
        this._quality = quality;
        this._armorMaterial = armorMaterial;
        this._increase = increase;
    }

    increase(characterAttribute: CharacterAttribute) {
        return this._increase.hasOwnProperty(characterAttribute.alias) ? this._increase[characterAttribute.alias].value : 0;
    }
}