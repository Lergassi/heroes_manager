import {ItemLoot, unsigned} from '../../types/main.js';
import ItemStorageComponent from './ItemStorageComponent.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

export default class ItemLootGeneratorComponent {
    private readonly _itemsLoot: ItemLoot[];

    constructor(options: {
        itemsLoot: ItemLoot[],  //todo: Смотреть как будет удобно пользоваться. Возможно стоит всё переделать на методы иначе придется менять много логики при изменении типа постоянно.
    }) {
        this._itemsLoot = options.itemsLoot;
    }

    generate(): void {
        debug(DebugNamespaceID.Indev)('Генерация лута.');
    }
}