import EquipSlotInterface from '../Interfaces/EquipSlotInterface.js';
import DefaultEquipSlot from '../Components/EquipSlots/DefaultEquipSlot.js';
import EquipSlotWithItemCollectorDecorator from '../Components/EquipSlots/EquipSlotWithItemCollectorDecorator.js';
import EquipSlotWithItemCategoryDecorator from '../Components/EquipSlots/EquipSlotWithItemCategoryDecorator.js';
import EquipSlot from '../Entities/EquipSlot.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import EquipSlotWithArmorMaterialDecorator from '../Components/EquipSlots/EquipSlotWithArmorMaterialDecorator.js';
import HeroClass from '../Entities/HeroClass.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import ItemCharacterAttributeCollector from '../Components/ItemCharacterAttributeCollector.js';
import LeftHand from '../Components/EquipSlots/LeftHand.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import AverageItemLevel from '../Components/AverageItemLevel.js';

export default class EquipSlotFactory {
    private readonly _entityManager: EntityManagerInterface;

    constructor(
        entityManager: EntityManagerInterface,
    ) {
        this._entityManager = entityManager;
    }

    create(
        equipSlotData: EquipSlot,
        heroClass: HeroClass,
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,
        averageItemLevel: AverageItemLevel,
    ): EquipSlotInterface {
        let equipSlot: EquipSlotInterface = new DefaultEquipSlot(<EquipSlotID>equipSlotData.id, averageItemLevel, itemCharacterAttributeCollector);

        equipSlot = new EquipSlotWithItemCategoryDecorator(
            equipSlot,
            equipSlotData.itemCategories.getItemCategories(heroClass.id as HeroClassID),
        );

        return equipSlot;
    }

    createArmor(
        equipSlotData: EquipSlot,
        heroClass: HeroClass,
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,
        averageItemLevel: AverageItemLevel,
    ): EquipSlotInterface {
        let equipSlot: EquipSlotInterface = new DefaultEquipSlot(<EquipSlotID>equipSlotData.id, averageItemLevel, itemCharacterAttributeCollector);

        equipSlot = new EquipSlotWithArmorMaterialDecorator(
            equipSlot,
            heroClass.availableArmorMaterials,
        );
        equipSlot = new EquipSlotWithItemCategoryDecorator(
            equipSlot,
            equipSlotData.itemCategories.getItemCategories(heroClass.id as HeroClassID),
        );

        return equipSlot;
    }

    createRightHand(
        leftHand: LeftHand,
        equipSlotData: EquipSlot,
        heroClass: HeroClass,
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,
        averageItemLevel: AverageItemLevel,
    ): EquipSlotInterface {
        let rightHand : EquipSlotInterface = new DefaultEquipSlot(<EquipSlotID>equipSlotData.id, averageItemLevel, itemCharacterAttributeCollector);

        rightHand = new EquipSlotWithItemCategoryDecorator(
            rightHand,
            heroClass.rightHandItemCategories,
        );

        return rightHand;
    }

    createLeftHand(
        equipSlotData: EquipSlot,
        heroClass: HeroClass,
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,
        averageItemLevel: AverageItemLevel,
    ): EquipSlotInterface {
        let leftHand: EquipSlotInterface = new DefaultEquipSlot(<EquipSlotID>equipSlotData.id, averageItemLevel, itemCharacterAttributeCollector);

        leftHand = new EquipSlotWithItemCategoryDecorator(
            leftHand,
            heroClass.leftHandItemCategories,
        );

        return leftHand;
    }
}