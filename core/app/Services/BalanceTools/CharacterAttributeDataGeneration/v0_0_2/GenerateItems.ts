import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import config from '../../../../../config/config.js';
import {database} from '../../../../../data/ts/database.js';
import ContainerInterface from '../../../../../source/ContainerInterface.js';
import {ArmorMaterialID} from '../../../../../types/enums/ArmorMaterialID.js';
import {CharacterAttributeID} from '../../../../../types/enums/CharacterAttributeID.js';
import {HeroClassID} from '../../../../../types/enums/HeroClassID.js';
import {ItemCategoryID} from '../../../../../types/enums/ItemCategoryID.js';
import {QualityID} from '../../../../../types/enums/QualityID.js';
import {TSDB_Item} from '../../../../../types/TSDB_Item.js';
import item_character_attribute_generation_functions from '../v0_0_1/item_character_attribute_generation_functions.js';
import {item_attributes_formulas} from '../../formulas/item_attributes_formulas.js';
import ItemAttributeGenerator from './ItemAttributeGenerator.js';

export default class GenerateItems {
    private readonly _itemCharacterAttributeGenerator: ItemAttributeGenerator;
    private readonly _container: ContainerInterface;

    //tests
    private _IDs = {};

    constructor(container: ContainerInterface) {
        this._container = container;
        this._itemCharacterAttributeGenerator = new ItemAttributeGenerator();
    }

    run(items: TSDB_Item[]): void {
        let armorMaterialIDs = [
            ArmorMaterialID.Plate,
            ArmorMaterialID.Leather,
            ArmorMaterialID.Cloth,
        ];

        let heroClassIDs = [
            HeroClassID.Warrior,
            HeroClassID.Rogue,
            HeroClassID.Gunslinger,
            HeroClassID.FireMage,
            HeroClassID.Support1,
        ];

        let armorItemCategories = [];
        database.heroes.equip_sets.armorSet(undefined,(itemCategoryID, count) => {
            armorItemCategories.push({
                itemCategoryID: itemCategoryID,
                count: count,
            });
        });

        for (let i = 0; i < armorMaterialIDs.length; i++) {
            this._generate({
                armorMaterialID: armorMaterialIDs[i],
                items: items,
                itemCategories: armorItemCategories,
            });
        }

        let weaponItemCategories = {};
        for (let i = 0; i < heroClassIDs.length; i++) {
            weaponItemCategories[heroClassIDs[i]] = [];
            database.heroes.equip_sets.weaponSet(heroClassIDs[i], (itemCategoryID, count) => {
                _.map(_.range(0, count), () => {
                    weaponItemCategories[heroClassIDs[i]].push({
                        itemCategoryID: itemCategoryID,
                        count: count,
                    });
                });
            });
        }

        for (const key in weaponItemCategories) {
            for (let i = 0; i < weaponItemCategories[key].length; i++) {
                this._generate({
                    armorMaterialID: undefined,
                    items: items,
                    itemCategories: weaponItemCategories[key],
                });
            }
        }
    }

