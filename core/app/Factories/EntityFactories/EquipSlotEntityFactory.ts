import EntityManager from '../../../source/EntityManager.js';
import EquipSlot from '../../Entities/EquipSlot.js';
import {EntityID} from '../../../types/enums/EntityID.js';
import EquipSlotAvailableItemCategory from '../../Entities/EquipSlotAvailableItemCategory.js';
import ItemCategory from '../../Entities/ItemCategory.js';
import {ItemCategoryID} from '../../../types/enums/ItemCategoryID.js';
import _ from 'lodash';
import {HeroClassID} from '../../../types/enums/HeroClassID.js';
import EquipSlotAvailableItemCategoryForHands from '../../Entities/EquipSlotAvailableItemCategoryForHands.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';

export default class EquipSlotEntityFactory {
    private readonly _entityManager: EntityManagerInterface;

    constructor(entityManager: EntityManagerInterface) {
        this._entityManager = entityManager;
    }

    createArmorSlot(
        id: string,
        name: string,
        sort: number,
        availableItemCategories: ItemCategoryID[],
    ) {
        return this._entityManager.add<EquipSlot>(EntityID.EquipSlot, id, new EquipSlot(
            id,
            name,
            sort,
            new EquipSlotAvailableItemCategory(
                _.map(availableItemCategories, (itemCategoryID) => {
                    return this._entityManager.get<ItemCategory>(EntityID.ItemCategory, itemCategoryID);
                }),
            ),
        ));
    }

    createHandSlot(
        id: string,
        name: string,
        sort: number,
        availableItemCategories: {[heroClassID in HeroClassID]: ItemCategoryID[]},
    ) {
        let _itemCategories: { [heroClassID in HeroClassID]?: ItemCategory[] } = {};
        for (const heroClassID in availableItemCategories) {
            _itemCategories[heroClassID] = _.map(availableItemCategories[heroClassID], (itemCategoryIDs) => {
                return this._entityManager.get<ItemCategory>(EntityID.ItemCategory, itemCategoryIDs as string);
            });
        }

        return this._entityManager.add<EquipSlot>(EntityID.EquipSlot, id, new EquipSlot(
            id,
            name,
            sort,
            new EquipSlotAvailableItemCategoryForHands(_itemCategories),
        ));
    }
}