export default class EnemyType {
    readonly id: string;
    readonly name: string;

    constructor(options: {
        id: string;
        name: string;
    }) {
        this.id = options.id;
        this.name = options.name;
    }
}