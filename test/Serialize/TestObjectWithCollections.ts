import TestObjectSample from './SupportObjects/TestObjectSample.js';

export default class TestObjectWithCollections {
    private readonly _simpleTypeCollection: (string | number | boolean | object)[];
    private readonly _objectCollection: TestObjectSample[];

    constructor(simpleTypeCollection: (string | number | boolean | object)[], objectCollection: TestObjectSample[]) {
        this._simpleTypeCollection = simpleTypeCollection;
        this._objectCollection = objectCollection;
    }
}