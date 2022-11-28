import _ from 'lodash';
import debug from 'debug';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import ItemFactory from '../Factories/ItemFactory.js';
import ItemBuilder from './ItemBuilder.js';
import itemsData from '../../data/items.json';

export default class LoadItems {
    load(entityManager: EntityManagerInterface, itemFactory: ItemFactory) {
        this._load(entityManager, itemFactory, itemsData);
    }

    private _load(entityManager: EntityManagerInterface, itemFactory: ItemFactory, data) {
        for (let i = 0; i < data.length; i++) {
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
                        },
                    )
            );
        }
    }
}