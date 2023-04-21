import {BuildingID} from '../../types/enums/BuildingID';
import {Mine} from '../Components/Mine';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface';
import {database} from '../../data/ts/database';
import {assertNotNil} from '../../source/assert';

export class MineFactory {
    createMine(buildingID: BuildingID, itemStorage: ItemStorageInterface): Mine {
        let data = database.mines.find(buildingID);
        assertNotNil(data);

        let building = new Mine(data.resultItemID, data.countForInterval, data.interval, itemStorage);
        // switch (buildingID) {
        //     case BuildingID.CoalMine:
        //         building = new Mine(ItemID.Coal, database.mines., 1, itemStorage);
        //         break;
        //     case BuildingID.IronOreMine:
        //         building = new Mine(ItemID.IronOre, 2, 1, itemStorage);
        //         break;
        //     case BuildingID.CopperOreMine:
        //         building = new Mine(ItemID.CopperOre, 1, 1, itemStorage);
        //         break;
        //     default:
        //         throw new AppError('Строение не найдено.');
        //         break;
        // }

        return building;
    }
}