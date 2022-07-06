import MainObject from './MainObject.js';
import DebugContainer from './Debug/DebugContainer.js';

export default abstract class BaseDataObject extends MainObject {
    // private abstract _id: number;   //todo: Поведение?
    // private abstract _name: string;
    // private abstract _alias: string;

    abstract get id(): number;
    abstract get name(): string;
    abstract get alias(): string;

    debug(debugContainer: DebugContainer) {
        // debugContainer['_id'] = this.hasOwnProperty('_id') ? this['_id'] : undefined;
        // debugContainer['_name'] = this.hasOwnProperty('_name') ? this['_name'] : undefined;
        // debugContainer['_alias'] = this.hasOwnProperty('_alias') ? this['_alias'] : undefined;

        debugContainer['_id'] = this.id;
        debugContainer['_name'] = this.name;
        debugContainer['_alias'] = this.alias;

        // debugContainer.add('_id', this.id);
        // debugContainer.add('_name', this.name);
        // debugContainer.add('_alias', this.alias);

        // debugContainer['1'] = this.alias;
        // debugContainer['11'] = this.alias;
        // debugContainer['111'] = this.alias;
        // debugContainer['1111'] = this.alias;
        // debugContainer['11111'] = this.alias;
        // debugContainer['111111'] = this.alias;
        // debugContainer['1111111'] = this.alias;
        // debugContainer['11111111'] = this.alias;
        // debugContainer['111111111'] = this.alias;
        // debugContainer['1111111111'] = this.alias;
        // debugContainer['11111111111'] = this.alias;
    }

    //todo: Переделать: сохранение для Сейвов и данных должны быть разные методы.
    save() {
        return {
            className: this.constructor.name,
            id: this.id,
        };
    }
}