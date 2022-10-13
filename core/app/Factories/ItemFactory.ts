import EntityManager from '../../source/EntityManager.js';
import ItemBuilder, {alias, ItemBuilderOptions} from '../Services/ItemBuilder.js';
import Item from '../Entities/Item.js';

export default class ItemFactory {
     private _em: EntityManager;

     constructor(entityManager: EntityManager) {
          this._em = entityManager;
     }

     create (
         id: string,
         name: string,
         alias: string,
         itemCategory: alias,
         options: Partial<ItemBuilderOptions> = {},
     ): Item {
          return (new ItemBuilder(this._em).default(
              id,
              name,
              itemCategory,
              options,
          )).build();
     }

     createByBuilder(builder: ItemBuilder): Item {
          return builder.build();
     }
}