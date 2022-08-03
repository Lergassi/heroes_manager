export default class CharacterAttribute {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _alias: string;
    private readonly _description: string;
    private readonly _sort: number;

    get id(): number {
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

    constructor(
        id: number,
        name: string,
        alias: string,
        description: string,
        sort: number,
    ) {
        this._id = id;
        this._name = name;
        this._alias = alias;
        this._description = description;
        this._sort = sort;
    }
}