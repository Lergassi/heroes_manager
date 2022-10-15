import HeroRole from './HeroRole.js';
import ItemCategory from './ItemCategory.js';
import ArmorMaterial from './ArmorMaterial.js';
import CharacterAttributeData from './CharacterAttributeData.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export default class HeroClass {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _alias: string;
    private readonly _description: string;
    private readonly _sort: number;
    private readonly _heroRole: HeroRole;
    private readonly _availableWeaponItemCategories: ItemCategory[];
    private readonly _availableArmorMaterials: ArmorMaterial[];
    private readonly _mainCharacterAttributes: CharacterAttributeData[];

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

    get sort(): number {
        return this._sort;
    }

    /**
     * @deprecated
     */
    get heroRole(): HeroRole {
        return this._heroRole;
    }

    get availableWeaponItemCategories(): ItemCategory[] {
        return this._availableWeaponItemCategories;
    }

    get availableArmorMaterials(): ArmorMaterial[] {
        return this._availableArmorMaterials;
    }

    /**
     * @deprecated
     */
    get mainCharacterAttributes(): CharacterAttributeData[] {
        return this._mainCharacterAttributes;
    }

    constructor(
        id: string,
        name: string,
        alias: string,
        description: string,
        sort: number,
        heroRole: HeroRole,
        availableWeaponItemCategories: ItemCategory[],
        availableArmorMaterials: ArmorMaterial[],
        mainCharacterAttributes: CharacterAttributeData[],
    ) {
        this._id = id;
        this._name = name;
        this._alias = alias;
        this._description = description;
        this._sort = sort;
        this._heroRole = heroRole;
        this._availableWeaponItemCategories = availableWeaponItemCategories;
        this._availableArmorMaterials = availableArmorMaterials;
        this._mainCharacterAttributes = mainCharacterAttributes;
    }

    availableArmorMaterial(armorMaterial: ArmorMaterial): boolean {
        // console.log(armorMaterial, this._availableArmorMaterials);
        // console.log(_.includes(this._availableArmorMaterials, armorMaterial));
        return _.includes(this._availableArmorMaterials, armorMaterial);
    }

    isMainCharacterAttribute(ID: CharacterAttributeID): boolean {
        for (let i = 0; i < this._mainCharacterAttributes.length; i++) {
            if (this._mainCharacterAttributes[i]['_id'] === ID) {   //todo: Доступ.
                return true;
            }
        }

        return false;
    }
}