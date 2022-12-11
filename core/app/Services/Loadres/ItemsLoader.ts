import _ from 'lodash';
import debug from 'debug';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import ItemFactory from '../../Factories/ItemFactory.js';
import ItemBuilder from '../ItemBuilder.js';
import itemsData from '../../../data/items.json';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';

export default class ItemsLoader {
    load(entityManager: EntityManagerInterface, itemFactory: ItemFactory) {
        this._load(entityManager, itemFactory, itemsData);
    }

    private _load(entityManager: EntityManagerInterface, itemFactory: ItemFactory, data) {
        for (let i = 0; i < data.length; i++) {
            let characterAttributes = {};
            if (data[i].STR) characterAttributes[CharacterAttributeID.Strength] = Number(data[i].STR);
            if (data[i].AGI) characterAttributes[CharacterAttributeID.Agility] = Number(data[i].AGI);
            if (data[i].INT) characterAttributes[CharacterAttributeID.Intelligence] = Number(data[i].INT);

            itemFactory.createByBuilder(
                data[i].ID,
                (new ItemBuilder(entityManager))
                    .default(
                        data[i].ID,
                        data[i].Name,
                        data[i].ItemCategoryID,
                        {
                            stackSize: Number(data[i].StackSize),
                            // getTypes: [
                            //     ItemGetType.Gathering,
                            // ],
                            iconID: data[i].IconID,
                            itemLevel: Number(data[i].ItemLevel),
                            characterAttributes: characterAttributes,
                            properties: {
                                armorMaterialID: data[i].ArmorMaterialID,
                                twoHandWeapon: Boolean(data[i].TwoHandWeapon),
                                defaultBuyPrice: Number(data[i].DefaultBuyPrice),
                                defaultSellPrice: Number(data[i].DefaultSellPrice),
                            },
                        },
                    )
            );
        }
    }
}