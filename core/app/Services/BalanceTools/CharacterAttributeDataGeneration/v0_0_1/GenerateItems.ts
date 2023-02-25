import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import {sprintf} from 'sprintf-js';
import HeroClass from '../../../../Entities/HeroClass.js';
import EntityManagerInterface from '../../../../Interfaces/EntityManagerInterface.js';
import item_character_attribute_generation_functions
    from './item_character_attribute_generation_functions.js';
import ItemCharacterAttributeGenerator from './ItemCharacterAttributeGenerator.js';
import config from '../../../../../config/config.js';
import ContainerInterface from '../../../../../source/ContainerInterface.js';
import {CharacterAttributeID} from '../../../../../types/enums/CharacterAttributeID.js';
import {DebugNamespaceID} from '../../../../../types/enums/DebugNamespaceID.js';
import {EntityID} from '../../../../../types/enums/EntityID.js';
import {HeroClassID} from '../../../../../types/enums/HeroClassID.js';
import {ItemCategoryID} from '../../../../../types/enums/ItemCategoryID.js';
import {QualityID} from '../../../../../types/enums/QualityID.js';
import {ServiceID} from '../../../../../types/enums/ServiceID.js';
import {TSDB_Item} from '../../../../../types/TSDB_Item.js';
import debug from 'debug';

/**
 * @deprecated
 */
export default class GenerateItems {
    private readonly _container: ContainerInterface;
    private _IDs = {};

    constructor(container: ContainerInterface) {
        this._container = container;
    }

    run(items: any[]): void {
        let heroClassIDs = [
            HeroClassID.Warrior,
            HeroClassID.Rogue,
            HeroClassID.Gunslinger,
            HeroClassID.FireMage,
            HeroClassID.Support1,
        ];

        for (let i = 0; i < heroClassIDs.length; i++) {
            this._generate(heroClassIDs[i], items);
        }
    }

    private _generate(heroClassID: HeroClassID, items: any[]) {
        let constValues = {
            slotsCount: 13,
            firstLevelUpdate: _.random(2, 3),
            maxLevel: 100,
            updateRange: _.random(14, 17),
            qualityID: QualityID.Uncommon,
        };

        let preparePositions = {
            1: {
                [ItemCategoryID.OneHandedSwords]: [constValues.firstLevelUpdate + 1],
                [ItemCategoryID.Shields]: [constValues.firstLevelUpdate + 2],
                [ItemCategoryID.Amulets]: [constValues.updateRange + constValues.firstLevelUpdate - 2],
                [ItemCategoryID.Rings]: [constValues.firstLevelUpdate + 5, constValues.updateRange + constValues.firstLevelUpdate],
            },
        };

        let positions = {};
        for (let i = 1; i <= constValues.maxLevel; i++) {
            positions[i] = [];
        }

        for (const sampleNumber in preparePositions) {
            for (const itemCategoryID in preparePositions[sampleNumber]) {
                for (let i = 0; i < preparePositions[sampleNumber][itemCategoryID].length; i++) {
                    positions[preparePositions[sampleNumber][itemCategoryID][i]].push(itemCategoryID);
                }
            }
        }

        let calcValues: any = {};
        let itemCategories = this._createPrepareItemCategorySet(1);
        calcValues.currentSample = 1;
        calcValues.rangeStepError = 1;
        calcValues.rangeStep = _.round(constValues.updateRange / itemCategories.length);
        calcValues.currentLevelUpdate = constValues.firstLevelUpdate + _.random(0, calcValues.rangeStep + calcValues.rangeStepError);
        calcValues.currentMaxLevelRange = _.round(calcValues.currentLevelUpdate + constValues.updateRange * calcValues.currentSample);
        while (calcValues.currentLevelUpdate <= constValues.maxLevel) {
            for (let i = 0; i < itemCategories.length; i++) {
                positions[calcValues.currentLevelUpdate].push(itemCategories[i]);
                calcValues.currentLevelUpdate += calcValues.rangeStep +_.random(0, calcValues.rangeStepError);

                if (calcValues.currentLevelUpdate >= constValues.maxLevel) break;
            }

            calcValues.currentSample++;
            itemCategories = this._createPrepareItemCategorySet(calcValues.currentSample);
        }

        let itemCharacterAttributeGenerator = new ItemCharacterAttributeGenerator();
        for (const level in positions) {
            for (let itemCategoryIndex = 0; itemCategoryIndex < positions[level].length; itemCategoryIndex++) {
                let itemCategoryID = positions[level][itemCategoryIndex];
                let itemMetadata = this._getMetadata(itemCategoryID);
                let armorMaterialID = this._getMetadata(itemCategoryID).requireArmorMaterial ? this._container.get<EntityManagerInterface>(ServiceID.EntityManager).get<HeroClass>(EntityID.HeroClass, heroClassID).availableArmorMaterials[0].id : undefined;

                // let itemLevel = item_character_attribute_generation_functions.itemLevel(Number(level), config.item_level_step_by_hero_level);
                let itemLevel = item_character_attribute_generation_functions.itemLevel(Number(level), 0);
                let itemAttributes: TSDB_Item = {
                    ID: '',
                    ItemCategoryID: itemCategoryID,
                    ArmorMaterialID: '',
                    ItemLevel: itemLevel,
                    QualityID: constValues.qualityID,
                    StackSize: 1,
                    Strength: 0,
                    Agility: 0,
                    Intelligence: 0,
                    HealthPoints: 0,
                    Equipable: true,
                    TwoHandWeapon: false,
                    AttackPower: 0,
                };

                if (this._getMetadata(itemCategoryID).requireArmorMaterial) itemAttributes.ArmorMaterialID = armorMaterialID;
                if (this._getMetadata(itemCategoryID).twoHandWeapon) itemAttributes.TwoHandWeapon = true;

                let IDPattern = '%s_%s_%s';
                let IDPatternParams = {
                    armorMaterialID: this._getMetadata(itemCategoryID).requireArmorMaterial ? armorMaterialID : undefined,
                    qualityID: constValues.qualityID,
                    name: itemMetadata.name,
                    itemLevel: itemLevel,
                };

                itemAttributes.ID = sprintf(IDPattern, ..._.filter(IDPatternParams, (value, key) => {
                    return value !== undefined;
                }));

                if (this._IDs.hasOwnProperty(itemAttributes.ID)) {
                    this._IDs[itemAttributes.ID] = ++this._IDs[itemAttributes.ID];
                } else {
                    this._IDs[itemAttributes.ID] = 1;
                }
                itemAttributes.ID += sprintf('_%s', _.padStart(String(this._IDs[itemAttributes.ID]), 2, '0'));

                itemAttributes[CharacterAttributeID.MaxHealthPoints] = itemCharacterAttributeGenerator.healthPoints(itemLevel, itemCategoryID);
                itemAttributes[CharacterAttributeID.Strength] = itemCharacterAttributeGenerator.characterAttribute(itemLevel, heroClassID, itemCategoryID);
                // console.log(itemAttributes);

                items.push(itemAttributes);
            }//end for positions[level]
        }//end for positions
    }

