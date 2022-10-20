import HeroRole from './HeroRole.js';
import ItemCategory from './ItemCategory.js';
import ArmorMaterial from './ArmorMaterial.js';
import CharacterAttributeEntity from './CharacterAttributeEntity.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export default class HeroClass {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly sort: number;
    readonly heroRole: HeroRole;
    readonly availableWeaponItemCategories: ItemCategory[];
    readonly availableArmorMaterials: ArmorMaterial[];
    readonly mainCharacterAttributes: CharacterAttributeEntity[];

    constructor(
        id: string,
        name: string,
        description: string,
        sort: number,
        heroRole: HeroRole,
        availableWeaponItemCategories: ItemCategory[],
        availableArmorMaterials: ArmorMaterial[],
        mainCharacterAttributes: CharacterAttributeEntity[],
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sort = sort;
        this.heroRole = heroRole;
        this.availableWeaponItemCategories = availableWeaponItemCategories;
        this.availableArmorMaterials = availableArmorMaterials;
        this.mainCharacterAttributes = mainCharacterAttributes;
    }

    availableArmorMaterial(armorMaterial: ArmorMaterial): boolean {
        return _.includes(this.availableArmorMaterials, armorMaterial);
    }

    isMainCharacterAttribute(ID: CharacterAttributeID): boolean {
        for (let i = 0; i < this.mainCharacterAttributes.length; i++) {
            if (this.mainCharacterAttributes[i]['_id'] === ID) {   //todo: Доступ.
                return true;
            }
        }

        return false;
    }
}