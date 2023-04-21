import {EntityID} from '../../../types/enums/EntityID.js';
import HeroClass from '../../Entities/HeroClass.js';
import HeroRole from '../../Entities/HeroRole.js';
import ItemCategory from '../../Entities/ItemCategory.js';
import ArmorMaterial from '../../Entities/ArmorMaterial.js';
import CharacterAttributeEntity from '../../Entities/CharacterAttributeEntity.js';
import {HeroRoleID} from '../../../types/enums/HeroRoleID.js';
import _ from 'lodash';
import {ItemCategoryID} from '../../../types/enums/ItemCategoryID.js';
import {ArmorMaterialID} from '../../../types/enums/ArmorMaterialID.js';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import {IconID} from '../../../types/enums/IconID.js';
import Icon from '../../Entities/Icon.js';

/**
 * @deprecated
 */
export default class HeroClassFactory {
    private readonly _entityManager: EntityManagerInterface;

    constructor(entityManager: EntityManagerInterface) {
        this._entityManager = entityManager;
    }

    create(
        id: string,
        name: string,
        icon: IconID,
        sort: number,
        heroRoleID: HeroRoleID,
        availableArmorMaterialIds: ArmorMaterialID[],
        mainCharacterAttributeIds: CharacterAttributeID[],
        rightHandItemCategories: ItemCategoryID[],
        leftHandItemCategories: ItemCategoryID[] = [],
    ) {
        return this._entityManager.add<HeroClass>(EntityID.HeroClass, id, new HeroClass(
            id,
            name,
            this._entityManager.get<Icon>(EntityID.Icon, icon),
            sort,
            this._entityManager.get<HeroRole>(EntityID.HeroRole, heroRoleID),

            _.map(availableArmorMaterialIds, (armorMaterialID) => {
                return this._entityManager.get<ArmorMaterial>(EntityID.ArmorMaterial, armorMaterialID);
            }),
            _.map(mainCharacterAttributeIds, (characterAttributeID) => {
                return this._entityManager.get<CharacterAttributeEntity>(EntityID.CharacterAttribute, characterAttributeID);
            }),
            _.map(rightHandItemCategories, (itemCategoryID) => {
                return this._entityManager.get<ItemCategory>(EntityID.ItemCategory, itemCategoryID);
            }),
            //todo: Может без сущностей?
            _.map(leftHandItemCategories, (itemCategoryID) => {
                return this._entityManager.get<ItemCategory>(EntityID.ItemCategory, itemCategoryID);
            }),
        ));
    }
}