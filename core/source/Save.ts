export default class Save {
    private readonly _date: Date;
    private readonly _data;

    get date(): Date {
        return this._date;
    }

    get data() {
        return this._data;
    }

    constructor(date: Date, data) {
        this._date = date;
        this._data = data;
    }

    // toJSON() {
    //     return 42;
    // }
}