    private _generate(options: {
        armorMaterialID: ArmorMaterialID,
        items: TSDB_Item[],
        itemCategories: {itemCategoryID: ItemCategoryID, count: number}[],
    }): void {
        let constValues = {
            slotsCount: 11,
            firstLevelUpdate: _.random(2, 3),
            maxLevel: 100,
            updateRange: 20,
            qualityID: QualityID.Uncommon,

        };
        let calcValues: any = {};

        let itemCategories = [];
        for (let i = 0; i < options.itemCategories.length; i++) {
            for (let j = 0; j < options.itemCategories[i].count; j++) {
                itemCategories.push(options.itemCategories[i].itemCategoryID);
            }
        }
        itemCategories = _.shuffle(itemCategories);

        let positions = {};
        for (let i = 1; i <= constValues.maxLevel; i++) {
            positions[i] = [];
        }

        calcValues.itemsForLevel = [1, 2];
        calcValues.currentSample = 1;
        calcValues.rangeStepError = 1;
        calcValues.rangeStep = [2, 3];
        calcValues.currentLevelUpdate = constValues.firstLevelUpdate;
        calcValues.currentMaxLevelRange = _.round(calcValues.currentLevelUpdate + constValues.updateRange * calcValues.currentSample);

        // console.log(calcValues);
        while (calcValues.currentLevelUpdate <= constValues.maxLevel) {
            for (let i = 0; i < itemCategories.length; i++) {
                let itemsForLevel = _.random(calcValues.itemsForLevel[0], calcValues.itemsForLevel[1]);
                let innerI = i;
                for (let j = 0; j < itemsForLevel && i < itemCategories.length; j++, i++) {
                    positions[calcValues.currentLevelUpdate].push(itemCategories[innerI]);
                    innerI++;

                    let itemLevel = item_attributes_formulas.heroLevelCorrespondsToItemLevel({
                        heroLevel: calcValues.currentLevelUpdate,
                        ratio: config.hero_level_corresponds_to_item_level_ratio,
                    });
                    let itemAttributes: TSDB_Item = {
                        ID: '',
                        ItemCategoryID: itemCategories[i],
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

                    if (database.metadata.items.requireArmorMaterial(itemCategories[i])) itemAttributes.ArmorMaterialID = options.armorMaterialID;
                    if (database.metadata.items.twoHandWeapon(itemCategories[i])) itemAttributes.TwoHandWeapon = true;

                    let IDPatterns = {
                        withArmorMaterial: '%s_%s_%s_%s',
                        withoutArmorMaterial: '%s_%s_%s',
                    };

                    let IDPattern = database.metadata.items.requireArmorMaterial(itemCategories[i]) ? IDPatterns.withArmorMaterial : IDPatterns.withoutArmorMaterial;
                    let IDPatternParams = [];
                    if (database.metadata.items.requireArmorMaterial(itemCategories[i])) IDPatternParams.push(options.armorMaterialID);
                    IDPatternParams.push(constValues.qualityID);
                    IDPatternParams.push(database.metadata.items.singleItemName(itemCategories[i]));
                    IDPatternParams.push(itemLevel);

                    itemAttributes.ID = sprintf(IDPattern, ..._.filter(IDPatternParams, (value, key) => {
                        return value !== undefined;
                    }));

                    if (this._IDs.hasOwnProperty(itemAttributes.ID)) {
                        this._IDs[itemAttributes.ID] = ++this._IDs[itemAttributes.ID];
                    } else {
                        this._IDs[itemAttributes.ID] = 1;
                    }
                    itemAttributes.ID += sprintf('_%s', _.padStart(String(this._IDs[itemAttributes.ID]), 2, '0'));

                    //todo: Разделить атрибуты предметов и атрибуты героев. Не всегда логика 1:1. Атрибуты у предметов это просто число (несколько чисел).
                    itemAttributes[CharacterAttributeID.MaxHealthPoints] = this._itemCharacterAttributeGenerator.healthPoints(itemLevel, itemCategories[i]);
                    //Пока все атрибуты одинаковые. Класс сам выбререт нужный.
                    itemAttributes[CharacterAttributeID.Strength] = this._itemCharacterAttributeGenerator.characterAttributeFromAttackPower_reverse(itemLevel, itemCategories[i]);
                    itemAttributes[CharacterAttributeID.Agility] = this._itemCharacterAttributeGenerator.characterAttributeFromAttackPower_reverse(itemLevel, itemCategories[i]);
                    itemAttributes[CharacterAttributeID.Intelligence] = this._itemCharacterAttributeGenerator.characterAttributeFromAttackPower_reverse(itemLevel, itemCategories[i]);

                    // console.log(itemCategories[i], itemAttributes.ItemLevel, itemAttributes[CharacterAttributeID.Strength]);

                    options.items.push(itemAttributes);
                }
                i = innerI - 1;
                calcValues.currentLevelUpdate += _.random(calcValues.rangeStep[0], calcValues.rangeStep[1]);

                if (calcValues.currentLevelUpdate >= constValues.maxLevel) break;
            }

            calcValues.currentSample++;
        }
        // console.log('positions', positions);
    }
}