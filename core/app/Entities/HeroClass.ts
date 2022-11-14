import HeroRole from './HeroRole.js';
import ItemCategory from './ItemCategory.js';
import ArmorMaterial from './ArmorMaterial.js';
import CharacterAttributeEntity from './CharacterAttributeEntity.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import Icon from './Icon.js';

export default class HeroClass {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _icon: Icon;
    private readonly _sort: number;
    private readonly _heroRole: HeroRole;
    private readonly _availableArmorMaterials: ArmorMaterial[];
    private readonly _mainCharacterAttributes: CharacterAttributeEntity[];
    private readonly _rightHandItemCategories: ItemCategory[];
    private readonly _leftHandItemCategories: ItemCategory[];

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get icon(): Icon {
        return this._icon;
    }

    get sort(): number {
        return this._sort;
    }

    get heroRole(): HeroRole {
        return this._heroRole;
    }

    get availableArmorMaterials(): ArmorMaterial[] {
        return this._availableArmorMaterials;
    }

    get mainCharacterAttributes(): CharacterAttributeEntity[] {
        return this._mainCharacterAttributes;
    }

    get rightHandItemCategories(): ItemCategory[] {
        return this._rightHandItemCategories;
    }

    get leftHandItemCategories(): ItemCategory[] {
        return this._leftHandItemCategories;
    }

    constructor(
        id: string,
        name: string,
        icon: Icon,
        sort: number,
        heroRole: HeroRole,
        availableArmorMaterials: ArmorMaterial[],
        mainCharacterAttributes: CharacterAttributeEntity[],
        rightHandItemCategories: ItemCategory[],
        leftHandItemCategories: ItemCategory[],
    ) {
        this._id = id;
        this._name = name;
        this._icon = icon;
        this._sort = sort;
        this._heroRole = heroRole;
        this._availableArmorMaterials = availableArmorMaterials;
        this._mainCharacterAttributes = mainCharacterAttributes;
        this._rightHandItemCategories = rightHandItemCategories;
        this._leftHandItemCategories = leftHandItemCategories;  //todo: Вообще правильно если не указаны предметы - в слот нельзя экипировать предметы. Может тут выводить сообщение предупреждение, что возможно тут ошибка и нужно проверить? Например забыл у стрелка для левой руки указать правило.
    }

    availableArmorMaterial(armorMaterial: ArmorMaterial): boolean {
        return _.includes(this._availableArmorMaterials, armorMaterial);
    }

    isMainCharacterAttribute(ID: CharacterAttributeID): boolean {
        for (let i = 0; i < this._mainCharacterAttributes.length; i++) {
            if (this._mainCharacterAttributes[i].id === ID) {   //todo: Доступ.
                return true;
            }
        }

        return false;
    }
}