    private _createPrepareItemCategorySet(sampleNumber: number) {
        if (!this._prepareItemCategorySets.hasOwnProperty(sampleNumber)) return _.shuffle([...this._defaultItemCategorySet]);

        return _.shuffle([...this._prepareItemCategorySets[sampleNumber]]);
    }

    private _getMetadata(itemCategoryID: ItemCategoryID) {
        return this._itemMetadataByItemCategory[itemCategoryID];
    }

    private _defaultItemCategorySet = [
        ItemCategoryID.Helmets,
        ItemCategoryID.ShoulderPads,
        ItemCategoryID.Breastplates,
        ItemCategoryID.Bracers,
        ItemCategoryID.Gloves,
        ItemCategoryID.Belts,
        ItemCategoryID.Pants,
        ItemCategoryID.Boots,
        ItemCategoryID.Amulets,
        ItemCategoryID.Rings,
        ItemCategoryID.Rings,
        ItemCategoryID.OneHandedSwords,
        ItemCategoryID.Shields,
    ];

    private _prepareItemCategorySets = {
        1: [
            ItemCategoryID.Helmets,
            ItemCategoryID.ShoulderPads,
            ItemCategoryID.Breastplates,
            ItemCategoryID.Bracers,
            ItemCategoryID.Gloves,
            ItemCategoryID.Belts,
            ItemCategoryID.Pants,
            ItemCategoryID.Boots,
        ],
    }

    private _itemMetadataByItemCategory = {
        [ItemCategoryID.Helmets]: {
            name: 'Helmet',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Helmets]: {
            name: 'Helmet',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.ShoulderPads]: {
            name: 'ShoulderPads',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Breastplates]: {
            name: 'Breastplate',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Gloves]: {
            name: 'Gloves',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Bracers]: {
            name: 'Bracer',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Belts]: {
            name: 'Belt',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Pants]: {
            name: 'Pants',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Boots]: {
            name: 'Boots',
            equipable: true,
            requireArmorMaterial: true,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Shields]: {
            name: 'Shield',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Amulets]: {
            name: 'Amulet',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Rings]: {
            name: 'Ring',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
        [ItemCategoryID.OneHandedSwords]: {
            name: 'OneHandedSword',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
        [ItemCategoryID.TwoHandedSwords]: {
            name: 'TwoHandedSword',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: true,
        },
        [ItemCategoryID.OneHandedAxes]: {
            name: 'OneHandedAxe',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
        [ItemCategoryID.TwoHandedAxes]: {
            name: 'TwoHandedAxe',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: true,
        },
        [ItemCategoryID.Daggers]: {
            name: 'Dagger',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Bows]: {
            name: 'Bow',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: true,
        },
        [ItemCategoryID.Crossbows]: {
            name: 'Crossbow',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: true,
        },
        [ItemCategoryID.Revolvers]: {
            name: 'Revolver',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
        [ItemCategoryID.Staffs]: {
            name: 'Staff',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: true,
        },
        [ItemCategoryID.Wands]: {
            name: 'Wand',
            equipable: true,
            requireArmorMaterial: false,
            twoHandWeapon: false,
        },
    };

    private _checkUniqueItemIDs(items) {
        let IDs = {};
        _.map(items, (item, index) => {
            if (!IDs.hasOwnProperty(item.ID)) {
                IDs[item.ID] = 1;
            } else {
                IDs[item.ID]++;
                console.log('ERROR', item.ID, IDs[item.ID]);
            }
        });
    }
}