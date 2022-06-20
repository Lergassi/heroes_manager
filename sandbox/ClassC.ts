export default class ClassC {
    get name(): string {
        return this._name;
    }

    private readonly _name: string;

    constructor(name: string) {
        this._name = name;
    }
}