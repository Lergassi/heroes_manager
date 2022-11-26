import _ from 'lodash';
import debug from 'debug';
import {sprintf} from 'sprintf-js';

export default class Logger {
    private _data: string;

    constructor() {
        // this._rows = [];
        this._data = '';
    }

    write(str: string) {
        this._data += str;
    }

    writeln(str: string) {
        this._data += str + '\n';
    }

    head(str: string) {
        this._data +=  sprintf('%s %s %s\n', this._headPattern(), this._headPattern(), str);
    }

    _headPattern() {
        return '-'.repeat(16);
    }
}