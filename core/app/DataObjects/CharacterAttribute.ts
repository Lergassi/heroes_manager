import BaseDataObject from '../../source/BaseDataObject.js';

export default class CharacterAttribute extends BaseDataObject {
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
        let characterAttribute = new CharacterAttribute();

        characterAttribute._id = id;
        characterAttribute._name = name;
        characterAttribute._alias = alias;
        characterAttribute._description = description;
        characterAttribute._sort = sort;

        return characterAttribute;
    }
}