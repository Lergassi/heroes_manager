import {ItemCount, ItemCountRange, Loot, unsigned} from '../types.js';
import Item from '../Entities/Item.js';
import LevelRange from '../LevelRange.js';
import Component from '../../source/Component.js';

export default class ItemLootGeneratorComponent extends Component {
    private readonly _itemsLoot: Loot[];

    constructor(options: {
        itemsLoot: Loot[],
    }) {
        super();
        this._itemsLoot = options.itemsLoot;
    }

    // generate(level: unsigned): ItemCount[] {
    //     return undefined;
    // }
}