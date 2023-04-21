import {ItemID} from '../../types/enums/ItemID';
import {Mine} from './Mine';
import {BuildingID} from '../../types/enums/BuildingID';
import {MineFactory} from '../Factories/MineFactory';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface';
import {database} from '../../data/ts/database';
import {assert, assertNotNil} from '../../source/assert';
import {
    ConstructionRCInterface,
    ConstructionRenderInterface,
    UI_Building
} from '../../../client/public/RC/ConstructionRC';
import WalletInterface from '../Interfaces/WalletInterface';
import DebugApp from '../Services/DebugApp.js';

export class Construction implements ConstructionRenderInterface {
    private readonly _buildings: { ID: BuildingID, building: Mine }[];
    private readonly _mineFactory: MineFactory;

    private _maxBuildings = {
        // [BuildingID.Sawmill]: 1,
        // [BuildingID.CoalMine]: 1,
        // [BuildingID.IronOreMine]: 1,
        // [BuildingID.CopperOreMine]: 1,
        //@demo:
        [BuildingID.Sawmill]: 10,
        [BuildingID.CoalMine]: 10,
        [BuildingID.IronOreMine]: 10,
        [BuildingID.CopperOreMine]: 10,
    };

    constructor(mineFactory: MineFactory) {
        this._buildings = [];
        this._mineFactory = mineFactory;
    }

    build(buildingID: BuildingID, itemStorage: ItemStorageInterface, wallet: WalletInterface): boolean {
        let data = database.buildings.find(buildingID);
        assertNotNil(data);

        let sum = _.sum(_.map(this._buildings, (value, index, collection) => {
            return Number(value.ID === buildingID);
        }));
        assert(sum < (this._maxBuildings[buildingID] ?? 0), 'Достигнуто максимальное кол-во зданий.');

        for (let i = 0; i < data.requireItems.length; i++) {
            // if (!itemStorage.hasItem(data.requireItems[i].itemID, data.requireItems[i].count)) throw new AppError('Не достаточно ресурсов для постройки здания.');
            if (!itemStorage.hasItem(data.requireItems[i].itemID, data.requireItems[i].count)) {
                DebugApp.debug(DebugNamespaceID.Throw)('Не достаточно ресурсов для постройки здания.');
                return false;
            }
        }

        if (!wallet.has(data.cost)) {
            DebugApp.debug(DebugNamespaceID.Throw)('Не достаточно денег.');
            return false;
        }

        for (let i = 0; i < data.requireItems.length; i++) {
            itemStorage.removeItem(data.requireItems[i].itemID, data.requireItems[i].count);
        }
        wallet.remove(data.cost);
        this._buildings.push({
            ID: buildingID, //meta?
            building: this._mineFactory.createMine(buildingID, itemStorage),
        });
        DebugApp.debug(DebugNamespaceID.Log)('Здание построено.');

        return true;
    }

    renderByRequest(UI: ConstructionRCInterface): void {
        let buildings: UI_Building[] = [];
        for (let i = 0; i < this._buildings.length; i++) {
            let ID = this._buildings[i].ID;
            this._buildings[i].building.renderByRequest({
                updateItem(itemID: ItemID, count: number, interval: number) {
                    buildings.push({
                        ID: ID,
                        itemID: itemID,
                        count: count,
                        interval: interval,
                    });
                },
            });
        }

        UI.updateBuildings?.(buildings);
    }
}