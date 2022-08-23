import TestObjectLink from './SupportObjects/TestObjectLink.js';

export default class TestObjectWithLink {
    private readonly _link: TestObjectLink;

    constructor(link: TestObjectLink) {
        this._link = link;
    }
}