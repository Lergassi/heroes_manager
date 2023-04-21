import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import HealthPoints from './HealthPoints.js';
import DebugApp from '../Services/DebugApp.js';

export default class HealthPointsController {
    private readonly _healthPoints: HealthPoints;

    private readonly _options = {
        healPointsValueForHealRatio: 0.5,
        resurrectHealthPointsByHealthPotion01: 35,  //Если не указан суффикс ratio, то это числое значение.
    };

    constructor(healthPoints: HealthPoints) {
        this._healthPoints = healthPoints;
    }

    update(itemStorage: ItemStorageInterface): void {
        if (!this._healthPoints.canHeal()) return;
        if (!itemStorage.hasItem(ItemID.HealthPotion01, 1)) return;
        if (this._healthPoints.currentHealPointsToMaxRatio > this._options.healPointsValueForHealRatio) return;

        //доп проверка
        if (itemStorage.removeItem(ItemID.HealthPotion01, 1) === 1) {
            this._healthPoints.heal(this._options.resurrectHealthPointsByHealthPotion01);
            DebugApp.debug(DebugNamespaceID.Log)('HealPointsController. Лечение при помощи зелья.');
        }
    }
}