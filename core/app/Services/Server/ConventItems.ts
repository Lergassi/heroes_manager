import fs from 'fs';
import csvToJson from 'convert-csv-to-json';
import {TSDB_ItemDB} from '../../../data/ts/items.js';
import {ArmorMaterialID} from '../../../types/enums/ArmorMaterialID.js';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';
import {ItemCategoryID} from '../../../types/enums/ItemCategoryID.js';
import {ItemID} from '../../../types/enums/ItemID.js';
import {QualityID} from '../../../types/enums/QualityID.js';
import DebugApp from '../DebugApp.js';

type CSV_Item = {
    ID: string;
    ItemCategoryID: string;
    ArmorMaterialID: string;
    QualityID: string;
    ProductionID: string;
    StackSize: number;
    ItemLevel: number;
    Strength: number;
    Agility: number;
    Intelligence: number;
    AttackPower: number;
    HealthPoints: number;
    DefaultBuyPrice?: number;
    DefaultSellPrice?: number;
    Equipable: boolean;
    TwoHandWeapon: boolean;
    IconID: string;
};

type CSV_ItemDB = CSV_Item[];

export default class ConventItems {
    run() {
        let filename = 'items';
        let input = sprintf('./core/data/csv/%s.csv', filename);
        let output = sprintf('./core/data/json/%s.json', filename);
        let csv_json: CSV_ItemDB = csvToJson.getJsonFromCsv(input);
        // console.log(csv_json);

        let tsdbItemDB: TSDB_ItemDB = {};
        for (let i = 0; i < csv_json.length; i++) {
            tsdbItemDB[csv_json[i].ID as ItemID] = {
                Agility: Number(csv_json[i].Agility ?? 0),
                ArmorMaterialID: csv_json[i].ArmorMaterialID ? String(csv_json[i].ArmorMaterialID) as ArmorMaterialID : null,
                AttackPower: Number(csv_json[i].AttackPower ?? 0),
                DefaultBuyPrice: Number(csv_json[i].DefaultBuyPrice ?? 0),
                DefaultSellPrice: Number(csv_json[i].DefaultSellPrice ?? 0),
                Equipable: Boolean(csv_json[i].Equipable ?? 0),
                HealthPoints: Number(csv_json[i].HealthPoints ?? 0),
                ID: String(csv_json[i].ID) as ItemID,
                Intelligence: Number(csv_json[i].Intelligence ?? 0),
                ItemCategoryID: String(csv_json[i].ItemCategoryID) as ItemCategoryID,
                ItemLevel: Number(csv_json[i].ItemLevel ?? 0),
                QualityID: String(csv_json[i].QualityID) as QualityID,
                StackSize: Number(csv_json[i].StackSize ?? 0),
                Strength: Number(csv_json[i].Strength ?? 0),
                TwoHandWeapon: Boolean(csv_json[i].TwoHandWeapon),
                IconID: String(csv_json[i].IconID),
                ProductionId: String(csv_json[i].ProductionID),
            };
        }
        //todo: Генерация ID для enum.

        let tsdbItemDBString = JSON.stringify(tsdbItemDB);
        fs.writeFile(output, tsdbItemDBString, (error) => {
            if (error) {
                console.log('error', error);
                return;
            }

            DebugApp.debug(DebugNamespaceID.Log)(sprintf('Данные из %s преобразованы и записаны в файл %s. ', input, output));
        });
    }
}