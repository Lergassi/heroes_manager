import _ from 'lodash';
import debug from 'debug';
import {ItemAttributeID} from '../../../types/enums/ItemAttributeID.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import ItemFactory from '../../Factories/ItemFactory.js';
import ItemBuilder from '../ItemBuilder.js';
import items_data from '../../../data/items.json';
import auto_generated_equip from '../../../data/auto_generated_equip.json';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';

export default class ItemsLoader {
    load(entityManager: EntityManagerInterface, itemFactory: ItemFactory) {
        this._load(entityManager, itemFactory, items_data);
        this._load(entityManager, itemFactory, auto_generated_equip);
    }

    private _load(entityManager: EntityManagerInterface, itemFactory: ItemFactory, data) {
        for (let i = 0; i < data.length; i++) {
            let characterAttributes = {};
            if (data[i][CharacterAttributeID.Strength]) characterAttributes[CharacterAttributeID.Strength] = Number(data[i][CharacterAttributeID.Strength]);
            if (data[i][CharacterAttributeID.Agility]) characterAttributes[CharacterAttributeID.Agility] = Number(data[i][CharacterAttributeID.Agility]);
            if (data[i][CharacterAttributeID.Intelligence]) characterAttributes[CharacterAttributeID.Intelligence] = Number(data[i][CharacterAttributeID.Strength]);

            itemFactory.createByBuilder(
                data[i].ID,
                (new ItemBuilder(entityManager))
                    .default(
                        data[i].ID,
                        // data[i].Name,
                        data[i].ItemCategoryID,
                        {
                            stackSize: Number(data[i].StackSize),
                            // getTypes: [
                            //     ItemGetType.Gathering,
                            // ],
                            // iconID: data[i].IconID,
                            itemLevel: Number(data[i].ItemLevel),
                            characterAttributes: characterAttributes,
                            properties: {
                                equipable: Boolean(data[i].Equipable),
                                armorMaterialID: data[i].ArmorMaterialID,
                                twoHandWeapon: Boolean(data[i].TwoHandWeapon),
                                defaultBuyPrice: Number(data[i].DefaultBuyPrice),
                                defaultSellPrice: Number(data[i].DefaultSellPrice),
                            },
                        },
                    )
            );//end itemFactory
        }//end for
        //todo: Проверка на совпадение ID. Если есть - заменить на новый и вывести сообщение. Или убрать предмет.
    }
}