import HeroRole from './HeroRole.js';
import ItemCategory from './ItemCategory.js';
import ArmorMaterial from './ArmorMaterial.js';
import CharacterAttributeEntity from './CharacterAttributeEntity.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export default class HeroClass {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _sort: number;
    private readonly _heroRole: HeroRole;
    private readonly _availableWeaponItemCategories: ItemCategory[];
    private readonly _availableArmorMaterials: ArmorMaterial[];
    private readonly _mainCharacterAttributes: CharacterAttributeEntity[];

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get sort(): number {
        return this._sort;
    }

    get heroRole(): HeroRole {
        return this._heroRole;
    }

    get availableWeaponItemCategories(): ItemCategory[] {
        return this._availableWeaponItemCategories;
    }

    get availableArmorMaterials(): ArmorMaterial[] {
        return this._availableArmorMaterials;
    }

    get mainCharacterAttributes(): CharacterAttributeEntity[] {
        return this._mainCharacterAttributes;
    }

    constructor(
        id: string,
        name: string,
        sort: number,
        heroRole: HeroRole,
        availableWeaponItemCategories: ItemCategory[],
        availableArmorMaterials: ArmorMaterial[],
        mainCharacterAttributes: CharacterAttributeEntity[],
    ) {
        this._id = id;
        this._name = name;
        this._sort = sort;
        this._heroRole = heroRole;
        this._availableWeaponItemCategories = availableWeaponItemCategories;
        this._availableArmorMaterials = availableArmorMaterials;
        this._mainCharacterAttributes = mainCharacterAttributes;
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