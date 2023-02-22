import {database} from '../../../../../data/ts/database.js';
import ContainerInterface from '../../../../../source/ContainerInterface.js';
import {ArmorMaterialID} from '../../../../../types/enums/ArmorMaterialID.js';
import {CharacterAttributeID} from '../../../../../types/enums/CharacterAttributeID.js';
import {ItemCategoryID} from '../../../../../types/enums/ItemCategoryID.js';
import {QualityID} from '../../../../../types/enums/QualityID.js';
import {ItemDatabaseRow} from '../../../../../types/ItemDatabaseRow.js';
import ItemIDGenerator from '../../../ItemIDGenerator.js';
import HeroCharacterAttributeGenerator from '../../HeroCharacterAttributeGenerator.js';
import ItemAttributeGenerator from './ItemAttributeGenerator.js';

export default class GenerateItemsByPattern {
    //ArmorMaterial проще указать в паттерне чем выдумывать сложную логику. Для оружия нет материала.
    /*
    strategy: броня + материал, ювелирка на каждый сил/лов/инт, оружие на каждую категорию, оружие может быть двуручным.

    * */

    private _armorMaterialIDs = [
        ArmorMaterialID.Plate,
        ArmorMaterialID.Leather,
        ArmorMaterialID.Cloth,
    ];

    private _jewelryStrategies = {
        [CharacterAttributeID.Strength]: {characterAttributeID: CharacterAttributeID.Strength, armorMaterialID: ArmorMaterialID.Plate},
        [CharacterAttributeID.Agility]: {characterAttributeID: CharacterAttributeID.Agility, armorMaterialID: ArmorMaterialID.Leather},
        [CharacterAttributeID.Intelligence]: {characterAttributeID: CharacterAttributeID.Intelligence,armorMaterialID: ArmorMaterialID.Cloth},
    };

    private _patterns: any = [
        {
            level: 2,
            itemCategories: [
                {itemCategoryID: ItemCategoryID.Gloves, strategy: 'armor'},
                {itemCategoryID: ItemCategoryID.Belts, strategy: 'armor'},
            ],
        },
        {
            level: 4,
            itemCategories: [
                {itemCategoryID: ItemCategoryID.OneHandedSwords, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.TwoHandedSwords, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Staffs, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Daggers, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Bows, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Revolvers, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Shields, strategy: 'weapon'},
            ],
        },
        {
            level: 6,
            itemCategories: [
                {itemCategoryID: ItemCategoryID.Breastplates, strategy: 'armor'},
                {itemCategoryID: ItemCategoryID.Boots, strategy: 'armor'},
                {itemCategoryID: ItemCategoryID.Rings, strategy: 'jewelry'},
            ],
        },
        {
            level: 8,
            itemCategories: [
                {itemCategoryID: ItemCategoryID.Helmets, strategy: 'armor'},
                {itemCategoryID: ItemCategoryID.Bracers, strategy: 'armor'},
            ],
        },
        {
            level: 10,
            itemCategories: [
                {itemCategoryID: ItemCategoryID.OneHandedSwords, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.TwoHandedSwords, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Staffs, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Daggers, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Bows, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Revolvers, strategy: 'weapon'},
                {itemCategoryID: ItemCategoryID.Shields, strategy: 'shields'},
            ],
        },
        {
            level: 12,
            itemCategories: [
                {itemCategoryID: ItemCategoryID.ShoulderPads, strategy: 'armor'},
                {itemCategoryID: ItemCategoryID.Amulets, strategy: 'jewelry'},
            ],
        },
        {
            level: 14,
            itemCategories: [
                {itemCategoryID: ItemCategoryID.Pants, strategy: 'armor'},
                {itemCategoryID: ItemCategoryID.Rings, strategy: 'jewelry'},
            ],
        },
    ];

    private readonly _itemAttributeGenerator: ItemAttributeGenerator;
    private readonly _heroCharacterAttributeGenerator: HeroCharacterAttributeGenerator;
    private readonly _container: ContainerInterface;
    private readonly _itemIDGenerator: ItemIDGenerator;

    constructor(
        container: ContainerInterface,
        itemAttributeGenerator: ItemAttributeGenerator,
        heroCharacterAttributeGenerator: HeroCharacterAttributeGenerator,
    ) {
        this._container = container;
        this._itemAttributeGenerator = itemAttributeGenerator;
        this._heroCharacterAttributeGenerator = heroCharacterAttributeGenerator;
        this._itemIDGenerator = new ItemIDGenerator();
    }

