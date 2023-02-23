import _ from 'lodash';
import debug from 'debug';
import config from '../../../config/config.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import ItemFactory from '../../Factories/ItemFactory.js';
import ItemBuilder from '../../Builders/ItemBuilder.js';

import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';
/*
    todo: Временно для webpack файл импортируется прямо тут. Разделить на клиент и сервер.
 */
import manual_created_items_data from '../../../data/items.json';
// import auto_generated_equip_data from '../../../data/json/auto_generated_equip_22.02.2023_12_18_11.json';
import auto_generated_equip_data from '../../../data/json/auto_generated_equip_23.02.2023_09_45_08.json';

export default class ItemsLoader {
    load(entityManager: EntityManagerInterface, itemFactory: ItemFactory) {
        this._load(entityManager, itemFactory, manual_created_items_data);
        this._load(entityManager, itemFactory, auto_generated_equip_data);
    }

    private _load(entityManager: EntityManagerInterface, itemFactory: ItemFactory, data) {
        // for (let i = 0; i < data.length; i++) {
        for (const key in data) {
            let characterAttributes = {};
            if (data[key][CharacterAttributeID.Strength]) characterAttributes[CharacterAttributeID.Strength] = Number(data[key][CharacterAttributeID.Strength]);
            if (data[key][CharacterAttributeID.Agility]) characterAttributes[CharacterAttributeID.Agility] = Number(data[key][CharacterAttributeID.Agility]);
            if (data[key][CharacterAttributeID.Intelligence]) characterAttributes[CharacterAttributeID.Intelligence] = Number(data[key][CharacterAttributeID.Strength]);

            itemFactory.createByBuilder(
                data[key].ID,
                (new ItemBuilder(entityManager))
                    .default(
                        data[key].ID,
                        data[key].ItemCategoryID,
                        {
                            stackSize: Number(data[key].StackSize),
                            // getTypes: [
                            //     ItemGetType.Gathering,
                            // ],
                            // iconID: data[key].IconID,
                            itemLevel: Number(data[key].ItemLevel),
                            characterAttributes: characterAttributes,
                            properties: {
                                equipable: Boolean(data[key].Equipable),
                                armorMaterialID: data[key].ArmorMaterialID,
                                twoHandWeapon: Boolean(data[key].TwoHandWeapon),
                                defaultBuyPrice: Number(data[key].DefaultBuyPrice),
                                defaultSellPrice: Number(data[key].DefaultSellPrice),
                            },
                        },
                    )
            );//end itemFactory
        }//end for
        //todo: Проверка на совпадение ID. Если есть - заменить на новый и вывести сообщение. Или убрать предмет.
    }
}