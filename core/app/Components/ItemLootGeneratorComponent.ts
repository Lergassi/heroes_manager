import {Loot, unsigned} from '../../types/main.js';
import ItemStorageComponent from './ItemStorageComponent.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export default class ItemLootGeneratorComponent {
    private readonly _itemsLoot: Loot[];

    constructor(options: {
        itemsLoot: Loot[],
    }) {
        this._itemsLoot = options.itemsLoot;
    }

    // generate(level: unsigned, itemStorage: ItemStorageComponent): void {
    generate(): void {
        debug(DebugNamespaceID.Indev)('Генерация лута.');
    }
}