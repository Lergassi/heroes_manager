export default class TestRepository<Entity> {
    private _items;

    constructor() {
        this._items = [];
    }

    add(entity: Entity) {
        this._items.push(entity);
    }
}