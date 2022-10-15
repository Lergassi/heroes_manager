export default class CharacterAttributeData {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _alias: string;
    private readonly _description: string;
    private readonly _sort: number;

    constructor(
        id: string,
        name: string,
        description: string,
        sort: number,
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._sort = sort;
    }
}