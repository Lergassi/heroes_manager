import {ItemID} from '../../types/enums/ItemID';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID';
import {database} from '../../data/ts/database';
import {assertNotNil} from '../../source/assert';
import * as fns from 'date-fns';
import DebugApp from '../Services/DebugApp.js';

export interface GardenRCInterface {
    updateGardenBed?(seedID: ItemID, startGrow: Date): void;
}

export interface GardenBedRenderInterface {
    renderByRequest(UI: GardenRCInterface): void;
}

export class GardenBed implements GardenBedRenderInterface {
    private _seedID: ItemID;
    private _startGrowth: Date;

    constructor() {
        this._seedID = null;
        this._startGrowth = null;
    }

    plant(seedID: ItemID, itemStorage: ItemStorageInterface): boolean {
        let data = database.seeds.find(seedID);
        assertNotNil(data);

        if (!this.isFree()) {
            DebugApp.debug(DebugNamespaceID.Throw)('Грядка занята.');
            return false;
        }

        if (!itemStorage.hasItem(seedID, 1)) {
            DebugApp.debug(DebugNamespaceID.Throw)('Не достаточно семян.');
            return false;
        }

        this._startGrowth = new Date();
        this._seedID = seedID;
        itemStorage.removeItem(seedID, 1);
        DebugApp.debug(DebugNamespaceID.Log)('Растение посажено.');
    }

    harvest(itemStorage: ItemStorageInterface): boolean {
        if (this.isFree()) {
            DebugApp.debug(DebugNamespaceID.Throw)('Растение не посажено.');

            return false;
        }

        if (!this.isReadyToHarvest()) {

            DebugApp.debug(DebugNamespaceID.Throw)('Растение еще не выросло.');
            return false;
        }

        itemStorage.addItem(database.seeds.find(this._seedID).resultItemID, database.seeds.find(this._seedID).resultItemsCount);
        //todo: Проверка на добавление всех предметов - иначе сохранить во внутреннем хранилище.
        this.clear();
        DebugApp.debug(DebugNamespaceID.Log)('Урожай собран.');

        return true;
    }

    isReadyToHarvest(): boolean {
        if (this.isFree()) return false;

        let now = new Date();
        let diff = fns.differenceInSeconds(now, this._startGrowth);
        // if (diff < database.seeds.find(this._seedID).growthDuration) {
        //     debug(DebugNamespaceID.Throw)('Растение еще не выросло.');
        //     return false;
        // }

        return diff >= database.seeds.find(this._seedID).growthDuration;
    }

    isFree(): boolean {
        return _.isNil(this._seedID);
    }

    clear(): void {
        this._seedID = null;
        this._startGrowth = null;
    }

    renderByRequest(UI: GardenRCInterface): void {
        UI.updateGardenBed?.(this._seedID, this._startGrowth);
    }
}