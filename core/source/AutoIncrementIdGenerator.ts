export default class AutoIncrementIdGenerator {
    private _currentId: number;

    constructor(startId) {
        this._currentId = startId;
    }

    generateId(): number {
        return this._currentId++;
    }

    save() {
        return {
            className: this.constructor.name,
            currentId: this._currentId,
        };
    }

    static load(data, container) {
        return new AutoIncrementIdGenerator(data.currentId);
    }
}