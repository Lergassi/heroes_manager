import _ from 'lodash';
import debug from 'debug';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import Item from '../Entities/Item.js';
import {unsigned} from '../../types/main.js';
import {assertIsGreaterThanOrEqual, assertNotNil} from '../../source/assert.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ItemStackControllerInterface from '../Interfaces/ItemStackControllerInterface.js';

// export default class ItemStackController implements ItemStorageInterface {
export default class ItemStackController implements ItemStackControllerInterface {
    private _item: Item;
    private _count: unsigned;

    constructor() {
        this._item = null;  //todo: Далее тут может быть ItemStack без ограничений через композицию.
        this._count = 0;
    }

    addItem(item: Item, count: unsigned): unsigned {
        assertNotNil(item);
        assertIsGreaterThanOrEqual(count, 0);

        if (this._item && item !== this._item) {
            debug(DebugNamespaceID.Throw)('ItemStackController занят другим предметом.');
            //@note: Возможно не надо возвращать ошибок. Метод называется addItem(), а не replace. Нужно заменить, поместить с заменой - это другая логика. Хотя для разработки можно оставить, а для игрока отключить.
            return count;
        }

        this._item = item;

        let flaw = this._item.stackSize - this._count;
        if (count <= flaw) {
            this._count += count;
            count = 0;
        } else {
            this._count += flaw;
            count -= flaw;
        }

        return count;
    }
}