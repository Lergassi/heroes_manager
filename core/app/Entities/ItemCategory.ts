export default class ItemCategory {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _description: string;
    private readonly _sort: number;
    private readonly _parent: ItemCategory;

    constructor(
        id: string,
        name: string,
        description: string,
        sort: number,
        parent: ItemCategory = null,
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._sort = sort;
        this._parent = parent;
    }
}