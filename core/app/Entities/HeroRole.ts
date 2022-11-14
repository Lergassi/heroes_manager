import Icon from './Icon.js';

export default class HeroRole {
    private readonly _id: string;
    private readonly _name: string;
    private readonly _sort: number;
    private readonly _icon: Icon;

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get sort(): number {
        return this._sort;
    }

    get icon(): Icon {
        return this._icon;
    }

    constructor(
        id: string,
        name: string,
        sort: number,
        icon: Icon,
    ) {
        this._id = id;
        this._name = name;
        this._sort = sort;
        this._icon = icon;
    }
}