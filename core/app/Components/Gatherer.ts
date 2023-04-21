import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import Vein from './Vein.js';
import ActionStateController from './ActionStateController.js';
import DebugApp from '../Services/DebugApp.js';

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
            DebugApp.debug(DebugNamespaceID.Throw)('Сбор не возможен.');
            return false;
        }

        return true;
    }
}