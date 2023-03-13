import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import debug from 'debug';
import Endurance from "./Endurance";

export default class EnduranceController {
    private readonly _endurance: Endurance;

    private readonly _options = {
        enduranceValueForRecoveryRatio: 0.5,
        recoverEnduranceByEndurancePotion01: 30,
    };

    private readonly _potionID: ItemID = ItemID.EndurancePotion01;

    constructor(endurance: Endurance) {
        this._endurance = endurance;
    }

    update(itemStorage: ItemStorageInterface): void {
        // if (!this._endurance.canHeal()) return;

        //todo: Так не делать даже в прототипе. Значение должно быть округлено до двух знаков, значение может быть зависимо и тд.
        // if (_.round(this._endurance.endurance / this._endurance.maxEndurance) > this._options.enduranceValueForRecoveryRatio) return;
        if (this._endurance.currentEnduranceToMaxRatio > this._options.enduranceValueForRecoveryRatio) return;
        if (!itemStorage.hasItem(this._potionID, 1)) return;

        //@note Тут должна быть доп проверка или переменная. Забыл изменить название и логика сломалась.
        //todo: Должен быть алгоритм поиска предметов, использования и отмены в случае ошибок (возврат всех ресурсов и предметов).
        if (itemStorage.removeItem(this._potionID, 1) !== 1) return;

        this._endurance.add(this._options.recoverEnduranceByEndurancePotion01);
        debug(DebugNamespaceID.Log)('EnduranceController. Endurance восстановлено при помощи зелья.');
    }
}