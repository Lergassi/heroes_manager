import ItemStorageInterface from '../Interfaces/ItemStorageInterface';
import WalletInterface from '../Interfaces/WalletInterface';
import {database} from '../../data/ts/database';
import {BuildingID} from '../../types/enums/BuildingID';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID';
import {assertNotNil} from '../../source/assert';
import {GardenBed} from './GardenBed';
import {ItemID} from '../../types/enums/ItemID';
import {FarmingRCInterface, FarmingRenderInterface, UI_GardenBed} from '../../../client/public/RC/FarmingRC';

/**
 * Ограничений по семенам нет. Какие у игрока семена есть - такие и может посадить. Как они получены - не важно.
 */
export class Farming implements FarmingRenderInterface {
    private readonly _gardenBeds: GardenBed[];
    private _options = {
        max: 2,
    };

    constructor() {
        this._gardenBeds = [];
    }

    buildGardenBed(itemStorage: ItemStorageInterface, wallet: WalletInterface): boolean {
        if (this._gardenBeds.length >= this._options.max) {
            debug(DebugNamespaceID.Throw)('Кол-во построек достигло максимума.');
            return false;
        }

        let data = database.buildings.find(BuildingID.GardenBed);
        assertNotNil(data, 'Building not found.');

        if (!itemStorage.hasItems(data.requireItems)) {
            debug(DebugNamespaceID.Throw)('Не достаточно ресурсов для строительства.');
            return false;
        }

        if (!wallet.has(data.cost)) {
            debug(DebugNamespaceID.Throw)('Не достаточно денег.');
            return false;
        }

        itemStorage.removeItems(data.requireItems);
        wallet.remove(data.cost);
        this._gardenBeds.push(new GardenBed());
        debug(DebugNamespaceID.Log)('Грядка построена.');

        return true;
    }

    plant(index: number, itemID: ItemID, itemStorage: ItemStorageInterface): void {
        this._gardenBeds[index]?.plant(itemID, itemStorage);
    }

    harvest(index: number, itemStorage: ItemStorageInterface): void {
        this._gardenBeds[index]?.harvest(itemStorage);
    }

    renderByRequest(UI: FarmingRCInterface): void {
        let gardenBeds: UI_GardenBed[] = [];
        for (let i = 0; i < this._gardenBeds.length; i++) {
            let gardenBed = this._gardenBeds[i];
            this._gardenBeds[i].renderByRequest({
                updateGardenBed(seedID: ItemID, startGrow: Date) {
                    gardenBeds.push({
                        gardenBed: gardenBed,
                        seedID: seedID,
                        startGrowth: startGrow,
                    });
                },
            });
        }

        UI.updateGardenBed?.(gardenBeds);
        UI.updateMaxGardenBed?.(this._options.max);
    }
}