import GathererInterface from '../Interfaces/GathererInterface.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {unsigned} from '../../types/main.js';
import CharacterStateController, {CharacterStateCode} from './CharacterStateController.js';
import Item from '../Entities/Item.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import GatheringPoint from './GatheringPoint.js';

export default class Gatherer implements GathererInterface {
    private readonly _stateController: CharacterStateController;
    private readonly _itemStorage: ItemStorageInterface;

    constructor(stateController: CharacterStateController, itemStorage?: ItemStorageInterface) {
        this._stateController = stateController;
        this._itemStorage = itemStorage;
    }

    add(item: Item, count: unsigned): unsigned {
        if (!this.canGather()) return count;

        return this._itemStorage.addItem(item, count);
    }

    gather2(gatheringPoint: GatheringPoint): unsigned {
        if (!this.canGather()) return 0;

        let count = gatheringPoint.gather2();
        if (count) {
            // this._itemStorage.addItem();
        }
    }

    /**
     *
     * @param gatheringPoint
     * @param itemStorage
     * @return Остаток в жиле.
     */
    gather3(gatheringPoint: GatheringPoint, itemStorage: ItemStorageInterface): unsigned {
        if (!this.canGather()) return 0;

        return gatheringPoint.gather3(itemStorage);
    }

    canGather(): boolean {
        if (this._stateController.hasState(CharacterStateCode.Dead)) {
            debug(DebugNamespaceID.Throw)('Сбор не возможен. Герой мертвый.');
            return false;
        }

        return true;
    }
}