    run(items: ItemDatabaseRow[]): void {
        let rangeLength = 14;
        let rangeStart = 2;
        let rangeEnd = 100;
        let rangeIndex = 0;
        while (rangeStart + (rangeIndex * rangeLength) <= rangeEnd) {
            for (let i = 0; i < this._patterns.length; i++) {
                let level = this._patterns[i].level + (rangeIndex * rangeLength)
                let itemLevel = this._heroCharacterAttributeGenerator.itemLevelCorrespondsToItemLevel(level);   //todo: Убрать зависимость генерации атрибутов предметов от генерации атрибутов героев.

                for (let j = 0; j < this._patterns[i].itemCategories.length; j++) {
                    switch (this._patterns[i].itemCategories[j].strategy) {
                        case 'armor':
                            // console.log(level, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                            for (let k = 0; k < this._armorMaterialIDs.length; k++) {
                                // console.log(level, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID, this._armorMaterialIDs[k]);
                                let itemDatabaseRow = this._createItemDatabaseRow();

                                itemDatabaseRow.ItemLevel = itemLevel;
                                itemDatabaseRow.QualityID = QualityID.Uncommon;
                                itemDatabaseRow.Equipable = true;
                                itemDatabaseRow.ItemCategoryID = this._patterns[i].itemCategories[j].itemCategoryID;

                                itemDatabaseRow.ID = this._itemIDGenerator.generate(
                                    this._patterns[i].itemCategories[j].itemCategoryID,
                                    itemLevel,
                                    QualityID.Uncommon,
                                    {
                                        armorMaterialID: this._armorMaterialIDs[k],
                                    },
                                );
                                itemDatabaseRow.ArmorMaterialID = this._armorMaterialIDs[k];

                                itemDatabaseRow.HealthPoints = this._itemAttributeGenerator.healthPoints(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                                itemDatabaseRow[this._mainCharacterAttributeForArmorMaterial(this._armorMaterialIDs[k])] = this._itemAttributeGenerator.characterAttributeFromAttackPower_reverse(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);

                                items.push(itemDatabaseRow);
                            }
                            break;
                        case 'jewelry':
                            // console.log(level, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                            for (const key in this._jewelryStrategies) {
                                // console.log(level, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID, this._jewelryStrategies[key].characterAttributeID);
                                let itemDatabaseRow = this._createItemDatabaseRow();

                                itemDatabaseRow.ItemLevel = itemLevel;
                                itemDatabaseRow.QualityID = QualityID.Uncommon;
                                itemDatabaseRow.Equipable = true;
                                itemDatabaseRow.ItemCategoryID = this._patterns[i].itemCategories[j].itemCategoryID;

                                itemDatabaseRow.ID = this._itemIDGenerator.generate(
                                    this._patterns[i].itemCategories[j].itemCategoryID,
                                    itemLevel,
                                    QualityID.Uncommon,
                                );

                                itemDatabaseRow.HealthPoints = this._itemAttributeGenerator.healthPoints(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                                itemDatabaseRow[this._mainCharacterAttributeForArmorMaterial(this._jewelryStrategies[key].armorMaterialID)] = this._itemAttributeGenerator.characterAttributeFromAttackPower_reverse(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);

                                items.push(itemDatabaseRow);
                            }
                            break;
                        case 'weapon':
                            // console.log(level, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                            let itemDatabaseRow = this._createItemDatabaseRow();

                            itemDatabaseRow.ItemLevel = itemLevel;
                            itemDatabaseRow.QualityID = QualityID.Uncommon;
                            itemDatabaseRow.Equipable = true;
                            itemDatabaseRow.ItemCategoryID = this._patterns[i].itemCategories[j].itemCategoryID;

                            itemDatabaseRow.ID = this._itemIDGenerator.generate(
                                this._patterns[i].itemCategories[j].itemCategoryID,
                                itemLevel,
                                QualityID.Uncommon,
                            );
                            itemDatabaseRow.ItemLevel = itemLevel;
                            itemDatabaseRow.QualityID = QualityID.Uncommon;
                            itemDatabaseRow.Equipable = true;
                            if (database.metadata.items.twoHandWeapon(this._patterns[i].itemCategories[j].itemCategoryID)) itemDatabaseRow.TwoHandWeapon = true;

                            itemDatabaseRow.HealthPoints = this._itemAttributeGenerator.healthPoints(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                            itemDatabaseRow[CharacterAttributeID.AttackPower] = this._itemAttributeGenerator.characterAttributeFromAttackPower_reverse(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);

                            items.push(itemDatabaseRow);

                            break;
                        case 'shields':
                            // console.log(level, itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                            {//А так можно было?
                                let itemDatabaseRow = this._createItemDatabaseRow();

                                itemDatabaseRow.ItemLevel = itemLevel;
                                itemDatabaseRow.QualityID = QualityID.Uncommon;
                                itemDatabaseRow.Equipable = true;
                                itemDatabaseRow.ItemCategoryID = this._patterns[i].itemCategories[j].itemCategoryID;

                                itemDatabaseRow.ID = this._itemIDGenerator.generate(
                                    this._patterns[i].itemCategories[j].itemCategoryID,
                                    itemLevel,
                                    QualityID.Uncommon,
                                );
                                if (database.metadata.items.twoHandWeapon(this._patterns[i].itemCategories[j].itemCategoryID)) itemDatabaseRow.TwoHandWeapon = true;

                                itemDatabaseRow.HealthPoints = this._itemAttributeGenerator.healthPoints(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                                itemDatabaseRow.Strength = this._itemAttributeGenerator.characterAttributeFromAttackPower_reverse(itemLevel, this._patterns[i].itemCategories[j].itemCategoryID);
                                //todo: CharacterAttribute на основе метаданных/strategy. Для паладинов нужна еще инта.

                                items.push(itemDatabaseRow);
                            }
                            break;
                    }//end switch
                }//end for itemCategories
            }//end this._patterns
            
            rangeIndex++;
        }
    }

    private _mainCharacterAttributeForArmorMaterial(armorMaterialID: ArmorMaterialID): CharacterAttributeID | undefined {
        for (const key in this._jewelryStrategies) {
            if (this._jewelryStrategies[key].armorMaterialID === armorMaterialID) return this._jewelryStrategies[key].characterAttributeID;
        }

        return undefined;
    }

    private _createItemDatabaseRow(): ItemDatabaseRow {
        return {
            ID: '',
            ItemCategoryID: '',
            ArmorMaterialID: '',
            ItemLevel: 0,
            QualityID: QualityID.Uncommon,
            StackSize: 1,
            Strength: 0,
            Agility: 0,
            Intelligence: 0,
            HealthPoints: 0,
            Equipable: false,
            TwoHandWeapon: false,
        };
    }
}