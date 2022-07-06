import BaseDataObject from '../../source/BaseDataObject.js';
import DebugContainer from '../../source/Debug/DebugContainer.js';

export default class ArmorMaterial extends BaseDataObject {
    private _id: number;
    private _name: string;
    private _alias: string;
    private _description: string;
    private _sort: number;

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get alias(): string {
        return this._alias;
    }

    get description(): string {
        return this._description;
    }

    get sort(): number {
        return this._sort;
    }

    static create(
        id: number,
        name: string,
        alias: string,
        description: string,
        sort: number,
    ) {
        let armorMaterial = new ArmorMaterial();

        armorMaterial._id = id;
        armorMaterial._name = name;
        armorMaterial._alias = alias;
        armorMaterial._description = description;
        armorMaterial._sort = sort;

        return armorMaterial;
    }

    debug(debugContainer: DebugContainer) {
        super.debug(debugContainer);
        debugContainer['_description'] = this._description;
        debugContainer['_sort'] = this._sort;
        // debugContainer.add('_description', this._description);
        // debugContainer.add('_sort', this._sort);

        // let o = {
        //     _id: 42,
        //     _name: 'name',
        //     _alias: 'alias',
        //     //etc...
        // };
        // console.log(JSON.stringify(o));
    }
}