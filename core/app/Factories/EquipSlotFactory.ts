import {ArmorMaterialID} from '../../types/enums/ArmorMaterialID.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import CharacterAttributeManager from '../Components/CharacterAttributeManager.js';
import EquipSlotArmorMaterialRule from '../Components/EquipSlots/EquipSlotArmorMaterialRule.js';
import EquipSlotItemCategoryRule from '../Components/EquipSlots/EquipSlotItemCategoryRule.js';
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
        characterAttributeManager: CharacterAttributeManager,
        averageItemLevel: AverageItemLevel,
    ): EquipSlotInterface {
        let equipSlot: EquipSlotInterface = new DefaultEquipSlot(<EquipSlotID>equipSlotData.id, averageItemLevel, characterAttributeManager);

        // equipSlot = new EquipSlotWithItemCategoryDecorator(
        //     equipSlot,
        //     equipSlotData.itemCategories.getItemCategories(heroClass.id as HeroClassID),
        // );

        return equipSlot;
    }

    createArmor(
        equipSlotData: EquipSlot,
        heroClass: HeroClass,
        characterAttributeManager: CharacterAttributeManager,
        averageItemLevel: AverageItemLevel,
    ): EquipSlotInterface {
        let equipSlot: EquipSlotInterface = new DefaultEquipSlot(
            <EquipSlotID>equipSlotData.id,
            averageItemLevel,
            characterAttributeManager,
            [
                new EquipSlotItemCategoryRule(_.map(equipSlotData.itemCategories.getItemCategories(heroClass.id as HeroClassID), (itemCategory) => {
                    return itemCategory.id;
                }) as ItemCategoryID[]),
                new EquipSlotArmorMaterialRule(_.map(heroClass.availableArmorMaterials, (armorMaterial) => {
                    return armorMaterial.id;
                }) as ArmorMaterialID[]),
            ],
        );

        // equipSlot = new EquipSlotWithArmorMaterialDecorator(
        //     equipSlot,
        //     heroClass.availableArmorMaterials,
        // );
        // equipSlot = new EquipSlotWithItemCategoryDecorator(
        //     equipSlot,
        //     equipSlotData.itemCategories.getItemCategories(heroClass.id as HeroClassID),
        // );

        return equipSlot;
    }

    createRightHand(
        leftHand: LeftHand,
        equipSlotData: EquipSlot,
        heroClass: HeroClass,
        characterAttributeManager: CharacterAttributeManager,
        averageItemLevel: AverageItemLevel,
    ): EquipSlotInterface {
        let rightHand : EquipSlotInterface = new DefaultEquipSlot(
            <EquipSlotID>equipSlotData.id,
            averageItemLevel,
            characterAttributeManager,
            [
                new EquipSlotItemCategoryRule(_.map(heroClass.rightHandItemCategories, (itemCategory) => {
                    return itemCategory.id;
                }) as ItemCategoryID[]),
            ],
        );

        // rightHand = new EquipSlotWithItemCategoryDecorator(
        //     rightHand,
        //     heroClass.rightHandItemCategories,
        // );

        return rightHand;
    }

    createLeftHand(
        equipSlotData: EquipSlot,
        heroClass: HeroClass,
        characterAttributeManager: CharacterAttributeManager,
        averageItemLevel: AverageItemLevel,
    ): EquipSlotInterface {
        let leftHand: EquipSlotInterface = new DefaultEquipSlot(
            <EquipSlotID>equipSlotData.id,
            averageItemLevel,
            characterAttributeManager,
            [
                new EquipSlotItemCategoryRule(_.map(heroClass.leftHandItemCategories, (itemCategory) => {
                    return itemCategory.id;
                }) as ItemCategoryID[]),
            ],
        );

        // leftHand = new EquipSlotWithItemCategoryDecorator(
        //     leftHand,
        //     heroClass.leftHandItemCategories,
        // );

        return leftHand;
    }
}