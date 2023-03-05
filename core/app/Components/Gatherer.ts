import {ItemID} from '../../types/enums/ItemID.js';
import HeroActivityStateController, {HeroActivityStateCode} from './HeroActivityStateController.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import Vein from './Vein.js';
import ActionStateController from './ActionStateController.js';

export default class Gatherer {
    private readonly _actionStateController: ActionStateController;

    constructor(lifeStateController: ActionStateController) {
        this._actionStateController = lifeStateController;
    }

    /**
     *
     * @param gatheringPoint
     * @param itemStorage
     * @return Собрано ресурсов.
     */
    gather(gatheringPoint: Vein, itemStorage: ItemStorageInterface): number {
        if (!this.canGather()) return 0;

        return gatheringPoint.gather(itemStorage);
    }

    canGather(): boolean {
        if (!this._actionStateController.canAction()) {
            debug(DebugNamespaceID.Throw)('Сбор не возможен.');
            return false;
        }

        return true;
    }
}