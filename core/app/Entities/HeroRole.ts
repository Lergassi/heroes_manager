export default class HeroRole {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _sort: number;

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get sort(): number {
        return this._sort;
    }

    constructor(
        id: string,
        name: string,
        sort: number,
    ) {
        this._id = id;
        this._name = name;
        this._sort = sort;
    }
}