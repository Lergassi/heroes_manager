import _ from 'lodash';
import debug from 'debug';
import fs from 'fs';
import csvToJson from 'convert-csv-to-json';
import {DebugNamespaceID} from '../../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';

export default class ConventItems {
    run() {
        let input = './core/data/items.csv';
        let output = './core/data/items.json';
        let json = csvToJson.getJsonFromCsv(input);
        let string = JSON.stringify(json);
        fs.writeFile(output, string, (error) => {
            if (error) {
                console.log('error', error);
                return;
            }

            debug(DebugNamespaceID.Log)(sprintf('Данные из %s преобразованы и записаны в файл %s. ', input, output));
        });
    }
}