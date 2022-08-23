export default class ItemCategory {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _alias: string;
    private readonly _description: string;
    private readonly _sort: number;
    private readonly _parent: ItemCategory;

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get alias(): string {
        return this._alias;
    }

    get description(): string {
        return this._description;
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
        alias: string,
        description: string,
        sort: number,
        parent: ItemCategory = null,
    ) {
        this._id = id;
        this._name = name;
        this._alias = alias;
        this._description = description;
        this._sort = sort;
        this._parent = parent;
    }
}