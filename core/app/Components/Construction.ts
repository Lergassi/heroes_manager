import {ItemID} from '../../types/enums/ItemID';
import {Mine} from './Mine';
import {BuildingID} from '../../types/enums/BuildingID';
import {BuildingFactory} from '../Factories/BuildingFactory';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface';
import {database} from '../../data/ts/database';
import {assert, assertIsGreaterThan, assertNotNil} from '../../source/assert';
import AppError from '../../source/Errors/AppError';
import {map} from 'lodash';
import {buildings} from '../../data/ts/buildings';
import {
    ConstructionRCInterface,
    ConstructionRenderInterface,
    UI_Building
} from '../../../client/public/RC/ConstructionRC';

export class Construction implements ConstructionRenderInterface {
    private readonly _buildings: {ID: BuildingID, building: Mine}[];
    private readonly _buildingFactory: BuildingFactory;

    private _maxBuildings = {
        [BuildingID.CoalMine]: 1,
        [BuildingID.IronOreMine]: 1,
        [BuildingID.CopperOreMine]: 1,
    };

    constructor(buildingFactory: BuildingFactory) {
        this._buildings = [];
        this._buildingFactory = buildingFactory;
    }

    build(buildingID: BuildingID, itemStorage: ItemStorageInterface): void {
        let data = database.buildings.find(buildingID);
        assertNotNil(data);

        let sum = _.sum(_.map(this._buildings, (value, index, collection) => {
            return Number(value.ID === buildingID);
        }));
        assert(sum < (this._maxBuildings[buildingID] ?? 0), 'Достигнуто максимальное кол-во зданий.');

        for (let i = 0; i < data.requireItems.length; i++) {
            if (!itemStorage.hasItem(data.requireItems[i].itemID, data.requireItems[i].count)) throw new AppError('Не достаточно ресурсов для постройки здания.');
        }

        for (let i = 0; i < data.requireItems.length; i++) {
            itemStorage.removeItem(data.requireItems[i].itemID, data.requireItems[i].count);
        }
        this._buildings.push({
            ID: buildingID, //meta?
            building: this._buildingFactory.createMine(buildingID, itemStorage),
        });
        debug(DebugNamespaceID.Log)('Здание построено.');
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