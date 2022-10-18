import {Loot, unsigned} from '../types.js';
import Component from '../../source/Component.js';
import ItemStorageComponent from './ItemStorageComponent.js';

export default class ItemLootGeneratorComponent extends Component {
    private readonly _itemsLoot: Loot[];

    constructor(options: {
        itemsLoot: Loot[],
    }) {
        super();
        this._itemsLoot = options.itemsLoot;
    }

    generate(level: unsigned, itemStorage: ItemStorageComponent): void {
        return undefined;
    }
}