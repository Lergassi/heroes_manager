import _ from 'lodash';
import debug from 'debug';

export default class Icon {
    private readonly _id: string;
    private readonly _path: string;

    get id(): string {
        return this._id;
    }

    get path(): string {
        return this._path;
    }

    constructor(id: string, path: string) {
        this._id = id;
        this._path = path;

        //todo: Проверка наличия иконки.
    }
}