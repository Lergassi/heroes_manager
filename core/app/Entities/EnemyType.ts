export default class EnemyType {
    readonly id: string;
    readonly name: string;
    readonly alias: string;

    constructor(options: {
        id: string;
        name: string;
        alias: string;
    }) {
        this.id = options.id;
        this.name = options.name;
        this.alias = options.alias;
    }
}