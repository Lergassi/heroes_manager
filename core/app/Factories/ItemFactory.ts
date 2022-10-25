import EntityManager from '../../source/EntityManager.js';
import ItemBuilder, {ItemBuilderOptions} from '../Services/ItemBuilder.js';
import Item from '../Entities/Item.js';
import {ItemCategoryID} from '../../types/enums/ItemCategoryID.js';
import {EntityID} from '../../types/enums/EntityID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';

//todo: Не актуально. Удалить.
export default class ItemFactory {
     private _entityManager: EntityManagerInterface;

     constructor(entityManager: EntityManagerInterface) {
          this._entityManager = entityManager;
     }

     create(
         id: string,
         name: string,
         alias: string,
         itemCategoryID: ItemCategoryID,
         options: Partial<ItemBuilderOptions> = {},
     ): Item {
          return (new ItemBuilder(this._entityManager).default(
              id,
              name,
              itemCategoryID,
              options,
          )).build();
     }

     createByBuilder(
         id: string,
         builder: ItemBuilder,
    ): Item {
          return this._entityManager.add<Item>(EntityID.Item, id, builder.build());
     }
}