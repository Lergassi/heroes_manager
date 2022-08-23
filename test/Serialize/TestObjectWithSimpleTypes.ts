export default class TestObjectWithSimpleTypes {
    private _boolean: boolean;
    private _number: number;
    private _string: string;

    constructor(boolean: boolean, number: number, string: string) {
        this._boolean = boolean;
        this._number = number;
        this._string = string;
    }
}