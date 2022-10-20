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
import EntityManager from '../../source/EntityManager.js';
import LeftHand from '../Components/EquipSlots/LeftHand.js';
import RightHand from '../Components/EquipSlots/RightHand.js';

export default class EquipSlotFactory {
    private readonly _entityManager: EntityManager;

    constructor(
        entityManager: EntityManager,
    ) {
        this._entityManager = entityManager;
    }

    createArmor(
        equipSlotData: EquipSlot,
        heroClass: HeroClass,
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,
    ): EquipSlotInterface {
        let equipSlot: EquipSlotInterface = new DefaultEquipSlot();
        equipSlot = new EquipSlotWithItemCollectorDecorator(
            equipSlot,
            itemCharacterAttributeCollector,
        );
        equipSlot = new EquipSlotWithItemCategoryDecorator(
            equipSlot,
            equipSlotData.itemCategories.get(heroClass.id as HeroClassID),
        );
        equipSlot = new EquipSlotWithArmorMaterialDecorator(
            equipSlot,
            heroClass.availableArmorMaterials,
        );

        return equipSlot;
    }

    createLeftHand(
        equipSlotData: EquipSlot,
        heroClass: HeroClass,
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,
    ): EquipSlotInterface {
        // let leftHand: EquipSlotInterface = new LeftHand();
        let leftHand: EquipSlotInterface = new DefaultEquipSlot();

        leftHand = new EquipSlotWithItemCollectorDecorator(
            leftHand,
            itemCharacterAttributeCollector,
        );
        leftHand = new EquipSlotWithItemCategoryDecorator(
            leftHand,
            equipSlotData.itemCategories.get(heroClass.id as HeroClassID),
        );

        return leftHand;
    }

    createRightHand(
        leftHand: LeftHand,
        equipSlotData: EquipSlot,
        heroClass: HeroClass,
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,
    ) {
        // let rightHand : EquipSlotInterface = new RightHand(leftHand);
        let rightHand : EquipSlotInterface = new DefaultEquipSlot();

        rightHand = new EquipSlotWithItemCollectorDecorator(
            rightHand,
            itemCharacterAttributeCollector,
        );
        rightHand = new EquipSlotWithItemCategoryDecorator(
            rightHand,
            equipSlotData.itemCategories.get(heroClass.id as HeroClassID),
        );

        return rightHand;
    }
}