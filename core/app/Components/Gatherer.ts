import GathererInterface from '../Interfaces/GathererInterface.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {unsigned} from '../../types/main.js';
import HeroActivityStateController, {HeroActivityStateCode} from './HeroActivityStateController.js';
import Item from '../Entities/Item.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import Vein from './Vein.js';
import LifeStateController from './LifeStateController.js';

export default class Gatherer implements GathererInterface {
    private readonly _lifeStateController: LifeStateController;

    constructor(lifeStateController: LifeStateController) {
        this._lifeStateController = lifeStateController;
    }

    /**
     *
     * @param gatheringPoint
     * @param itemStorage
     * @return Собрано ресурсов.
     */
    gather(gatheringPoint: Vein, itemStorage: ItemStorageInterface): unsigned {
        if (!this.canGather()) return 0;

        return gatheringPoint.gather(itemStorage);
    }

    canGather(): boolean {
        if (!this._lifeStateController.canAction()) {
            debug(DebugNamespaceID.Throw)('Сбор не возможен.');
            return false;
        }

        return true;
    }
}