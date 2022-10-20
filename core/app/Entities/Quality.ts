export default class Quality {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly sort: number;

    constructor(
        id: string,
        name: string,
        description: string,
        sort: number,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sort = sort;
    }
}