import {ItemID} from '../../types/enums/ItemID.js';
import {RecipeID} from '../../types/enums/RecipeID.js';
import recipes_db_data from '../json/auto_generated_equip_recipes_23.02.2023_09_45_08.json';

export type TSDB_Recipe = {
    ID: ItemID | string,
    resultItemCount: number,
    requireItems: {ID: ItemID | string, count: number}[],
};

export type TSDB_RecipeDB = {
    [ID in ItemID | string]?: TSDB_Recipe;
};
/*
    кузнечное дело
        броня из метала         Breastplates, Gloves и другие категори + Plate
        всё оружие (пока тут)   Revolvers, OneHandedSwords и другие категории
        щиты                    Shields
    кожевничество
        броня из кожи           Breastplates, Gloves и другие категори + Leather
    портное дело
        броня из ткани          Breastplates, Gloves и другие категори + Cloth
    ювелирное дело
        ювелирные изделия       Amulets, Rings

    Breastplates - кузнечное дело
    //
    Breastplates - plate = bs
    Breastplates - leather = lw
    Breastplates - cloth = tl
    PlateArmor/LeatherArmor/ClothArmor?

    method(Breastplates, Plate) => bs
    method(Breastplates, Leather) => ls
    method(Breastplates, Cloth) => tl
    method(Revolvers) => bs
    //method(Revolvers, undefined) => bs
    method(Amulets) => jw

    armor().itemCategory(Breastplates, Plate)
    weapon().itemCategory(Breastplates)
    jewelry().itemCategory(Amulets)
    shields().itemCategory(Shields)
    //
    equip().itemCategory(ID)                    //общий для всего
    armor().itemCategory(Breastplates, Plate)   //для брони отдельный

    let profession = itemCategory(Breastplates)?.material(Plate);
*/

let recipes_db: TSDB_RecipeDB = {
    // [ItemID.Uncommon_Plate_Breastplate_9_01]: {
    //     ID: ItemID.Uncommon_Plate_Breastplate_9_01,
    //     resultItemCount: 42,
    //     requireItems: [
    //         {ID: ItemID.IronIngot, count: 10},
    //         {ID: ItemID.Wood, count: 20},
    //     ],
    // },
};

recipes_db = _.assign({}, recipes_db, recipes_db_data);

export const recipes = {
    resultCount: function (ID: ItemID): number {
        return recipes_db[ID]?.resultItemCount ?? 0;
    },
    requireItems: function (ID: ItemID, callback: (ID: ItemID, count: number) => void): void {
        _.forEach(recipes_db[ID]?.requireItems ?? [], (value) => {
            callback(value.ID as ItemID, value.count);
        });
    },
};