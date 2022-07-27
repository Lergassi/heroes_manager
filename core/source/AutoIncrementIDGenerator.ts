export default class AutoIncrementIDGenerator {
    private _currentId: number;

    constructor(startID) {
        this._currentId = startID;
    }

    generateID(): number {
        return this._currentId++;
    }
}

// export