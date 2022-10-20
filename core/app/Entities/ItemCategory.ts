export default class ItemCategory {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly sort: number;
    readonly parent: ItemCategory;

    constructor(
        id: string,
        name: string,
        description: string,
        sort: number,
        parent: ItemCategory = null,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sort = sort;
        this.parent = parent;
    }
}