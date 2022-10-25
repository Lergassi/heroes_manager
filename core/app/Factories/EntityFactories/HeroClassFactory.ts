import EntityManager from '../../../source/EntityManager.js';
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

export default class HeroClassFactory {
    private readonly _entityManager: EntityManagerInterface;

    constructor(entityManager: EntityManagerInterface) {
        this._entityManager = entityManager;
    }

    create(
        id: string,
        name: string,
        description: string,
        sort: number,
        heroRoleID: HeroRoleID,
        availableWeaponItemCategoryIDs: ItemCategoryID[],
        availableArmorMaterialIds: ArmorMaterialID[],
        mainCharacterAttributeIds: CharacterAttributeID[],
    ) {
        return this._entityManager.add<HeroClass>(EntityID.HeroClass, id, new HeroClass(
            id,
            name,
            description,
            sort,
            this._entityManager.get<HeroRole>(EntityID.HeroRole, heroRoleID),
            _.map(availableWeaponItemCategoryIDs, (itemCategoryID) => {
                return this._entityManager.get<ItemCategory>(EntityID.ItemCategory, itemCategoryID);
            }),
            _.map(availableArmorMaterialIds, (armorMaterialId) => {
                return this._entityManager.get<ArmorMaterial>(EntityID.ArmorMaterial, armorMaterialId);
            }),
            _.map(mainCharacterAttributeIds, (characterAttributeID) => {
                return this._entityManager.get<CharacterAttributeEntity>(EntityID.CharacterAttribute, characterAttributeID);
            }),
        ));
    }
}