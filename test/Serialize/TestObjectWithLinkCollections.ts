import TestObjectLink from './SupportObjects/TestObjectLink.js';

export default class TestObjectWithLinkCollections {
    private readonly _linkCollection: TestObjectLink[];

    constructor(linkCollection: TestObjectLink[]) {
        this._linkCollection = linkCollection;
    }
}