import IDGeneratorInterface from './IDGeneratorInterface.js';

// export default class AutoIncrementIDGenerator implements IDGeneratorInterface<number>{
export default class AutoIncrementIDGenerator {
    private _currentId: number;

    constructor(startID) {
        this._currentId = startID;
    }

    generateID(): number {
        return this._currentId++;
    }
}