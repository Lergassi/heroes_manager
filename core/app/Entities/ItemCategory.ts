export default class ItemCategory {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _sort: number;
    private readonly _parent: ItemCategory;

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get sort(): number {
        return this._sort;
    }

    get parent(): ItemCategory {
        return this._parent;
    }

    constructor(
        id: string,
        name: string,
        sort: number,
        parent: ItemCategory = null,
    ) {
        this._id = id;
        this._name = name;
        this._sort = sort;
        this._parent = parent;
    }
}