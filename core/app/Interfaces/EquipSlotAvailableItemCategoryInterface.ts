import {HeroClassID} from '../../types/enums/HeroClassID.js';
import ItemCategory from '../Entities/ItemCategory.js';

export default interface EquipSlotAvailableItemCategoryInterface {
    getItemCategories(heroClassID: HeroClassID): ItemCategory[];
}