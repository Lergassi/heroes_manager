import {BuildingID} from '../../types/enums/BuildingID';
import AppError from '../../source/Errors/AppError';
import {Mine} from '../Components/Mine';
import {ItemID} from '../../types/enums/ItemID';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface';

export class BuildingFactory {
    createMine(buildingID: BuildingID, itemStorage: ItemStorageInterface): any {
        let building;
        switch (buildingID) {
            case BuildingID.CoalMine:
                building = new Mine(ItemID.Coal, 1, 1, itemStorage);
                break;
            case BuildingID.IronOreMine:
                building = new Mine(ItemID.IronOre, 2, 1, itemStorage);
                break;
            case BuildingID.CopperOreMine:
                building = new Mine(ItemID.CopperOre, 1, 1, itemStorage);
                break;
            default:
                throw new AppError('Строение не найдено.');
                break;
        }

        return building;
    }
}