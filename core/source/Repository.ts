import AppError from './AppError.js';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';

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

    add(item: Entity): void {
        if (!this._items.includes(item)) {
            this._items.push(item);
        }
    }

    findOneById(id): Entity | undefined {
        if (!id) {
            return undefined;
        }

        for (let i = 0; i < this._items.length; i++) {
            if (this._items[i].id === id) {
                return this._items[i];
            }
        }

        return undefined;
    }

    findOneByAlias(alias: string): Entity | undefined {
        if (!alias) {
            return undefined;
        }

        for (let i = 0; i < this._items.length; i++) {
            if (this._items[i].alias === alias) {
                return this._items[i];
            }
        }

        return undefined;
    }

    findByAlias(alias: string): Entity[] {
        if (!alias) {
            return [];
        }

        let result = [];
        for (let i = 0; i < this._items.length; i++) {
            if (this._items[i].alias === alias) {
                result.push(this._items[i]);
            }
        }

        return result;
    }

    getOneById(id): Entity {
        let entity = this.findOneById(id);

        if (!entity) {
            throw new AppError(sprintf('Сущность типа %s id(%s) не найдена.', this._entityClassname, id));
        }

        return entity;
    }

    getOneByAlias(alias: string): Entity {
        let entity = this.findOneByAlias(alias);
        if (!entity) {
            throw new AppError(sprintf('Сущность типа %s alias(%s) не найдена.', this._entityClassname, alias));
        }

        return entity;
    }

    findAll() {
        return this._items.concat();
    }

    // debug(objectDebugger) {
    //     // console.log('DEBUG', this.constructor.name);
    //     // console.log('DEBUG', 'length', this._items.length);
    //     objectDebugger[sprintf('repository %s length', this.constructor.name)] = this._items.length;
    //     for (let i = 0; i < this._items.length; i++) {
    //         let itemDebugger = {};
    //         if (this._items[i].debug) {
    //             // this._items[i].debug();
    //             this._items[i].debug(itemDebugger);
    //         } else {
    //             // objectDebugger[]
    //             console.log(this._items[i].toString());
    //         }
    //         itemDebugger = {};
    //     }
    // }

    debug(debugContainer) {
        // console.log('DEBUG', this.constructor.name);
        // console.log('DEBUG', 'length', this._items.length);
        // debugContainer[sprintf('repository %s length', this.constructor.name)] = this._items.length;
        debugContainer.add(sprintf('repository %s length: %s', this.constructor.name, this._items.length));
        for (let i = 0; i < this._items.length; i++) {
            // let itemDebugger = {};
            if (this._items[i].debug) {
                // this._items[i].debug();
                // this._items[i].debug(debugContainer.appDebugger.createContainer());
                this._items[i].debug(debugContainer);
            } else {
                // debugContainer[]
                console.log(this._items[i].toString());
            }
            // debugContainer[i] = itemDebugger;
            // itemDebugger = {};
        }
    }
}