import AppError from './Errors/AppError.js';
import {sprintf} from 'sprintf-js';

export default class Repository<Entity> {
    private readonly _entityClassname: string;
    private readonly _items;

    get entityClassname(): string {
        return this._entityClassname;
    }

    constructor(entityClassname: string) {
        this._entityClassname = entityClassname;
        this._items = [];
    }

    add(entity: Entity): Entity {
        if (!this._items.includes(entity)) {
            this._items.push(entity);
        }

        return entity;
    }

    /**
     * @deprecated
     * @param id
     */
    findOneByID(id): Entity | null {
        if (!id) {
            return null;
        }

        for (let i = 0; i < this._items.length; i++) {
            if (this._items[i]['_id'] === id || (this._items[i].id ? this._items[i].id === id : false)) {   //todo: Переделать. Всю логику поиска и хранения сущностей.
                return this._items[i];
            }
        }

        return null;
    }

    /**
     * @deprecated
     * @param alias
     */
    findOneByAlias(alias: string): Entity | undefined {
        if (!alias) {
            return undefined;
        }

        for (let i = 0; i < this._items.length; i++) {
            if (this._items[i]['_alias'] === alias) {
                return this._items[i];
            }
        }

        return undefined;
    }

    /**
     * @deprecated
     * @param alias
     */
    findByAlias(alias: string): Entity[] {
        if (!alias) {
            return [];
        }

        let result = [];
        for (let i = 0; i < this._items.length; i++) {
            if (this._items[i]['_alias'] === alias) {
                result.push(this._items[i]);
            }
        }

        return result;
    }

    getOneByID(ID): Entity {
        let entity = this.findOneByID(ID);

        if (!entity) {
            throw new AppError(sprintf('Сущность типа %s ID(%s) не найдена.', this._entityClassname, ID));
        }

        return entity;
    }

    /**
     * @deprecated Убирать по возможности. Метод - псевдоним для getOneByID
     * @param alias
     */
    getOneByAlias(alias: string): Entity {
        // //todo: Это не здесь надо проверять, а в объектах при валидации.
        // let entity = this.findOneByAlias(alias);
        // if (!entity) {
        //     throw new AppError(sprintf('Сущность типа %s alias(%s) не найдена.', this._entityClassname, alias));
        // }
        //
        // return entity;
        return this.getOneByID(alias);
    }

    findAll() {
        return this._items.concat();
    }
}