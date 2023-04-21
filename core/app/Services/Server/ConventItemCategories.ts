import {sprintf} from 'sprintf-js';
import fs from 'fs';
import csvToJson from 'convert-csv-to-json';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import DebugApp from '../DebugApp.js';

export default class ConventItemCategories {
    run() {
        let filename = 'item_categories';
        let input = sprintf('./core/data/csv/%s.csv', filename);
        let output = sprintf('./core/data/json/%s.json', filename);
        let json = csvToJson.getJsonFromCsv(input);
        let string = JSON.stringify(json);
        fs.writeFile(output, string, (error) => {
            if (error) {
                console.log('error', error);
                return;
            }

            DebugApp.debug(DebugNamespaceID.Log)(sprintf('Данные из %s преобразованы и записаны в файл %s.', input, output));
        });
    }
}